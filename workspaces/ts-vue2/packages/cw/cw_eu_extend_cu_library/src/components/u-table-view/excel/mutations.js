/**
 * Excel 数据突变：粘贴写入、Delete 清空、行同步、undo/redo 快照应用。
 */
import cloneDeep from 'lodash/cloneDeep';
import { parseExcelPasteCellValue } from './cell-value.js';
import {
  computeExcelPasteDestinationSelection,
  getExcelSelectionBounds,
  getExcelSelectionStart,
} from './selection.js';

/** Excel 数据层空值：null（JSON 保留，显示层拦截为空不显示 '-'） */
const EXCEL_EMPTY_VALUE = null;

function syncExcelLocalDataSourceTotal(ds) {
  if (!ds || ds.treeDisplay) return;
  if (Array.isArray(ds.data)) {
    ds.originTotal = ds.data.length;
  }
}

// 同步行增删到外层数据源（数组 push/splice；{list,total} 同引用仅刷 total；函数形式跳过）
function syncExcelExternalDataSource(ctx, wrapRow, action) {
  const external = ctx.externalDataSource;
  if (!external) return;
  if (Array.isArray(external)) {
    if (action === 'add') {
      if (external.indexOf(wrapRow) < 0) external.push(wrapRow);
    } else if (action === 'remove') {
      const idx = external.indexOf(wrapRow);
      if (idx >= 0) external.splice(idx, 1);
    }
  } else if (Array.isArray(external.list)) {
    if (typeof external.total === 'number') {
      external.total = external.list.length;
    }
  }
}

function isRowInDataSource(ctx, rowRef) {
  const ds = ctx.currentDataSource;
  if (!ds || !rowRef) {
    return false;
  }
  const list = ds.viewData || ds.data;
  return list ? list.indexOf(rowRef) >= 0 : false;
}

export function removeRowFromDataSource(ctx, rowRef) {
  const ds = ctx.currentDataSource;
  if (!ds || !rowRef || !Array.isArray(ds.data)) {
    return;
  }
  const idx = ds.data.indexOf(rowRef);
  if (idx >= 0) {
    ds.data.splice(idx, 1);
    syncExcelLocalDataSourceTotal(ds);
    if (ds.remote && typeof ds.arrange === 'function') {
      ds.arrange();
    }
  }
  syncExcelExternalDataSource(ctx, rowRef, 'remove');
}

export function syncPushRow(ctx, wrapRow) {
  const ds = ctx.currentDataSource;
  if (!ds || !wrapRow || !Array.isArray(ds.data)) {
    return;
  }
  ds.data.push(wrapRow);
  syncExcelLocalDataSourceTotal(ds);
  // 远程数据源的 data watcher 不会触发 arrange，需手动刷新 arrangedData→viewData
  if (ds.remote && typeof ds.arrange === 'function') {
    ds.arrange();
  }
  syncExcelExternalDataSource(ctx, wrapRow, 'add');
}

export function createNewExcelRow(ctx, anchorRowIndex, excelPasteableColumnVMs) {
  const currentData = ctx.currentData || [];
  const anchorIndex = currentData.length
    ? Math.min(Math.max(anchorRowIndex, 0), currentData.length - 1)
    : -1;
  const anchorWrap = anchorIndex >= 0 ? currentData[anchorIndex] : null;
  const anchorSimple = anchorWrap ? ctx.getRealSimpleItem(anchorWrap) : null;

  // 类型骨架克隆（见 blankTypedClone）：不携带锚点 id/timestamps/audit，由后端保存时分配
  const newSimple = blankTypedClone(anchorSimple);

  excelPasteableColumnVMs.forEach((vm) => {
    if (vm.field) {
      ctx.$setAt(newSimple, vm.field, EXCEL_EMPTY_VALUE);
    }
  });

  if (ctx.valueField) {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    ctx.$setAt(newSimple, ctx.valueField, id);
  }

  let wrapRow;
  if (ctx.currentDataSource && ctx.currentDataSource.isSimpleItem) {
    wrapRow = { simple: newSimple };
    if (anchorWrap) {
      Object.keys(anchorWrap).forEach((key) => {
        if (key !== 'simple') {
          wrapRow[key] = anchorWrap[key];
        }
      });
    }
  } else {
    wrapRow = newSimple;
  }

  ctx.processData([wrapRow]);
  syncPushRow(ctx, wrapRow);
  return wrapRow;
}

// 锚点行类型骨架克隆：保留原型链 + $type（NASL 标记，cloneDeep 默认丢）+ 嵌套对象结构（field 路径可解析），
// 叶子值全清空为 undefined。产出与 app `New(EntityType)` 一致：typed shell + 全字段 present + 无克隆系统值。
function blankTypedClone(source) {
  if (!source || typeof source !== 'object') return {};
  const clone = Object.create(Object.getPrototypeOf(source));
  const typeDesc = Object.getOwnPropertyDescriptor(source, '$type');
  if (typeDesc) Object.defineProperty(clone, '$type', typeDesc);
  Object.keys(source).forEach((k) => {
    const v = source[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      clone[k] = blankTypedClone(v);
    } else {
      clone[k] = undefined;
    }
  });
  return clone;
}

export function getExcelPasteRowLimit(ctx) {
  const rows = ctx.currentData || [];
  if (!ctx.isExcelPastePaginationMode) {
    return Infinity;
  }
  if (ctx.isExcelPasteLoadMoreMode) {
    return rows.length;
  }
  const pageSize = ctx.currentDataSource?.paging?.size ?? ctx.pageSize;
  return pageSize > 0 ? pageSize : rows.length;
}

