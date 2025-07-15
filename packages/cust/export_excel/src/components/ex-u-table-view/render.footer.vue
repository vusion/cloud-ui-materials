<template>
  <div :class="$style['footer-calc']" ref="footer">
    <u-table :line="line" :sticky-fixed="useStickyFixed" :style="{ width: number2Pixel(tableWidth) }">
      <colgroup>
        <col v-for="(columnVM, columnIndex) in visibleColumnVMs" :key="columnIndex" :width="columnVM.computedWidth" />
      </colgroup>
      <tbody>
        <tr :class="$style.row">
          <td
            v-for="(columnVM, columnIndex) in visibleColumnVMs"
            :class="$style.cell"
            :style="getStyle('td', columnVM, {})"
            :last-left-fixed="isTdLastLeftFixed(columnVM, columnIndex, visibleColumnVMs, {}, 0)"
            :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs)"
            :shadow="
              (isTdLastLeftFixed(columnVM, columnIndex, visibleColumnVMs, {}, 0) && !scrollXStart) ||
              (isFirstRightFixed(columnVM, columnIndex, visibleColumnVMs) && !scrollXEnd)
            "
            :colspan="getItemColSpan({}, 0, columnIndex)"
            :rowspan="getItemRowSpan({}, 0, columnIndex)"
            :ellipsis="getTdEllipsis(columnVM)"
            v-ellipsis-title>
            <span>{{ formater(calcData[columnIndex], columnIndex) }}</span>
          </td>
        </tr>
      </tbody>
    </u-table>
  </div>
</template>

<script>
import i18nMixin from "@lcap-ui/src/mixins/i18n";
import UTableRender from './render.table.vue';
import isNumber from 'lodash/isNumber';
const CALC_TYPES = {
  SUM: 'sum',
  MAX: 'max',
  MIN: 'min',
  AVG: 'average'
};

// 计算类型配置
const CALC_CONFIG = {
  [CALC_TYPES.SUM]: {
    label: 'footerCalc',
    operation: values => values.reduce((a, b) => a + b, 0)
  },
  [CALC_TYPES.MAX]: {
    label: 'footerCalcMax',
    operation: values => Math.max.apply(null, values)
  },
  [CALC_TYPES.MIN]: {
    label: 'footerCalcMin',
    operation: values => Math.min.apply(null, values)
  },
  [CALC_TYPES.AVG]: {
    label: 'footerCalcAverage',
    operation: values => values.reduce((a, b) => a + b, 0) / values.length
  }
};
export default {
  name: 'u-table-render-footer',
  mixins: [i18nMixin('u-table-view')],
  extends: UTableRender,
  props: {
    visibleColumnVMs: {
      type: Array,
      required: true
    },
    currentData: {
      type: Array,
      required: true
    },
    currentDataSource: {
      type: Object,
      required: true
    },
    calcText: {
      type: String,
      default() {
        return '合计';
      }
    },
    calcType: {
      type: String,
      default: CALC_TYPES.SUM
    },
    calcFormater: Function
  },
  computed: {
    calcData() {
      return this.getCalculation(this.calcType);
    }
  },
  methods: {
    // 通用统计计算函数
    getCalculation(calcType = CALC_TYPES.SUM) {
      const config = CALC_CONFIG[calcType];
      if (!config) {
        throw new Error(`不支持的计算类型: ${calcType}`);
      }
      const currentData = this.currentData || [];
      const results = [];
      this.visibleColumnVMs.forEach((columnVM, columnIndex) => {
        if (columnIndex === 0) {
          results[columnIndex] = this.calcText || this.$tt(config.label);
        } else {
          let valueField = columnVM.field;
          if (this.currentDataSource && this.currentDataSource.isSimpleItem) {
            valueField = 'simple';
          }
          if (valueField) {
            const values = currentData.map(item => isNumber(this.$at(item, valueField)) ? this.$at(item, valueField) : NaN);
            const precisions = [];
            let notNumber = true;
            values.forEach(value => {
              if (!isNaN(value)) {
                notNumber = false;
                let decimal = ('' + value).split('.')[1];
                precisions.push(decimal ? decimal.length : 0);
              }
            });
            const precision = Math.max.apply(null, precisions);
            if (!notNumber) {
              const validValues = values.filter(value => !isNaN(Number(value)));
              if (validValues.length > 0) {
                const calcValue = config.operation(validValues);
                results[columnIndex] = parseFloat(calcValue.toFixed(Math.min(precision, 20)));
              } else {
                results[columnIndex] = '';
              }
            } else {
              results[columnIndex] = '';
            }
          } else {
            results[columnIndex] = '';
          }
        }
      });
      return results;
    },
    // 重构后的具体计算函数
    getSum() {
      return this.getCalculation(CALC_TYPES.SUM);
    },
    getMax() {
      return this.getCalculation(CALC_TYPES.MAX);
    },
    getMin() {
      return this.getCalculation(CALC_TYPES.MIN);
    },
    getAverage() {
      return this.getCalculation(CALC_TYPES.AVG);
    },
    syncScroll(data) {
      this.scrollXStart = data.scrollLeft === 0;
      this.scrollXEnd = data.scrollLeft >= data.scrollWidth - data.clientWidth;
      this.$refs.footer.scrollLeft = data.scrollLeft;
    },
    getTdEllipsis(columnVM) {
      let ellipsis = false;
      if (columnVM.ellipsis === undefined) {
        ellipsis = this.ellipsis;
      } else {
        ellipsis = columnVM.ellipsis;
      }
      return ellipsis && columnVM.type !== 'editable';
    },
    formater(value, index) {
      if (this.calcFormater && index !== 0) {
        return this.calcFormater({
          value,
          index
        });
      }
      return value;
    }
  }
};
</script>
<style module src="./index.css"></style>

