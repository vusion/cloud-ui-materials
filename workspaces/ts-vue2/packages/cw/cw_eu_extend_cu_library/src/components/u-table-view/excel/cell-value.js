/**
 * Excel 格值：展示/编辑草稿、输入辅助、文档级键盘命令解析（纯逻辑，可单测）。
 */
import { placeholderFormatter } from '@lcap-ui/src/utils/Formatters';

function getExcelColumnFormatter(formatter) {
  if (!formatter || formatter === placeholderFormatter) {
    return null;
  }
  return formatter;
}

export function isEmptyExcelCellValue(value) {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  if (typeof value === 'number' && Number.isNaN(value)) {
    return true;
  }
  return false;
}

export function formatExcelCellDisplay(value, formatter) {
  if (isEmptyExcelCellValue(value)) {
    return '';
  }
  const fmt = getExcelColumnFormatter(formatter);
  if (fmt && typeof fmt.format === 'function') {
    const text = fmt.format(value);
    return text === null || text === undefined ? '' : String(text);
  }
  if (typeof value === 'object') {
    return '';
  }
  return String(value);
}

export function getExcelCellEditDraft(value, formatter) {
  if (isEmptyExcelCellValue(value)) {
    return '';
  }
  const fmt = getExcelColumnFormatter(formatter);
  if (fmt && typeof fmt.format === 'function') {
    const formatted = fmt.format(value);
    if (typeof fmt.parse === 'function') {
      try {
        const parsed = fmt.parse(formatted);
        if (!isEmptyExcelCellValue(parsed)) {
          return String(parsed);
        }
      } catch (e) {
        // 不可逆 formatter 使用展示文案
      }
    }
    return formatted === null || formatted === undefined ? '' : String(formatted);
  }
  if (typeof value === 'object') {
    return '';
  }
  return String(value);
}

export function isExcelPrintableEditKey(event) {
  if (!event || event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }
  if (event.key === 'Dead' || event.key === 'Process') {
    return false;
  }
  return event.key && event.key.length === 1;
}

export function getExcelCaretIndexFromPoint(containerEl, clientX, clientY, text) {
  const len = text ? text.length : 0;
  if (!containerEl || len === 0) {
    return 0;
  }

  let range = null;
  if (typeof document.caretRangeFromPoint === 'function') {
    range = document.caretRangeFromPoint(clientX, clientY);
  } else if (typeof document.caretPositionFromPoint === 'function') {
    const pos = document.caretPositionFromPoint(clientX, clientY);
    if (pos && pos.offsetNode) {
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }
  }

  if (range && containerEl.contains(range.startContainer)) {
    const pre = range.cloneRange();
    pre.selectNodeContents(containerEl);
    pre.setEnd(range.startContainer, range.startOffset);
    return Math.min(Math.max(0, pre.toString().length), len);
  }

  return estimateExcelCaretIndexFromX(containerEl, clientX, text);
}

function estimateExcelCaretIndexFromX(el, clientX, text) {
  const len = text ? text.length : 0;
  if (!el || len === 0) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0) {
    return len;
  }
  const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  return Math.min(len, Math.round(ratio * len));
}

export function isEditableTarget(target) {
  if (!target) {
    return false;
  }
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    return true;
  }
  if (target.isContentEditable) {
    return true;
  }
  return !!target.closest && target.closest('[contenteditable="true"]');
}

export function canHandleExcelDocumentKeys(state) {
  if (!state.isExcelModeEnabled || state.exportExcelBlocking) {
    return false;
  }
  return !isEditableTarget(state.activeElement);
}

export function checkExcelMutationGuard(state, showToast = true) {
  if (!state.isExcelModeEnabled) {
    return { ok: false };
  }
  if (state.readonly || state.disabled) {
    return {
      ok: false,
      toast: showToast ? '表格为只读或禁用状态，无法粘贴' : null,
    };
  }
  if (state.treeDisplay) {
    return {
      ok: false,
      toast: showToast ? '树形表格暂不支持 Excel 粘贴' : null,
    };
  }
  if (!state.selectionActive) {
    return { ok: false };
  }
  return { ok: true };
}

export function checkExcelClearGuard(state) {
  if (!state.selectionActive) {
    return { ok: false };
  }
  if (state.readonly || state.disabled) {
    return {
      ok: false,
      blocked: true,
      toast: '表格为只读或禁用状态，无法清除',
    };
  }
  return { ok: true };
}

export function shouldPreventExcelSelectStart(state, event) {
  if (!state.isExcelModeEnabled || isEditableTarget(event.target)) {
    return false;
  }
  if ((event && event.altKey) || state.textSelectCellKey) {
    return false;
  }
  return !!(state.excelDragging || state.excelRangeDragging);
}

function resolveExcelKeyboardEditIntent(event, state) {
  if (!state.isExcelModeEnabled || state.readonly || state.disabled) {
    return null;
  }
  if (state.hasEditingCell || !state.selectionActive) {
    return null;
  }
  const { anchorRowIndex, anchorColIndex } = state;
  if (anchorRowIndex < 0 || anchorColIndex < 0) {
    return null;
  }
  const key = event.key && event.key.toLowerCase();
  if (key === 'f2') {
    return {
      type: 'start-edit',
      rowIndex: anchorRowIndex,
      colIndex: anchorColIndex,
    };
  }
  if (isExcelPrintableEditKey(event)) {
    return {
      type: 'start-edit',
      rowIndex: anchorRowIndex,
      colIndex: anchorColIndex,
      initialDraft: event.key,
    };
  }
  return null;
}

/**
 * 解析 document keydown，返回命令对象供 mixin 执行副作用（$emit / 栈操作等）。
 */
export function resolveExcelKeydownAction(event, state) {
  const key = event.key && event.key.toLowerCase();
  const mod = event.ctrlKey || event.metaKey;

  if (!mod) {
    if (key === 'escape') {
      return {
        type: 'escape',
        cancelEdit: !!state.hasEditingCell,
        clearSelection: !state.hasEditingCell,
        preventDefault: true,
      };
    }
    if (key === 'delete' || key === 'backspace') {
      const clearGuard = checkExcelClearGuard(state);
      if (clearGuard.blocked) {
        return { type: 'clear-blocked', preventDefault: true, toast: clearGuard.toast };
      }
      if (clearGuard.ok) {
        return { type: 'clear-selection' };
      }
    }
    const editIntent = resolveExcelKeyboardEditIntent(event, state);
    if (editIntent) {
      return { ...editIntent, preventDefault: true };
    }
    return { type: 'none' };
  }

  if (key === 'c') {
    return { type: 'copy' };
  }
  if (key === 'v') {
    return { type: 'none' };
  }
  if (key === 'z' && event.shiftKey) {
    if (state.redoStackLength > 0) {
      return { type: 'redo', preventDefault: true };
    }
    return { type: 'none' };
  }
  if (key === 'y') {
    if (state.redoStackLength > 0) {
      return { type: 'redo', preventDefault: true };
    }
    return { type: 'none' };
  }
  if (key === 'z' && state.undoStackLength > 0) {
    return { type: 'undo', preventDefault: true };
  }
  return { type: 'none' };
}
