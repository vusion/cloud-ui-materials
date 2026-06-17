/**
 * Excel 数据格视图（render.td）：列索引、展示文案、行内编辑与指针交互。
 */
import { EXCEL_ROW_HANDLE_TYPES, shouldRenderExcelCell } from '../selection.js';
import { formatExcelCellDisplay, getExcelCaretIndexFromPoint } from '../cell-value.js';
import { getExcelInject } from './mode-mixin.js';

export default {
  inject: getExcelInject(),
  computed: {
    isExcelInteractionEnabled() {
      return !!(this.onExcelCellMouseDown && this.excelSelection);
    },
    excelColIndex() {
      if (!this.isExcelInteractionEnabled || !this.getExcelColIndex) {
        return -1;
      }
      return this.getExcelColIndex(this.vm);
    },
    showExcelCell() {
      if (this.excelColIndex < 0) {
        return false;
      }
      return shouldRenderExcelCell(this.vm, !!this.isExcelModeEnabled);
    },
    excelDisplayText() {
      const value = this.$at(this.item, this.vm.field);
      return formatExcelCellDisplay(value, this.vm.currentFormatter);
    },
    isExcelCellEditingNow() {
      return (
        this.isExcelCellEditing
        && this.isExcelCellEditing(this.rowIndex, this.excelColIndex)
      );
    },
    excelEditingDraft() {
      if (!this.isExcelCellEditingNow || !this.getExcelCellDraft) {
        return '';
      }
      return this.getExcelCellDraft(this.rowIndex, this.excelColIndex);
    },
    cellExcelTextClass() {
      if (
        this.isExcelCellTextSelectable
        && this.isExcelCellTextSelectable(this.rowIndex, this.excelColIndex)
      ) {
        return this.$style['cell-excel-text-selectable'];
      }
      return null;
    },
  },
  data() {
    return {
      excelInputCaret: null,
    };
  },
  watch: {
    isExcelCellEditingNow(editing) {
      if (editing) {
        this.$nextTick(() => this._focusExcelInput());
      }
    },
  },
  methods: {
    onExcelCellMouseDownLocal(event) {
      if (!this.isExcelInteractionEnabled) {
        return;
      }
      if (this.vm.type === 'dragHandler') {
        return;
      }
      if (EXCEL_ROW_HANDLE_TYPES.includes(this.vm.type)) {
        if (this.excelRowSelect) {
          this.excelRowSelect(this.rowIndex);
        }
        return;
      }
      if (this.excelColIndex < 0) {
        return;
      }
      if (this.isExcelTextSelectModifier && this.isExcelTextSelectModifier(event)) {
        if (this.onExcelTextSelectMouseDown) {
          this.onExcelTextSelectMouseDown(this.rowIndex, this.excelColIndex, event);
        }
        return;
      }
      if (this.onExcelCellMouseDown) {
        this.onExcelCellMouseDown(this.rowIndex, this.excelColIndex, event);
      }
    },
    onExcelCellMouseOverLocal() {
      if (
        !this.isExcelInteractionEnabled
        || this.excelColIndex < 0
        || !this.onExcelCellMouseOver
        || this.vm.type === 'dragHandler'
        || EXCEL_ROW_HANDLE_TYPES.includes(this.vm.type)
      ) {
        return;
      }
      this.onExcelCellMouseOver(this.rowIndex, this.excelColIndex);
    },
    onExcelCellSelectStart(event) {
      if (this.isExcelCellEditingNow) {
        return;
      }
      if (
        this.isExcelCellTextSelectable
        && this.isExcelCellTextSelectable(this.rowIndex, this.excelColIndex)
      ) {
        return;
      }
      event.preventDefault();
    },
    onExcelCellDblClick(event) {
      if (this.readonly || this.disabled || !this.startExcelCellEdit) {
        return;
      }
      event.preventDefault();
      const sel = window.getSelection && window.getSelection();
      if (sel && sel.removeAllRanges) {
        sel.removeAllRanges();
      }
      const text = this.excelDisplayText || '';
      const textEl = this.$refs.excelText;
      this.excelInputCaret = textEl
        ? getExcelCaretIndexFromPoint(textEl, event.clientX, event.clientY, text)
        : text.length;
      this.startExcelCellEdit(this.rowIndex, this.excelColIndex);
    },
    onExcelCellInput(event) {
      if (this.updateExcelCellDraft) {
        this.updateExcelCellDraft(event.target.value);
      }
    },
    onExcelCellKeydown(event) {
      const key = event.key && event.key.toLowerCase();
      if (key === 'enter') {
        event.preventDefault();
        if (this.commitExcelCellEdit) {
          this.commitExcelCellEdit();
        }
      } else if (key === 'escape') {
        event.preventDefault();
        if (this.cancelExcelCellEdit) {
          this.cancelExcelCellEdit();
        }
      }
    },
    onExcelCellBlur() {
      if (this.commitExcelCellEdit) {
        this.commitExcelCellEdit();
      }
    },
    _focusExcelInput() {
      const input = this.$refs.excelInput;
      if (!input) {
        return;
      }
      input.focus();
      const draft = input.value != null ? String(input.value) : '';
      let caret = typeof this.excelInputCaret === 'number'
        ? this.excelInputCaret
        : draft.length;
      caret = Math.min(Math.max(0, caret), draft.length);
      if (typeof input.setSelectionRange === 'function') {
        input.setSelectionRange(caret, caret);
      }
      this.excelInputCaret = null;
    },
  },
};
