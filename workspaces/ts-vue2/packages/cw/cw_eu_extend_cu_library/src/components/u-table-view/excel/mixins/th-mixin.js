/**
 * Excel 表头视图（render.th）：可粘贴列索引与列选点击。
 */
import { getExcelInject } from './mode-mixin.js';

export default {
  inject: getExcelInject(),
  computed: {
    isExcelInteractionEnabled() {
      return !!(this.excelColumnSelect && this.excelSelection);
    },
    excelHeadColIndex() {
      if (!this.isExcelInteractionEnabled || !this.getExcelColIndex) {
        return -1;
      }
      return this.getExcelColIndex(this.columnVM);
    },
  },
  methods: {
    onHeadClick(columnVM, event) {
      if (
        this.isExcelInteractionEnabled
        && this.excelHeadColIndex >= 0
        && this.excelColumnSelect
      ) {
        event.stopPropagation();
        event.preventDefault();
        this.excelColumnSelect(this.excelHeadColIndex);
        return;
      }
      if (columnVM.sortable && this.sortTrigger === 'head' && this.onClickSort) {
        this.onClickSort(columnVM);
      }
    },
  },
};
