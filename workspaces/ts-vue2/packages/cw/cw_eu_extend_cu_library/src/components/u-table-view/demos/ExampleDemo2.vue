<template>
  <u-table-view
    :dataSource="dataSource"
    :excelMode="true"
    @excel-paste="onExcelPaste"
    @excel-delete="onExcelDelete"
    @excel-undo="onExcelUndo"
    @excel-redo="onExcelRedo"
  >
    <u-table-view-column :type="`checkbox`" :width="60"></u-table-view-column>
    <u-table-view-column :field="`entity1.property1`">
      <template #title><u-text :text="`1.布尔`"></u-text></template>
      <template #cell="current">
        <u-text :text="formatCellText((((current || {}).item || {}).entity1 || {}).property1)"></u-text>
      </template>
    </u-table-view-column>
    <u-table-view-column :field="`entity1.property2`">
      <template #title><u-text :text="`2.int`"></u-text></template>
      <template #cell="current">
        <u-number-input :value.sync="current.item.entity1.property2"></u-number-input>
      </template>
    </u-table-view-column>
    <u-table-view-column :field="`entity1.property4`">
      <template #title><u-text :text="`4.string`"></u-text></template>
      <template #cell="current">
        <u-text :text="(((current || {}).item || {}).entity1 || {}).property4"></u-text>
      </template>
    </u-table-view-column>
  </u-table-view>
</template>

<script>
import UTableView from '../index.vue';
import UTableViewColumn from '../column.vue';

export default {
  components: {
    UTableView,
    UTableViewColumn,
  },
  data() {
    return {
      dataSource: {
        list: [
          {
            entity1: {
              property1: true,
              property2: 1,
              property4: 'row1',
            },
          },
          {
            entity1: {
              property1: false,
              property2: 2,
              property4: 'row2',
            },
          },
        ],
      },
    };
  },
  methods: {
    formatCellText(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    },
    onExcelPaste(event) {
      console.log('[CasesDemoPasteNoPage] excel-paste', event);
    },
    onExcelDelete(event) {
      console.log('[CasesDemoPasteNoPage] excel-delete', event);
    },
    onExcelUndo(event) {
      console.log('[CasesDemoPasteNoPage] excel-undo', event);
    },
    onExcelRedo(event) {
      console.log('[CasesDemoPasteNoPage] excel-redo', event);
    },
  },
};
</script>
