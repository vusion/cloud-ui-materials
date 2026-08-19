/** Excel td 选区交互 mixin */
import { isEditableTarget } from '../cell-value.js';
import { getExcelInject } from './mode-mixin.js';

export default {
  inject: getExcelInject(),
  computed: {
    isExcelInteractionEnabled() {
      return !!(this.onExcelCellMouseDown && this.excelSelection);
    },
    excelColIndex() {
      if (!this.isExcelInteractionEnabled || !this.getExcelColIndex) return -1;
      return this.getExcelColIndex(this.vm);
    },
    isExcelPasteableCell() {
      return this.excelColIndex >= 0 && this.isExcelModeEnabled;
    },
  },
  methods: {
    onExcelCellMouseDownLocal(event) {
      if (!this.isExcelInteractionEnabled || this.excelColIndex < 0) return;
      if (isEditableTarget(event.target)) return;
      if (this.isExcelTextSelectModifier && this.isExcelTextSelectModifier(event)) {
        if (this.onExcelTextSelectMouseDown) this.onExcelTextSelectMouseDown(this.rowIndex, this.excelColIndex, event);
        return;
      }
      event.preventDefault();
      // 手动 blur 当前焦点元素，确保选区与 input 焦点互斥
      const active = document.activeElement;
      if (active && active !== document.body && isEditableTarget(active)) {
        active.blur();
      }
      if (this.onExcelCellMouseDown) this.onExcelCellMouseDown(this.rowIndex, this.excelColIndex, event);
    },
    onExcelCellMouseOverLocal() {
      if (!this.isExcelInteractionEnabled || this.excelColIndex < 0 || !this.onExcelCellMouseOver) return;
      this.onExcelCellMouseOver(this.rowIndex, this.excelColIndex);
    },
  },
};
