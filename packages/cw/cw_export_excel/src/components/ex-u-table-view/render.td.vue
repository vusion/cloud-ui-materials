<template>
    <td :class="$style.cell"
        :ellipsis="getTdEllipsis()"
        v-ellipsis-title
        :disabled="disabled"
        :tree-column="treeDisplay && columnIndex === treeColumnIndex">
        <!-- type === 'index' -->
        <span v-if="vm.type === 'index'">
            <template v-if="vm.autoIndex && usePagination && currentDataSource">
                {{ 1 + ((currentDataSource.paging.number - 1) * currentDataSource.paging.size) + rowIndex }}
            </template>
            <template v-else>{{ (vm.startIndex - 0) + rowIndex }}</template>
        </span>
        <!-- type === 'radio' -->
        <span v-if="vm.type === 'radio'">
            <u-radio
                :value="wrapItem.radioChecked"
                :disabled="item.disabled"
                @click.native="select(item, rowIndex)"
                :readonly="readonly">
            </u-radio>
        </span>
        <!-- type === 'checkbox' -->
        <span v-if="vm.type === 'checkbox'">
            <u-checkbox
                :value="wrapItem.checked"
                :label="$at(item, valueField)"
                :disabled="item.disabled || disabled"
                @check="check(wrapItem, $event.value)" :readonly="readonly">
            </u-checkbox>
        </span>
        <!-- type === 'expander' left -->
        <f-slot
            v-if="vm.type === 'expander' && vm.expanderPosition === 'left'"
            name="expander"
            :vm="vm"
            :props="{
                item: { ...wrapItem, __toggle: () => toggleExpanded(item) },
                value: $at(item, vm.field),
                vm,
                rowIndex,
                columnIndex,
                index: rowIndex,
                columnItem: vm.columnItem,
                toggle: () => toggleExpanded(item)
            }">
            <u-table-view-expander
               v-if="!vm.$scopedSlots.expander"
                :item="{ ...wrapItem, __toggle: () => toggleExpanded(item) }"
                @toggle="() => toggleExpanded(item)">
            </u-table-view-expander>
        </f-slot>
        <!-- tree -->
        <template v-if="treeDisplay && item.tableTreeItemLevel !== undefined && columnIndex === treeColumnIndex">
            <span :class="$style.indent" :style="{ paddingLeft: number2Pixel(20 * item.tableTreeItemLevel) }"></span>
            <span :class="$style.tree_expander" v-if="$at(item, hasChildrenField)" :expanded="item.treeExpanded" @click.stop="toggleTreeExpanded(item)" :loading="item.loading"></span>
            <span :class="$style.tree_placeholder" v-else></span>
        </template>
        <!-- type === 'dragHandler' -->
        <span v-if="vm.type === 'dragHandler'">
            <i-ico :class="$style.dragHandler" name="dragHandler" :draggable="handlerDraggable && item.draggable || undefined" :disabled="!(handlerDraggable && item.draggable)"></i-ico>
        </span>
        <!-- Editable text -->
        <template v-if="vm.type === 'editable'">
            <div @dblclick.stop="onSetEditing(item, vm)" :class="$style.editablewrap"
                :ellipsis="vm.ellipsis !== undefined? vm.ellipsis : ellipsis"
                :style="{width:getEditablewrapWidth(item, columnIndex, treeColumnIndex)}"
                :editing="item.editing === vm.field">
                <div>
                    <template v-if="item.editing === vm.field">
                        <f-slot name="editcell" :vm="vm" :props="{ item: item, value: $at(item, vm.field), vm, rowIndex: rowIndex, columnIndex, index: rowIndex }">
                            <span v-if="vm.field && !['radio', 'checkbox'].includes(vm.type)" :class="$style['column-field']">{{ vm.currentFormatter.format($at(item, vm.field)) }}</span>
                        </f-slot>
                    </template>
                    <template v-else>
                        <f-slot name="cell" :vm="vm" :props="{ item: item, value: $at(item, vm.field), vm, rowIndex: rowIndex, columnIndex, index: rowIndex, columnItem: vm.columnItem }">
                            <span v-if="vm.field && !['radio', 'checkbox'].includes(vm.type)" :class="$style['column-field']">{{ vm.currentFormatter.format($at(item, vm.field)) }}</span>
                        </f-slot>
                    </template>
                </div>
            </div>
        </template>
        <f-slot v-else name="cell" :vm="vm" :props="{ item: item, value: $at(item, vm.field), columnVM: vm, rowIndex, columnIndex, index: rowIndex, columnItem: vm.columnItem }">
            <span v-if="vm.field && !['radio', 'checkbox'].includes(vm.type)" :class="$style['column-field']">{{ vm.currentFormatter.format($at(item, vm.field) || item) }}</span>
        </f-slot>
        <!-- type === 'expander' right -->
        <f-slot
            v-if="vm.type === 'expander' && vm.expanderPosition === 'right'"
            name="expander"
            :vm="vm"
            :props="{
                item: { ...item, __toggle: () => toggleExpanded(item) },
                value: $at(item, vm.field),
                vm,
                rowIndex,
                columnIndex,
                index: rowIndex,
                columnItem: vm.columnItem,
                toggle: () => toggleExpanded(item)
            }">
            <u-table-view-expander
               v-if="!vm.$scopedSlots.expander"
                :item="{ ...item, __toggle: () => toggleExpanded(item) }"
                @toggle="() => toggleExpanded(item)">
            </u-table-view-expander>
        </f-slot>
    </td>
</template>
<script>
export default {
  name: 'u-table-render-td',
  inject: ['currentDataSource', 'toggleExpanded', 'number2Pixel'],
  props: {
    vm: Object,
    rowIndex: Number,
    index: Number,
    columnIndex: Number,
    columnItem: Object,
    item: [Object, String, Number],
    wrapItem: Object,
    valueField: String,
    readonly: Boolean,
    disabled: Boolean,
    usePagination: Boolean,
    ellipsis: Boolean,
    treeDisplay: Boolean,
    hasChildrenField: String,
    treeColumnIndex: Number,
    handlerDraggable: Boolean
  },
  methods: {
    getTdEllipsis() {
      const columnVM = this.vm;
      let ellipsis = false;
      if (columnVM.ellipsis === undefined) {
        ellipsis = this.ellipsis;
      } else {
        ellipsis = columnVM.ellipsis;
      }
      return ellipsis && columnVM.type !== 'editable';
    },
    select(item, rowIndex) {
      this.$emit('select', {
        item,
        rowIndex
      });
    },
    check(item, checked) {
      this.$emit('check', {
        item,
        checked
      });
    },
    toggleTreeExpanded(item) {
      this.$emit('tree-toggle-expanded', item);
    },
    /**
     * 编辑列
     * @param {*} item
     * @param {*} columnIndex
     * @param {*} treeColumnIndex
     */
    getEditablewrapWidth(item, columnIndex, treeColumnIndex) {
      if (this.treeDisplay && item.tableTreeItemLevel !== undefined && columnIndex === treeColumnIndex) {
        const width = 20 * (item.tableTreeItemLevel + 1) + 10;
        return `calc(100% - ${width}px)`;
      }
      return '100%';
    },
    onSetEditing(item, columnVM) {
      const fieldName = columnVM.field;
      item.editing = fieldName;
      if (columnVM.dblclickHandler) {
        columnVM.dblclickHandler({
          item,
          columnVM
        });
      }
    }
  }
};
</script>
<style module src="./index.css"></style>

