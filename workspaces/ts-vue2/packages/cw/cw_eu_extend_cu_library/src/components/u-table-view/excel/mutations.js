/**
 * Excel 数据突变：粘贴写入、Delete 清空、行同步、undo/redo 快照应用。
 */
import cloneDeep from 'lodash/cloneDeep';
import {
  computeExcelPasteDestinationSelection,
  getExcelSelectionBounds,
  getExcelSelectionStart,
} from './selection.js';

export function removeRowFromDataSource(ctx, rowRef) {
  const ds = ctx.currentDataSource;
  if (!ds || !rowRef) {
    return;
  }
  const lists = [ds.data, ds.viewData, ds.arrangedData].filter(Boolean);
  const seen = new Set();
  lists.forEach((list) => {
    if (seen.has(list)) {
      return;
    }
    seen.add(list);
    const idx = list.indexOf(rowRef);
    if (idx >= 0) {
      list.splice(idx, 1);
    }
  });
}

export function syncPushRow(ctx, wrapRow) {
  const ds = ctx.currentDataSource;
  if (!ds || !wrapRow) {
    return;
  }
  const lists = [ds.data, ds.viewData, ds.arrangedData].filter(Boolean);
  const seen = new Set();
  lists.forEach((list) => {
    if (seen.has(list)) {
      return;
    }
    seen.add(list);
    list.push(wrapRow);
  });
}

export function createNewExcelRow(ctx, anchorRowIndex, excelPasteableColumnVMs) {
  const currentData = ctx.currentData || [];
  const anchorIndex = currentData.length
    ? Math.min(Math.max(anchorRowIndex, 0), currentData.length - 1)
    : -1;
  const anchorWrap = anchorIndex >= 0 ? currentData[anchorIndex] : null;
  const anchorSimple = anchorWrap ? ctx.getRealSimpleItem(anchorWrap) : null;

  let newSimple = anchorSimple ? cloneDeep(anchorSimple) : {};
  excelPasteableColumnVMs.forEach((vm) => {
    if (vm.field) {
      ctx.$setAt(newSimple, vm.field, '');
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

export function applyExcelPaste(ctx, pasteRows, excelSelection) {
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
      const newValue = rowVals[c] == null ? '' : String(rowVals[c]);
      if (oldValue !== newValue) {
        changedCells.push({ item, field, oldValue, newValue });
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
  if (!ctx || !snapshot || !snapshot.changedCells) {
    return;
  }
  const cells = snapshot.changedCells || [];
  cells.forEach((cell) => {
    const value = direction === 'undo' ? cell.oldValue : cell.newValue;
    ctx.$setAt(cell.item, cell.field, value);
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
      const newValue = '';
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
