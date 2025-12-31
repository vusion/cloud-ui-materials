<template>
<div v-if="$env.VUE_APP_DESIGNER" :class="$style.root" ref="root" :border="border">
    <div v-if="title" :class="$style.title" ref="title" :style="{ textAlign: titleAlignment }" vusion-slot-name="title" vusion-slot-name-edit="title">
        <slot name="title">{{ title }}</slot>
    </div>
    <slot name="config-columns"></slot>
    <u-table-designer
        ref="tableRender"

        :tableMetaList="tableMetaList"
        :visibleColumnVMs="visibleColumnVMs"
        :visibleTableHeadTrArr="visibleTableHeadTrArr"
        :columnVMsMap="columnVMsMap"

        :emptyText="emptyText"
        :errorText="errorText"
        :loadingText="loadingText"
        :currentData="currentData"
        :currentDataSource="currentDataSource"
        :currentLoading="currentLoading"
        :currentError="currentError"
        :currentEmpty="currentEmpty"
        :errorImage="errorImage"

        :pageable="pageable"

        :striped="striped"
        :border="border"
        :line="line"
        :color="color"
        :boldHeader="boldHeader"

        :defaultOrder="defaultOrder"
        :sorting="sorting"
        :sortTrigger="sortTrigger"

        :useStickyFixed="useStickyFixed"
        :fixedRightList="fixedRightList"
        :fixedLeftList="fixedLeftList"

        :tableWidth="tableWidth"
        :tableHeight="tableHeight"
        :bodyHeight="bodyHeight"

        :thEllipsis="thEllipsis"
        :ellipsis="ellipsis"

        :resizable="resizable"
        :minColumnWidth="minColumnWidth"
        :resizeRemaining="resizeRemaining"

        :treeDisplay="treeDisplay"
        :hasChildrenField="hasChildrenField"

        :selectable="selectable"

        :virtual="virtual"
        :itemHeight="itemHeight"
        :virtualCount="virtualCount"
        :listKey="listKey"

        :rowDraggable="rowDraggable"
        :handlerDraggable="handlerDraggable"

        :disabled="disabled"
        :readonly="readonly"

        :showHead="showHead"
        :rootWidth="rootWidth"
        :value-field="valueField"
        :useMask="useMask"

        @scroll-view="onScrollViewRenderTable">
    </u-table-designer>
    <u-table-render-footer
        v-if="footerCalcShow"
        ref="footerRender"
        :visibleColumnVMs="visibleColumnVMs"
        :currentData="currentFooterData"
        :currentDataSource="currentDataSource"
        :calcType="footerCalcType"
        :calcText="footerCalcText"

        :useStickyFixed="useStickyFixed"
        :fixedRightList="fixedRightList"
        :fixedLeftList="fixedLeftList"

        :tableWidth="tableWidth"
        :columnVMsMap="columnVMsMap"

        :line="line"
        :ellipsis="ellipsis"
        >
    </u-table-render-footer>
    <u-table-view-drop-ghost :data="dropData"></u-table-view-drop-ghost>
    <u-pagination :class="$style.pagination" ref="pagination" v-if="usePagination && currentDataSource"
        :total-items="currentDataSource.total" :page="currentDataSource.paging && currentDataSource.paging.number"
        :page-size="currentDataSource.paging && currentDataSource.paging.size" :page-size-options="pageSizeOptions" :show-total="showTotal" :show-sizer="showSizer" :show-jumper="showJumper"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :select-dropdown-icon="selectDropdownIcon"
        :size="paginationSize"
        @change="page($event.page)" @change-page-size="onChangePageSize">
    </u-pagination>
    <div><slot></slot></div>
    <div v-if="draggable || acrossTableDrag" ref="dragGhost" :class="$style.dragGhost" :designer="$env.VUE_APP_DESIGNER">
        <u-text color="secondary" :class="$style.text" v-if="$env.VUE_APP_DESIGNER">拖拽缩略图配置区域</u-text>
        <slot name="dragGhost" :item="dragState.source"></slot>
        <div vusion-slot-name="dragGhost" v-if="$env.VUE_APP_DESIGNER">
            <s-empty v-if="!$slots.dragGhost
                && $scopedSlots
                && !($scopedSlots.dragGhost && $scopedSlots.dragGhost())
                && !!$attrs['vusion-node-path']">
            </s-empty>
        </div>
    </div>
    <div v-if="draggable || acrossTableDrag" :class="$style.dragGhost">
        <div :class="$style.trdragGhost" ref="trDragGhost"></div>
    </div>
</div>
<div v-else :class="$style.root" ref="root" :border="border"
    @dragend="onDragEnd($event)"
    @drop="onDrop($event)"
    @dragover="onRootDragover($event)"
    @dragleave="onRootDragleave($event)"
    @dragenter="onRootDragenter($event)">
    <div v-if="title" :class="$style.title" ref="title" :style="{ textAlign: titleAlignment }" vusion-slot-name="title" vusion-slot-name-edit="title">
        <slot name="title">{{ title }}</slot>
    </div>
    <slot name="config-columns"></slot>
    <u-table-render
        ref="tableRender"

        :tableMetaList="tableMetaList"
        :visibleColumnVMs="visibleColumnVMs"
        :visibleTableHeadTrArr="visibleTableHeadTrArr"
        :columnVMsMap="columnVMsMap"

        :emptyText="emptyText"
        :errorText="errorText"
        :loadingText="loadingText"
        :currentData="currentData"
        :currentDataSource="currentDataSource"
        :currentLoading="currentLoading"
        :currentError="currentError"
        :currentEmpty="currentEmpty"
        :errorImage="errorImage"

        :pageable="pageable"

        :striped="striped"
        :border="border"
        :line="line"
        :color="color"
        :boldHeader="boldHeader"

        :defaultOrder="defaultOrder"
        :sorting="sorting"
        :sortTrigger="sortTrigger"

        :useStickyFixed="useStickyFixed"
        :fixedRightList="fixedRightList"
        :fixedLeftList="fixedLeftList"

        :tableWidth="tableWidth"
        :tableHeight="tableHeight"
        :bodyHeight="bodyHeight"

        :thEllipsis="thEllipsis"
        :ellipsis="ellipsis"

        :resizable="resizable"
        :minColumnWidth="minColumnWidth"
        :resizeRemaining="resizeRemaining"

        :treeDisplay="treeDisplay"
        :hasChildrenField="hasChildrenField"

        :selectable="selectable"

        :virtual="virtual"
        :itemHeight="itemHeight"
        :virtualCount="virtualCount"
        :listKey="listKey"

        :rowDraggable="rowDraggable"
        :handlerDraggable="handlerDraggable"

        :disabled="disabled"
        :readonly="readonly"

        :showHead="showHead"

        :filterMultiple="filterMultiple"
        :filterMax="filterMax"

        :rootWidth="rootWidth"
        :value-field="valueField"
        :rowStyle="rowStyle"
        :usePagination="usePagination"

        :nativeScroll="nativeScroll"
        :currentValues="currentValues"
        :lazyLoad="lazyLoad"
        :bufferSize="bufferSize"
        @resize="onResizerDragEnd"
        @scroll-view="onScrollViewRenderTable">
    </u-table-render>
    <u-table-render-footer
        v-if="footerCalcShow && currentData && currentData.length > 0"
        ref="footerRender"
        :visibleColumnVMs="visibleColumnVMs"
        :currentData="currentFooterData"
        :currentDataSource="currentDataSource"
        :calcType="footerCalcType"
        :calcText="footerCalcText"

        :useStickyFixed="useStickyFixed"
        :fixedRightList="fixedRightList"
        :fixedLeftList="fixedLeftList"

        :tableWidth="tableWidth"
        :columnVMsMap="columnVMsMap"

        :line="line"
        :ellipsis="ellipsis"

        :calcFormater="footerCalcFormater"
        >
    </u-table-render-footer>
    <u-table-view-drop-ghost :data="dropData"></u-table-view-drop-ghost>
    <u-pagination :class="$style.pagination" ref="pagination" v-if="usePagination && currentDataSource"
        :total-items="currentDataSource.total" :page="currentDataSource.paging.number"
        :page-size="currentDataSource.paging.size" :page-size-options="pageSizeOptions" :show-total="showTotal" :show-sizer="showSizer" :show-jumper="showJumper"
        :size="paginationSize"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :select-dropdown-icon="selectDropdownIcon"
        :max-page="currentDataSource.paging.number"
        @change="page($event.page)" @change-page-size="onChangePageSize">
    </u-pagination>
    <div><slot></slot></div>
    <div v-if="draggable || acrossTableDrag" ref="dragGhost" :class="$style.dragGhost">
        <slot name="dragGhost" :item="dragState.source"></slot>
    </div>
    <div v-if="draggable || acrossTableDrag" :class="$style.dragGhost">
        <div :class="$style.trdragGhost" ref="trDragGhost"></div>
    </div>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import DataSource from "@lcap-ui/src/utils/DataSource";
