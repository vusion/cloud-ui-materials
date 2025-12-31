<template>
    <f-render>
        <div :class="$style.table" ref="tablewrap" v-for="(tableMeta, tableMetaIndex) in tableMetaList" :key="tableMeta.position" :position="tableMeta.position"
            :style="{ width: tableMeta.position !== 'static' && number2Pixel(tableMeta.width), height: number2Pixel(tableHeight)}"
            @scroll="onTableScroll" :shadow="(tableMeta.position === 'left' && !scrollXStart) || (tableMeta.position === 'right' && !scrollXEnd)">
            <div v-if="showHead" :class="$style.head" ref="head">
                <u-table :class="$style['head-table']" :color="color" :line="line" :striped="striped" :sticky-fixed="useStickyFixed" :style="{ width: number2Pixel(tableWidth)}">
                    <colgroup>
                        <col v-for="(columnVM, columnIndex) in visibleColumnVMs" :key="columnIndex" :width="columnVM.computedWidth">
                    </colgroup>
                    <thead :grouped="hasGroupedColumn">
                        <tr v-for="(headTr, trIndex) in visibleTableHeadTrArr">
                            <template v-for="(columnVM, columnIndex) in headTr">
                                <u-table-render-th
                                    :columnVM="columnVM"
                                    :columnIndex="columnIndex"
                                    :boldHeader="boldHeader"
                                    :sortTrigger="sortTrigger"
                                    :headTrLength="headTr.length"
                                    :currentSorting="currentSorting"
                                    :resizable="resizable"
                                    :disabled="disabled"
                                    :readonly="readonly"
                                    :currentData="currentData"
                                    :currentValues="currentValues"
                                    :thEllipsis="getThEllipsis(columnVM)"
                                    :style="getStyle('th', columnVM)"
                                    :last-left-fixed="isLastLeftFixed(columnVM, columnIndex, headTr)"
                                    :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, headTr)"
                                    :shadow="(isLastLeftFixed(columnVM, columnIndex, headTr) && !scrollXStart) || (isFirstRightFixed(columnVM, columnIndex, headTr) && !scrollXEnd)">
                                </u-table-render-th>
                            </template>
                        </tr>
                    </thead>
                </u-table>
            </div>
            <div :class="$style.headPlaceholder" ref="headPlaceholder"></div>
            <div :class="$style.body" ref="body" :style="{ height: number2Pixel(bodyHeight) }" @scroll="onBodyScroll"
                :sticky-fixed="useStickyFixed">
                <f-scroll-view :class="$style.scrollcview" @scroll="onScrollView" ref="scrollView" :native="nativeScroll" :hide-scroll="!!tableMetaIndex">
                    <u-table ref="bodyTable" :class="$style['body-table']" :line="line" :striped="striped" :sticky-fixed="useStickyFixed" :style="{ width: number2Pixel(tableWidth)}">
                        <colgroup>
                            <col v-for="(columnVM, columnIndex) in visibleColumnVMs" :key="columnIndex" :width="columnVM.computedWidth">
                        </colgroup>
                        <tbody ref="virtual">
                            <template v-if="(!currentLoading && !currentError && !currentEmpty || pageable === 'auto-more' || pageable === 'load-more') && currentData && currentData.length">
                                <template v-for="(item, rowIndex) in virtualList">
                                    <!-- <tr
                                      v-if="item.display !== 'none'"
                                      :key="getRowKey(item, rowIndex)"
                                      :class="[$style.row]"
                                      :color="item.rowColor"
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
                                        <u-table-render-td v-for="(columnVM, columnIndex) in visibleColumnVMs"
                                            v-if="getItemColSpan(item, rowIndex, columnIndex) !== 0 && getItemRowSpan(item, rowIndex, columnIndex) !== 0"
                                            :key="columnIndex"
                                            :vm="columnVM"
                                            :item="getRealItem(item, rowIndex + virtualIndex)"
                                            :rowIndex="rowIndex + virtualIndex"
                                            :index="rowIndex + virtualIndex"
                                            :columnIndex="columnIndex"
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
                                    </tr> -->
                                    <u-table-render-tr
                                      v-if="item.display !== 'none'"
                                      :key="getRowKey(item, rowIndex)"
                                      :item="item"
                                      :rowIndex="rowIndex"
                                      :selectable="selectable"
                                      :rowDraggable="rowDraggable"
                                      :visibleColumnVMs="visibleColumnVMs"
                                      :virtualIndex="virtualIndex"
                                      :valueField="valueField"
                                      :disabled="disabled"
                                      :ellipsis="ellipsis"
                                      :readonly="readonly"
                                      :treeDisplay="treeDisplay"
                                      :hasChildrenField="hasChildrenField"
                                      :treeColumnIndex="treeColumnIndex"
                                      :handlerDraggable="handlerDraggable"
                                      :usePagination="usePagination"
                                      :itemHeight="itemHeight"
                                      :lazyLoad="lazyLoad && rowIndex >= bufferSize && !virtual"
                                      :scrollXStart="scrollXStart"
                                      :scrollXEnd="scrollXEnd"
                                    />
                                    <u-table-render-tr-expander
                                      v-if="expanderColumnVM"
                                      :key="`expander_${valueField && $at(item, valueField) ? $at(item, valueField) : rowIndex}`"
                                      :vm="expanderColumnVM"
                                      :item="item"
                                      :visibleColumnVMs="visibleColumnVMs"
                                      slotName="expand-content"
                                      :slotProps="{ item, value: $at(item, expanderColumnVM.field), columnVM: expanderColumnVM, rowIndex: rowIndex + virtualIndex, index: rowIndex + virtualIndex }"
                                    >
                                    </u-table-render-tr-expander>
                                </template>
                            </template>
                            <tr key="loading" v-if="(currentData === undefined && !currentError) || currentLoading"><!-- 初次加载与加载更多 loading 合并在一起 -->
                                <td :class="[$style.center, $style.centerSticky]" :colspan="visibleColumnVMs.length">
                                    <div :class="$style.wrap" :style="{ width: rootWidth? number2Pixel(rootWidth): undefined }" vusion-slot-name="loading">
                                        <f-slot name="loading" :vm="$parent"><u-spinner :class="$style.spinner"></u-spinner> {{ loadingText }}</f-slot>
                                    </div>
                                </td>
                            </tr>
                            <tr key="error" v-else-if="currentData === null || currentError">
                                <td :class="[$style.center, $style.centerSticky]" :colspan="visibleColumnVMs.length">
                                    <div :class="$style.wrap" :style="{ width: rootWidth ? number2Pixel(rootWidth): undefined }" vusion-slot-name="error">
                                        <f-slot name="error" :vm="$parent">
                                            <u-image v-if="errorImage" :src="errorImage" fit="contain"></u-image>
                                            <u-linear-layout layout="block" justify="center">
                                                {{ errorText }}
                                            </u-linear-layout>
                                        </f-slot>
                                    </div>
                                </td>
                            </tr>
                            <tr key="loadMore" v-else-if="pageable === 'load-more' && currentDataSource.hasMore()">
                                <td :class="$style.center" :colspan="visibleColumnVMs.length">
                                    <u-link @click="load(true)">{{ $tt('loadMore') }}</u-link>
                                </td>
                            </tr>
                            <tr key="noMore" v-else-if="((pageable === 'auto-more' && hasScroll) || pageable === 'load-more') && !currentDataSource.hasMore() && (currentData && currentData.length)">
                                <td :class="$style.center" :colspan="visibleColumnVMs.length">
                                    {{ $tt('noMore') }}
                                </td>
                            </tr>
                            <tr key="empty" v-else-if="!currentData.length || currentEmpty">
                                <td :class="[$style.center, $style.centerSticky]" :colspan="visibleColumnVMs.length">
                                    <div :class="$style.wrap" :style="{ width: rootWidth ? number2Pixel(rootWidth): undefined }" vusion-slot-name="empty">
                                        <f-slot name="empty" :vm="$parent">
                                            <u-image v-if="errorImage" :src="errorImage" fit="contain"></u-image>
                                            <u-linear-layout layout="block" justify="center">
                                                {{ emptyText }}
                                            </u-linear-layout>
                                        </f-slot>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </u-table>
                    <div ref="virtualPlaceholder" v-if="virtual"></div>
                </f-scroll-view>
            </div>
        </div>
    </f-render>
