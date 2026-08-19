<template>
  <div class="sjbg-demo">
    <div class="sjbg-demo__toolbar">
      <span class="sjbg-demo__label">显示列：</span>
      <u-checkboxes :value.sync="visibleColumnKeys">
        <u-checkbox
          v-for="option in columnVisibilityOptions"
          :key="option.value"
          :label="option.value"
        >
          <template #item>
            <u-text :text="option.text"></u-text>
          </template>
        </u-checkbox>
      </u-checkboxes>
      <button type="button" class="sjbg-demo__btn" @click="logCurDataSource">
        获取当前数据源
      </button>
      <button type="button" class="sjbg-demo__btn" @click="exportExcel">
        导出 Excel
      </button>
    </div>
    <u-table-view
      ref="table"
      :class="`cw-style-height`"
      :pagination="true"
      :pageSize="20"
      :pageNumber="1"
      :dataSource="rows"
      :titleAlignment="`center`"
      :boldHeader="true"
      :configurable="false"
      :excelMode="true"
      :defaultColumnWidth="400"
      :showTotal="true"
      style="--cw-style-height: 1000px; height: 1000px;"
      @excel-paste="onExcelPaste"
    >
      <template #loading></template>
      <template #error></template>
      <template #empty></template>
      <template #dragGhost="current"></template>

      <u-table-view-column :key="`col_checkbox`" :type="`checkbox`" :width="60">
        <template #title></template>
        <template #cell="current"></template>
      </u-table-view-column>

      <u-table-view-column
        :key="`col_property1`"
        :field="`Entity1.property1`"
        v-if="isColumnVisible('1')"
      >
        <template #title>
          <u-text :text="`property1`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property1)"></u-text>
        </template>
      </u-table-view-column>

      <u-table-view-column
        :key="`col_property2`"
        :field="`Entity1.property2`"
        v-if="isColumnVisible('2')"
      >
        <template #title>
          <u-text :text="`property2`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property2)"></u-text>
        </template>
      </u-table-view-column>

      <u-table-view-column
        :key="`col_property3`"
        :field="`Entity1.property3`"
        v-if="isColumnVisible('3')"
      >
        <template #title>
          <u-text :text="`property3`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property3)"></u-text>
        </template>
      </u-table-view-column>

      <u-table-view-column
        :key="`col_property4`"
        :field="`Entity1.property4`"
        v-if="isColumnVisible('4')"
      >
        <template #title>
          <u-text :text="`property4`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property4)"></u-text>
        </template>
      </u-table-view-column>

      <u-table-view-column-group :key="`col_group`">
        <template #title>
          <u-text :text="`表格列分组`"></u-text>
        </template>

        <u-table-view-column
          :key="`group_property1`"
          :field="`Entity1.property1`"
          v-if="isColumnVisible('1')"
        >
          <template #title>
            <u-text :text="`property1`"></u-text>
          </template>
          <template #cell="current">
            <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property1)"></u-text>
          </template>
        </u-table-view-column>

        <u-table-view-column
          :key="`group_property2`"
          :field="`Entity1.property2`"
          v-if="isColumnVisible('2')"
        >
          <template #title>
            <u-text :text="`property2`"></u-text>
          </template>
          <template #cell="current">
            <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property2)"></u-text>
          </template>
        </u-table-view-column>

        <u-table-view-column
          :key="`group_property3`"
          :field="`Entity1.property3`"
          v-if="isColumnVisible('3')"
        >
          <template #title>
            <u-text :text="`property3`"></u-text>
          </template>
          <template #cell="current">
            <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property3)"></u-text>
          </template>
        </u-table-view-column>

        <u-table-view-column
          :key="`group_property4`"
          :field="`Entity1.property4`"
          v-if="isColumnVisible('4')"
        >
          <template #title>
            <u-text :text="`property4`"></u-text>
          </template>
          <template #cell="current">
            <u-text :text="formatCellText((((current || {}).item || {}).Entity1 || {}).property4)"></u-text>
          </template>
        </u-table-view-column>
      </u-table-view-column-group>
    </u-table-view>
  </div>
</template>

<script>
const datasource = {
  RequestId: '0020f655-ee22-4a6e-8a37-2f282b9e27d7',
  Code: 200,
  Message: '',
  Data: [
    {
      Entity1: {
        id: 3418904006757632,
        property1: '1',
        property2: '2',
        property3: '3',
        property4: '4',
        property5: '5',
        createdBy: null,
      },
      disabled: false,
    },
    {
      Entity1: {
        id: 3418904046660864,
        property1: '1111',
        property2: '2222',
        property3: '3333',
        property4: '4444',
        property5: '5555',
        createdBy: null,
      },
      disabled: false,
    },
    {
      Entity1: {
        id: 3418904085728512,
        property1: '111111',
        property2: '222222',
        property3: '333333',
        property4: '444444',
        property5: '555555',
        createdBy: null,
      },
      disabled: false,
    },
    {
      Entity1: {
        id: 3418904140164352,
        property1: '11',
        property2: '22',
        property3: '33',
        property4: '44',
        property5: '55',
        createdBy: null,
      },
      disabled: false,
    },
    {
      Entity1: {
        id: 3418904184859904,
        property1: '111',
        property2: '222',
        property3: '333',
        property4: '444',
        property5: '555',
        createdBy: null,
      },
      disabled: false,
    },
    {
      Entity1: {
        id: 3418904235109632,
        property1: '11111',
        property2: '22222',
        property3: '33333',
        property4: '44444',
        property5: '55555',
        createdBy: null,
      },
      disabled: false,
    },
  ],
};

const COLUMN_VISIBILITY_OPTIONS = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
];

export default {
  data() {
    return {
      columnVisibilityOptions: COLUMN_VISIBILITY_OPTIONS,
      visibleColumnKeys: ['1', '2', '3', '4'],
      rows: [],
    };
  },
  created() {
    this.rows = JSON.parse(JSON.stringify(datasource.Data));
    this.applyDisabledInit();
  },
  methods: {
    isColumnVisible(key) {
      return this.visibleColumnKeys.includes(key);
    },
    formatCellText(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    },
    applyDisabledInit() {
      this.rows.forEach((item) => {
        if (((item || {}).Entity1 || {}).property2 === '22') {
          item.disabled = true;
        }
      });
    },
    onExcelPaste() {
      const { list, total } = this.$refs.table.getCurDataSource();
      console.log('[ExampleDemo6] excel-paste, rows variable length:', this.rows.length,
        'getCurDataSource list length:', list.length, 'total:', total);
    },
    logCurDataSource() {
      const table = this.$refs.table;
      if (!table) {
        console.warn('[ExampleDemo6] 表格 ref 未就绪');
        return;
      }
      const { list, total } = table.getCurDataSource();
      console.log('[ExampleDemo6] rows 变量长度:', this.rows.length);
      console.log('[ExampleDemo6] getCurDataSource', { list, total });
    },
    exportExcel() {
      const table = this.$refs.table;
      if (!table) {
        console.warn('[ExampleDemo6] 表格 ref 未就绪');
        return;
      }
      table.exportExcel(1, 2000, 'ExampleDemo6');
    },
  },
};
</script>

<style scoped>
.sjbg-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px 16px;
  margin-bottom: 12px;
}

.sjbg-demo__label {
  flex-shrink: 0;
  line-height: 32px;
  font-size: 14px;
  color: #333;
}

.sjbg-demo__btn {
  flex-shrink: 0;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
