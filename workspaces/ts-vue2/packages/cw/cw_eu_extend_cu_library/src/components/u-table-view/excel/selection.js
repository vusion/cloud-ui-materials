/** Excel 选区模型、列准入、逻辑边界（纯逻辑，不含 DOM） */
const EXCEL_EXCLUDED_TYPES = ['index', 'radio', 'checkbox', 'expander', 'dragHandler', 'tree'];

export function createEmptyExcelSelection() {
  return {
    active: false,
    anchor: { rowIndex: -1, colIndex: -1 },
    focus: { rowIndex: -1, colIndex: -1 },
    mode: 'cell',
    copyActive: false,
  };
}

export function getExcelSelectionStart(excelSelection) {
  const { anchor, focus } = excelSelection;
  return {
    rowIndex: Math.min(anchor.rowIndex, focus.rowIndex),
    colIndex: Math.min(anchor.colIndex, focus.colIndex),
  };
}

/** 根据选区模型计算逻辑边界 {minRow, maxRow, minCol, maxCol} */
export function getExcelSelectionBounds(excelSelection, rowCount) {
  if (!excelSelection || !excelSelection.active) return null;
  const { anchor, focus, mode } = excelSelection;
  if (anchor.rowIndex < 0 || anchor.colIndex < 0) return null;

  if (mode === 'column') {
    return {
      minRow: 0,
      maxRow: Math.max(0, rowCount - 1),
      minCol: anchor.colIndex,
      maxCol: anchor.colIndex,
    };
  }
  return {
    minRow: Math.min(anchor.rowIndex, focus.rowIndex),
    maxRow: Math.max(anchor.rowIndex, focus.rowIndex),
    minCol: Math.min(anchor.colIndex, focus.colIndex),
    maxCol: Math.max(anchor.colIndex, focus.colIndex),
  };
}

export function computeExcelPasteDestinationSelection(startRow, startCol, pasteRows, colSliceLength, rowLimit) {
  if (!pasteRows || !pasteRows.length || colSliceLength <= 0) return null;

  let maxRow = startRow;
  let maxCol = startCol;
  let hasCells = false;

  for (let r = 0; r < pasteRows.length; r++) {
    const dataRowIndex = startRow + r;
    if (dataRowIndex >= rowLimit) break;
    const colsUsed = Math.min((pasteRows[r] || []).length, colSliceLength);
    if (colsUsed <= 0) continue;
    hasCells = true;
    maxRow = dataRowIndex;
    maxCol = Math.max(maxCol, startCol + colsUsed - 1);
  }

  if (!hasCells) return null;
  const isSingleCell = maxRow === startRow && maxCol === startCol;
  return {
    active: true,
    anchor: { rowIndex: startRow, colIndex: startCol },
    focus: { rowIndex: maxRow, colIndex: maxCol },
    mode: isSingleCell ? 'cell' : 'range',
  };
}

export function isExcelPasteableColumnVM(columnVM) {
  if (!columnVM || !columnVM.field) return false;
  return !EXCEL_EXCLUDED_TYPES.includes(columnVM.type);
}
