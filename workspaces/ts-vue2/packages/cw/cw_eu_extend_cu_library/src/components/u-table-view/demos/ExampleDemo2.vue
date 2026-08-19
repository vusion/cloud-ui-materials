<template>
  <u-table-view
    :dataSource="loadTableData"
    :pagination="true"
    :pageSize="10"
    :pageNumber="1"
    :showTotal="true"
    :excelMode="true"
    style="height: 520px;"
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

const MOCK_ALL_ROWS = Array.from({ length: 2 }, (_, index) => ({
  entity1: {
    property1: index % 2 === 0,
    property2: index + 1,
    property4: `row${index + 1}`,
  },
}));

export default {
  components: {
    UTableView,
    UTableViewColumn,
  },
  methods: {
    loadTableData(params) {
      const page = params.page || 1;
      const size = params.size || 20;
      const start = (page - 1) * size;
      return {
        list: MOCK_ALL_ROWS.slice(start, start + size),
        total: MOCK_ALL_ROWS.length,
      };
    },
    formatCellText(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    },
    onExcelPaste(event) {
      console.log('[ExampleDemo2] excel-paste', event);
    },
    onExcelDelete(event) {
      console.log('[ExampleDemo2] excel-delete', event);
    },
    onExcelUndo(event) {
      console.log('[ExampleDemo2] excel-undo', event);
    },
    onExcelRedo(event) {
      console.log('[ExampleDemo2] excel-redo', event);
    },
  },
};
</script>
