<template>
  <div>
    <button type="button" class="cases-demo-excel-format__btn" @click="logTableData">
      查看当前表格数据
    </button>
    <u-table-view
      ref="table"
      :dataSource="dataSource"
      :excelMode="true"
      @excel-paste="onExcelPaste"
      @excel-delete="onExcelDelete"
      @excel-undo="onExcelUndo"
      @excel-redo="onExcelRedo"
    >
      <u-table-view-column :type="`checkbox`" :width="60"></u-table-view-column>
      <u-table-view-column :field="`entity1.count`" excelCellType="number">
        <template #title><u-text :text="`整数`"></u-text></template>
        <template #cell="current">
          <u-number-input :value.sync="current.item.entity1.count" :decimalLength="0"></u-number-input>
        </template>
      </u-table-view-column>
      <!-- 数据是小数，格子显示科学计数法；复制/粘贴拿的是 field 真值，不是上标字符串 -->
      <u-table-view-column :field="`entity1.decimalNum`" excelCellType="number" :width="160">
        <template #title><u-text :text="`小数(科学计数)`"></u-text></template>
        <template #cell="current">
          <span
            class="scientific-display"
            v-html="formatScientificNotationHtml(current.item.entity1.decimalNum)"
          ></span>
        </template>
      </u-table-view-column>
      <!-- amountDouble 不会跟着变：手改走 @change，粘贴走 excel-paste -->
      <u-table-view-column :field="`entity1.amount`" excelCellType="number">
        <template #title><u-text :text="`数字`"></u-text></template>
        <template #cell="current">
          <u-number-input
            :value.sync="current.item.entity1.amount"
            :decimalLength="2"
            @change="onAmountChange($event, current)"
          ></u-number-input>
        </template>
      </u-table-view-column>
      <u-table-view-column :field="`entity1.amountDouble`" excelCellType="number">
        <template #title><u-text :text="`测试项（2倍）`"></u-text></template>
        <template #cell="current">
          <u-number-input
            :value.sync="current.item.entity1.amountDouble"
            :decimalLength="2"
            :readonly="true"
          ></u-number-input>
        </template>
      </u-table-view-column>
      <u-table-view-column :field="`entity1.enabled`" excelCellType="boolean">
        <template #title><u-text :text="`布尔`"></u-text></template>
        <template #cell="current">
          <u-switch :value.sync="current.item.entity1.enabled"></u-switch>
        </template>
      </u-table-view-column>
      <u-table-view-column :field="`entity1.label`" excelCellType="string">
        <template #title><u-text :text="`字符串`"></u-text></template>
        <template #cell="current">
          <u-input :value.sync="current.item.entity1.label" placeholder="请输入"></u-input>
        </template>
      </u-table-view-column>
      <!-- 动态列：field、excelCellType 在 columnDynamicDataSource 每一项上配置 -->
      <u-table-view-column-dynamic
        :dataSource="columnDynamicDataSource"
        valueField="value"
        excelCellTypeField="excelCellType"
      >
        <template #title="current">
          <u-text :text="((current || {}).columnItem || {}).text"></u-text>
        </template>
        <template #cell="current">
          <u-text :text="displayDynCell(current)"></u-text>
        </template>
      </u-table-view-column-dynamic>
      <u-table-view-column :field="`entity1.birthDate`" excelCellType="string">
        <template #title><u-text :text="`日期`"></u-text></template>
        <template #cell="current">
          <u-date-picker :emptyValueIsNull="true" :value.sync="current.item.entity1.birthDate"></u-date-picker>
        </template>
      </u-table-view-column>
      <u-table-view-column :field="`entity1.startTime`" excelCellType="string">
        <template #title><u-text :text="`时间`"></u-text></template>
        <template #cell="current">
          <u-time-picker :value.sync="current.item.entity1.startTime"></u-time-picker>
        </template>
      </u-table-view-column>
      <u-table-view-column :field="`entity1.createdAt`" excelCellType="string">
        <template #title><u-text :text="`日期时间`"></u-text></template>
        <template #cell="current">
          <u-date-time-picker
            :emptyValueIsNull="true"
            :value.sync="current.item.entity1.createdAt"
            :converter="`json`"
          ></u-date-time-picker>
        </template>
      </u-table-view-column>
    </u-table-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      columnDynamicDataSource: [
        { value: 'entity1.dynScore', text: '动态整数', excelCellType: 'number' },
        { value: 'entity1.dynFlag', text: '动态布尔', excelCellType: 'boolean' },
      ],
      dataSource: {
        list: [
          {
            entity1: {
              count: 10,
              decimalNum: 1234567.89,
              amount: 1234.56,
              amountDouble: 2469.12,
              enabled: true,
              label: '示例一',
              dynScore: 88,
              dynFlag: true,
              birthDate: '2026-05-29',
              startTime: '09:30:00',
              createdAt: '2026-05-28T16:00:03.000Z',
            },
          },
          {
            entity1: {
              count: 2,
              decimalNum: 0.0000345,
              amount: 0.45,
              amountDouble: 0.9,
              enabled: false,
              label: '示例二',
              dynScore: 3,
              dynFlag: false,
              birthDate: '2027-02-01',
              startTime: '20:10:59',
              createdAt: '2027-01-31T22:35:10.000Z',
            },
          },
          {
            entity1: {
              count: 100,
              decimalNum: 0,
              amount: -99.9,
              amountDouble: -199.8,
              enabled: true,
              label: '示例三',
              dynScore: 0,
              dynFlag: true,
              birthDate: '2024-11-11',
              startTime: '14:05:30',
              createdAt: '2024-12-12T10:55:55.000Z',
            },
          },
        ],
      },
    };
  },
  methods: {
    logTableData() {
      const table = this.$refs.table;
      console.log('[CasesDemoExcelFormat] dataSource（外部绑定）', this.dataSource);
      if (!table) {
        console.warn('[CasesDemoExcelFormat] 表格 ref 未就绪');
        return;
      }
      console.log('[CasesDemoExcelFormat] 表格内部 currentData', table.currentData);
      console.log('[CasesDemoExcelFormat] 表格行数据', (table.currentData || []).map((wrap) => table.getRealSimpleItem(wrap)));
    },
    toSuperScript(numStr) {
      const map = {
        '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³',
        4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹',
      };
      return String(numStr).replace(/[-0-9]/g, (char) => map[char] || char);
    },
    // 只负责怎么显示；decimalNum 变了（含粘贴）会自动重算
    formatScientificNotationHtml(value) {
      if (!value || Number(value) === 0) {
        return '0';
      }
      const num = Number(value);
      if (Number.isNaN(num)) {
        return String(value);
      }
      const scientificNotation = num.toExponential();
      const parts = scientificNotation.split(/[eE]/);
      const numberPart = parts[0];
      let exponentPart = parts[1] ? parts[1].replace('+', '') : '0';
      const superScriptExponent = this.toSuperScript(exponentPart);
      return `${numberPart}×10${superScriptExponent}`;
    },
    displayDynCell(current) {
      if (!current) {
        return '';
      }
      const v = current.value;
      if (v === null || v === undefined) {
        return '';
      }
      if (typeof v === 'boolean') {
        return v ? 'true' : 'false';
      }
      return String(v);
    },
    syncAmountDouble(item) {
      if (!item || !item.entity1) {
        return;
      }
      const value = item.entity1.amount;
      if (value === null || value === undefined || value === '') {
        item.entity1.amountDouble = null;
        return;
      }
      item.entity1.amountDouble = Number(value) * 2;
    },
    syncAmountDoubleForRows(rows) {
      (rows || []).forEach((item) => this.syncAmountDouble(item));
    },
    syncAmountDoubleFromSnapshot(snapshot) {
      const table = this.$refs.table;
      if (!table || !snapshot) {
        return;
      }
      const rows = (snapshot.touchedWrapRows || []).map((wrap) => table.getRealSimpleItem(wrap));
      this.syncAmountDoubleForRows(rows);
    },
    // 手改「数字」列时，@change 会进来
    onAmountChange(event, current) {
      this.syncAmountDouble(current.item);
    },
    // 粘贴只改 field，不会触发 @change（新增行也一样），这里把两倍列补上
    onExcelPaste(event) {
      this.syncAmountDoubleForRows(event.rows);
      console.log('[CasesDemoExcelFormat] excel-paste', event);
    },
    onExcelDelete(event) {
      console.log('[CasesDemoExcelFormat] excel-delete', event);
    },
    onExcelUndo(event) {
      console.log('[CasesDemoExcelFormat] excel-undo', event);
    },
    onExcelRedo(event) {
      console.log('[CasesDemoExcelFormat] excel-redo', event);
    },
  },
};
</script>

<style scoped>
.cases-demo-excel-format__hint {
  margin: 0 0 12px;
  font-size: 14px;
  color: #666;
}

.cases-demo-excel-format__btn {
  margin-bottom: 12px;
}

.scientific-display {
  display: inline-block;
  padding: 4px 8px;
  font-size: 13px;
  color: #333;
  white-space: nowrap;
}
</style>
