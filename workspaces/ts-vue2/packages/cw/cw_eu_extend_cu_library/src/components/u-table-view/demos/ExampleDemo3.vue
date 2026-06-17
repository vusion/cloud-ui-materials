<template>
  <div>
    <button type="button" @click="toggleExcelMode">{{ excelModeLabel }}</button>
    <label class="cases-demo-virtual__color">
      选区颜色
      <input v-model="excelModeSelectionColor" type="color" :disabled="!excelMode" />
      <input
        v-model="excelModeSelectionColor"
        type="text"
        class="cases-demo-virtual__colorText"
        :disabled="!excelMode"
        spellcheck="false"
      />
    </label>

    <div class="cases-demo-virtual__hint">
      请滚动表格（虚拟滚动），然后单击/拖拽圈选单元格，选区框应始终跟随。
    </div>

    <u-table-view
      :ref="`table_view_virtual`"
      :dataSource="dataSource"
      :excelMode="excelMode"
      :excelModeSelectionColor="excelModeSelectionColor"
      style="height: 520px;"
      :virtual="true"
      :itemHeight="36"
      :virtualCount="20"
      @excel-paste="onExcelPaste"
      @excel-copy="onExcelCopy"
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
  </div>
</template>

<script>
import UTableView from '../index.vue';
import UTableViewColumn from '../column.vue';

function buildRows(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      entity1: {
        property1: i % 2 === 0,
        property2: i,
        property4: `row_${i}`,
      },
    });
  }
  return list;
}

export default {
  components: {
    UTableView,
    UTableViewColumn,
  },
  data() {
    return {
      excelMode: true,
      excelModeSelectionColor: '#337eff',
      dataSource: {
        list: buildRows(500),
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
    formatCellText(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return typeof value === 'string' ? value : String(value);
    },
    onExcelPaste(event) {
      console.log('[CasesDemoVirtualScroll] excel-paste', event);
    },
    onExcelCopy(event) {
      console.log('[CasesDemoVirtualScroll] excel-copy', event);
    },
    onExcelDelete(event) {
      console.log('[CasesDemoVirtualScroll] excel-delete', event);
    },
    onExcelUndo(event) {
      console.log('[CasesDemoVirtualScroll] excel-undo', event);
    },
    onExcelRedo(event) {
      console.log('[CasesDemoVirtualScroll] excel-redo', event);
    },
  },
};
</script>

<style scoped>
.cases-demo-virtual__color {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  font-size: 14px;
  vertical-align: middle;
}

.cases-demo-virtual__colorText {
  width: 88px;
  font-family: monospace;
  font-size: 13px;
}

.cases-demo-virtual__hint {
  margin: 8px 0 12px;
  font-size: 12px;
  color: #666;
}
</style>