export function applyExcelPaste(ctx, pasteRows, excelSelection, valueMode = false) {
  if (!pasteRows || !pasteRows.length) {
    return null;
  }

  const excelPasteableColumnVMs = ctx.excelPasteableColumnVMs || [];
  if (!excelPasteableColumnVMs.length) {
    return null;
  }

  const { rowIndex: startRow, colIndex: startCol } = getExcelSelectionStart(excelSelection);
  const cols = excelPasteableColumnVMs.slice(startCol);
  if (!cols.length) {
    return null;
  }

  const rowLimit = getExcelPasteRowLimit(ctx);
  const changedCells = [];
  const addedRows = [];
  const touchedWrapRows = [];
  const touchedSet = new Set();

  for (let r = 0; r < pasteRows.length; r++) {
    const dataRowIndex = startRow + r;
    const rows = ctx.currentData || [];
    if (dataRowIndex >= rowLimit) {
      break;
    }

    let wrapRow;
    if (dataRowIndex >= rows.length) {
      wrapRow = createNewExcelRow(ctx, startRow, excelPasteableColumnVMs);
      addedRows.push(wrapRow);
    } else {
      wrapRow = rows[dataRowIndex];
    }
    if (!wrapRow) {
      break;
    }

    const item = ctx.getRealSimpleItem(wrapRow);
    if (!item || item.disabled) {
      continue;
    }

    if (!touchedSet.has(wrapRow)) {
      touchedSet.add(wrapRow);
      touchedWrapRows.push(wrapRow);
    }

    const rowVals = pasteRows[r] || [];
    for (let c = 0; c < cols.length; c++) {
      if (c >= rowVals.length) {
        break;
      }
      const colVM = cols[c];
      const field = colVM.field;
      const oldValue = ctx.$at(item, field);
      const srcVal = rowVals[c];
      const newValue = valueMode ? cloneDeep(srcVal) : parseExcelPasteCellValue(srcVal, colVM);
      if (oldValue !== newValue) {
        // valueMode 下 snapshot 存源值引用，redo 时再 cloneDeep 防对象别名
        changedCells.push({ item, field, oldValue, newValue: valueMode ? srcVal : newValue });
        ctx.$setAt(item, field, newValue);
      }
    }
  }

  if (!changedCells.length && !addedRows.length) {
    return null;
  }

  const destinationSelection = computeExcelPasteDestinationSelection(
    startRow,
    startCol,
    pasteRows,
    cols.length,
    rowLimit,
  );

  return {
    action: 'paste',
    changedCells,
    addedRows,
    touchedWrapRows,
    pasteRows,
    selection: cloneDeep(excelSelection),
    destinationSelection,
  };
}

export function applyExcelSnapshot(ctx, snapshot, direction) {
  if (!ctx || !snapshot) {
    return;
  }

  if (direction === 'redo') {
    (snapshot.addedRows || []).forEach((rowRef) => {
      if (isRowInDataSource(ctx, rowRef)) {
        return;
      }
      ctx.processData([rowRef]);
      syncPushRow(ctx, rowRef);
    });
  }

  const cells = snapshot.changedCells || [];
  cells.forEach((cell) => {
    const value = direction === 'undo' ? cell.oldValue : cell.newValue;
    // redo 深拷贝，避免快照内对象引用被后续编辑反向污染
    ctx.$setAt(cell.item, cell.field, direction === 'redo' ? cloneDeep(value) : value);
  });

  if (direction === 'undo') {
    (snapshot.addedRows || []).forEach((rowRef) => removeRowFromDataSource(ctx, rowRef));
  }
}

export function clearExcelSelectionCells(ctx, excelSelection) {
  const excelPasteableColumnVMs = ctx.excelPasteableColumnVMs || [];
  if (!excelPasteableColumnVMs.length || !excelSelection || !excelSelection.active) {
    return null;
  }
  const rowCount = (ctx.currentData || []).length;
  const bounds = getExcelSelectionBounds(excelSelection, rowCount, excelPasteableColumnVMs.length);
  if (!bounds) {
    return null;
  }

  const changedCells = [];
  const touchedWrapRows = [];
  const touchedSet = new Set();

  for (let r = bounds.minRow; r <= bounds.maxRow; r += 1) {
    const wrapRow = (ctx.currentData || [])[r];
    const item = wrapRow ? ctx.getRealSimpleItem(wrapRow) : null;
    if (!wrapRow || !item || item.disabled) {
      continue;
    }
    if (!touchedSet.has(wrapRow)) {
      touchedSet.add(wrapRow);
      touchedWrapRows.push(wrapRow);
    }
    for (let c = bounds.minCol; c <= bounds.maxCol; c += 1) {
      const colVM = excelPasteableColumnVMs[c];
      if (!colVM || !colVM.field) {
        continue;
      }
      const field = colVM.field;
      const oldValue = ctx.$at(item, field);
      const newValue = EXCEL_EMPTY_VALUE;
      if (oldValue !== newValue) {
        changedCells.push({ item, field, oldValue, newValue });
        ctx.$setAt(item, field, newValue);
      }
    }
  }

  if (!changedCells.length) {
    return null;
  }

  return {
    action: 'delete',
    changedCells,
    addedRows: [],
    touchedWrapRows,
    pasteRows: [],
    selection: cloneDeep(excelSelection),
  };
}
