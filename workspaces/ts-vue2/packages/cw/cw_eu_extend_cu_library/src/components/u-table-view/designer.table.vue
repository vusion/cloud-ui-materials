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
                            <th
                                v-if="columnVM&&columnVM.colSpan !== 0"
                                ref="th"
                                :class="[$style['head-title'], boldHeader ? $style.boldHeader : null]"
                                :key="columnIndex"
                                :is-sub="columnVM.$attrs['is-sub']"
                                :vusion-scope-id="columnVM.$vnode.context.$options._scopeId"
                                :vusion-node-path="columnVM.$attrs['vusion-node-path']"
                                :vusion-node-tag="columnVM.$attrs['vusion-node-tag']"
                                :vusion-disabled-move="columnVM.$attrs['vusion-disabled-move']"
                                :vusion-disabled-duplicate="columnVM.$attrs['vusion-disabled-duplicate']"
                                :vusion-disabled-cut="columnVM.$attrs['vusion-disabled-cut']"
                                :vusion-template-title-node-path="columnVM.$attrs['vusion-template-title-node-path']"
                                :sortable="columnVM.sortable && sortTrigger === 'head'" :filterable="!!columnVM.filters" @click="columnVM.sortable && sortTrigger === 'head' && onClickSort(columnVM)"
                                :style="getStyle('th', columnVM)"
                                :last-left-fixed="isLastLeftFixed(columnVM, columnIndex, headTr)"
                                :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, headTr)"
                                :shadow="(isLastLeftFixed(columnVM, columnIndex, headTr) && (!scrollXStart || $env.VUE_APP_DESIGNER)) || (isFirstRightFixed(columnVM, columnIndex, headTr) && (!scrollXEnd || $env.VUE_APP_DESIGNER))"
                                :disabled="$env.VUE_APP_DESIGNER && columnVM.currentHidden"
                                :colspan="columnVM.colSpan"
                                :rowspan="columnVM.rowSpan"
                                :ellipsis="columnVM.thEllipsis !== undefined? columnVM.thEllipsis : thEllipsis"
                                :sub-form-drop-column="columnVM?.subFormDropColumn"
                                :sub-form-initial-column="columnVM?.subFormInitialColumn"
                                v-ellipsis-title>
                                <!-- type === 'checkbox' -->
                                <span v-if="columnVM.type === 'checkbox'">
                                    <u-checkbox :value="allChecked" @check="checkAll($event.value)" :disabled="disabled" :readonly="readonly"></u-checkbox>
                                </span>
                                <!-- Normal title -->
                                <template>
                                    <span vusion-slot-name="title" vusion-slot-name-edit="title" :class="$style['column-title']">
                                        <f-slot name="title" :vm="columnVM" :props="{ columnVM, columnIndex, columnItem: columnVM.columnItem }">
                                            {{ columnVM.title }}
                                            <s-empty
                                                v-if="!(columnVM.$slots && columnVM.$slots.title)
                                                    && !columnVM.title
                                                    && $env.VUE_APP_DESIGNER
                                                    && !!(columnVM.$attrs && columnVM.$attrs['vusion-node-path'])">
                                            </s-empty>
                                        </f-slot>
                                    </span>
                                </template>
                                <!-- Sortable -->
                                <span v-if="columnVM.sortable" :class="$style.sort"
                                    :sorting="currentSorting && currentSorting.field === columnVM.field" :order="currentSorting && currentSorting.order"
                                    @click="sortTrigger === 'icon' && ($event.stopPropagation(), onClickSort(columnVM))"></span>
                                <!-- Filterable -->
                                <span v-if="columnVM.filters" :class="$style['filter-wrap']" :active="isFilterActive(columnVM.field)">
                                    <!-- <u-table-view-filters :value="getFiltersValue(columnVM.field)" @select="onSelectFilters(columnVM.field, $event)">
                                        <u-table-view-filter v-for="filter in columnVM.filters" :key="filter.value" :value="filter.value">{{ filter.text }}</u-table-view-filter>
                                    </u-table-view-filters> -->
                                    <u-table-view-filters-popper
                                        :value="getFiltersValue(columnVM.field)"
                                        :data="columnVM.filters"
                                        :multiple="columnVM.filterMultiple || filterMultiple"
                                        :max="columnVM.filterMax || filterMax"
                                        @select="onSelectFilters(columnVM.field, $event)">
                                    </u-table-view-filters-popper>
                                </span>
                                <!-- Resizable -->
                                <f-dragger v-if="resizable && columnIndex !== headTr.length - 1" axis="horizontal"
                                    @dragstart="onResizerDragStart($event, columnVM)"
                                    @drag="onResizerDrag($event, columnVM, columnIndex)"
                                    @dragend="onResizerDragEnd($event, columnVM, columnIndex)">
                                    <div :class="$style.resizer" @click.stop></div>
                                </f-dragger>
                            </th>
                            </template>
                        </tr>
                    </thead>
                </u-table>
            </div>
            <div :class="$style.headPlaceholder" ref="headPlaceholder"></div>
            <div :class="$style.body" ref="body" :style="{ height: number2Pixel(bodyHeight) }" @scroll="onBodyScroll"
                :sticky-fixed="useStickyFixed">
                <f-scroll-view :class="$style.scrollcview" @scroll="onScrollView" ref="scrollView" :native="!!tableMetaIndex || $env.VUE_APP_DESIGNER" :hide-scroll="!!tableMetaIndex">
                <u-table ref="bodyTable" :class="$style['body-table']" :line="line" :striped="striped" :sticky-fixed="useStickyFixed" :style="{ width: number2Pixel(tableWidth)}">
                    <colgroup>
                        <col v-for="(columnVM, columnIndex) in visibleColumnVMs" :key="columnIndex" :width="columnVM.computedWidth">
                    </colgroup>
                    <tbody ref="virtual">
                        <template v-if="(!currentLoading && !currentError && !currentEmpty || pageable === 'auto-more' || pageable === 'load-more') && currentData && currentData.length">
                            <template v-for="(item, rowIndex) in virtualList">
                                <tr :class="[$style.row]" :color="item.rowColor" :selected="selectable && selectedItem === item"
                                v-if="item.display !== 'none'"
                                :draggable="rowDraggable && item.draggable || undefined"
                                :dragging="isDragging(item)"
                                :subrow="!!item.tableTreeItemLevel"
                                @dragstart="onDragStart($event, item, rowIndex + virtualIndex)"
                                @dragover="onDragOver($event, item, rowIndex + virtualIndex)"
                                @click="onClickRow($event, item, rowIndex + virtualIndex)"
                                @dblclick="onDblclickRow($event, item, rowIndex + virtualIndex)">
                                    <td ref="td" :class="$style.cell" v-for="(columnVM, columnIndex) in visibleColumnVMs"
                                        vusion-slot-name="cell"
                                        :key="columnIndex"
                                        :vusion-next="true"
                                        :vusion-disabled-move="columnVM.$attrs['vusion-disabled-move']"
                                        :vusion-disabled-duplicate="columnVM.$attrs['vusion-disabled-duplicate']"
                                        :vusion-disabled-cut="columnVM.$attrs['vusion-disabled-cut']"
                                        :vusion-node-tag="columnVM.$attrs['vusion-node-tag']"
                                        :vusion-template-cell-node-path="columnVM.$attrs['vusion-template-cell-node-path']"
                                        :vusion-template-editcell-node-path="columnVM.$attrs['vusion-template-editcell-node-path']"
                                        :vusion-scope-id="columnVM.$vnode.context.$options._scopeId"
                                        :vusion-node-path="columnVM.$attrs['vusion-node-path']"
                                        :vusion-disabled-selected="rowIndex !== 0"
                                        :style="getStyle('td', columnVM)"
                                        :last-left-fixed="isLastLeftFixed(columnVM, columnIndex, visibleColumnVMs)"
                                        :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs)"
                                        :shadow="(isLastLeftFixed(columnVM, columnIndex, visibleColumnVMs)) || (isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs))"
                                        :sub-form-drop-column="columnVM?.subFormDropColumn"
                                        :sub-form-initial-column="columnVM?.subFormInitialColumn"
                                        :disabled="columnVM.currentHidden">
                                        <div :class="$designer.tdmask" v-if="useMask && rowIndex !== 0"></div>
                                        <!--可视化占据的虚拟填充区域-->
                                        <div vusion-slot-name="cell" :plus-empty="typeCheck(columnVM.type) ? false : columnVM.$attrs['plus-empty']">
                                            <!-- type === 'index' -->
                                            <span v-if="columnVM.type === 'index'">{{ (columnVM.startIndex - 0) + rowIndex + virtualIndex }}</span>
                                            <!-- type === 'radio' -->
                                            <span v-if="columnVM.type === 'radio'">
                                                <u-radio :value="selectedItem === item" :disabled="item.disabled" :readonly="readonly"></u-radio>
                                            </span>
                                            <!-- type === 'checkbox' -->
                                            <span v-if="columnVM.type === 'checkbox'">
                                                <u-checkbox :value="item.checked" :label="$at(item, valueField)" :disabled="item.disabled || disabled" :readonly="readonly"></u-checkbox>
                                            </span>

                                            <!-- type === 'expander' left -->
                                            <f-slot
                                                v-if="columnVM.type === 'expander' && columnVM.expanderPosition === 'left'"
                                                name="expander"
                                                :vm="columnVM"
                                                :props="{
                                                    item: getRealItem(item, rowIndex + virtualIndex),
                                                    value: $at(item, columnVM.field),
                                                    columnVM,
                                                    rowIndex,
                                                    columnIndex,
                                                    index: rowIndex,
                                                    columnItem: columnVM.columnItem,
                                                }">
                                                <u-table-view-expander
                                                    :item="getRealItem(item, rowIndex + virtualIndex)">
                                                </u-table-view-expander>
                                            </f-slot>

                                            <template v-if="treeDisplay && item.tableTreeItemLevel !== undefined && columnIndex === treeColumnIndex">
                                                <span :class="$style.indent" :style="{ paddingLeft: number2Pixel(20 * item.tableTreeItemLevel) }"></span>
                                                <span :class="$style.tree_expander" v-if="$at(item, hasChildrenField)" :expanded="item.treeExpanded" @click.stop="toggleTreeExpanded(item)" :loading="item.loading"></span>
                                                <span :class="$style.tree_placeholder" v-else></span>
                                            </template>
                                            <!-- Normal text -->
                                            <f-slot name="cell" :vm="columnVM" :props="{ item: getRealItem(item, rowIndex + virtualIndex), value: $at(item, columnVM.field), columnVM, rowIndex, columnIndex, index: rowIndex, columnItem: columnVM.columnItem }">
                                                <span v-if="columnVM.field && !['radio', 'checkbox'].includes(columnVM.type)" vusion-slot-name="cell" :class="$style['column-field']">{{ columnVM.currentFormatter.format($at(item, columnVM.field) || item) }}</span>
                                            </f-slot>
                                            <!-- type === 'dragHandler' -->
                                            <span v-if="columnVM.type === 'dragHandler'">
                                                <i-ico :class="$style.dragHandler" name="dragHandler" :draggable="handlerDraggable && item.draggable || undefined" :disabled="!(handlerDraggable && item.draggable)"></i-ico>
                                            </span>

                                            <!-- type === 'expander' right -->
                                            <f-slot
                                                v-if="columnVM.type === 'expander' && columnVM.expanderPosition === 'right'"
                                                name="expander"
                                                :vm="columnVM"
                                                :props="{
                                                    item: getRealItem(item, rowIndex + virtualIndex),
                                                    value: $at(item, columnVM.field),
                                                    columnVM,
                                                    rowIndex,
                                                    columnIndex,
                                                    index: rowIndex,
                                                    columnItem: columnVM.columnItem,
                                                }">
                                                <u-table-view-expander
                                                    :item="getRealItem(item, rowIndex + virtualIndex)">
                                                </u-table-view-expander>
                                            </f-slot>
                                        </div>
                                        <div v-if="columnVM.type === 'editable'" vusion-slot-name="editcell" :plus-empty="columnVM.$attrs['editcell-plus-empty']" style="margin-top:10px">
                                            <f-slot name="editcell" :vm="columnVM" :props="{ item: getRealItem(item, rowIndex + virtualIndex), value: $at(item, columnVM.field), columnVM, rowIndex, columnIndex, index: rowIndex }">
                                            </f-slot>
                                        </div>
                                    </td>
                                </tr>
                                <template v-if="expanderColumnVM && rowIndex===0">
                                    <tr :class="$style['expand-content']">
                                        <f-collapse-transition>
                                            <td :colspan="visibleColumnVMs.length" :class="$style['expand-td']"
                                            vusion-slot-name="expand-content"
                                            :vusion-disabled-selected="true"
                                            :vusion-node-tag="expanderColumnVM.$attrs['vusion-node-tag']"
                                            :vusion-template-expand-content-node-path="expanderColumnVM.$attrs['vusion-template-expand-content-node-path']"
                                            :vusion-scope-id="expanderColumnVM.$vnode.context.$options._scopeId"
                                            :vusion-node-path="expanderColumnVM.$attrs['vusion-node-path']"
                                            style="background: #F7F8FA;">
                                                <div :plus-empty="expanderColumnVM.$attrs['expand-content-plus-empty']" color="inverse"></div>
                                                <f-slot name="expand-content" :vm="expanderColumnVM" :props="{ item, value: $at(item, expanderColumnVM.field), columnVM: expanderColumnVM, rowIndex, index: rowIndex }">
                                                </f-slot>
                                            </td>
                                        </f-collapse-transition>
                                    </tr>
                                </template>
                            </template>
                        </template>
                        <tr key="no-data-source" v-if="currentData === undefined && !currentError && $env.VUE_APP_DESIGNER">
                            <td :class="$style.center" :colspan="visibleColumnVMs.length">
                                请绑定数据源
                            </td>
                        </tr>
                        <tr key="loading" v-else-if="(currentData === undefined && !currentError) || currentLoading"><!-- 初次加载与加载更多 loading 合并在一起 -->
                            <td :class="[$style.center, $style.centerSticky]" :colspan="visibleColumnVMs.length">
                                <div :class="$style.wrap" :style="{ width: rootWidth? number2Pixel(rootWidth): undefined }" vusion-slot-name="loading">
                                    <f-slot name="loading" :vm="$parent"><u-spinner :class="$style.spinner"></u-spinner> {{ loadingText }}</f-slot>
                                    <s-empty v-if="$env.VUE_APP_DESIGNER
                                        && !($parent.$slots && $parent.$slots.loading)
                                        && !($parent.$scopedSlots && $parent.$scopedSlots.loading && $parent.$scopedSlots.loading())
                                        && !!$parent.$attrs['vusion-node-path']">
                                    </s-empty>
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
                                    <s-empty v-if="$env.VUE_APP_DESIGNER
                                        && !($parent.$slots && $parent.$slots.error)
                                        && !($parent.$scopedSlots && $parent.$scopedSlots.error && $parent.$scopedSlots.error())
                                        && !!$parent.$attrs['vusion-node-path']">
                                    </s-empty>
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
                                    <s-empty v-if="$env.VUE_APP_DESIGNER
                                        && !($parent.$slots && $parent.$slots.empty)
                                        && !($parent.$scopedSlots && $parent.$scopedSlots.empty && $parent.$scopedSlots.empty())
                                        && !!$parent.$attrs['vusion-node-path']">
                                    </s-empty>
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
import UTableRender from './render.table.vue';
export default {
  name: 'u-table-designer',
  extends: UTableRender,
  methods: {
    typeCheck(type) {
      return ['index', 'radio', 'checkbox', 'expander'].includes(type);
    }
  }
};
</script>
<style module="$designer">
.tdmask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: -1px;
    background: white;
    opacity: 0.8;
    z-index: 999;
}
</style>