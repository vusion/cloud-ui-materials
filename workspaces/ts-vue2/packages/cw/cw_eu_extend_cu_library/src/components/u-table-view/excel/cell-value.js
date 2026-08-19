/** Excel 格值编解码、键盘命令解析（纯逻辑，可单测） */
import { placeholderFormatter } from '@lcap-ui/src/utils/Formatters';

const EXCEL_CELL_TYPES = ['string', 'number', 'boolean'];

function getColumnFormatter(formatter) {
  return formatter && formatter !== placeholderFormatter ? formatter : null;
}

function normalizeCellType(type) {
  if (!type || type === 'string') return 'string';
  return EXCEL_CELL_TYPES.includes(type) ? type : 'string';
}

export { normalizeCellType as normalizeExcelCellType };

export function formatExcelCellValue(value, excelCellType) {
  if (value == null || value === '' || (typeof value === 'number' && Number.isNaN(value))) return '';
  const type = normalizeCellType(excelCellType);
  if (type === 'string' && typeof value === 'object') return '';
  return String(value);
}

export function parseExcelCellText(raw, excelCellType) {
  if (raw == null) return null;
  const text = String(raw).trim();
  if (!text) return null;

  const type = normalizeCellType(excelCellType);
  if (type === 'number') {
    const n = Number.parseFloat(text.replace(/,/g, ''));
    return Number.isNaN(n) ? text : n;
  }
  if (type === 'boolean') {
    const lower = text.toLowerCase();
    if (['true', '1', 'yes', 'y', '是'].includes(lower)) return true;
    if (['false', '0', 'no', 'n', '否'].includes(lower)) return false;
    return text;
  }
  return text;
}

export function formatExcelCellDisplay(value, columnVM, item) {
  if (columnVM && columnVM.excelCellType) {
    return formatExcelCellValue(value, columnVM.excelCellType);
  }
  if (value == null || value === '') return '';
  const fmt = columnVM ? getColumnFormatter(columnVM.currentFormatter) : null;
  if (fmt && typeof fmt.format === 'function') {
    const text = fmt.format(value, item);
    return text == null ? '' : String(text);
  }
  if (typeof value === 'object') return '';
  return String(value);
}

export function parseExcelPasteCellValue(raw, columnVM) {
  const excelCellType = columnVM && columnVM.excelCellType;
  if (excelCellType) return parseExcelCellText(raw, excelCellType);
  if (raw == null) return null;
  const text = String(raw).trim();
  if (!text) return null;
  const fmt = columnVM ? getColumnFormatter(columnVM.currentFormatter) : null;
  if (fmt && typeof fmt.parse === 'function') {
    try {
      const result = fmt.parse(text);
      if (result !== undefined) return result;
    } catch (e) {
      return text;
    }
  }
  return text;
}

export function isEditableTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return !!target.closest && !!target.closest('[contenteditable="true"]');
}

function isExcelModeReady(state) {
  return !!(state.isExcelModeEnabled && !state.exportExcelBlocking);
}

export function canHandleExcelDocumentKeys(state) {
  return isExcelModeReady(state) && !isEditableTarget(state.activeElement);
}

/** 复制：有 Excel 选区即可，不受 input 焦点或 readonly 限制 */
export function canHandleExcelCopy(state) {
  return isExcelModeReady(state) && state.selectionActive;
}

export function checkExcelMutationGuard(state, showToast = true) {
  if (!state.isExcelModeEnabled) return { ok: false };
  if (state.readonly || state.disabled) {
    return { ok: false, toast: showToast ? '表格为只读或禁用状态，无法粘贴' : null };
  }
  if (state.treeDisplay) {
    return { ok: false, toast: showToast ? '树形表格暂不支持 Excel 粘贴' : null };
  }
  if (!state.selectionActive) return { ok: false };
  return { ok: true };
}

export function checkExcelClearGuard(state) {
  if (!state.selectionActive) return { ok: false };
  if (state.readonly || state.disabled) {
    return { ok: false, blocked: true, toast: '表格为只读或禁用状态，无法清除' };
  }
  return { ok: true };
}

export function shouldPreventExcelSelectStart(state, event) {
  if (!state.isExcelModeEnabled || isEditableTarget(event.target)) return false;
  if ((event && event.altKey) || state.textSelectCellKey) return false;
  if (event && event.shiftKey && state.selectionActive) return true;
  return !!state.excelDragging;
}

/** 解析 document keydown 为命令对象 */
export function resolveExcelKeydownAction(event, state) {
  const key = event.key && event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;

  if (!mod) {
    if (key === 'escape') return { type: 'escape', clearSelection: true, preventDefault: true };
    if (key === 'delete' || key === 'backspace') {
      const guard = checkExcelClearGuard(state);
      if (guard.blocked) return { type: 'clear-blocked', preventDefault: true, toast: guard.toast };
      if (guard.ok) return { type: 'clear-selection' };
    }
    return { type: 'none' };
  }

  // Ctrl+C/V：粘贴走 paste 事件，复制走 copy 事件（同步 clipboardData）
  if (key === 'c' || key === 'v') return { type: 'none' };
  if ((key === 'z' && event.shiftKey) || key === 'y') {
    return state.redoStackLength > 0 ? { type: 'redo', preventDefault: true } : { type: 'none' };
  }
  if (key === 'z' && state.undoStackLength > 0) return { type: 'undo', preventDefault: true };
  return { type: 'none' };
}
