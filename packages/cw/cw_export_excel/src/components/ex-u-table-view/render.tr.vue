<template>
 <tr
  :class="$style.row"
  :color="item.rowColor"
  ref="row"
  :selectable="selectable"
  :selected="selectable && item.radioChecked"
  :draggable="rowDraggable && item.draggable || undefined"
  :dragging="isDragging(item)"
  :subrow="!!item.tableTreeItemLevel"
  @dragstart="onDragStart($event, item, rowIndex + virtualIndex)"
  @dragover="onDragOver($event, item, rowIndex + virtualIndex)"
  @click="onClickRow($event, item, rowIndex + virtualIndex)"
  @dblclick="onDblclickRow($event, item, rowIndex + virtualIndex)"
>
  <template v-if="hasLazyLoadHolder">
    <td :style="{ height: `${rowHeight}px`, border: 'none' }" />
  </template>
  <template v-else>
    <u-table-render-td v-for="(columnVM, columnIndex) in visibleColumnVMs"
      v-if="getItemColSpan(item, rowIndex, columnIndex) !== 0 && getItemRowSpan(item, rowIndex, columnIndex) !== 0"
      :key="columnIndex"
      :vm="columnVM"
      :item="getRealItem(item, rowIndex + virtualIndex)"
      :wrapItem="item"
      :rowIndex="rowIndex + virtualIndex"
      :index="rowIndex + virtualIndex"
      :columnIndex="columnIndex"
      :line="line"
      :columnItem="columnVM.columnItem"
      :style="getStyle('td', columnVM, {item, columnIndex, rowIndex: rowIndex + virtualIndex, index: rowIndex + virtualIndex})"
      :last-left-fixed="isTdLastLeftFixed(columnVM, columnIndex, visibleColumnVMs, item, rowIndex)"
      :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs)"
      :shadow="(isTdLastLeftFixed(columnVM, columnIndex, visibleColumnVMs, item, rowIndex) && !scrollXStart) || (isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs) && !scrollXEnd)"
      :colspan="getItemColSpan(item, rowIndex, columnIndex)"
      :rowspan="getItemRowSpan(item, rowIndex, columnIndex)"
      :value-field="valueField"
      :disabled="item.disabled || disabled"
      :ellipsis="ellipsis"
      :readonly="readonly"
      :treeDisplay="treeDisplay"
      :hasChildrenField="hasChildrenField"
      :treeColumnIndex="treeColumnIndex"
      :handlerDraggable="handlerDraggable"
      :usePagination="usePagination"
      @check="check($event.item, $event.checked)"
      @tree-toggle-expanded="toggleTreeExpanded"
      @select="select($event.item, $event.rowIndex)">
  </u-table-render-td>
  </template>
</tr>
</template>
<script>
import UTableRenderTd from './render.td.vue';
import observe from './observe';
const requestAnimationFrame = (typeof window === 'undefined' ? false : window.requestAnimationFrame) || (cb => setTimeout(cb, 16.6));
export default {
  components: {
    UTableRenderTd
  },
  props: {
    item: Object,
    rowIndex: {
      type: Number
    },
    selectable: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    rowDraggable: {
      type: Boolean,
      default: false
    },
    visibleColumnVMs: {
      type: Array,
      default: () => []
    },
    virtualIndex: {
      type: Number,
      default: 0
    },
    valueField: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: false
    },
    // 单元格是否缩略展示
    readonly: {
      type: Boolean,
      default: false
    },
    treeDisplay: {
      type: Boolean,
      default: false
    },
    hasChildrenField: {
      type: String,
      default: 'hasChildren'
    },
    treeColumnIndex: {
      type: [Number, String]
    },
    handlerDraggable: Boolean,
    usePagination: Boolean,
    itemHeight: Number,
    lazyLoad: Boolean,
    scrollXStart: Boolean,
    scrollXEnd: Boolean
  },
  inject: ['toggleExpanded', 'debouncedLoad', 'sort', 'filter', 'checkAll', 'onClickRow', 'onDblclickRow', 'check', 'toggleTreeExpanded', 'select', 'onDragStart', 'onDragOver', 'isDragging', 'getItemRowSpan', 'getItemColSpan', 'getRealItem', 'isTdLastLeftFixed', 'isFirstRightFixed', 'getStyle', 'getTableContentElem'],
  data() {
    return {
      loaded: !this.lazyLoad
    };
  },
  computed: {
    rowHeight() {
      const DEFAULT_HEIGHT = 48;
      return Math.max(this.itemHeight || DEFAULT_HEIGHT, DEFAULT_HEIGHT);
    },
    hasLazyLoadHolder() {
      return !this.loaded && this.lazyLoad;
    }
  },
  mounted() {
    if (!this.lazyLoad) {
      return;
    }
    this.$nextTick(this.initObserve);
  },
  beforeDestroy() {
    this.clearObserve();
  },
  methods: {
    initObserve() {
      const tableContentElem = this.getTableContentElem();
      if (!tableContentElem) {
        return;
      }
      let container = tableContentElem;
      if (window.innerHeight < container.offsetHeight) {
        // 表格高度 > 视窗高度时，直接使用默认视窗
        container = null;
      }
      const bufferSize = 10;
      const height = this.rowHeight * bufferSize;
      this.obser = observe(this.$refs.row, container, this.handleLoaded, height);
    },
    handleLoaded() {
      if (!this.loaded) {
        requestAnimationFrame(() => {
          this.loaded = true;
          this.clearObserve();
        });
      }
    },
    clearObserve() {
      if (this.obser) {
        this.obser.unobserve(this.$refs.row);
        this.obser.disconnect();
        this.obser = null;
      }
    }
  }
};
</script>
<style module src="./index.css"></style>

