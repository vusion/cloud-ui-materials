<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
import {processEchartData} from "@/tools";
import * as echarts from 'echarts/core'

export default {
  name: "echartPie",
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
      pieData: {},
      pieOption: {},
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
      this.processPieData(this.sourceData);
      this.initChart(myChart, this.pieOption);
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
    processPieData(data) {
      const content = data && data.content;
      if (!content) return;
      const key = Object.keys(content[0])[0];
      processEchartData(data);
      const pieData = [];
      for (let item of content) {
        const tempAttr = item[key];
        pieData.push(
          {
            value: tempAttr[this.axisData.yAxis],
            name: tempAttr[this.axisData.xAxis],
          }
        );
      }
      this.pieOption = {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          top: '3%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
