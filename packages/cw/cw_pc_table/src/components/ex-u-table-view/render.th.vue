<template>
    <th
        v-if="columnVM&&columnVM.colSpan !== 0"
        ref="th"
        :class="[$style['head-title'], boldHeader ? $style.boldHeader : null]"
        :key="columnIndex"
        :sortable="columnVM.sortable && sortTrigger === 'head'" :filterable="!!columnVM.filters" @click="columnVM.sortable && sortTrigger === 'head' && onClickSort(columnVM)"
        :disabled="columnVM.currentHidden"
        :colspan="columnVM.colSpan"
        :rowspan="columnVM.rowSpan"
        :ellipsis="columnVM.thEllipsis !== undefined? columnVM.thEllipsis : thEllipsis"
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
                </f-slot>
            </span>
        </template>
        <!-- Sortable -->
        <span v-if="columnVM.sortable" :class="$style.sort"
            :sorting="currentSorting && currentSorting.field === columnVM.field" :order="currentSorting && currentSorting.order"
            @click="sortTrigger === 'icon' && ($event.stopPropagation(), onClickSort(columnVM))"></span>
        <!-- Filterable -->
        <span v-if="columnVM.filters" :class="$style['filter-wrap']" :active="isFilterActive(columnVM.field)">
            <u-table-view-filters-popper
                :value="getFiltersValue(columnVM.field)"
                :data="columnVM.filters"
                :multiple="columnVM.filterMultiple || filterMultiple"
                :max="columnVM.filterMax || filterMax"
                @select="onSelectFilters(columnVM.field, $event)">
            </u-table-view-filters-popper>
        </span>
        <!-- Resizable -->
        <f-dragger v-if="resizable && columnIndex !== headTrLength - 1" axis="horizontal"
            @dragstart="onResizerDragStart($event, columnVM)"
            @drag="onResizerDrag($event, columnVM, columnIndex)"
            @dragend="onResizerDragEnd($event, columnVM, columnIndex)">
            <div :class="$style.resizer" @click.stop></div>
        </f-dragger>
    </th>
</template>

<script>
export default {
  name: 'u-table-render-th',
  inject: ['onClickSort', 'checkAll', 'onSelectFilters', 'getFiltersValue', 'isFilterActive', 'onResizerDragStart', 'onResizerDrag', 'onResizerDragEnd'],
  props: {
    columnVM: Object,
    columnIndex: Number,
    resizable: Boolean,
    sortTrigger: String,
    currentSorting: Object,
    disabled: Boolean,
    readonly: Boolean,
    boldHeader: Boolean,
    headTrLength: Number,
    currentValues: Array,
    currentData: Array,
    thEllipsis: Boolean
  },
  computed: {
    allChecked() {
      if (!this.currentData) return;
      let checkedLength = 0;
      if (this.values === undefined) {
        this.currentData.forEach(item => {
          if (item.checked) checkedLength++;
        });
      } else {
        if (this.valueField) {
          const hashSet = new Set();
          this.currentData.forEach(item => {
            const id = this.$at(item, this.valueField);
            hashSet.add(id);
          });
          checkedLength = this.currentValues.filter(v => hashSet.has(v)).length;
        } else {
          checkedLength = this.currentValues.length;
        }
      }
      if (checkedLength === 0) return false;else if (checkedLength === this.currentData.length) return true;else return null;
    }
  }
};
</script>
<style module src="./index.css"></style>

