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
    baseConfig: [Object],
    size: [Object],
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
        const thisChart = echarts.init(this.$refs.myChart, this.axisData.theme);
        thisChart.dispose();
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
      this.processPieData(this.sourceData);
      this.initChart(myChart, this.pieOption);
    },
    initChart(chart, config) {
      if (chart) {
        const thisChart = echarts.init(chart, this.axisData.theme);
        thisChart.setOption(config);
        window.addEventListener("resize", function () {
          thisChart.resize();
        });
      }
    },
    processPieData(data) {
      const content = data && data.content;
      if (!content) return;
      const pieData = [];
      const key = Object.keys(content[0])[0];
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!yAxisList.includes(this.axisData.yAxis) || !xAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查参数轴设置是否正确');
        return;
      }
      if (this.axisData.xAxisTitle || this.axisData.yAxisTitle) {
        this.$toast.show('饼图无法设置坐标轴标题');
      }
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
          bottom: '1%',
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
