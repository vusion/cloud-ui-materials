<template>
  <div>
    <button type="button" @click="toggleExcelMode">{{ excelModeLabel }}</button>
    <button type="button" @click="logDataSources">输出数据源</button>
    <label class="cases-demo2-color">
      选区颜色
      <input v-model="excelModeSelectionColor" type="color" :disabled="!excelMode" />
      <input v-model="excelModeSelectionColor" type="text" class="cases-demo2-color__text" :disabled="!excelMode" spellcheck="false" />
    </label>
    <u-table-view
      :ref="`table_view_1`"
      :pagination="true"
      :pageSize="20"
      :pageNumber="1"
      :dataSource="dataSource"
      :excelMode="excelMode"
      :excelModeSelectionColor="excelModeSelectionColor"
      @excel-paste="onExcelPaste"
      @excel-copy="onExcelCopy"
      @excel-delete="onExcelDelete"
      @excel-undo="onExcelUndo"
      @excel-redo="onExcelRedo"
    >
      <template #loading></template>
      <template #error></template>
      <template #empty></template>
      <template #dragGhost="current"></template>
      <u-table-view-column :key="`table_view_column_10`" :type="`checkbox`" :width="60">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title></template>
        <template #cell="current"></template>
        <template #editcell="current"></template>
      </u-table-view-column>

      <u-table-view-column :key="`table_view_column_11`" :field="`entity1.property1`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`1.布尔`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="formatCellText((((current || {}).item || {}).entity1 || {}).property1)"></u-text>
        </template>
        <template #editcell="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_12`" :field="`entity1.property2`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`2.int`"></u-text>
        </template>
        <template #cell="current">
          <u-number-input :decimalPlacesOmitZero="true" :value.sync="current.item.entity1.property2"></u-number-input>
        </template>
        <template #editcell="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_13`" :field="`entity1.property3`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`3.decimal`"></u-text>
        </template>
        <template #cell="current">
          <u-number-input
            :decimalPlacesOmitZero="true"
            :value.sync="current.item.entity1.property3"
            :decimalPlacesValue="2"
            :decimalLength="2"
          ></u-number-input>
        </template>
        <template #editcell="current"></template>
        <template #expand-content="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_14`" :field="`entity1.property4`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`4.string`"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="(((current || {}).item || {}).entity1 || {}).property4"></u-text>
        </template>
        <template #editcell="current"></template>
        <template #expand-content="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_15`" :field="`entity1.property5`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`5.date`"></u-text>
        </template>
        <template #cell="current">
          <u-date-picker :emptyValueIsNull="true" :value.sync="current.item.entity1.property5"></u-date-picker>
        </template>
        <template #editcell="current"></template>
        <template #expand-content="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_16`" :field="`entity1.property6`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`6.time`"></u-text>
        </template>
        <template #cell="current">
          <u-time-picker :value.sync="current.item.entity1.property6"></u-time-picker>
        </template>
        <template #editcell="current"></template>
        <template #expand-content="current"></template>
      </u-table-view-column>
      <u-table-view-column :key="`table_view_column_17`" :field="`entity1.property7`">
        <template #expander="current">
          <u-table-view-expander :item="(current || {}).item"></u-table-view-expander>
        </template>
        <template #title>
          <u-text :text="`7.dateTime`"></u-text>
        </template>
        <template #cell="current">
          <u-date-time-picker :emptyValueIsNull="true" :value.sync="current.item.entity1.property7" :converter="`json`"></u-date-time-picker>
        </template>
        <template #editcell="current"></template>
        <template #expand-content="current"></template>
      </u-table-view-column>
    </u-table-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      excelMode: true,
      excelModeSelectionColor: '#337eff',
      dataSource: {
        list: [
          {
            entity1: {
              id: 3396862449831936,
              createdTime: '2026-05-29T03:02:37.000Z',
              updatedTime: '2026-05-29T03:02:37.000Z',
              createdBy: null,
              updatedBy: null,
              property1: true,
              property2: 1,
              property3: 1.1,
              property4: 'test',
              property5: '2026-05-29',
              property6: '11:02:26',
              property7: '2026-05-28T16:00:03.000Z',
            },
          },
          {
            entity1: {
              id: 1246712449831234,
              createdTime: '2027-01-15T09:15:21.000Z',
              updatedTime: '2027-02-01T14:22:44.000Z',
              createdBy: 'userA',
              updatedBy: 'userB',
              property1: false,
              property2: 2,
              property3: 9.81,
              property4: 'demo',
              property5: '2027-02-01',
              property6: '20:10:59',
              property7: '2027-01-31T22:35:10.000Z',
            },
          },
          {
            entity1: {
              id: 9856235125541234,
              createdTime: '2024-11-11T17:30:00.000Z',
              updatedTime: '2024-12-12T10:55:55.000Z',
              createdBy: 'admin',
              updatedBy: null,
              property1: true,
              property2: 3,
              property3: 0.0005,
              property4: 'foobar',
              property5: '2024-12-12',
              property6: '08:45:15',
              property7: '2024-12-11T21:17:09.000Z',
            },
          },
          {
            entity1: {
              id: 7777711111222222,
              createdTime: '2022-03-03T03:03:03.000Z',
              updatedTime: '2022-04-04T04:04:04.000Z',
              createdBy: 'someone',
              updatedBy: 'otheruser',
              property1: false,
              property2: 100,
              property3: -42.42,
              property4: 'mock数据',
              property5: '2022-04-04',
              property6: '00:00:00',
              property7: '2022-04-03T10:10:10.000Z',
            },
          },
        ],
      },
    };
  },
  computed: {
    excelModeLabel() {
      return this.excelMode ? '关闭 Excel 模式' : '开启 Excel 模式';
    },
  },
  methods: {
    toggleExcelMode() {
      this.excelMode = !this.excelMode;
    },
    logDataSources() {
      const table = this.$refs.table_view_1;
      console.log('[CasesDemo2] dataSource（外部绑定）', this.dataSource);
      if (!table) {
        console.warn('[CasesDemo2] 表格 ref 未就绪');
        return;
      }
      const { currentDataSource, currentData, data } = table;
      console.log('[CasesDemo2] 表格内部 currentDataSource', currentDataSource);
      console.log('[CasesDemo2] 表格内部 currentData', currentData);
      console.log('[CasesDemo2] 表格内部 data（sync 自 currentData）', data);
    },
    formatCellText(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    },
    onExcelPaste(event) {
      console.log('[CasesDemo2] excel-paste', event);
    },
    onExcelCopy(event) {
      console.log('[CasesDemo2] excel-copy', event);
    },
    onExcelDelete(event) {
      console.log('[CasesDemo2] excel-delete', event);
    },
    onExcelUndo(event) {
      console.log('[CasesDemo2] excel-undo', event);
    },
    onExcelRedo(event) {
      console.log('[CasesDemo2] excel-redo', event);
    },
  },
};
</script>

<style scoped>
.cases-demo2-color {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  font-size: 14px;
  vertical-align: middle;
}

.cases-demo2-color__text {
  width: 88px;
  font-family: monospace;
  font-size: 13px;
}
</style>
