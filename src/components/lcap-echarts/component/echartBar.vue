<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
import {processEchartData} from "@/tools";
import * as echarts from 'echarts/core'
export default {
  name: "echartBar",
  props: {
    sourceData: [Array, Object],
    baseConfig: {
      type: Object,
      default() {
        return {};
      },
    },
    size: {
      type: Object,
      default() {
        return {};
      },
    },
    axisData: [Object],
  },
  data() {
    return {
      barData: {},
      barOption: {},
    }
  },
  mounted() {
    this.createMyChart();
  },
  computed: {
    changedObj() {
      let {axisData, baseConfig, sourceData} = this;
      return {axisData, baseConfig, sourceData};
    }
  },
  watch: {
    changedObj: {
      handler() {
        this.createMyChart();
      },
      deep: true,
    }
  },
  beforeDestroy() {
    let thisChart = echarts.init(this.$refs.myChart, 'cloud-ui');
    removeEventListener("resize", function () {
      thisChart.resize();
    });
    thisChart.dispose();
    thisChart = null;
  },
  methods: {
    createMyChart() {
      const myChart = this.$refs.myChart;
      this.processBarData(this.sourceData);
      this.initChart(myChart, this.barOption);
    },
    initChart(chart, config) {
      if (chart) {
        const thisChart = echarts.init(chart, 'cloud-ui');
        thisChart.setOption(config);
        window.addEventListener("resize", function () {
          thisChart.resize();
        });
      }
    },
    processBarData(data) {
      const content = data && data.content;
      if (!content) return;
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!yAxisList.includes(this.axisData.yAxis) || !xAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查参数轴设置是否正确');
        return;
      }
      this.barOption = {
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {},
          }
        },
        xAxis: {
          data: attrDict[this.axisData.xAxis],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: attrDict[this.axisData.yAxis],
            showBackground: true,
            emphasis: {
              focus: 'series',
            },
            label: {
              show: true,
            },
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ],
        ...this.baseConfig,
      };
    },
  },


}
</script>

<style module>
.root {
}
</style>
