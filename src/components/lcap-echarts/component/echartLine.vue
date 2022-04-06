<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {processEchartData} from "@/tools";

export default {
  name: "echartLine",
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
      lineData: {},
      lineOption: {},
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

  methods: {
    createMyChart() {
      const myChart = this.$refs.myChart;
      this.processLineData(this.sourceData);
      this.initChart(myChart, this.lineOption);
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
    processLineData(data) {
      const content = data && data.content;
      if (!content) return;
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!yAxisList.includes(this.axisData.yAxis) || !xAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查参数轴设置是否正确');
        return;
      }
      this.lineOption = {
        legend: {
          top: '5%',
          left: 'center'
        },
        xAxis: {
          data: attrDict[this.axisData.xAxis],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: attrDict[this.axisData.yAxis],
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