</template>

<script>
import isNumber from 'lodash/isNumber';
import FVirtualTable from './f-virtual-table.vue';
import i18nMixin from "@lcap-ui/src/mixins/i18n";
import KeyMap from "@lcap-ui/src/utils/keyMap";
import UTableRenderTd from './render.td.vue';
import UTableRenderTr from './render.tr.vue';
import UTableRenderTrExpander from './render.tr.expander.vue';
import UTableRenderTh from './render.th.vue';
export default {
  name: 'u-table-render',
  mixins: [i18nMixin('u-table-view'), FVirtualTable],
  components: {
    UTableRenderTd,
    UTableRenderTr,
    UTableRenderTrExpander,
    UTableRenderTh
  },
  props: {
    tableMetaList: Array,
    visibleColumnVMs: Array,
    visibleTableHeadTrArr: Array,
    hasGroupedColumn: Boolean,
    columnVMsMap: Object,
    valueField: String,
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterMultiple: {
      type: Boolean,
      default: false
    },
    filterMax: Number,
    showHead: {
      type: Boolean,
      default: true
    },
    currentData: Array,
    currentLoading: Boolean,
    currentError: Boolean,
    currentEmpty: Boolean,
    currentDataSource: Object,
    virtual: Boolean,
    listKey: String,
    pageable: {
      type: [Boolean, String],
      default: false
    },
    usePagination: Boolean,
    boldHeader: {
      type: Boolean,
      default: true
    },
    color: String,
    border: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    loadingText: {
      type: String,
      default() {
        return this.$tt('loading');
      }
    },
    error: Boolean,
    errorText: {
      type: String,
      default() {
        return this.$tt('error');
      }
    },
    emptyText: {
      type: String,
      default() {
        return this.$tt('empty');
      }
    },
    errorImage: {
      type: String,
      default: ''
    },
    sorting: Object,
    sortTrigger: {
      type: String,
      default: 'head'
    },
    defaultOrder: {
      type: String,
      default: 'asc'
    },
    useStickyFixed: Boolean,
    fixedRightList: Array,
    fixedLeftList: Array,
    tableWidth: Number,
    tableHeight: Number,
    bodyHeight: Number,
    thEllipsis: {
      type: Boolean,
      default: false
    },
    // 表头是否缩略展示
    ellipsis: {
      type: Boolean,
      default: false
    },
    // 单元格是否缩略展示

    resizable: {
      type: Boolean,
      default: false
    },
    minColumnWidth: {
      type: Number,
      default: 44
    },
    resizeRemaining: {
      type: String,
      default: 'average'
    },
    treeDisplay: {
      type: Boolean,
      default: false
    },
    hasChildrenField: {
      type: String,
      default: 'hasChildren'
    },
    selectable: {
      type: Boolean,
      default: false
    },
    rowDraggable: Boolean,
    handlerDraggable: Boolean,
    rootWidth: Number,
    rowStyle: Function,
    nativeScroll: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    bufferSize: {
      type: Number,
      default: 10
    },
    currentValues: Array
  },
  data() {
    return {
      keyMap: new KeyMap(),
      scrollXStart: true,
      scrollXEnd: true,
      currentSorting: this.sorting,
      hasScroll: false // 作为下拉加载是否展示"没有更多"的依据。第一页不满，没有滚动条的情况下，不展示
    };
  },
  inject: ['toggleExpanded', 'debouncedLoad', 'sort', 'filter', 'checkAll', 'onClickRow', 'onDblclickRow', 'check', 'toggleTreeExpanded', 'select', 'onDragStart', 'onDragOver', 'isDragging', 'getItemRowSpan', 'getItemColSpan'],
  provide() {
    return {
      currentDataSource: this.currentDataSource,
      toggleExpanded: this.toggleExpanded,
      number2Pixel: this.number2Pixel,
      isFilterActive: this.isFilterActive,
      getFiltersValue: this.getFiltersValue,
      onSelectFilters: this.onSelectFilters,
      onClickSort: this.onClickSort,
      checkAll: this.checkAll,
      onResizerDragStart: this.onResizerDragStart,
      onResizerDrag: this.onResizerDrag,
      onResizerDragEnd: this.onResizerDragEnd,
      getRealItem: this.getRealItem,
      isTdLastLeftFixed: this.isTdLastLeftFixed,
      isFirstRightFixed: this.isFirstRightFixed,
      getStyle: this.getStyle
    };
  },
  watch: {
    'currentDataSource.sorting'(sorting) {
      this.currentSorting = sorting;
    },
    virtualTop() {
      this.$refs.virtualPlaceholder[0].style.height = this.virtualTop + this.virtualBottom + 'px';
      this.$refs.bodyTable[0].$el.style.transform = `translateY(${this.virtualTop}px)`;
    },
    virtualBottom() {
      this.$refs.virtualPlaceholder[0].style.height = this.virtualTop + this.virtualBottom + 'px';
    }
  },
  computed: {
    expanderColumnVM() {
      return this.visibleColumnVMs.find(columnVM => columnVM.type === 'expander');
    },
    treeColumnIndex() {
      const vms = this.visibleColumnVMs;
      let treeColumnIndex = vms.findIndex(columnVM => columnVM.type === 'tree');
      if (treeColumnIndex === -1) {
        treeColumnIndex = vms.findIndex(columnVM => !['index', 'radio', 'checkbox', 'expander', 'dragHandler'].includes(columnVM.type));
        if (treeColumnIndex === -1) {
          return 0;
        } else {
          return treeColumnIndex;
        }
      } else {
        return treeColumnIndex;
      }
    }
  },
  methods: {
    getRowKey(item, rowIndex) {
      return this.valueField && this.$at(item, this.valueField) ? this.$at(item, this.valueField) : rowIndex;
    },
    number2Pixel(value) {
      return isNumber(value) ? value + 'px' : '';
    },
    getStyle(type, columnVM, currentData) {
      const style = Object.assign({}, columnVM.$vnode.data && columnVM.$vnode.data.style);
      const staticStyle = Object.assign({}, columnVM.$vnode.data && columnVM.$vnode.data.staticStyle);
      // 3103262065048320：固定列动态样式没生效
      let rowStyle = {};
      if (type === 'td' && currentData && this.rowStyle && typeof this.rowStyle === 'function') {
        rowStyle = this.rowStyle(currentData);
      }
      if (this.useStickyFixed) {
        // --z-index-layout: 100, 可能用于导航栏fixed，不能大于它
        // 3024744461883136: 不需要大于99的控制。elZindex判断是为了兼容已经设置了值的
        let zIndex = 'var(--table-view-column-sticky-zindex)';
        const hasStickyZindexCssVariable = this.$parent && this.$parent.$vnode.data && this.$parent.$vnode.data.style && this.$parent.$vnode.data.style['--table-view-column-sticky-zindex'];
        const hasStaticStickyZindexCssVariable = this.$parent && this.$parent.$vnode.data && this.$parent.$vnode.data.staticStyle && this.$parent.$vnode.data.staticStyle['--table-view-column-sticky-zindex'];
        if (!hasStickyZindexCssVariable && !hasStaticStickyZindexCssVariable) {
          const styleZindex = this.$parent && this.$parent.$vnode.data && this.$parent.$vnode.data.style && this.$parent.$vnode.data.style.zIndex;
          const staticStyleZindex = this.$parent && this.$parent.$vnode.data && this.$parent.$vnode.data.staticStyle && this.$parent.$vnode.data.staticStyle['z-index'];
          let elZindex = styleZindex ? +styleZindex : 0;
          elZindex = staticStyleZindex ? +staticStyleZindex : elZindex;
          zIndex = elZindex > 99 ? elZindex : 'var(--table-view-column-sticky-zindex)';
        }
        if (this.fixedLeftList && this.fixedLeftList.length) {
          const columnData = this.columnVMsMap[columnVM._uid];
          if (columnData) {
            const inFixedLeftList = this.isInFixedList(columnVM, this.fixedLeftList);
            if (inFixedLeftList) {
              let left = columnData.left;
              if (type === 'th') {
                left = this.getFixedWidth(columnVM, 'left');
              }
              if (left !== undefined) {
                return Object.assign(staticStyle, style, rowStyle, {
                  position: 'sticky',
                  left: left + 'px',
                  zIndex,
                  overflow: 'hidden'
                });
              }
            }
          }
        }
        if (this.fixedRightList && this.fixedRightList.length) {
          const columnData = this.columnVMsMap[columnVM._uid];
          if (columnData) {
            const inFixedRightList = this.isInFixedList(columnVM, this.fixedRightList);
            if (inFixedRightList) {
              let right = columnData.right;
              if (type === 'th') {
                right = this.getFixedWidth(columnVM, 'right');
              }
              if (right !== undefined) {
                return Object.assign(staticStyle, style, rowStyle, {
                  position: 'sticky',
                  right: right + 'px',
                  zIndex,
                  overflow: 'hidden'
                });
              }
            }
          }
        }
      }
      return Object.assign(staticStyle, style, rowStyle);
    },
    /**
     * 固定列
     */
    /**
     * 表头固定列需要重新计算左、右距离
     * @param {*} columnVM 表格列
     * @param {*} type left｜ right
     */
    getFixedWidth(columnVM, type) {
      const columnData = this.columnVMsMap[columnVM._uid];
      if (columnData) {
        let width = columnData[type];
        // 分组或者有合并列的情况处理
        if (columnData.columnsInGroup || columnData.cloumnsForColSpanHidden) {
          const columnsInGroupWidth = (columnData.columnsInGroup || []).map(columnVM => {
            const columnData = this.columnVMsMap[columnVM._uid];
            return columnData && columnData[type];
          }).filter(width => width !== undefined); // 过滤掉undefined, 避免tempWidth为NaN
          const cloumnsForColSpanHiddenWidth = (columnData.cloumnsForColSpanHidden || []).map(columnVM => {
            const columnData = this.columnVMsMap[columnVM._uid];
            return columnData && columnData[type];
          }).filter(width => width !== undefined);
          const tempWidth = Math.min(...columnsInGroupWidth.concat(cloumnsForColSpanHiddenWidth));
          if (type === 'left' && width !== undefined) {
            width = Math.min(width, tempWidth);
          } else {
            width = tempWidth;
          }
        }
        return width;
      }
    },
    isLastLeftFixed(columnVM, columnIndex, list) {
      if (!columnVM) return undefined;
      const inFixedLeftList = this.isInFixedList(columnVM, this.fixedLeftList);
      let isLastInList = list[columnIndex + 1] && !list[columnIndex + 1].fixed;
      if (columnVM.$parent.isGroup && this.visibleTableHeadTrArr) {
        const groupList = this.visibleTableHeadTrArr.find(tableHeadTr => tableHeadTr.includes(columnVM.$parent));
        if (groupList) {
          const groupVMIndex = groupList.findIndex(groupVM => groupVM === columnVM.$parent);
          const isGroupInLast = this.isLastLeftFixed(columnVM.$parent, groupVMIndex, groupList);
          const isLastInGroup = !list[columnIndex + 1] || list[columnIndex + 1].$parent !== columnVM.$parent; // 原来组里的最后一个没有阴影，增加判断
          isLastInList = isLastInGroup && isGroupInLast;
        }
      }
      return inFixedLeftList && isLastInList ? true : undefined;
    },
    isTdLastLeftFixed(columnVM, columnIndex, columnVMList, item, rowIndex) {
      if (!columnVM) return undefined;
      const colSpan = this.getItemColSpan(item, rowIndex, columnIndex);
      if (colSpan > 1) {
        const lastColumnVM = columnVMList[columnIndex + colSpan - 1];
        return this.isLastLeftFixed(lastColumnVM, columnIndex + colSpan - 1, columnVMList);
      }
      return this.isLastLeftFixed(columnVM, columnIndex, columnVMList);
    },
    isFirstRightFixed(columnVM, columnIndex, list) {
      const inFixedRightList = this.isInFixedList(columnVM, this.fixedRightList);
      let isLastInList = list[columnIndex - 1] && !list[columnIndex - 1].fixed;
      if (columnVM.$parent.isGroup && this.visibleTableHeadTrArr) {
        const groupList = this.visibleTableHeadTrArr.find(tableHeadTr => tableHeadTr.includes(columnVM.$parent));
        if (groupList) {
          const groupVMIndex = groupList.findIndex(groupVM => groupVM === columnVM.$parent);
          const isGroupInLast = this.isFirstRightFixed(columnVM.$parent, groupVMIndex, groupList);
          const isLastInGroup = !list[columnIndex - 1] || list[columnIndex - 1].$parent !== columnVM.$parent;
          isLastInList = isLastInGroup && isGroupInLast;
        }
      }
      return inFixedRightList && isLastInList ? true : undefined;
    },
    /**
     * 判断是否在固定列里
     * @param {*} columnVM
     * @param {*} list lef｜rightFixedList
     */
    isInFixedList(columnVM, list) {
      const columnData = this.columnVMsMap[columnVM._uid];
      if (columnData) {
        if (columnData.columnsInGroup) {
          return columnData.columnsInGroup.some(columnVM1 => {
            const index = list.findIndex(data => data.columnVM === columnVM1);
            return index !== -1;
          });
        } else {
          const index = list.findIndex(data => data.columnVM === columnVM);
          return index !== -1;
        }
      }
    },
    /**
     * 排序
     */
    onClickSort(columnVM) {
      let order;
      let sorting = this.currentSorting;
      if (!sorting) sorting = {
        field: undefined,
        order: undefined
      };
      if (sorting.field === columnVM.field) {
        if (sorting.order === (columnVM.defaultOrder || this.defaultOrder)) order = sorting.order === 'asc' ? 'desc' : 'asc';else if (sorting.order === undefined) order = columnVM.defaultOrder || this.defaultOrder;else order = undefined;
      } else order = columnVM.defaultOrder || this.defaultOrder;
      this.sort(order && columnVM.field, order, columnVM.sortCompare);
    },
    /**
     * 过滤
     * @param {*} field
     */
    isFilterActive(field) {
      const filtering = this.currentDataSource && this.currentDataSource.filtering;
      if (!filtering) return undefined;
      const value = this.$at(filtering, field);
      return value !== undefined && value !== 'ALL' && value !== 'all';
    },
    getFiltersValue(field) {
      const filtering = this.currentDataSource && this.currentDataSource.filtering;
      if (!filtering) return undefined;
      return this.$at(filtering, field);
    },
    onSelectFilters(field, $event) {
      const filtering = {
        [field]: $event.value
      };
      this.filter(filtering);
    },
    /**
     * 表头宽度拖拽
     */
    onResizerDragStart($event, columnVM) {
      this.visibleColumnVMs.forEach(columnVM => {
        columnVM.currentWidth = columnVM.computedWidth;
        columnVM.oldWidth = columnVM.computedWidth;
      });
    },
    onResizerDrag($event, columnVM, index) {
      const minWidth = this.minColumnWidth;
      const rootWidth = this.$refs.head[0].children[0].offsetWidth;
      let beforeWidth = 0;
      for (let i = 0; i < index; i++) beforeWidth += this.visibleColumnVMs[i].computedWidth;
      const maxWidth = rootWidth - beforeWidth - (this.visibleColumnVMs.length - 1 - index) * minWidth;
      const width = Math.max(minWidth, Math.min(columnVM.oldWidth + $event.dragX, maxWidth));
      let remainingWidth = width - columnVM.computedWidth;
      columnVM.currentWidth = columnVM.computedWidth = width;
      if (this.resizeRemaining === 'sequence') {
        for (let i = index + 1; i < this.visibleColumnVMs.length; i++) {
          if (remainingWidth === 0) break;
          const columnVM = this.visibleColumnVMs[i];
          if (columnVM.computedWidth - remainingWidth >= minWidth) {
            columnVM.currentWidth = columnVM.computedWidth -= remainingWidth;
            remainingWidth = 0;
          } else {
            remainingWidth -= columnVM.computedWidth - minWidth;
            columnVM.currentWidth = columnVM.computedWidth = minWidth;
          }
        }
      } else if (this.resizeRemaining === 'average') {
        /* eslint-disable no-inner-declarations */
        function distributeInAverage(columnVMs) {
          const averageWidth = remainingWidth / columnVMs.length;
          const wideColumnVMs = [];
          columnVMs.forEach(columnVM => {
            if (columnVM.computedWidth - averageWidth >= minWidth) {
              columnVM.currentWidth = columnVM.computedWidth -= averageWidth;
              remainingWidth -= averageWidth;
              wideColumnVMs.push(columnVM);
            } else {
              remainingWidth -= columnVM.computedWidth - minWidth;
              columnVM.currentWidth = columnVM.computedWidth = minWidth;
            }
          });
          if (Math.abs(remainingWidth) >= 1 && wideColumnVMs.length) distributeInAverage(wideColumnVMs);
        }
        distributeInAverage(this.visibleColumnVMs.slice(index + 1));
        columnVM.currentWidth = columnVM.computedWidth -= remainingWidth;
      }
      $event.transferEl.style.left = '';
    },
    onResizerDragEnd($event, columnVM, index) {
      this.$emit('resize', {
        columnVM,
        index,
        width: columnVM.computedWidth,
        oldWidth: columnVM.oldWidth
      });
    },
    /**
     * 滚动相关处理
     */
    onBodyScroll(e) {
      this.syncBodyScroll(e.target.scrollTop, e.target); // this.throttledVirtualScroll(e);
      if (this.$refs.head && this.$refs.head[0]) {
        this.$refs.head[0].scrollLeft = e.target.scrollLeft;
      }
      this.scrollXStart = e.target.scrollLeft === 0;
      this.scrollXEnd = e.target.scrollLeft >= e.target.scrollWidth - e.target.clientWidth;
      if (this.pageable !== 'auto-more' || this.currentLoading) return;
      const el = e.target;
      if (el.scrollHeight === el.scrollTop + el.clientHeight && this.currentDataSource && this.currentDataSource.hasMore()) this.debouncedLoad(true);
    },
    syncBodyScroll(scrollTop, target) {
      if (!this.useStickyFixed) {
        this.$refs.body[0] && this.$refs.body[0] !== target && (this.$refs.body[0].scrollTop = scrollTop);
        this.$refs.body[1] && this.$refs.body[1] !== target && (this.$refs.body[1].scrollTop = scrollTop);
        this.$refs.body[2] && this.$refs.body[2] !== target && (this.$refs.body[2].scrollTop = scrollTop);
      }
    },
    onTableScroll(e) {
      this.scrollXStart = e.target.scrollLeft === 0;
      this.scrollXEnd = e.target.scrollLeft >= e.target.scrollWidth - e.target.clientWidth;
    },
    onScrollView(data) {
      this.$emit('scroll-view', data);
      this.hasScroll = true;
      if (!this.useStickyFixed) {
        this.syncScrollViewScroll(data.scrollTop, data.target);
      }
      if (this.virtual) this.throttledVirtualScroll(data);
      if (this.$refs.scrollView[0].$refs.wrap === data.target) {
        if (this.$refs.head && this.$refs.head[0]) {
          this.$refs.head[0].scrollLeft = data.scrollLeft;
        }
        this.scrollXStart = data.scrollLeft === 0;
        this.scrollXEnd = data.scrollLeft >= data.scrollWidth - data.clientWidth;
        if (this.pageable !== 'auto-more' || this.currentLoading) return;
        if (data.scrollHeight === data.scrollTop + data.clientHeight && this.currentDataSource && this.currentDataSource.hasMore()) this.debouncedLoad(true);
      }
    },
    syncScrollViewScroll(scrollTop, target) {
      this.$refs.scrollView[0] && this.$refs.scrollView[0].$refs.wrap !== target && (this.$refs.scrollView[0].$refs.wrap.scrollTop = scrollTop);
      this.$refs.scrollView[1] && this.$refs.scrollView[1].$refs.wrap !== target && (this.$refs.scrollView[1].$refs.wrap.scrollTop = scrollTop);
      this.$refs.scrollView[2] && this.$refs.scrollView[2].$refs.wrap !== target && (this.$refs.scrollView[2].$refs.wrap.scrollTop = scrollTop);
    },
    getKey(item, index) {
      return typeof item === 'object' ? this.keyMap.getKey(item) : index;
    },
    isSimpleArray(arr) {
      if (!Array.isArray(arr)) {
        return false; // 如果不是数组类型，则不满足条件，直接返回 false
      }
      return arr.every(item => typeof item !== 'object' // 使用 typeof 判断是否为简单数据类型
      );
    },
    getRealItem(item, rowIndex) {
      // 3037306526469888: arrangedData 改为 viewData
      const data = this.currentDataSource.isSimpleItem ? this.currentDataSource.viewData[rowIndex] && this.currentDataSource.viewData[rowIndex].simple : item;
      return data;
    },
    getThEllipsis(columnVM) {
      if (columnVM.thEllipsis === undefined) {
        return this.thEllipsis;
      } else {
        return columnVM.thEllipsis;
      }
    },
    /**
     * 虚拟滚动相关
     */
    startVirtualScroll() {
      this.throttledVirtualScroll({
        target: this.$refs.scrollView[0].$refs.wrap
      });
    },
    getRefs() {
      return {
        body: this.$refs.body[0],
        bodyTable: this.$refs.bodyTable[0],
        scrollView: this.$refs.scrollView[0],
        head: this.$refs.head && this.$refs.head[0],
        headPlaceholder: this.$refs.headPlaceholder[0],
        tablewrap: this.$refs.tablewrap[0]
      };
    }
  }
};
</script>
<style module src="./index.css"></style>

