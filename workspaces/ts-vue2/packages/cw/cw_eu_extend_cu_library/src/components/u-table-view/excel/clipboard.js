/** Excel 剪贴板：TSV 编解码、系统读写、选区复制载荷构建 */
import cloneDeep from 'lodash/cloneDeep';
import { getExcelSelectionBounds } from './selection.js';
import { formatExcelCellDisplay } from './cell-value.js';

// 内部结构化载荷：同表复制时保留原值类型，避免文本往返类型丢失；粘贴时 tsv 匹配则走类型保真路径
let lastExcelInternalPayload = null;

export function parseExcelTSV(text) {
  if (text == null || text === '') return [];
  let s = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+$/, '');
  if (!s) return [];
  return s.split('\n').map((line) => line.split('\t').map((cell) => cell ?? ''));
}

export function serializeExcelTSV(rows) {
  if (!rows || !rows.length) return '';
  return rows.map((row) => (row || []).map((cell) => {
    const str = cell == null ? '' : String(cell);
    return str.replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  }).join('\t')).join('\n');
}

const toClipboardText = (text) => (text == null ? '' : String(text));

function writeExcelClipboardTextSync(text) {
  if (typeof document === 'undefined') return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = toClipboardText(text);
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  } catch (e) { return false; }
}

/** 在 copy 事件回调中同步写入（须在用户手势栈内调用） */
export function writeExcelClipboardFromEvent(text, event) {
  const payload = toClipboardText(text);
  if (event?.clipboardData) {
    event.clipboardData.setData('text/plain', payload);
    return true;
  }
  return writeExcelClipboardTextSync(payload);
}

export async function writeExcelClipboardText(text) {
  const payload = toClipboardText(text);
  if (navigator?.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(payload); return true; } catch (e) { /* fall through */ }
  }
  return writeExcelClipboardTextSync(payload);
}

export async function readExcelClipboardText(event) {
  if (event && event.clipboardData) {
    const text = event.clipboardData.getData('text/plain');
    if (text != null && text !== '') return text;
  }
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.readText) {
    try { return await navigator.clipboard.readText(); } catch (e) { return ''; }
  }
  return '';
}

export function buildExcelCopyPayloadFromSelection(ctx, excelSelection) {
  if (!excelSelection || !excelSelection.active) return null;
  const rowCount = (ctx.currentData || []).length;
  const colCount = (ctx.excelPasteableColumnVMs || []).length;
  const bounds = getExcelSelectionBounds(excelSelection, rowCount, colCount);
  if (!bounds) return null;

  const cols = ctx.excelPasteableColumnVMs || [];
  const sourceFields = cols.slice(bounds.minCol, bounds.maxCol + 1).map((c) => c ? c.field : null);
  const matrix = [];
  const values = [];
  for (let r = bounds.minRow; r <= bounds.maxRow; r++) {
    const wrapRow = (ctx.currentData || [])[r];
    const item = wrapRow ? ctx.getRealSimpleItem(wrapRow) : null;
    const line = [];
    const valLine = [];
    for (let c = bounds.minCol; c <= bounds.maxCol; c++) {
      const colVM = cols[c];
      if (!colVM || !colVM.field || !item || item.disabled) {
        line.push('');
        valLine.push(null);
        continue;
      }
      const raw = ctx.$at(item, colVM.field);
      line.push(formatExcelCellDisplay(raw, colVM, item));
      valLine.push(cloneDeep(raw));
    }
    matrix.push(line);
    values.push(valLine);
  }
  if (!matrix.length) return null;
  const tsv = serializeExcelTSV(matrix);
  lastExcelInternalPayload = { values, sourceFields, tsv };
  return { matrix, tsv };
}

// 系统剪贴板文本仍等于本表上次复制 tsv 时返回结构化载荷，否则返回 null 走文本解析
export function getExcelInternalPastePayload(clipboardText) {
  if (!lastExcelInternalPayload) return null;
  if (clipboardText !== lastExcelInternalPayload.tsv) return null;
  return lastExcelInternalPayload;
}