import DataSourceNew from "@lcap-ui/src/utils/DataSource/new";
import { addResizeListener, removeResizeListener, findScrollParent, getRect, findXScrollParent } from "@lcap-ui/src/utils/dom";
import { format } from "@lcap-ui/src/utils/date";
import MEmitter from "@lcap-ui/src/components/m-emitter.vue";
import debounce from 'lodash/debounce';
import UTableViewDropGhost from './drop-ghost.vue';
import SEmpty from "@lcap-ui/src/components/s-empty.vue";
import throttle from 'lodash/throttle';
import i18nMixin from "@lcap-ui/src/mixins/i18n";
import flatMap from 'lodash/flatMap';
import { createTableHeaderExportHelper, getXslxStyle } from './helper';
import * as xlsxUtils from "@lcap-ui/src/utils/xlsx";
import UTableRender from './render.table.vue';
import UTableDesigner from './designer.table.vue';
import TreeTableMixin from './tree-table-mixins';
import UTableRenderFooter from './render.footer.vue';
export default {
  name: 'u-table-view',
  inject: ['$env'], // 设计模式下，注入$env
  components: {
    UTableViewDropGhost,
    SEmpty,
    UTableRender,
    UTableDesigner,
    UTableRenderFooter
  },
  mixins: [MEmitter, i18nMixin('u-table-view'), sync({
    data: 'currentData',
    disabled: 'disabled',
    readonly: 'readonly',
    total() {
      return this.currentDataSource && this.currentDataSource.total ? this.currentDataSource.total : 0;
    },
    size() {
      return this.currentDataSource && this.currentDataSource.paging ? this.currentDataSource.paging.size : this.pageSize;
    },
    page() {
      return this.currentDataSource && this.currentDataSource.paging ? this.currentDataSource.paging.number : this.pageNumber;
    },
    sort() {
      return this.currentDataSource && this.currentDataSource.sorting ? this.currentDataSource.sorting.field : '';
    },
    order() {
      return this.currentDataSource && this.currentDataSource.sorting ? this.currentDataSource.sorting.order : '';
    },
    value() {
      return this.selectedItem && this.$at(this.selectedItem, this.getValueField());
    },
    values: 'currentValues'
  }), TreeTableMixin],
  // i18n,
  props: {
    data: Array,
    dataSource: [DataSource, DataSourceNew, Function, Object, Array],
    extraParams: Object,
    initialLoad: {
      type: Boolean,
      default: true
    },
    // 新增用来分页
    pagination: {
      type: Boolean,
      default: undefined
    },
    pageable: {
      type: [Boolean, String],
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSizeOptions: {
      type: Array,
      default() {
        return [10, 20, 50];
      }
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: true
    },
    showJumper: {
      type: Boolean,
      default: false
    },
    paginationSize: {
      type: String,
      default: 'normal'
    },
    remotePaging: {
      type: Boolean,
      default: false
    },
    sorting: Object,
    defaultOrder: {
      type: String,
      default: 'desc'
    },
    sortTrigger: {
      type: String,
      default: 'head'
    },
    remoteSorting: {
      type: Boolean,
      default: false
    },
    filtering: Object,
    remoteFiltering: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleAlignment: {
      type: String,
      default: 'center'
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
    // formatter: { type: [String, Function], default: 'text' },
    /* Selection Props */
    valueField: String,
    value: null,
    values: Array,
    selectable: {
      type: Boolean,
      default: false
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /* Others */
    accordion: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false
    },
    resizeRemaining: {
      type: String,
      default: 'average'
    },
    minColumnWidth: {
      type: Number,
      default: 44
    },
    showHead: {
      type: Boolean,
      default: true
    },
    stickHead: {
      type: Boolean,
      default: false
    },
    stickHeadOffset: {
      type: Number,
      default: 0
    },
    syncStickHeadXScroll: {
      type: Boolean,
      default: false
    },
    // 同步固定头部的横向滚动

    treeDisplay: {
      type: Boolean,
      default: false
    },
    childrenField: {
      type: String,
      default: 'children'
    },
    hasChildrenField: {
      type: String,
      default: 'hasChildren'
    },
    treeDataSource: [Function],
    treeCheckType: {
      type: String,
      default: 'up+down'
    },
    // 树型数据关联选中类型
    parentField: {
      type: String
    },
    filterMultiple: {
      type: Boolean,
      default: false
    },
    filterMax: Number,
    resizeBodyHeight: {
      type: Boolean,
      default: true
    },
    stickFixed: {
      type: Boolean,
      default: true
    },
    designerMode: {
      type: String,
      default: 'success'
    },
    // 编辑器展示不同表单状态

    configurable: {
      type: Boolean,
      default: false
    },
    // 是否配置显隐列

    draggable: {
      type: Boolean,
      default: false
    },
    // 是否可拖拽
    canDragableHandler: Function,
    canDropinHandler: Function,
    acrossTableDrag: {
      type: Boolean,
      default: false
    },
    // 是否跨表格拖拽

    // 虚拟滚动相关
    itemHeight: Number,
    virtual: {
      type: Boolean,
      default: false
    },
    virtualCount: {
      type: Number,
      default: 60
    },
    listKey: {
      type: String,
      default: 'currentData'
    },
    // 样式相关
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
    defaultColumnWidth: [String, Number],
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

    rowStyle: Function,
    // 设置行背景色

    useMask: {
      type: Boolean,
      default: true
    },
    subForm: Boolean,
    // 是否是子表单

    nativeScroll: {
      type: Boolean,
      default: false
    },
    // 是否使用原生滚动条
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 懒加载
    bufferSize: {
      type: Number,
      default: 10
    },
    prevIcon: {
      type: String
    },
    nextIcon: {
      type: String
    },
    selectDropdownIcon: {
      type: String
    },
    footerCalcType: {
      type: String,
      default: 'sum'
    },
    footerCalcText: {
      type: String,
      default() {
        return this.$tt('footerCalc');
      }
    },
    footerCalcShow: {
      type: Boolean,
      default: false
    },
    footerCalcFormater: Function
  },
  data() {
    return {
      columnVMs: [],
      tableWidth: undefined,
      bodyHeight: undefined,
      // currentData: this.data && Array.from(this.data),
      currentDataSource: undefined,
      currentLoading: this.loading || false,
      currentError: this.error,
      currentEmpty: false,
      currentSorting: this.sorting,
      tableMetaList: [{
        position: 'static'
      }],
      scrollXStart: true,
      scrollXEnd: true,
      /* Selection Data */
      selectedItem: undefined,
      currentValues: this.values || [],
      tableHeight: undefined,
      exportData: undefined,
      checkedItems: {},
      // 暂存选中行
      stickingHead: false,
      stickingHeadHeight: 0,
      stickingHeadTop: 0,
      useStickyFixed: this.stickFixed,
      fixedLeftList: [],
      fixedRightList: [],
      dragState: {
        dragging: false,
        source: {}
      },
      dropData: undefined,
      rowDraggable: false,
      handlerDraggable: false,
      hasScroll: false,
      // 作为下拉加载是否展示"没有更多"的依据。第一页不满，没有滚动条的情况下，不展示
      configColumnVM: undefined,
      dynamicColumnVMs: [],
      // 用于记录动态列
      dynamicColumnVMsMap: {},
      // 用于记录动态列
      columnGroupVMs: {},
      // 用于记录分组列
      slots: this.$slots,
      autoColSpan: [],
      // 用于记录自动的的列合并
      autoRowSpan: [],
      // 用于记录自动的的行合并
      columnVMsMap: {},
      tableHeadTrArr: [],
      currentPageSize: undefined,
      rootWidth: undefined,
      exportFooterData: undefined
    };
  },
  provide() {
    return {
      toggleExpanded: this.toggleExpanded,
      debouncedLoad: this.debouncedLoad,
      sort: this.sort,
      filter: this.filter,
      checkAll: this.checkAll,
      onClickRow: this.onClickRow,
      onDblclickRow: this.onDblclickRow,
      check: this.check,
      toggleTreeExpanded: this.toggleTreeExpanded,
      select: this.select,
      onDragStart: this.onDragStart,
      onDragOver: this.onDragOver,
      onDrop: this.onDrop,
      onDragEnd: this.onDragEnd,
      isDragging: this.isDragging,
      getItemColSpan: this.getItemColSpan,
      getItemRowSpan: this.getItemRowSpan,
      getTableContentElem: this.getTableContentElem,
      filterMultiple: this.filterMultiple,
      filterMax: this.filterMax
    };
  },
  computed: {
    currentData() {
      if (this.exportData) return this.exportData;
      let data = this.currentDataSource ? this.currentDataSource.viewData.filter(item => !!item) : this.currentDataSource;
      if (this.treeDisplay && data) {
        this.currentDataSource.rawTreeDisplayOnlyForNotice = true;
        data = this.processTreeData(data);
      }
      return data;
    },
    visibleColumnVMs() {
      if (this.$env.VUE_APP_DESIGNER) {
        return this.columnVMs;
      }
      return this.columnVMs.filter(columnVM => columnVM && !columnVM.currentHidden);
    },
    visibleTableHeadTrArr() {
      if (this.$env.VUE_APP_DESIGNER) {
        return this.tableHeadTrArr;
      }
      const result = [];
      this.tableHeadTrArr.forEach((headTr, index) => {
        result[index] = headTr.filter(columnVM => columnVM && !columnVM.currentHidden);
      });
      return result;
    },
    paging() {
      if (this.usePagination) {
        const paging = {};
        let currentPageSize = this.currentPageSize !== undefined ? this.currentPageSize : this.pageSize;
        currentPageSize = currentPageSize === '' ? 50 : currentPageSize;
        paging.size = currentPageSize;
        paging.number = this.pageNumber !== undefined ? this.pageNumber : 1;
        return paging;
      } else return undefined;
    },
    usePagination() {
      if (typeof this.pagination === 'undefined') {
        return this.pageable === true || this.pageable === 'pagination';
      }
      return !!this.pagination;
    },
    hasGroupedColumn() {
      return !!Object.keys(this.columnGroupVMs).length;
    },
    isDesignerSubForm() {
      return this.$env.VUE_APP_DESIGNER && this.subForm;
    },
    currentFooterData() {
      if (this.exportFooterData) {
        return this.exportFooterData;
      }
      return this.currentData;
    }
  },
  watch: {
    data(data) {
      this.handleData();
    },
    dataSource(dataSource, oldDataSource) {
      if (typeof dataSource === 'function' && String(dataSource) === String(oldDataSource)) return;

      // 拖拽树数据改变的时候，会进入这里的watch，数据会不一致，所以阻止进入
      if (this.preventDatasourceWatch) {
        return;
      }
      this.handleData();
    },
    currentData(currentData, oldCurrentData) {
      if (currentData !== oldCurrentData || this.currentDataSource.isSimpleItem) {
        this.selectedItem = undefined;
      }
      this.watchValue(this.value);
      this.watchValues(this.values);
    },
    loading(loading) {
      if (this.$env.VUE_APP_DESIGNER && this.designerMode !== 'success') return;
      this.currentLoading = loading;
      this.reHandleResize();
    },
    error(error) {
      if (this.$env.VUE_APP_DESIGNER && this.designerMode !== 'success') return;
      this.currentError = error;
      this.reHandleResize();
    },
    sorting: {
      deep: true,
      handler(sorting, oldSorting) {
        if (sorting.field === oldSorting.field && sorting.order === oldSorting.order) return;
        this.sort(sorting.field, sorting.order, sorting.compare);
      }
    },
    'currentDataSource.sorting'(sorting) {
      this.currentSorting = sorting;
    },
    filtering: {
      deep: true,
      handler(filtering, oldFiltering) {
        this.filter(filtering);
      }
    },
    /* Selection Watchers */
    value(value) {
      this.watchValue(value);
    },
    selectedItem(item, oldItem) {
      const value = item ? this.$at2(item, this.valueField) : undefined;
      const oldValue = oldItem ? this.$at2(oldItem, this.valueField) : undefined;
      if (value === oldValue) return;
      this.$emit('change', {
        value,
        oldValue,
        item,
        oldItem
      }, this);
      this.currentData.forEach(itemTemp => {
        const valueTemp = this.$at(itemTemp, this.getValueField());
        if (!itemTemp.hasOwnProperty('radioChecked')) {
          this.$set(itemTemp, 'radioChecked', false);
        }
        if (valueTemp === value) {
          this.$set(itemTemp, 'radioChecked', true);
        } else {
          this.$set(itemTemp, 'radioChecked', false);
        }
      });
    },
    values(values) {
      this.$nextTick(() => {
        this.watchValues(values);
        this.$forceUpdate();
      });
    },
    currentValues(values, oldValues) {
      const checkedItems = this.getCheckedItems();
      this.$emit('change', {
        values,
        oldValues,
        items: checkedItems
      });
    },
    columnVMs(columnVMs) {
      this.$nextTick(() => {
        this.$refs.th && this.$refs.th.forEach((thEl, index) => {
          thEl.__vue__ = columnVMs[index];
        });
      });
      if (this.configColumnVM) {
        this.configColumnVM.handleColumnsData();
      }
    },
    visibleColumnVMs() {
      this.reHandleResize();
    },
    stickFixed(value) {
      this.useStickyFixed = value;
    },
    designerMode: {
      handler(designerMode) {
        if (!this.$env.VUE_APP_DESIGNER) return;
        switch (designerMode) {
          case 'loading':
            this.currentLoading = true;
            this.currentError = false;
            this.currentEmpty = false;
            break;
          case 'error':
            this.currentLoading = false;
            this.currentError = true;
            this.currentEmpty = false;
            break;
          case 'empty':
            this.currentLoading = false;
            this.currentError = false;
            this.currentEmpty = true;
            break;
          default:
            this.currentLoading = this.loading;
            this.currentError = this.error;
            this.currentEmpty = false;
        }
        this.reHandleResize();
      },
      immediate: true
    },
    configurable() {
      if (this.configColumnVM) {
        this.configColumnVM.handleColumnsData();
      }
    },
    draggable() {
      this.processTableDraggable(true);
    },
    acrossTableDrag() {
      this.processTableDraggable(true);
    },
    pageSize() {
      this.currentPageSize = undefined;
    },
    paging: {
      handler(value) {
        if (value && this.currentDataSource && !this.currentDataSource.paging) {
          this.currentDataSource.paging = value;
        }
        if (this.currentDataSource && this.currentDataSource.paging && value) {
          if (this.currentDataSource.paging.number !== value.number || this.currentDataSource.paging.size !== value.size) this.page(value.number, value.size);
        }
      },
      deep: true
    }
  },
  created() {
    this.$on('handle-columns', this.handleColumns);
    // 自动补充 pageSizeOptions
    if (this.pageSizeOptions && !this.pageSizeOptions.includes(this.pageSize)) {
      for (let i = 0; i < this.pageSizeOptions.length; i++) {
        if (this.pageSizeOptions[i] > this.pageSize) {
          this.pageSizeOptions.splice(i, 0, this.pageSize);
          break;
        }
      }
    }
    // @TODO: this.pageNumber
    // this.$watch('pageNumber', (number) => {
    //     if (this.currentDataSource && this.currentDataSource.paging.number !== number)
    //         this.page(number);
    // });

    this.debouncedLoad = debounce(this.load, 300);
    this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data);
    if (this.pageNumber && this.usePagination) {
      this.initialLoad && this.page(this.pageNumber);
    } else {
      this.initialLoad && this.load();
    }
    this.throttledDragover = throttle(this.handleDragOver, 50, {
      leading: false,
      trailing: true
    });
    this.throttleScrollParentScroll = throttle(this.onScrollParentScroll, 50, {
      leading: false,
      trailing: true
    });
    this.throttleXScrollParentScroll = throttle(this.onXScrollParentScroll, 50, {
      leading: false,
      trailing: true
    });
    this.throttleHandleResizeListener = throttle(this.handleResizeListener, 50, {
      leading: true,
      trailing: true
    });
  },
  updated() {
    if (this.$env.VUE_APP_DESIGNER && this.slots !== this.$slots && !this.data && !this.dataSource) {
      this.slots = this.$slots;
      this.$forceUpdate();
    }
  },
  mounted() {
    if (this.data) this.processData(this.data);
    this.watchCurrentData();
    this.watchValue(this.value);
    this.watchValues(this.values);
    this.reHandleResize();
    addResizeListener(this.$el, this.throttleHandleResizeListener);
    if (this.stickHead) {
      this.scrollParentEl = findScrollParent(this.$el);
      this.scrollParentEl && this.scrollParentEl.addEventListener('scroll', this.throttleScrollParentScroll);
      if (this.syncStickHeadXScroll) {
        this.xScrollParentEl = findXScrollParent(this.$el);
        this.xScrollParentEl && this.xScrollParentEl.addEventListener('scroll', this.throttleXScrollParentScroll);
      }
    }
  },
  destroyed() {
    removeResizeListener(this.$el, this.throttleHandleResizeListener);
    if (this.stickHead) {
      this.scrollParentEl && this.scrollParentEl.removeEventListener('scroll', this.throttleScrollParentScroll);
      this.xScrollParentEl && this.xScrollParentEl.removeEventListener('scroll', this.throttleXScrollParentScroll);
    }
    this.clearTimeout();
    this.enterTarget = null;
  },
  methods: {
    clearTimeout() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    getTableContentElem() {
      return this.$el;
    },
    processData(data) {
      const selectable = this.visibleColumnVMs.some(columnVM => columnVM.type === 'radio');
      const checkable = this.visibleColumnVMs.some(columnVM => columnVM.type === 'checkbox');
      const expandable = this.visibleColumnVMs.some(columnVM => columnVM.type === 'expander');
      const editable = this.visibleColumnVMs.some(columnVM => columnVM.type === 'editable');
      // 拖拽设置
      this.processTableDraggable();
      if (selectable || this.selectable) {
        // 2978760771550464，选中行后分页需要点两次才能切换
        data.forEach(item => {
          if (!item.hasOwnProperty('disabled')) this.$set(item, 'disabled', false);
          if (!item.hasOwnProperty('radioChecked') || this.selectedItem === undefined)
            // 3003406551646208 数据表格单选值不会同步取消
            this.$set(item, 'radioChecked', false);
        });
      }
      if (checkable) {
        data.forEach(item => {
          if (!item.hasOwnProperty('checked')) this.$set(item, 'checked', false);
          if (!item.hasOwnProperty('disabled')) this.$set(item, 'disabled', false);
        });
      }
      if (expandable) {
        data.forEach(item => {
          if (!item.hasOwnProperty('expanded')) this.$set(item, 'expanded', false);
        });
      }
      if (editable) {
        data.forEach(item => {
          if (!item.hasOwnProperty('editing')) this.$set(item, 'editing', '');
        });
      }
      if (this.draggable || this.acrossTableDrag) {
        data.forEach(item => {
          this.canDraggable(item);
        });
      }
      // fix: 2864106089210368 树型分页无效，多次点击才生效
      if (this.treeDisplay) {
        data.forEach(item => {
          if (!item.hasOwnProperty('display')) this.$set(item, 'display', '');
          if (!item.hasOwnProperty('loading')) this.$set(item, 'loading', false);
          if (!item.hasOwnProperty('tableTreeItemLevel')) this.$set(item, 'tableTreeItemLevel', 0);
          if (!item.hasOwnProperty('treeExpanded')) this.$set(item, 'treeExpanded', false);
        });
      }
      return data;
    },
    handleData() {
      if (typeof this.data === 'function' || this.data instanceof Object && !Array.isArray(this.data)) throw new Error(`[cloud-ui] Don't assign a function or object to 'data' prop. Try to use 'data-source' prop.`);
      this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data);
      // fix 2637418667735552 添加编辑行时已经添加的下拉框还是会重新load数据
      // 原因：list添加了一项，进入了dataSource的watch，该函数会进来，调用了load方法，会设置loading状态，导致表格重新渲染
      this.initialLoad && typeof this.dataSource === 'function' && this.load();
      this.reHandleResize();
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
    getExtraParams() {
      return this.extraParams;
    },
    getDataSourceOptions() {
      const options = {
        viewMode: this.pageable === 'load-more' || this.pageable === 'auto-more' ? 'more' : 'page',
        paging: this.paging,
        sorting: this.currentSorting,
        filtering: this.filtering,
        remotePaging: this.remotePaging,
        remoteSorting: this.remoteSorting,
        remoteFiltering: this.remoteFiltering,
        getExtraParams: this.getExtraParams,
        process: this.processData,
        filterMultiple: this.filterMultiple,
        useCache: this.usePagination ? false : true // fix：2879747503294464 大数据分页使用cache性能问题
      };
      if (this.treeDisplay && this.valueField && this.parentField && this.childrenField) {
        options.treeDisplay = {
          valueField: this.valueField,
          parentField: this.parentField,
          childrenField: this.childrenField
        };
      }
      return options;
    },
    normalizeDataSource(dataSource) {
      if (this.isDesignerSubForm) dataSource = [{}]; // IDE中的子表单只渲染一行数据
      const options = this.getDataSourceOptions();
      const isNew = typeof this.pagination !== 'undefined';
      const Constructor = isNew ? DataSourceNew : DataSource;
      if (dataSource instanceof DataSource || dataSource instanceof DataSourceNew) return dataSource;else if (dataSource instanceof Array) {
        options.data = Array.from(dataSource);
        // 使用了新的分页, 数组肯定不是后端数据
        if (isNew) {
          options.remotePaging = false;
          options.remoteSorting = options.remotePaging;
        }
        return new Constructor({
          ...options,
          tag: 'u-table-view'
        });
      } else if (dataSource instanceof Function) {
        const self = this;
        options.load = function load(params, extraParams) {
          self.$emitSyncParams(params);
          const result = dataSource(params, extraParams);
          if (result instanceof Promise) return result;else if (result instanceof Array) return Promise.resolve(result);else return Promise.resolve(result);
        };
        // 使用了新的分页, 函数类型先当做后端数据
        if (isNew) {
          // 树形展示且配置了父节点时只能前端分页
          options.remotePaging = this.treeDisplay && this.parentField ? false : !!this.pagination;
          options.remoteSorting = !!options.remotePaging;
        }
        return new Constructor({
          ...options,
          tag: 'u-table-view'
        });
      } else if (dataSource instanceof Object) {
        if (dataSource.hasOwnProperty('list') && Array.isArray(dataSource.list)) return new Constructor(Object.assign({
          tag: 'u-table-view'
        }, options, dataSource, {
          data: dataSource.list
        }));
        return new Constructor(Object.assign({
          tag: 'u-table-view'
        }, options, dataSource));
      } else return dataSource;
    },
    handleResize(reComputedWidth = true) {
      if (this.resizeBodyHeight) {
        this.bodyHeight = undefined;
      }
      this.clearTimeout();
      this.timer = setTimeout(() => {
        this.timer = undefined;

        // 当最外层加了border后，会导致内部的宽度大于tablewrap的宽度，会出滚动条：Bug-2792431057259520
        // 3088409490416384：用样式设置了tablewrap的border，使用offsetWith会使外部的宽度一直往上加2px, 用clientWidth，不包含border宽度
        let rootWidth = this.$el.clientWidth;
        const tablewrapWidth = this.$refs.tableRender && this.$refs.tableRender.getRefs().tablewrap && this.$refs.tableRender.getRefs().tablewrap.clientWidth;
        if (tablewrapWidth) {
          rootWidth = tablewrapWidth;
        }
        if (!rootWidth) {
          // 初始表格隐藏时，上面的值为0，需要特殊处理
          let parentEl = this.$el && this.$el.parentElement;
          while (parentEl && !parentEl.offsetWidth) parentEl = parentEl.parentElement;
          rootWidth = parentEl ? parentEl.offsetWidth : 0;
        }
        this.rootWidth = rootWidth;

        // 重新计算列宽等，会导致表格重新渲染，如果组件因为重新渲染而加载，会导致宽高变化，导致handleResize再次触发
        // 如果是监听Resize事件进来的，如果reComputedWidth是false，就不要重复计算
        if (reComputedWidth) {
          this.preRootWidth = rootWidth;
          // 分别获取有百分比、具体数值和无 width 的列
          const percentColumnVMs = [];
          const valueColumnVMs = [];
          const noWidthColumnVMs = []; // 统计固定列的数量
          let fixedLeftCount = 0;
          let fixedRightCount = 0;
          let lastIsFixed = false;
          let defaultColumnWidth = this.defaultColumnWidth;
          if (String(defaultColumnWidth).endsWith('%')) {
            defaultColumnWidth = parseFloat(defaultColumnWidth) * rootWidth / 100;
          } else if (defaultColumnWidth) {
            defaultColumnWidth = parseFloat(defaultColumnWidth);
            defaultColumnWidth = isNaN(defaultColumnWidth) ? 0 : defaultColumnWidth;
          }
          defaultColumnWidth = parseFloat(defaultColumnWidth || 0);
          this.visibleColumnVMs.forEach((columnVM, index) => {
            if (!columnVM.currentWidth) {
              noWidthColumnVMs.push(columnVM);
            } else if (String(columnVM.currentWidth).endsWith('%')) percentColumnVMs.push(columnVM);else valueColumnVMs.push(columnVM);
            // 当右侧有fixed，到当前列的时候却是非fixed，fixedRightCount置为0
            if (fixedRightCount && !columnVM.fixed) {
              fixedRightCount = 0;
            }
            if (columnVM.fixed) {
              if (index === 0) fixedLeftCount = 1;else if (fixedLeftCount === index && lastIsFixed) fixedLeftCount++;else if (!lastIsFixed) {
                fixedRightCount = 1;
              } else fixedRightCount++;
            }
            lastIsFixed = columnVM.fixed;
          });

          // 全部都是百分数的情况，按比例缩小
          if (percentColumnVMs.length === this.visibleColumnVMs.length) {
            const sumWidth = percentColumnVMs.reduce((prev, columnVM) => prev + parseFloat(columnVM.currentWidth), 0);
            if (sumWidth !== 100) {
              percentColumnVMs.forEach(columnVM => {
                columnVM.currentWidth = parseFloat(columnVM.currentWidth) / sumWidth * 100 + '%';
              });
            }
          }

          // 全部都是数值的情况，按实际大小
          const percentWidthSum = percentColumnVMs.reduce((prev, columnVM) => {
            columnVM.computedWidth = parseFloat(columnVM.currentWidth) * rootWidth / 100;
            return prev + columnVM.computedWidth;
          }, 0);
          const valueWidthSum = valueColumnVMs.reduce((prev, columnVM) => {
            columnVM.computedWidth = parseFloat(columnVM.currentWidth);
            return prev + columnVM.computedWidth;
          }, 0);
          const remainingWidth = rootWidth - percentWidthSum - valueWidthSum;
          if (remainingWidth > 0 && noWidthColumnVMs.length) {
            const averageWidth = remainingWidth / noWidthColumnVMs.length;
            const finalWidth = averageWidth > defaultColumnWidth ? averageWidth : defaultColumnWidth;
            noWidthColumnVMs.forEach(columnVM => columnVM.computedWidth = finalWidth);
          } else if (remainingWidth > 0 && valueWidthSum !== 0) {
            const averageWidth = remainingWidth / valueColumnVMs.length;
            valueColumnVMs.forEach(columnVM => columnVM.computedWidth = columnVM.computedWidth + averageWidth);
          } else if (remainingWidth < 0 && noWidthColumnVMs.length) {
            noWidthColumnVMs.forEach(columnVM => columnVM.computedWidth = defaultColumnWidth || 100);
          } else if (remainingWidth === 0 && noWidthColumnVMs.length && defaultColumnWidth) {
            noWidthColumnVMs.forEach(columnVM => columnVM.computedWidth = defaultColumnWidth);
          }

          // 如果所有列均有值，则总宽度有超出的可能。否则总宽度为根节点的宽度。
          let tableWidth = '';
          if (this.visibleColumnVMs.some(columnVM => columnVM.currentWidth) || defaultColumnWidth) {
            tableWidth = this.visibleColumnVMs.reduce((prev, columnVM) => {
              if (String(columnVM.currentWidth).endsWith('%')) return prev + parseFloat(columnVM.currentWidth) * rootWidth / 100;else return prev + parseFloat(columnVM.computedWidth);
            }, 0);
            this.tableWidth = tableWidth;
          } else this.tableWidth = tableWidth = rootWidth; // @important: Work with overflow-x: hidden to prevent two horizontal scrollbar

          const tableMetaList = [this.tableMetaList[0]];
          tableMetaList[0].width = rootWidth;
          if (!this.useStickyFixed) {
            if (fixedLeftCount) {
              tableMetaList.push({
                position: 'left',
                width: this.visibleColumnVMs.slice(0, fixedLeftCount).reduce((prev, columnVM) => prev + columnVM.computedWidth, 0)
              });
            }
            if (fixedRightCount && tableWidth > rootWidth) {
              // 表格太短时，不固定右侧列
              tableMetaList.push({
                position: 'right',
                width: this.visibleColumnVMs.slice(-fixedRightCount).reduce((prev, columnVM) => prev + columnVM.computedWidth, 0)
              });
            }
            this.tableMetaList = tableMetaList;
          } else {
            this.fixedLeftList = [];
            this.fixedRightList = [];
            if (fixedLeftCount) {
              this.visibleColumnVMs.slice(0, fixedLeftCount).reduce((prev, columnVM) => {
                this.fixedLeftList.push({
                  columnVM,
                  left: prev
                });
                this.setColumnVMsMap(columnVM._uid, {
                  left: prev
                });
                return prev + columnVM.computedWidth;
              }, 0);
            }
            if (fixedRightCount && tableWidth > rootWidth) {
              // 表格太短时，不固定右侧列
              const visibleColumnVMs = this.visibleColumnVMs.slice(-fixedRightCount);
              visibleColumnVMs.reverse().reduce((prev, columnVM) => {
                this.fixedRightList.push({
                  columnVM,
                  right: prev
                });
                this.setColumnVMsMap(columnVM._uid, {
                  right: prev
                });
                return prev + columnVM.computedWidth;
              }, 0);
            }
          }
        }

        /**
         * 根节点高度优先，头部固定，计算身体高度
         */
        if (this.$el.style.height !== '' && this.$el.style.height !== 'auto' || this.$el.style.maxHeight !== '' && this.$el.style.maxHeight !== 'auto') {
          const rootHeight = this.$el.offsetHeight;
          if (rootHeight) {
            // 如果使用 v-show 隐藏了，无法计算
            const titleHeight = this.$refs.title ? this.$refs.title.offsetHeight : 0;
            const headEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().head;
            const headHeight = headEl ? headEl.offsetHeight : 0;
            const paginationHeight = this.getPaginationHeight();
            const footerHeight = this.$refs.footerRender ? this.$refs.footerRender.$el.offsetHeight : 0;
            this.bodyHeight = rootHeight - titleHeight - headHeight - paginationHeight - footerHeight;
          }
        } else {
          this.bodyHeight = undefined;
        }

        // 当 root 设置了 height，设置 table 的 height，避免隐藏列时的闪烁
        if (this.$el.style.height !== '' && this.$el.style.height !== 'auto') {
          const paginationHeight = this.getPaginationHeight();
          const footerHeight = this.$refs.footerRender ? this.$refs.footerRender.$el.offsetHeight : 0;
          this.tableHeight = this.$el.offsetHeight - paginationHeight - footerHeight;
        } else {
          this.tableHeight = undefined;
        }
        this.$emit('resize', undefined, this);
        this.$nextTick(() => {
          this.$refs.tableRender && this.$refs.tableRender.getRefs().scrollView && this.$refs.tableRender.getRefs().scrollView.handleResize();
        });
      });
    },
    syncHeadScroll() {
      // this.$refs.head[0].scrollLeft = this.$refs.head[0].parentElement.scrollLeft;
      const headEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().head;
      if (this.xScrollParentEl && this.stickingHead && headEl && headEl.childNodes[0]) {
        const xScrollParentEl = this.xScrollParentEl;
        headEl.childNodes[0].style.marginLeft = '-' + xScrollParentEl.scrollLeft + 'px';
        headEl.style.width = xScrollParentEl.offsetWidth + 'px';
      }
    },
    onScrollParentScroll(e) {
      const rect = getRect(this.$el);
      const bodyEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().body;
      if (!bodyEl) return;
      const bodyRect = getRect(bodyEl);
      const parentRect = this.scrollParentEl === window ? {
        top: 0,
        bottom: window.innerHeight
      } : getRect(this.scrollParentEl);
      const headEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().head;
      const headHeight = headEl && headEl.offsetHeight || 0;
      parentRect.top += this.stickHeadOffset;
      bodyRect.bottom -= headHeight;
      this.stickingHead = rect.top < parentRect.top && bodyRect.bottom > parentRect.top;
      // this.stickingHeadTop = parentRect.top;
      // this.stickingHeadHeight = headHeight;

      const stickingHead = rect.top < parentRect.top && bodyRect.bottom > parentRect.top;
      const stickingHeadTop = parentRect.top;
      const stickingHeadHeight = headHeight;
      const stickheadEl = headEl;
      const headPlaceholderEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().headPlaceholder;
      if (stickheadEl) {
        if (stickingHead) {
          stickheadEl.setAttribute('stickingHead', true);
          stickheadEl.style.width = this.$el.offsetWidth + 'px';
          headPlaceholderEl.style.height = stickingHeadHeight + 'px';
        } else {
          stickheadEl.removeAttribute('stickingHead');
          stickheadEl.style.width = '';
          if (stickheadEl.childNodes[0]) {
            stickheadEl.childNodes[0].style.marginLeft = '';
          }
          headPlaceholderEl.style.height = '';
        }
        stickheadEl.style.top = stickingHeadTop + 'px';
        // fix：滚动条在最右边时，置顶时表头会有偏移
        const scorllViewEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().scrollView;
        stickheadEl.scrollLeft = scorllViewEl && scorllViewEl.$refs.wrap.scrollLeft;
        if (this.syncStickHeadXScroll) {
          this.syncHeadScroll();
        }
      }
    },
    load(more, paging = {}) {
      const dataSource = this.currentDataSource;
      if (!dataSource) return;
      if (this.$emitPrevent('before-load', undefined, this)) return;
      const autoStatus = this.loading === undefined && !(this.$env.VUE_APP_DESIGNER && this.designerMode !== 'success');
      if (autoStatus) {
        this.currentLoading = true;
        this.currentError = false;
      }
      dataSource[more ? 'loadMore' : 'load'](paging.offset, paging.limit, paging.number).then(data => {
        // 防止同步数据使页面抖动
        // setTimeout(() => this.currentData = data);
        if (autoStatus) {
          this.currentLoading = false;
        }
        if (this.usePagination) {
          if (this.currentDataSource.paging && this.currentDataSource.paging.number > this.currentDataSource.totalPage) {
            this.currentDataSource.paging.number = 1; // 会触发page onchange事件
            // this.page(1); // 数据发生变更时，回归到第 1 页
          }
        } // auto-more 状态的 resize 会频闪。
        this.pageable !== 'auto-more' && this.reHandleResize();
        this.$emit('load', undefined, this);
        return data;
      }).catch(e => {
        if (autoStatus) {
          this.currentLoading = false;
          this.currentError = true;
        }
      });
    },
    reload() {
      if (this.dynamicColumnVMs.length) {
        this.dynamicColumnVMs.forEach(vm => vm.reload());
      }
      if (!this.currentDataSource._load || typeof this.currentDataSource._load !== 'function') return;
      this.currentDataSource.clearLocalData();
      this.clearDragState();
      this.load();
    },
    getFields() {
      return this.visibleColumnVMs.map(item => item.field).filter(item => !!item).join(',');
    },
    async exportExcel(page = 1, size = 2000, filename, sort, order, excludeColumns = [], includeStyles = false) {
      if (this.currentDataSource.sorting && this.currentDataSource.sorting.field) {
        const {
          sorting
        } = this.currentDataSource;
        sort = sort || sorting.field;
        order = order || sorting.order;
      }
      if (typeof page !== 'number') {
        page = 1;
      }
      if (typeof size !== 'number') {
        size = 2000;
      }
      if (!(typeof page === 'number' && page > 0)) {
        this.$toast.show('页数page必须大于0');
        return;
      }
      if (!(typeof size === 'number' && size > 0 && size <= 200000)) {
        this.$toast.show('数据条数size必须在1-200000之间');
        return;
      }
      const fn = event => {
        event.stopPropagation();
        event.preventDefault();
      };
      document.addEventListener('click', fn, true);
      document.addEventListener('keydown', fn, true);
      // 空值和boolean值时到处默认文件名
      if (!filename || filename === true) {
        filename = document.title.split(' ').shift() || 'Export';
        filename += format(new Date(), '_YYYYMMDD_HHmmss');
      }
      try {
        const hasHeader = !!this.$el.querySelector('[position=static] thead tr');
        let content = [];
        let mergesMap = [];
        let headerRowCount = 0;
        if (!this.currentDataSource._load) {
          const result = await this.getRenderResult(this.currentDataSource.data, excludeColumns, hasHeader, includeStyles);
          content = result[0];
          mergesMap = result[1];
          headerRowCount = result[2];
        } else {
          // console.time('加载数据');
          let res = await this.currentDataSource._load({
            page,
            size,
            filename,
            sort,
            order
          });
          // console.timeEnd('加载数据');
          if (res instanceof Object) {
            if (res.hasOwnProperty('list')) res = res.list;else if (res.hasOwnProperty('content')) res = res.content;else if (res.hasOwnProperty('data')) res = res.data;
          }
          if (!(res instanceof Array)) {
            this.$toast.show('数据格式不是数组');
            return;
          }
          const result = await this.getRenderResult(res, excludeColumns, hasHeader, includeStyles);
          content = result[0];
          mergesMap = result[1];
          headerRowCount = result[2];
        }

        //处理分页衔接处数据合并
        const pageSize = this.pageSize;
        const count = parseInt(content.length / pageSize);
        // 3084107844783616：有列不需要导出时，列对应需要修正
        const hasAutoRowSpan = this.visibleColumnVMs.some(vm => vm.autoRowSpan);
        if (hasAutoRowSpan) {
          // 如果列有自动合并
          for (let i = 1; i <= count; i++) {
            const rowIndex = i * pageSize + headerRowCount - 1;
            // 当前页最后一行
            const itemData = content[rowIndex];
            if (!itemData) {
              break;
            }
            // 下一页第一行
            const itemData1 = content[rowIndex + 1];
            if (!itemData1) {
              break;
            }
            // 循环列
            for (let j = 0; j < itemData1.length; j++) {
              if (itemData1[j].assistData) {
                // 往上查找有assistData数据的那一行数据
                let tempRowIndex = rowIndex;
                let itemDataData = itemData;
                let assistDataItem = itemDataData[j];
                while (assistDataItem && !assistDataItem.assistData && tempRowIndex > 0) {
                  itemDataData = content[tempRowIndex];
                  assistDataItem = itemDataData[j];
                  tempRowIndex--;
                }
                if (!itemDataData || !itemDataData[j] || !itemDataData[j].assistData) {
                  // 没有assistData的表格不是自动合并列，不需要处理
                  continue;
                }
                // 3020499352090112，自动合并的值字段和列展示的数据不是同一个，数据相同，列字段的值不同，不需要合并
                if (itemDataData && itemDataData[j] && itemDataData[j].assistData && itemData1[j].assistData && itemDataData[j].assistData.currentValue !== itemData1[j].assistData.currentValue) {
                  continue;
                }
                // 当前页最后
                const mergsMapItem = mergesMap.find(item => item.row + item.rowspan - 1 === rowIndex && item.col === j);
                // 当前页有合并的数据
                if (mergsMapItem) {
                  // 下一页第一行和下面的行有合并数据
                  const mergsMapItem1Index = mergesMap.findIndex(item => item.row === rowIndex + 1 && item.col === j);
                  if (mergsMapItem1Index !== -1) {
                    // 下一页第一行和下面的行有合并数据
                    mergsMapItem.rowspan += mergesMap[mergsMapItem1Index].rowspan;
                    mergesMap.splice(mergsMapItem1Index, 1);
                  } else {
                    // 下一页第一行和下面的行没有合并数据
                    mergsMapItem.rowspan += 1;
                  }
                  // 下一页第一行的数据赋值给当前页最后一行
                  itemData1[j] = Object.assign({}, itemData[j]);
                } else {
                  // 只有最后一行和下一页第一行和下面的行有合并数据
                  const mergsMapItem1Index = mergesMap.findIndex(item => item.row === rowIndex + 1 && item.col === j);
                  if (mergsMapItem1Index !== -1) {
                    mergesMap[mergsMapItem1Index].row -= 1;
                    mergesMap[mergsMapItem1Index].rowspan += 1;
                    const itemData2 = content[rowIndex + 2];
                    if (itemData2) {
                      itemData1[j] = Object.assign({}, itemData2[j]);
                    }
                  } else {
                    // 只有最后一行和第一行需要合并
                    if (itemData[j] && itemData1[j] && itemData[j].v === itemData1[j].v) {
                      mergesMap.push({
                        col: j,
                        row: rowIndex,
                        rowspan: 2,
                        colspan: 1
                      });
                      itemData1[j].v = '';
                    }
                  }
                }
              }
            }
          }
        }

        // console.time('生成文件');
        const sheetTitle = this.title || undefined;
        const sheetTitleData = {
          title: sheetTitle
        };
        if (sheetTitle && includeStyles) {
          const titleNode = this.$el.querySelector('[class^="u-table-view_title__"]');
          if (titleNode) {
            const style = getXslxStyle(titleNode);
            sheetTitleData.s = style.s;
            sheetTitleData.rect = style.rect;
          }
        }
        xlsxUtils.exportExcel(content, 'Sheet1', filename, sheetTitleData, (content[0] || []).length, hasHeader, mergesMap, includeStyles);
        // console.timeEnd('生成文件');
      } catch (err) {
        console.error(err);
      }
      await new Promise(res => {
        setTimeout(res);
      });
      document.removeEventListener('click', fn, true);
      document.removeEventListener('keydown', fn, true);
    },
    async getRenderResult(arr = [], excludeColumns = [], hasHeader = true, includeStyles = false) {
      let mergesMap = [];
      if (arr.length === 0) {
        if (!hasHeader) return [];
      }
      const titleColIndexRelations = [];
      let headRows = [];
      const headRef = this.$refs.tableRender && this.$refs.tableRender.getRefs().head;
      const headEl = headRef && headRef.querySelector('thead');
      if (headEl) {
        headRows = Array.from(headEl.childNodes).filter(tr => tr.nodeName === 'TR');
      }
      const helper = createTableHeaderExportHelper(headRows.length);
      headRows.map((tr, rowIndex) => Array.from(tr.childNodes).map((node, colIndex, currentArr) => {
        if (node.nodeName === 'TH') {
          const rowspan = parseInt(node.getAttribute('rowspan')) || 1;
          const colspan = parseInt(node.getAttribute('colspan')) || 1;
          let title = '';

          // 如果列表里是输入框，拿框里的结果填入excel
          const inputElement = node.getElementsByTagName('input');
          const placeholderElement = Array.from(node.getElementsByTagName('span')).filter(item => item.className.includes('u-select_placeholder'));
          if (inputElement.length !== 0) {
            title = inputElement[0].value;
          } else {
            // 下拉框未选则时，placeholder内容不显示
            if (placeholderElement.length !== 0 && placeholderElement[0].innerText === node.innerText) {
              title = '';
            } else {
              title = node.innerText;
            }
          }
          const data = {
            v: title
          };
          if (includeStyles) {
            const style = getXslxStyle(node);
            Object.assign(data, {
              s: style.s,
              rect: style.rect
            });
          }
          const cols = helper.setCell(data, colIndex + 1 === currentArr.length, rowspan, colspan);
          const realColIndex = cols[0];
          if (rowspan !== 1 || colspan !== 1) {
            mergesMap.push({
              col: realColIndex,
              row: rowIndex,
              rowspan,
              colspan
            });
          }
          titleColIndexRelations.push([title, cols]);
          return data;
        } else {
          return null;
        }
      }));
      // console.time('渲染数据');
      let res = helper.eject();
      const startIndexes = [];
      for (let i = 0; i < this.visibleColumnVMs.length; i++) {
        const vm = this.visibleColumnVMs[i];
        if (vm.type === 'index') startIndexes[i] = +vm.startIndex;
      }

      // this.currentDataSource.paging.size 会受可分页选项影响，直接改成pageSize
      const page = this.pageSize;
      const headerRowCount = res.length;
      for (let i = 0; i < arr.length; i += page) {
        this.exportData = arr.slice(i, i + page);
        await new Promise(res => {
          this.$once('hook:updated', res);
        });
        const bodyTableRef = this.$refs.tableRender && this.$refs.tableRender.getRefs().bodyTable;
        const tableEl = bodyTableRef && bodyTableRef.$el;
        const bodyEl = tableEl && tableEl.querySelector('tbody');
        if (bodyEl) {
          const trs = Array.from(bodyEl.childNodes).filter(tr => tr.nodeName === 'TR');
          const res1 = trs.map((tr, rowIndex) => Array.from(tr.childNodes).map((node, colIndex) => {
            if (node.nodeName === 'TD' || node.nodeName === 'TH') {
              let title = '';
              const inputElement = node.getElementsByTagName('input');
              const placeholderElement = Array.from(node.getElementsByTagName('span')).filter(item => item.className.includes('u-select_placeholder'));
              if (inputElement.length !== 0) {
                title = inputElement[0].value;
              } else {
                // 下拉框未选则时，placeholder内容不显示
                if (placeholderElement.length !== 0 && placeholderElement[0].innerText === node.innerText) {
                  title = '';
                } else {
                  title = node.innerText;
                }
              }
              const rowspan = parseInt(node.getAttribute('rowspan')) || 1;
              const colspan = parseInt(node.getAttribute('colspan')) || 1;
              if (rowspan !== 1 || colspan !== 1) {
                mergesMap.push({
                  col: colIndex,
                  row: rowIndex + i + headerRowCount,
                  rowspan,
                  colspan
                });
              }
              const data = {
                v: title
              };
              if (this.visibleColumnVMs[colIndex]?.autoRowSpan) {
                const field = this.visibleColumnVMs[colIndex].field;
                const currentData = this.exportData[rowIndex];
                data.assistData = {
                  currentValue: this.$at(currentData, field)
                };
              }
              if (includeStyles) {
                const style = getXslxStyle(node);
                Object.assign(data, {
                  s: style.s,
                  rect: style.rect
                });
              }
              return data;
            } else {
              return null;
            }
          }));
          res = res.concat(res1);
        }
      }
      for (let rowIndex = hasHeader ? headerRowCount : 0; rowIndex < res.length; rowIndex++) {
        const item = res[rowIndex];
        for (let j = 0; j < item.length; j++) {
          if (startIndexes[j] !== undefined) item[j] = {
            v: startIndexes[j] + (hasHeader ? rowIndex - headerRowCount : rowIndex),
            s: item[j] && item[j].s
          };
        }
      }
      const newResult = this.removeExcludeColumns(res, excludeColumns, mergesMap, titleColIndexRelations);
      res = newResult[0];
      mergesMap = newResult[1];
      // 解决边框不展示问题，被合并的单元格需要补充样式
      mergesMap.forEach(item => {
        const colspan = item.colspan;
        const rowspan = item.rowspan;
        const colItem = res[item.row][item.col];
        if (colItem.rect) {
          colItem.rect.width = +colItem.rect.width / colspan;
          colItem.rect.height = +colItem.rect.height / rowspan;
        }
        for (let i = item.col + 1; i < item.col + colspan; i++) {
          if (!res[item.row][i]) {
            res[item.row][i] = {
              t: 's',
              v: '',
              // 必须设置，单设置s没有效果
              s: colItem.s
            };
          }
        }
        for (let i = item.row + 1; i < item.row + rowspan; i++) {
          if (!res[i][item.col]) {
            res[i][item.col] = {
              t: 's',
              v: '',
              s: colItem.s
            };
          }
        }
      });

      // console.time('复原表格');
      this.exportData = undefined;
      await new Promise(res => {
        try {
          mergesMap.length > 0 ? this.$once('hook:updated', res) : res();
        } catch (error) {
          this.$once('hook:updated', res);
        }
      });
      // console.timeEnd('复原表格');

      if (this.footerCalcShow && this.$refs.footerRender) {
        this.exportFooterData = arr;
        await new Promise(res => {
          this.$once('hook:updated', res);
        });
        const footerEl = this.$refs.footerRender.$el;
        const bodyEl = footerEl && footerEl.querySelector('tbody');
        const trs = Array.from(bodyEl.childNodes).filter(tr => tr.nodeName === 'TR');
        // let footerData = this.$refs.footerRender.getCalculation(this.footerCalcType, arr) || [];
        // 为了与主表格保持一致，将footerData转换为字符串
        // footerData = footerData.map((item)=>item+'');
        const footerRes = trs.map((tr, rowIndex) => Array.from(tr.childNodes).map((node, colIndex) => {
          if (node.nodeName === 'TD') {
            let title = node.innerText;
            const data = {
              v: title
            };
            if (includeStyles) {
              const style = getXslxStyle(node);
              Object.assign(data, {
                s: style.s,
                rect: style.rect
              });
            }
            return data;
          } else {
            return null;
          }
        }));
        const newResult = this.removeExcludeColumns(footerRes, excludeColumns, [], titleColIndexRelations);
        res = res.concat(newResult[0]);
        this.exportFooterData = undefined;
        await new Promise(res => {
          this.$once('hook:updated', res);
        });
      }
      return [res, mergesMap, headerRowCount];
    },
    removeExcludeColumns(data, excludeColumns, merges, titleColIndexRelations) {
      const excludeIndexMap = {};
      const excludeColumnsMap = excludeColumns.reduce((acc, title) => ({
        ...acc,
        [title]: true
      }), {});
      titleColIndexRelations.forEach(([titleRaw, colIndexs]) => {
        const title = titleRaw.trim();
        if (title === '' || excludeColumnsMap[title]) {
          // 过滤掉title为空字符串和命中excludeColumns
          colIndexs.forEach(index => {
            excludeIndexMap[index] = true;
          });
        }
      });
      let removeColCount = 0;
      const removeColHelperArr = Array.from({
        length: (data[0] || []).length
      }).map((_, index) => {
        if (excludeIndexMap[index]) {
          ++removeColCount;
        }
        return removeColCount;
      });
      const newMerges = merges.map(merge => {
        const colStart = merge.col;
        const colEnd = merge.col + merge.colspan - 1;
        if (merge.colspan === 1 && excludeIndexMap[colStart]) {
          return null;
        }
        const newColStart = Math.max(colStart - removeColHelperArr[colStart], 0);
        const newColEnd = colEnd - removeColHelperArr[colEnd];
        const newColspan = newColEnd - newColStart + 1;
        if (newColspan <= 0 || newColspan === 1 && merge.rowspan === 1) {
          return null;
        }
        return {
          ...merge,
          col: newColStart,
          colspan: newColspan
        };
      }).filter(Boolean);
      return [data.map(arr => arr.filter((item, index) => !excludeIndexMap[index])), newMerges];
    },
    getSheetData(arr, hasHeader = true, columns) {
      const titles = hasHeader ? arr[0] : Array.from({
        length: columns
      }, (item, index) => index);
      const sheetData = [];
      for (let i = hasHeader ? 1 : 0; i < arr.length; i++) {
        const item = {};
        for (let j = 0; j < titles.length; j++) {
          item[titles[j]] = arr[i][j];
        }
        sheetData.push(item);
      }
      return sheetData;
    },
    page(number, size) {
      if (!(this.currentDataSource && this.currentDataSource.paging)) return;
      if (size === undefined) size = this.currentDataSource.paging.size;
      const paging = {
        size,
        oldSize: this.currentDataSource.paging.size,
        number,
        oldNumber: this.currentDataSource.paging.number
      };
      if (this.$emitPrevent('before-page', paging, this)) return;
      delete paging.preventDefault;
      // 有虚拟滚动，需要重置下状态
      if (this.virtual && this.$refs.tableRender) {
        this.$refs.tableRender.resetVirtualData();
      }
      this.currentDataSource.page(paging);
      this.$emit('update:page-number', number, this);
      this.$emit('page', paging, this);
      this.load(false, {
        number,
        limit: size
      });
    },
    sort(field, order, compare) {
      const sorting = {
        field,
        order,
        compare
      };
      if (this.$emitPrevent('before-sort', sorting, this)) return;
      delete sorting.preventDefault;
      this.currentDataSource.sort(sorting);
      this.load();
      this.$emit('sort', sorting, this);
      this.$emit('update:sorting', sorting, this);
    },
    filter(filtering) {
      if (filtering) {
        if (this.$emitPrevent('before-filter', filtering, this)) return;
        delete filtering.preventDefault;
      } else {
        if (this.$emitPrevent('before-filter', {}, this)) return;
      }
      const mergedFiltering = this.currentDataSource && this.currentDataSource.filtering || {};
      Object.assign(mergedFiltering, filtering);
      this.currentDataSource.filter(mergedFiltering);
      this.load();
      this.$emit('filter', mergedFiltering, this);
      this.$emit('update:filtering', mergedFiltering, this);
    },
    watchCurrentData() {
      this.$watch(() => this.currentData, currentData => {
        if (currentData) {
          this.processData(currentData);
          // 处理自动合并逻辑前恢复默认值
          this.autoRowSpan = [];
          this.autoColSpan = [];
          this.autoMergeRow(currentData);
        }
      }, {
        immediate: true
      });
    },
    /* Selection Methods */
    watchValue(value) {
      const valueField = this.getValueField();
      if (this.selectedItem && this.$at(this.selectedItem, valueField) === value) return;
      if (value === undefined) {
        this.selectedItem = undefined;
      } else {
        const selectedItem = this.currentData && this.currentData.find(item => {
          if (this.$at(item, valueField) === value) {
            this.$set(item, 'radioChecked', true);
            return true;
          }
          return false;
        }); // @TODO: Group

        this.selectedItem = selectedItem && this.currentDataSource.isSimpleItem ? selectedItem.simple : selectedItem;
      }
    },
    watchValues(values) {
      const valueField = this.getValueField();
      if (!valueField) return;
      if (values) {
        this.currentValues = values;
        // fix: 2933349384995840，父级选中子级没有勾选
        if (this.currentData) {
          this.currentData.forEach(item => {
            if (!item.hasOwnProperty('checked')) {
              this.$set(item, 'checked', false);
            }
            if (values.includes(this.$at(item, valueField))) {
              this.$set(item, 'checked', true);
            } else {
              // fix: 2954484513723136, values 为空时，没有清空选中状态
              this.$set(item, 'checked', false);
            }
          });
        }
      } else {
        const values = [];
        this.currentData && this.currentData.forEach(item => item.checked && values.push(this.$at(item, valueField)));
        this.currentValues = values;
      }
      // 暂存选中行
      this.checkedItems = {};
      if (this.currentData) {
        this.currentData.forEach(item => {
          if (item.checked) {
            const label = this.$at(item, valueField);
            this.checkedItems[label] = item;
          }
        });
      }
      // 3123124215948800: values变化后充值了item.checked状态，需要递归处理父级的半勾选状态
      if (this.treeDisplay) {
        Object.keys(this.checkedItems).forEach(itemKey => {
          this.handleHalfCheckedForTreeDisplay(this.checkedItems[itemKey], this.treeCheckType);
        });
      }
    },
    handleHalfCheckedForTreeDisplay(item, direction = 'up+down') {
      if (direction.includes('up')) {
        if (item.parentPointer) {
          const parentItem = this.currentData.find(citem => citem === item.parentPointer);
          if (parentItem && !parentItem.disabled) {
            const children = this.$at(parentItem, this.childrenField) || [];
            let checkedLength = 0;
            children.forEach(item => {
              if (item.checked) checkedLength++;
              if (item.checked === null) checkedLength += 0.5;
            });
            if (checkedLength > 0 && checkedLength < children.length) {
              parentItem.checked = null;
            }
            this.handleHalfCheckedForTreeDisplay(parentItem, 'up');
          }
        }
      }
    },
    onClickRow(e, item, rowIndex) {
      this.$emit('click-row', {
        item,
        index: rowIndex
      });
      if (this.selectable) {
        this.select(item, rowIndex);
      }
    },
    select(item, rowIndex, cancelable) {
      // Check if enabled
      if (this.readonly || this.disabled || item.disabled) return; // Prevent replication
      const oldValue = this.value;
      const oldItem = this.selectedItem;
      if (cancelable === undefined) cancelable = this.cancelable;
      if (!cancelable && item === oldItem) return; // Emit a `before-` event with preventDefault()
      if (this.$emitPrevent('before-select', {
        value: item && item.value,
        oldValue,
        item,
        oldItem
      }, this)) return;
      if (cancelable && item === oldItem) this.selectedItem = undefined;else this.selectedItem = item; // Assign and sync `value`
      const value = this.selectedItem && this.$at2(this.selectedItem, this.valueField);
      this.$emit('input', value, this);
      this.$emit('update:value', value, this); // Emit `after-` events
      this.$emit('select', {
        value,
        oldValue,
        selectedItem: this.selectedItem,
        item,
        oldItem,
        index: rowIndex
      }, this);
    },
    check(item, checked, isContinue) {
      // Check if enabled
      if (this.readonly || this.disabled || item.disabled) return; // Method overloading
      if (checked === undefined) checked = !item.checked; // Prevent replication
      if (item.checked === checked && !isContinue) return;
      const oldValues = this.values ? Array.from(this.values) : this.values; // Emit a `before-` event with preventDefault()
      // if (this.$emitPrevent('before-check', {
      //     oldValues,
      //     checked,
      //     item,
      // }, this))
      //     return;
      // Assign and sync `checked`
      item.checked = checked;
      if (this.treeDisplay) {
        this.checkRecursively(item, checked, this.treeCheckType);
      } else {
        this.getCheckedValues(item, checked);
      }
      const checkedItems = this.getCheckedItems();
      this.$emit('update:values', this.currentValues, this);
      this.$emit('check', {
        values: this.currentValues,
        oldValues,
        item: this.getRealSimpleItem(item),
        checked,
        items: checkedItems
      }, this);
    },
    checkAll(checked) {
      // Check if enabled
      if (this.readonly || this.disabled) return;
      const oldValues = this.values ? Array.from(this.values) : this.values;
      this.currentData.forEach(item => {
        if (item.disabled) return;
        item.checked = checked;
        if (this.treeDisplay) {
          this.checkRecursively(item, checked, this.treeCheckType);
        } else {
          this.getCheckedValues(item, checked);
        }
      });
      const checkedItems = this.getCheckedItems();
      this.$emit('update:values', this.currentValues, this);
      this.$emit('check', {
        values: this.currentValues,
        oldValues,
        checked,
        items: checkedItems
      }, this);
    },
    checkRecursively(item, checked, direction = 'up+down') {
      this.getCheckedValues(item, checked);
      if (direction.includes('down')) {
        const children = this.$at(item, this.childrenField);
        if (children && children.length) {
          children.forEach(citem => {
            if (citem.disabled) return;
            citem.checked = checked;
            this.checkRecursively(citem, checked, 'down');
          });
        }
      }
      if (direction.includes('up')) {
        if (item.parentPointer) {
          const parentItem = this.currentData.find(citem => citem === item.parentPointer);
          if (parentItem && !parentItem.disabled) {
            const children = this.$at(parentItem, this.childrenField) || [];
            let checkedLength = 0;
            children.forEach(item => {
              if (item.checked) checkedLength++;
              if (item.checked === null) checkedLength += 0.5;
            });
            if (checkedLength === 0) parentItem.checked = false;else if (checkedLength === children.length) parentItem.checked = true;else parentItem.checked = null;
            this.checkRecursively(parentItem, parentItem.checked, 'up');
          }
        }
      }
    },
    getCheckedValues(item, checked) {
      const valueField = this.getValueField();
      if (valueField) {
        const label = this.$at(item, valueField);
        if (checked && !this.currentValues.includes(label)) this.currentValues.push(label);else if (!checked && this.currentValues.includes(label)) this.currentValues.splice(this.currentValues.indexOf(label), 1);
        if (checked) {
          this.checkedItems[label] = item;
        } else {
          delete this.checkedItems[label];
        }
      }
    },
    getRealSimpleItem(item) {
      return this.currentDataSource.isSimpleItem && item ? item.simple : item;
    },
    getValueField() {
      return this.currentDataSource && this.currentDataSource.isSimpleItem && !this.valueField ? 'simple' : this.valueField;
    },
    /**
     * 获取所有选中行
     */
    getCheckedItems() {
      const items = [];
      Object.keys(this.checkedItems).forEach(itemKey => {
        const inValues = this.currentValues.find(value => '' + value === itemKey);
        if (inValues) {
          items.push(this.getRealSimpleItem(this.checkedItems[itemKey]));
        }
      });
      return items;
    },
    toggleExpanded(item, expanded) {
      if (item.disabled) return;
      // Method overloading
      if (expanded === undefined) expanded = !item.expanded; // Emit a `before-` event with preventDefault()
      if (this.$emitPrevent('before-toggle-expanded', {
        item,
        oldExpanded: !expanded,
        expanded
      }, this)) return;
      this.$set(item, 'expanded', expanded);
      this.$emit('toggle-expanded', {
        item,
        expanded
      }, this);
      this.$forceUpdate();
      if (expanded && this.accordion) {
        this.currentData.forEach(otherItem => {
          if (otherItem !== item && otherItem.expanded) otherItem.expanded = false;
        });
      }
    },
    /**
     * 转换成平铺型数据
     */
    processTreeData(data, level = 0, parent, ancestors = []) {
      let newData = [];
      for (const item of data) {
        // 数据异常处理
        if (parent === item) break;
        this.$set(item, 'tableTreeItemLevel', level);
        item.parentPointer = parent;
        if (this.$at(item, this.childrenField)) {
          // fix: 2820102516186880，2830031229543936，子节点删除数据处理
          if (this.$at(item, this.childrenField).length) {
            this.$setAt(item, this.hasChildrenField, true);
            this.$set(item, 'treeExpanded', item.treeExpanded || false);
          } else {
            this.$setAt(item, this.hasChildrenField, false);
            this.$set(item, 'treeExpanded', false);
          }
        }
        if (parent) {
          this.$set(item, 'display', needHidden(ancestors) ? 'none' : '');
        }
        if (!item.hasOwnProperty('loading')) {
          this.$set(item, 'loading', false);
        }
        newData.push(item);
        if (this.$at(item, this.childrenField) && this.$at(item, this.childrenField).length) {
          newData = newData.concat(this.processTreeData(this.$at(item, this.childrenField), level + 1, item, ancestors.concat(item)));
        }
      }
      return newData;

      // 只要任意祖先节点的treeExpanded为false,当前节点都不显示。
      function needHidden(ancestors) {
        for (const item of ancestors) {
          if (!item.treeExpanded) {
            return true;
          }
        }
        return false;
      }
    },
    toggleTreeExpanded(item, expanded) {
      if (item.loading) return;
      if (expanded === undefined) expanded = !item.treeExpanded;
      if (this.$emitPrevent('before-tree-toggle-expanded', {
        item,
        oldExpanded: !expanded,
        expanded
      }, this)) return;
      this.$set(item, 'treeExpanded', expanded);
      this.$emit('tree-toggle-expanded', {
        item,
        expanded
      }, this);
      if (!this.$at(item, this.childrenField) && typeof this.dataSource === 'function') {
        this.$set(item, 'loading', true);
        this.$forceUpdate();
        // 第一个参数是为了兼容laod的参数
        this.dataSource({
          page: this.page,
          size: this.size
        }, {
          item
        }).then(res => {
          let result = [];
          if (Array.isArray(res)) {
            result = res;
          } else if (typeof res === 'object') {
            // 特殊处理
            Object.keys(res).forEach(key => {
              if (Array.isArray(res[key])) {
                result = res[key];
              }
            });
          }
          this.processData(result);
          this.$setAt(item, this.childrenField, result);
          if (item.checked) {
            this.check(item, item.checked, true);
          }
          // 促使currentData更新
          const index = this.currentData.findIndex(currentData => this.$at(currentData, this.valueField) === this.$at(item, this.valueField));
          const newDataIndex = this.currentData.findIndex(currentData => this.$at(currentData, this.valueField) === this.$at(result[0], this.valueField));
          if (index !== -1 && newDataIndex === -1) {
            const treeData = this.processTreeData(result, item.tableTreeItemLevel + 1, item);
            this.currentData.splice(index + 1, 0, ...treeData);
          }
          this.updateTreeExpanded(item, expanded);
          this.$set(item, 'loading', false);
        });
      } else {
        this.updateTreeExpanded(item, expanded);
      }
      if (this.virtual) {
        this.$refs.tableRender.startVirtualScroll();
      }
    },
    /**
     * 递归处理children情况
     */
    traverse(node, func) {
      const list = node && this.$at(node, this.childrenField);
      if (!list) return;
      for (let index = 0; index < list.length; index++) {
        const child = list[index];
        if (!child) continue;
        func(child, node);
        this.traverse(child, func);
      }
    },
    updateTreeExpanded(expandNode, expanded) {
      this.traverse(expandNode, (node, parent) => {
        this.currentData.forEach(itemData => {
          if (itemData.parentPointer !== undefined && itemData.parentPointer === parent) {
            if (expanded) {
              if (parent.treeExpanded) {
                this.$set(itemData, 'display', '');
              } else {
                this.$set(itemData, 'display', 'none');
              }
            } else {
              this.$set(itemData, 'display', 'none');
            }
          }
        });
      });
      expandNode.expanded = expanded;
      this.$forceUpdate(); // 有loading的情况下，forceUpdate才会更新
    },
    /**
     * 拖拽开始
     */
    async onDragStart(e, item, rowIndex) {
      // 当不可拖拽节点里的文字双击选中时再拖拽，会触发dragstart事件，这里需要屏蔽
      await this.canDraggable(item);
      if (item.draggable === false) {
        return;
      }
      e.dataTransfer.setDragImage(this.getDragImage(e), 0, 0);
      this.dragState = {
        dragging: true,
        source: item,
        sourcePath: rowIndex,
        // 这里需要是表格中的具体行值，用于drop的时候判断
        sourceData: {
          item,
          parent: item.parentPointer,
          level: item.tableTreeItemLevel,
          index: this.findItemIndex(item)
        }
      };
      // 该节点下的所有子节点不要响应dragover
      this.currentData.forEach(citem => {
        citem.draggoverDisabled = this.isSubNode(citem, item);
        if (this.treeDisplay) {
          this.canDropin(citem);
        } else {
          citem.disabledDrop = true;
        }
      });
      // 本身不要线
      item.draggoverDisabled = true;
      this.$emit('dragstart', {
        source: this.dragState.sourceData
      });
      this.currentDragoverItem = null;
      if (this.acrossTableDrag) {
        const dragStartData = {
          source: item,
          sourcePath: rowIndex,
          // 这里需要是表格中的具体行值，用于drop的时候判断
          sourceData: {
            item,
            level: item.tableTreeItemLevel,
            index: this.findItemIndex(item)
          }
        };
        // fix: 树型表格间拖拽，有parentPointer，JSON.stringify报错
        const replacer = (key, value) => {
          if (['parentPointer', 'toggle'].includes(key)) return undefined;
          return value;
        };
        e.dataTransfer.setData('application/json', JSON.stringify(dragStartData, replacer));
        // 当不可拖拽节点里的文字双击选中时再拖拽，会触发dragstart事件，dragover的时候也会响应
        // 这里增加信息，dragover的时候可以处理是否响应
        e.dataTransfer.setData('info/acrosstabledrag', '');
      }
    },
    /**
     * 拖拽经过行
     */
    onDragOver(e, item, rowIndex) {
      e.preventDefault();
      // 表格内部或者跨表格可拖拽，其他屏蔽
      if (!this.dragState.dragging && !this.acrossTableDrag) return;
      if (item.draggoverDisabled) {
        return;
      }
      if (this.acrossTableDrag) {
        const types = e.dataTransfer && e.dataTransfer.types || [];
        const isAcrossTableDrag = types.find(type => type === 'info/acrosstabledrag');
        if (!isAcrossTableDrag) return;
      }
      // 行之间可以放
      if (this.draggable) {
        this.currentDragoverItem = item;
        // 快速移动的时候不要计算
        this.dragoverTimer = setTimeout(() => {
          if (this.currentDragoverItem === item) {
            this.throttledDragover(e, item, rowIndex);
          } else {
            clearTimeout(this.dragoverTimer);
            this.throttledDragover.cancel();
          }
        }, 200);
      } else if (this.acrossTableDrag) {
        // 只能放入整个表格，并且是拖拽节点所在表格外的其他表格展示放置样式，拖拽节点所在的表格不展示放置样式
        // this.dragState.sourcePath === undefined，表示是拖拽节点所在表格外的其他表格，因为其他表格没有响应dragstart事件，所以sourcePath为undefined
        if (!this.dropData && this.dragState.sourcePath === undefined) {
          this.dropData = {
            dragoverElRect: this.$refs.tableRender && this.$refs.tableRender.getRefs().body.getBoundingClientRect(),
            parentElRect: this.$refs.root.getBoundingClientRect(),
            position: 'append',
            left: 0
          };
        }
      }
    },
    handleDragOver(e, item, rowIndex) {
      // 查找到tr行
      const target = this.getTrEl(e);
      const trRect = target.getBoundingClientRect();
      // 让展示线缩进
      let left = 0;
      let indentElRect = {};
      let placeholderWith = 0;
      if (this.treeDisplay) {
        const indentEl = target.querySelector('[class^="u-table-view_indent__"]');
        if (indentEl) {
          indentElRect = indentEl.getBoundingClientRect();
        }
        const treePlaceholderEl = target.querySelector('[class^="u-table-view_tree_placeholder"]');
        const treeExpanderEl = target.querySelector('[class^="u-table-view_tree_expander"]');
        placeholderWith = treePlaceholderEl && treePlaceholderEl.offsetWidth;
        if (treePlaceholderEl) {
          placeholderWith = treePlaceholderEl.offsetWidth;
        }
        if (treeExpanderEl) {
          placeholderWith = treeExpanderEl.offsetWidth;
        }
      } else {
        item.disabledDrop = true;
      }
      const disabledDrop = item.disabledDrop || item.draggoverDisabled;
      const splitValue = disabledDrop ? 2 : 4;
      const upArea = trRect.top + trRect.height / splitValue;
      const downArea = trRect.top + trRect.height / splitValue * (splitValue - 1);
      let position = '';
      if (e.y <= upArea && !item.draggoverDisabled) {
        // 在上部
        position = 'insertBefore';
        left = item.tableTreeItemLevel ? indentElRect.left - trRect.left : 0;
        placeholderWith = item.tableTreeItemLevel ? placeholderWith : 0;
        left = left + (item.tableTreeItemLevel || 0) * 20 + placeholderWith;
      } else if (e.y >= downArea) {
        // 在下部
        position = 'insertAfter';
        let level = item.tableTreeItemLevel || 0;
        if (item.treeExpanded) {
          const childList = this.$at(item, this.childrenField);
          if (childList && childList.length) level = level + 1;
        }
        left = level ? indentElRect.left - trRect.left : 0;
        placeholderWith = level ? placeholderWith : 0;
        left = left + level * 20 + placeholderWith;
      } else {
        // 在中间
        if (!disabledDrop) {
          position = 'append';
        }
      }

      // 如果一直更新会卡顿，这里设置有不一样的时候才更新
      if (!!this.currentDragoverItem && (!this.dropData || JSON.stringify(this.dropData.dragoverElRect) !== JSON.stringify(trRect) || this.dropData.position !== position)) {
        this.dropData = {
          dragoverElRect: trRect,
          parentElRect: this.$refs.root.getBoundingClientRect(),
          position,
          left
        };
        this.dragState.target = item;
        this.dragState.targetPath = rowIndex; // 这里需要是表格中的具体行值，用于drop的时候判断
        this.dragState.targetData = {
          item,
          parent: item.parentPointer,
          level: item.tableTreeItemLevel,
          index: this.findItemIndex(item)
        };
        this.$emit('dragover', {
          target: this.dragState.targetData
        });
      }
    },
    /**
     * 拖拽结束状态处理
     */
    onDragEnd(e) {
      if (!this.subTreeLoading) this.clearDragState();
      this.$emit('dragend');
      this.cleartDragoverTimer();
      // item里添加的辅助拖拽字段需要删除，不然跨表格拖拽时会影响下一次的拖拽
      this.clearDragItemData();
    },
    /**
     * 拖拽放置
     */
    onDrop(e) {
      // 跨表格与表格内拖拽的drop处理区分开来
      if (this.acrossTableDrag && this.dropData) {
        const dragStartData = JSON.parse(e.dataTransfer.getData('application/json') || '{}');
        ['disabledDrop', 'draggoverDisabled'].forEach(key => {
          if (dragStartData.sourceData && dragStartData.sourceData.item) {
            delete dragStartData.sourceData.item[key];
          }
          if (dragStartData.targetData && dragStartData.targetData.item) {
            delete this.dragState.targetData.item[key];
          }
        });
        // 如果当前表格内部没有开启拖拽，那么放置到当前表格不应该有drop事件
        if (!this.draggable && this.dragState.sourcePath === undefined) {
          this.$emit('drop', {
            source: dragStartData.sourceData,
            target: this.dragState.targetData,
            position: this.dropData && this.dropData.position || 'append',
            finalSource: null
          });
        } else if (this.draggable) {
          // 表格内拖拽，sourcePath和targetPath不一样的时候才emit事件
          // 当元素被移除的时候可能不会触发dragend，结合判断数据是否在table里
          const inTable = this.valueField ? dragStartData.sourceData && dragStartData.sourceData.item && !!this.currentData.find(titem => this.$at(titem, this.valueField) === this.$at(dragStartData.sourceData.item, this.valueField)) : true;
          const inTheSameTable = this.dragState.sourcePath !== undefined && inTable;
          const finalSource = Object.assign({}, dragStartData.sourceData);
          finalSource.index = this.dragState.targetPath;
          this.$emit('drop', {
            source: dragStartData.sourceData,
            target: this.dragState.targetData,
            position: this.dropData && this.dropData.position || 'append',
            finalSource: inTheSameTable ? finalSource : null
          });
        }
      } else if (this.dragState && this.dragState.dragging && this.dragState.sourcePath !== this.dragState.targetPath && this.dropData) {
        this.preventDatasourceWatch = true;
        const originalList = this.currentDataSource ? this.currentDataSource.arrangedData.filter(item => !!item) : this.currentDataSource;
        let targetPath = this.dragState.targetPath;
        let targetParentItem;
        let dropList = originalList;
        // 树型展示的处理
        if (this.treeDisplay) {
          this.findItem(originalList, this.dragState.source.parentPointer, (node, index, list, parentNode) => {
            if (this.dragState.source === node) {
              this.removeData = {
                parentList: list,
                index,
                parentNode
              };
            }
          });
          if (this.removeData) {
            this.removeData.parentList.splice(this.removeData.index, 1);
            if (!this.removeData.parentList.length) {
              this.$set(this.removeData.parentNode, this.hasChildrenField, false);
            }
          }
          this.findItem(originalList, this.dragState.target.parentPointer, (node, index, list, parentNode) => {
            if (this.dragState.target === node) {
              this.insetData = {
                parentList: list,
                index,
                parentNode
              };
            }
          });
          if (this.dropData.position === 'append') {
            const parentNode = this.insetData.parentList[this.insetData.index];
            // 异步加载子树的情况
            if (!this.$at(parentNode, this.childrenField) && this.$at(parentNode, this.hasChildrenField) && typeof this.dataSource === 'function') {
              this.subTreeLoading = true; // 阻止dragEnd清除数据
              this.$set(parentNode, 'loading', true);
              return this.dataSource({
                page: this.page,
                size: this.size
              }, {
                item: parentNode
              }).then(res => {
                let result = [];
                if (Array.isArray(res)) {
                  result = res;
                } else if (typeof res === 'object') {
                  // 特殊处理
                  Object.keys(res).forEach(key => {
                    if (Array.isArray(res[key])) {
                      result = res[key];
                    }
                  });
                }
                // 加在数据的最后一个
                result.push(this.dragState.source);
                targetPath = result.length - 1;
                this.processData(result);
                this.$setAt(parentNode, this.childrenField, result);
                if (parentNode.checked) {
                  this.check(parentNode, parentNode.checked, true);
                }
                this.$set(parentNode, 'loading', false);
                this.$set(parentNode, 'treeExpanded', true);
                this.subTreeLoading = false;
                this.currentDataSource.arrangedData = originalList;
                const level = (parentNode.tableTreeItemLevel || 0) + 1;
                const finalSource = {
                  item: this.dragState.source,
                  parent: parentNode,
                  index: targetPath,
                  level
                };
                this.$emit('drop', {
                  source: this.dragState.sourceData,
                  target: this.dragState.targetData,
                  position: this.dropData.position,
                  finalSource,
                  updateData: {
                    sourceList: this.removeData.parentList,
                    targetList: result
                  }
                });
                this.clearDragState();
              }).catch(err => {
                this.subTreeLoading = false;
                this.clearDragState();
              });
            } else {
              // 子树数据是同步的情况
              if (!this.$at(parentNode, this.hasChildrenField) && !this.$at(parentNode, this.childrenField)) {
                this.setAtWithoutSync(parentNode, this.childrenField, []);
              }
              this.toggleTreeExpanded(parentNode, true);
              const children = this.$at(parentNode, this.childrenField) || [];
              children.push(this.dragState.source);
              targetPath = children.length - 1;
              targetParentItem = parentNode;
              dropList = children;
            }
          } else {
            const insertIndex = this.dropData.position === 'insertBefore' ? this.insetData.index : this.insetData.index + 1;
            this.insetData && this.insetData.parentList.splice(insertIndex, 0, this.dragState.source);
            targetPath = insertIndex;
            targetParentItem = this.insetData.parentNode;
            dropList = this.insetData.parentList;
          }
          this.currentDataSource.arrangedData = originalList;
        } else {
          // 普通表格的处理
          originalList.splice(this.dragState.sourcePath, 1);
          originalList.splice(this.dragState.targetPath, 0, this.dragState.source);
          this.currentDataSource.arrangedData = originalList;
          targetPath = this.dragState.targetPath;
          dropList = originalList;
        }
        const level = targetParentItem ? (targetParentItem.tableTreeItemLevel || 0) + 1 : 0;
        const finalSource = {
          item: this.dragState.source,
          parent: targetParentItem,
          index: targetPath,
          level
        };
        this.$emit('drop', {
          source: this.dragState.sourceData,
          target: this.dragState.targetData,
          position: this.dropData.position,
          finalSource,
          updateData: {
            sourceList: this.removeData && this.removeData.parentList || originalList,
            targetList: dropList
          }
        });
      }
      this.clearDragState();
      this.cleartDragoverTimer();
      this.clearDragItemData();
    },
    onRootDragover(e) {
      e.preventDefault();
      // 当表格为空时，没有行的dragover事件，所以需要在这里处理
      if (this.currentData.length === 0) {
        if (!this.acrossTableDrag) return;
        if (this.draggable || this.acrossTableDrag) {
          this.dropData = {
            dragoverElRect: this.$refs.tableRender && this.$refs.tableRender.getRefs().body.getBoundingClientRect(),
            parentElRect: this.$refs.root.getBoundingClientRect(),
            position: 'append',
            left: 0
          };
        }
      }
    },
    /**
     * 拖拽离开，每个tr都会触发该事件，所以需要判断是否是真正的离开
     * 结合dragleave和dragenter来判断
     */
    onRootDragleave(e) {
      if (this.enterTarget === e.target) {
        e.stopPropagation();
        e.preventDefault();
        this.dropData = undefined;
        this.cleartDragoverTimer();
        this.enterTarget = null;
      }
    },
    onRootDragenter(e) {
      this.enterTarget = e.target;
    },
    /**
     * 查找数据在数组的哪个位置
     */
    // findItem(list, parentNode, func) {
    //     list.forEach((item, index) => {
    //         func(item, index, list, parentNode);
    //         const childList = item && this.$at(item, this.childrenField);
    //         if (!childList)
    //             return;
    //         this.findItem(childList, item, func);
    //     });
    // },
    findItem(list, parentNode, func) {
      let tempList = list;
      if (parentNode) {
        tempList = this.$at(parentNode, this.childrenField);
      }
      tempList.forEach((item, index) => {
        func(item, index, tempList, parentNode);
      });
    },
    findItemIndex(item) {
      let list = this.currentDataSource ? this.currentDataSource.arrangedData.filter(item => !!item) : this.currentDataSource;
      if (item.parentPointer) {
        list = this.$at(item.parentPointer, this.childrenField);
      }
      return list.findIndex(litem => litem === item);
    },
    /**
     * 清除拖拽数据
     */
    clearDragState() {
      this.dropData = undefined;
      this.dragState = {
        dragging: false,
        source: {}
      };
      this.$nextTick(() => {
        this.preventDatasourceWatch = false;
      });
      this.enterTarget = null;
    },
    /**
     * 清除拖拽计时器
     */
    cleartDragoverTimer() {
      clearTimeout(this.dragoverTimer);
      this.currentDragoverItem = null;
    },
    /**
     * 清除拖拽item的辅助数据，draggoverDisabled、disabledDrop
     */
    clearDragItemData() {
      this.currentData.forEach(item => {
        delete item.draggoverDisabled;
        delete item.disabledDrop;
      });
    },
    isSubNode(item, sourceNode) {
      if (item.parentPointer !== undefined) {
        if (item.parentPointer === sourceNode) {
          return true;
        }
        const parentNode = this.currentData.find(citem => citem === item.parentPointer);
        if (parentNode) {
          return this.isSubNode(parentNode, sourceNode);
        }
        return false;
      }
      return false;
    },
    /**
     * 判断节点拖拽状态
     */
    isDragging(item) {
      if (this.dragState && this.dragState.dragging) {
        const sourceNode = this.dragState.source;
        if (!sourceNode) return false;
        if (item === sourceNode) return true;else if (item.parentPointer !== undefined) {
          return this.isSubNode(item, sourceNode);
        } else {
          return false;
        }
      }
    },
    setAtWithoutSync(obj, propertyPath, value) {
      const lastIndex = propertyPath.lastIndexOf('.');
      if (lastIndex === -1) obj[propertyPath] = value;else {
        const prepath = propertyPath.slice(0, lastIndex);
        const subpath = propertyPath.slice(lastIndex + 1);
        const item = this.$at(obj, prepath);
        item[subpath] = value;
      }
    },
    /**
     * 获取拖拽image ghost
     */
    getDragImage(e) {
      const dragGhostEl = this.$refs.dragGhost;
      if (dragGhostEl.children.length) {
        return dragGhostEl;
      } else {
        // 表格有滚动条、固定列的情况下，拖拽出来的image会有滚动条或断层，需要处理
        const trEl = this.getTrEl(e);
        const crt = trEl.cloneNode(true);
        Array.from(crt.children).forEach(td => {
          td.style.position = 'static'; // 去除sticky的情况
        });
        const tableEl = this.$refs.tableRender && this.$refs.tableRender.getRefs().bodyTable.$el;
        const tableElCrt = tableEl.cloneNode(true);
        const tbody = tableElCrt.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        tableElCrt.style.transform = 'none';
        tbody.appendChild(crt);
        this.$refs.trDragGhost.innerHTML = '';
        this.$refs.trDragGhost.appendChild(tableElCrt);
        this.$refs.trDragGhost.style.width = this.$refs.root.clientWidth + 'px';
        return this.$refs.trDragGhost;
      }
    },
    /**
     * 获取行节点
     */
    getTrEl(e) {
      // 查找到tr行
      let target = e.target;
      while (target) {
        if (target.tagName !== 'TR') {
          target = target.parentElement;
        } else {
          break;
        }
      }
      return target;
    },
    getPaginationHeight() {
      let paginationHeight = 0;
      if (this.$refs.pagination) {
        paginationHeight = this.$refs.pagination.$el.offsetHeight;
        const paginationStyle = getComputedStyle(this.$refs.pagination.$el);
        const marginTop = +(paginationStyle.marginTop || '').replace(/px/, '') || 0;
        const marginBottom = +(paginationStyle.marginBottom || '').replace(/px/, '') || 0;
        paginationHeight = paginationHeight + marginTop + marginBottom;
      }
      return paginationHeight;
    },
    autoMergeRow(currentData = this.currentData) {
      // 这里要再重置一下，因为表格列也会调用这个方法
      this.autoRowSpan = [];
      this.visibleColumnVMs && this.visibleColumnVMs.forEach((columnVM, columnIndex) => {
        if (columnVM.autoRowSpan && columnVM.field && Array.isArray(currentData)) {
          let count = 0;
          for (let i = currentData.length - 1; i >= 0; i--) {
            const item = currentData[i];
            const itemValue = this.$at(item, columnVM.field);
            if (itemValue !== undefined && itemValue === this.$at(currentData[i - 1], columnVM.field)) {
              if (!this.autoRowSpan[i]) {
                this.autoRowSpan[i] = [];
              }
              this.autoRowSpan[i][columnIndex] = 0;
              count++;
            } else if (count) {
              if (!this.autoRowSpan[i]) {
                this.autoRowSpan[i] = [];
              }
              this.autoRowSpan[i][columnIndex] = count + 1;
              count = 0;
            }
          }
        }
      });
      this.$forceUpdate();
    },
    getItemColSpan(item, rowIndex, columnIndex) {
      if (Array.isArray(item.colSpan)) {
        const config = item.colSpan.find(configItem => configItem[0] === columnIndex);
        if (config) {
          for (let i = 1; i < config[1]; i++) {
            if (!this.autoColSpan[rowIndex]) {
              this.autoColSpan[rowIndex] = [];
            }
            this.autoColSpan[rowIndex][columnIndex + i] = 0;
          }
          return config[1];
        }
      }
      if (this.autoColSpan[rowIndex] && this.autoColSpan[rowIndex][columnIndex] !== undefined) {
        return this.autoColSpan[rowIndex][columnIndex];
      }
    },
    getItemRowSpan(item, rowIndex, columnIndex) {
      if (Array.isArray(item.rowSpan)) {
        const config = item.rowSpan.find(configItem => configItem[0] === columnIndex);
        if (config) {
          for (let i = 1; i < config[1]; i++) {
            if (!this.autoRowSpan[rowIndex + i]) {
              this.autoRowSpan[rowIndex + i] = [];
            }
            this.autoRowSpan[rowIndex + i][columnIndex] = 0;
          }
          return config[1];
        }
      }
      if (this.autoRowSpan[rowIndex] && this.autoRowSpan[rowIndex][columnIndex] !== undefined) {
        return this.autoRowSpan[rowIndex][columnIndex];
      }
    },
    /**
     * IDE 里生成的事async函数，所以需要await处理
     */
    async canDraggable(item) {
      if (this.canDragableHandler && (this.canDragableHandler instanceof Promise || typeof this.canDragableHandler === 'function')) {
        const canDraggableResult = await this.canDragableHandler(item);
        this.$set(item, 'draggable', canDraggableResult);
      } else {
        this.$set(item, 'draggable', true);
      }
    },
    async canDropin(item) {
      if (this.canDropinHandler && (this.canDropinHandler instanceof Promise || typeof this.canDropinHandler === 'function')) {
        const canDropinResult = await this.canDropinHandler(item);
        item.disabledDrop = item.disabledDrop || !canDropinResult;
      } else {
        item.disabledDrop = item.disabled;
      }
    },
    onDblclickRow(e, item, rowIndex) {
      this.$emit('dblclick-row', {
        item,
        index: rowIndex
      });
    },
    processTableDraggable(needProcessData) {
      // 拖拽设置
      const dragHandler = this.visibleColumnVMs.some(columnVM => columnVM.type === 'dragHandler');
      if (!this.$env.VUE_APP_DESIGNER) {
        this.rowDraggable = (this.draggable || this.acrossTableDrag) && !dragHandler;
        this.handlerDraggable = (this.draggable || this.acrossTableDrag) && dragHandler;
      }
      if (needProcessData) {
        if (this.draggable || this.acrossTableDrag) {
          this.currentData.forEach(item => {
            this.canDraggable(item);
          });
        }
      }
    },
    handleResizeListener() {
      if (this.virtual) {
        this.$refs.tableRender.resetVirtualData();
      }
      // 表格重构后，不会出现width一直变化的情况（2732949921019136）
      // 去掉8px判断，避免外部容器宽度变化的时候出现滚动条（3049422905215488）
      this.handleResize();
    },
    reHandleResize() {
      if (this.virtual) {
        this.$refs.tableRender.resetVirtualData();
      }
      this.preRootWidth = null;
      this.handleResize(true);
    },
    /**
     * 普通列、分组、动态列等增删时统一处理
     * 处理表格slots变化时，columnVMs数组、分组处理
     */
    handleColumns() {
      const slotVMs = this.$slots.default || [];
      let columnVMs = [];
      // 根据u-table-view里的$slots顺序，把columnVM放置到columnVMs里
      Object.keys(this.columnVMsMap).forEach(key => {
        const columnVMMap = this.columnVMsMap[key];
        if (!columnVMMap) return;
        const columnVM = columnVMMap.columnVM;
        if (!columnVM) return;
        const vnode = columnVM.$vnode;
        const index = slotVMs.findIndex(slotVm => slotVm === vnode);
        if (index !== -1) {
          if (this.columnGroupVMs[columnVM._uid]) {
            if (columnVM.$children.length) {
              columnVMs[index] = columnVM;
            }
          } else {
            columnVMs[index] = columnVM;
          }
        }
      });
      columnVMs = columnVMs.filter(columnVm => !!columnVm);

      // 先替换动态列
      this.dynamicColumnVMs = [];
      this.replaceDynamicColumn(columnVMs);

      // 再替换分组
      const finalColumnVms = [...columnVMs];
      // result 记录分组数据
      const result = [];
      const groupColumnVMs = columnVMs.filter(columnVm => columnVm.isGroup);
      groupColumnVMs.forEach(groupVM => {
        if (groupVM.$children.length) {
          const columnsInGroup = this.setGroupData(groupVM);
          const index = finalColumnVms.findIndex(columnVm => columnVm === groupVM);
          if (index !== -1) {
            finalColumnVms.splice(index, 1, ...columnsInGroup);
          }
          result[0] = result[0] || [];
          result[0].push(groupVM);
          this.getColumnChildren(groupVM, 0, result);
        }
      });
      // finalColumnVms 是最终展示的列，赋值this.columnVMs，用于visibleColumnVMs的计算
      this.columnVMs = finalColumnVms;

      // 计算表头
      let tableHeadTrArr = [[]];
      // 需要处理下列设置了colSpan的情况
      finalColumnVms.forEach(columnVM => {
        tableHeadTrArr[0].push(columnVM);
      });
      tableHeadTrArr[0].forEach((columnVM, index) => {
        this.setColumnColSpanData(columnVM, index, tableHeadTrArr[0]);
      });
      if (result.length) {
        result[0] = columnVMs;
        for (let i = 0; i < result.length; i++) {
          result[i].forEach((columnVm, index) => {
            if (!columnVm) return;
            if (!columnVm.isGroup && i !== result.length - 1) {
              columnVm.rowSpan = result.length - i;
            }
            this.setColumnColSpanData(columnVm, index, result[i]);
          });
        }
        tableHeadTrArr = result;
      }
      this.tableHeadTrArr = tableHeadTrArr;
    },
    /**
     * 设置分组数据
     */
    setGroupData(groupVM) {
      const columnsInGroup = this.getContainColumns(groupVM);
      // 自节点fixed的情况下，group也fixed
      const hasFixed = columnsInGroup.some(columnInGroup => columnInGroup.fixed);
      groupVM.fixed = hasFixed || groupVM.fixed;
      if (groupVM.fixed) {
        columnsInGroup.forEach(columnInGroup => columnInGroup.fixed = groupVM.fixed);
      }
      this.replaceDynamicColumn(columnsInGroup);
      groupVM.colSpan = columnsInGroup.filter(columnVM => !columnVM.currentHidden).length;
      this.setColumnVMsMap(groupVM._uid, {
        columnsInGroup
      });
      return columnsInGroup;
    },
    replaceDynamicColumn(columns) {
      Object.keys(this.dynamicColumnVMsMap).forEach(dkey => {
        const dynamicColumnItem = this.dynamicColumnVMsMap[dkey];
        if (!dynamicColumnItem) {
          return;
        }
        const index = columns.findIndex(columnVm => columnVm === dynamicColumnItem.columnVM);
        if (index !== -1 && dynamicColumnItem.vms) {
          columns.splice(index, 1, ...dynamicColumnItem.vms);
        }
        if (!this.dynamicColumnVMs.find(dynamicColVm => dynamicColVm === dynamicColumnItem.columnVM)) {
          this.dynamicColumnVMs.push(dynamicColumnItem.columnVM);
        }
      });
    },
    /**
     * 设置colSpan数据
     * @param {*} columnVM 当前列
     * @param {*} index 当前列的索引
     * @param {*} list 当前列所在的数组
     */
    setColumnColSpanData(columnVM, index, list) {
      if (columnVM && columnVM.colSpan > 1 && !columnVM.isGroup) {
        // 如果当前列有合并，那么后面的列自动覆盖不显示
        const cloumnsForColSpanHidden = [];
        for (let j = index + 1; j < index + columnVM.colSpan && j < list.length; j++) {
          list[j].fixed = columnVM.fixed;
          cloumnsForColSpanHidden.push(list[j]);
          list[j].currentHidden = columnVM.currentHidden;
          list.splice(j, 1, null);
        }
        this.setColumnVMsMap(columnVM._uid, {
          cloumnsForColSpanHidden
        });
      }
    },
    /**
     * 得到group下最终的叶子结点
     * @param {*} column
     */
    getContainColumns(column) {
      if (column.$children.length) {
        const children = column.$children.filter(childrenVM => this.isColumnVM(childrenVM));
        return flatMap(children, this.getContainColumns);
      } else {
        return this.isColumnVM(column) ? [column] : [];
      }
    },
    /**
     * group下的children计算
     */
    getColumnChildren(column, level, result) {
      level = level + 1;
      if (column.$children.length) {
        result[level] = result[level] || [];
        const slotVMs = column.$slots.default || [];
        // 使用v-if后，$children里的顺序会变化，与$slots里的顺序不一样，这里需要重新排序
        column.$children.sort((column1, column2) => {
          const index1 = slotVMs.findIndex(slotVm => slotVm === column1.$vnode);
          const index2 = slotVMs.findIndex(slotVm => slotVm === column2.$vnode);
          return index1 - index2;
        });
        column.$children.forEach(columnVM => {
          if (!columnVM) return;
          if (!this.isColumnVM(columnVM)) return;
          // group才需要设置信息
          if (columnVM.$vnode && columnVM.$vnode.tag && columnVM.isGroup) {
            this.setGroupData(columnVM);
          }

          // 动态列逐步添加 th
          if (columnVM.$vnode && columnVM.$vnode.tag && columnVM.$vnode.tag.includes('-column-dynamic') && this.dynamicColumnVMsMap[columnVM._uid] && this.dynamicColumnVMsMap[columnVM._uid].vms) {
            result[level].push(...this.dynamicColumnVMsMap[columnVM._uid].vms);
          } else {
            result[level].push(columnVM);
          }
          this.getColumnChildren(columnVM, level, result);
        });
      }
    },
    /**
     * map存放数据
     */
    setColumnVMsMap(key, valueObj) {
      this.columnVMsMap[key] = this.columnVMsMap[key] || {};
      Object.assign(this.columnVMsMap[key], valueObj);
    },
    /**
     * column列里会有u-table-view-expander子组件，需要过滤掉
     */
    isColumnVM(columnVM) {
      return columnVM && columnVM.$vnode && columnVM.$vnode.tag && columnVM.$vnode.tag.includes('-column');
    },
    onChangePageSize(event) {
      this.currentPageSize = event.pageSize;
      const currentDataSource = this.currentDataSource;
      if (currentDataSource) {
        if (currentDataSource._load && typeof currentDataSource._load === 'function') {
          currentDataSource.clearLocalData();
        }
        currentDataSource.paging.size = event.pageSize;
        const initialPage = this.pageNumber !== undefined ? this.pageNumber : 1;
        if (currentDataSource.paging.number !== initialPage) {
          currentDataSource.paging.number = initialPage; // 会触发page的onchange事件，不用手动调用page
        } else {
          this.page(initialPage, event.pageSize);
        }
      }
    },
    onXScrollParentScroll(event) {
      this.syncHeadScroll();
    },
    loadTo(page) {
      const dataSource = this.currentDataSource;
      if (!(dataSource && dataSource.paging)) return;
      if (dataSource._load && typeof dataSource._load === 'function') {
        dataSource.clearLocalData();
      }
      let currentPage = page;
      if (['', null, undefined].includes(page)) {
        currentPage = dataSource.paging.number;
      }
      if (currentPage === dataSource.paging.number) {
        this.load(false, {
          number: currentPage
        });
      } else {
        dataSource.paging.number = page;
      }
    },
    onResizerDragEnd($event) {
      this.reHandleResize();
      this.$emit('resize', $event);
    },
    // for 外部调用
    resetEdit(item) {
      item.editing = '';
    },
    onScrollViewRenderTable(data) {
      this.$refs.footerRender && this.$refs.footerRender.syncScroll(data);
    }
  }
};
</script>
<style module>
.root {
    position: relative;
    /* 不能加这句，会使分页器的 Select 无法显示！ overflow: hidden; */
}

.root[editable] td{
    padding-top: 4px;
    padding-bottom: 4px;
    min-height: var(--table-view-editable-td-min-height);
    height: 1px;
}
.title {
    text-align: center;
    margin-bottom: var(--table-view-title-space);
}

.extra {
    float: right;
}

.body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.body[sticky-fixed] {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.pagination {
    text-align: right;
    margin-top: var(--table-view-pagination-space);
}

.dragHandler {
    cursor: var(--table-view-drag-cursor);
}
.dragHandler[disabled] {
    cursor: var(--table-view-drag-cursor-disabled);
    color: var(--table-view-drag-color-disabled);
}

.expand-td {
    /* transition: $transition-duration height ease-in-out, $transition-duration padding-top ease-in-out, $transition-duration padding-bottom ease-in-out; */
    background-color: var(--table-view-expand-td-background);
}

.spinner {
    margin-right: 4px;
}

.dropghost {
    position: absolute;
}
.dropghost .line {
    position: absolute;
    border: 1px solid red;
    width: 100%;
}
.dragGhost {
    position: absolute;
    z-index: -999;
    left: -9999px;
    top: -9999px;
}
.trdragGhost{
    overflow: clip;
}
.dragGhost[designer] {
    position: static;
    padding: 5px;
    background: rgb(250, 250, 250);
    border: 1px dashed rgb(195, 195, 195);
}
.dragGhost[designer] .text {
    display: block;
    margin-bottom: 5px;
}

@keyframes rotate {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}
</style>