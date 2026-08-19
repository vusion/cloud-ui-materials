/** Excel 表头视图（render.th）：单列选中点击 */
import { isEditableTarget } from '../cell-value.js';
import { getExcelInject } from './mode-mixin.js';

export default {
  inject: getExcelInject(),
  computed: {
    isExcelInteractionEnabled() {
      return !!(this.excelColumnSelect && this.excelSelection);
    },
    excelHeadColIndex() {
      if (!this.isExcelInteractionEnabled || !this.getExcelColIndex) return -1;
      return this.getExcelColIndex(this.columnVM);
    },
  },
  methods: {
    onHeadClick(columnVM, event) {
      if (this.isExcelInteractionEnabled && this.excelHeadColIndex >= 0) {
        event.stopPropagation();
        event.preventDefault();
        const active = document.activeElement;
        if (active && active !== document.body && isEditableTarget(active)) active.blur();
        this.excelColumnSelect(this.excelHeadColIndex);
        return;
      }
      if (columnVM.sortable && this.sortTrigger === 'head' && this.onClickSort) {
        this.onClickSort(columnVM);
      }
    },
  },
};
