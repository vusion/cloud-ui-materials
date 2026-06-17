/**
 * Excel 剪贴板：TSV 编解码、系统读写、从选区构建复制载荷。
 * 复制矩阵使用 cell-value 的展示值（与 Excel 粘贴/展示语义一致）。
 */
import { getExcelSelectionBounds } from './selection.js';
import { formatExcelCellDisplay } from './cell-value.js';

export function parseExcelTSV(text) {
  if (text == null || text === '') {
    return [];
  }
  let normalized = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (normalized.endsWith('\n')) {
    normalized = normalized.replace(/\n+$/, '');
  }
  if (!normalized) {
    return [];
  }
  return normalized.split('\n').map((line) => line.split('\t').map((cell) => cell ?? ''));
}

export function serializeExcelTSV(rows) {
  if (!rows || !rows.length) {
    return '';
  }
  return rows
    .map((row) => (row || []).map((cell) => {
      const str = cell == null ? '' : String(cell);
      return str.replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
    }).join('\t'))
    .join('\n');
}

export async function writeExcelClipboardText(text) {
  const payload = text == null ? '' : String(text);
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(payload);
      return true;
    } catch (e) {
      // fall through
    }
  }
  if (typeof document === 'undefined') {
    return false;
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = payload;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return !!ok;
  } catch (e) {
    return false;
  }
}

export async function readExcelClipboardText(event) {
  if (event && event.clipboardData) {
    const text = event.clipboardData.getData('text/plain');
    if (text != null && text !== '') {
      return text;
    }
  }
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.readText) {
    try {
      return await navigator.clipboard.readText();
    } catch (e) {
      return '';
    }
  }
  return '';
}

export function buildExcelSelectionCopyMatrix(ctx, bounds) {
  if (!ctx || !bounds) {
    return [];
  }
  const excelPasteableColumnVMs = ctx.excelPasteableColumnVMs || [];
  const rows = [];
  for (let r = bounds.minRow; r <= bounds.maxRow; r += 1) {
    const wrapRow = (ctx.currentData || [])[r];
    const item = wrapRow ? ctx.getRealSimpleItem(wrapRow) : null;
    const line = [];
    for (let c = bounds.minCol; c <= bounds.maxCol; c += 1) {
      const colVM = excelPasteableColumnVMs[c];
      if (!colVM || !colVM.field || !item || item.disabled) {
        line.push('');
        continue;
      }
      const value = ctx.$at(item, colVM.field);
      line.push(formatExcelCellDisplay(value, colVM.currentFormatter));
    }
    rows.push(line);
  }
  return rows;
}

export function buildExcelCopyPayloadFromSelection(ctx, excelSelection) {
  if (!excelSelection || !excelSelection.active) {
    return null;
  }
  const rowCount = (ctx.currentData || []).length;
  const colCount = (ctx.excelPasteableColumnVMs || []).length;
  const bounds = getExcelSelectionBounds(excelSelection, rowCount, colCount);
  if (!bounds) {
    return null;
  }
  const matrix = buildExcelSelectionCopyMatrix(ctx, bounds);
  if (!matrix.length) {
    return null;
  }
  return {
    matrix,
    tsv: serializeExcelTSV(matrix),
  };
}
