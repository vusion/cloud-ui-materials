/**
 * Excel 选区模型 + 列准入 + 逻辑边界（纯逻辑，不含 DOM）。
 */
export const EXCEL_ROW_HANDLE_TYPES = ['index', 'radio', 'checkbox'];
export const EXCEL_NON_PASTE_TYPES = ['expander', 'dragHandler', 'tree'];

export function getExcelSelectionStart(excelSelection) {
  const { anchor, focus } = excelSelection;
  return {
    rowIndex: Math.min(anchor.rowIndex, focus.rowIndex),
    colIndex: Math.min(anchor.colIndex, focus.colIndex),
  };
}

export function createEmptyExcelSelection() {
  return {
    active: false,
    anchor: { rowIndex: -1, colIndex: -1 },
    focus: { rowIndex: -1, colIndex: -1 },
    mode: 'cell',
    copyActive: false,
  };
}

export function getExcelSelectionBounds(excelSelection, rowCount, colCount) {
  if (!excelSelection || !excelSelection.active) {
    return null;
  }
  const { anchor, focus, mode } = excelSelection;
  if (anchor.rowIndex < 0 || anchor.colIndex < 0) {
    return null;
  }

  if (mode === 'column') {
    const col = anchor.colIndex;
    return {
      minRow: 0,
      maxRow: Math.max(0, rowCount - 1),
      minCol: col,
      maxCol: col,
    };
  }

  if (mode === 'row') {
    const row = anchor.rowIndex;
    return {
      minRow: row,
      maxRow: row,
      minCol: 0,
      maxCol: Math.max(0, colCount - 1),
    };
  }

  return {
    minRow: Math.min(anchor.rowIndex, focus.rowIndex),
    maxRow: Math.max(anchor.rowIndex, focus.rowIndex),
    minCol: Math.min(anchor.colIndex, focus.colIndex),
    maxCol: Math.max(anchor.colIndex, focus.colIndex),
  };
}

export function computeExcelPasteDestinationSelection(
  startRow,
  startCol,
  pasteRows,
  colSliceLength,
  rowLimit,
) {
  if (!pasteRows || !pasteRows.length || colSliceLength <= 0) {
    return null;
  }

  let maxRow = startRow;
  let maxCol = startCol;
  let hasCells = false;

  for (let r = 0; r < pasteRows.length; r++) {
    const dataRowIndex = startRow + r;
    if (dataRowIndex >= rowLimit) {
      break;
    }
    const rowVals = pasteRows[r] || [];
    const colsUsed = Math.min(rowVals.length, colSliceLength);
    if (colsUsed <= 0) {
      continue;
    }
    hasCells = true;
    maxRow = dataRowIndex;
    maxCol = Math.max(maxCol, startCol + colsUsed - 1);
  }

  if (!hasCells) {
    return null;
  }

  const isSingleCell = maxRow === startRow && maxCol === startCol;
  return {
    active: true,
    anchor: { rowIndex: startRow, colIndex: startCol },
    focus: { rowIndex: maxRow, colIndex: maxCol },
    mode: isSingleCell ? 'cell' : 'range',
  };
}

export function isExcelPasteableColumnVM(columnVM) {
  if (!columnVM || !columnVM.field) {
    return false;
  }
  if (EXCEL_ROW_HANDLE_TYPES.includes(columnVM.type)) {
    return false;
  }
  if (EXCEL_NON_PASTE_TYPES.includes(columnVM.type)) {
    return false;
  }
  if (columnVM.type === 'editable' || columnVM.type === 'normal' || !columnVM.type) {
    return true;
  }
  return !!columnVM.field;
}

export function shouldRenderExcelCell(columnVM, isExcelModeEnabled) {
  if (!isExcelModeEnabled) {
    return false;
  }
  return isExcelPasteableColumnVM(columnVM);
}
