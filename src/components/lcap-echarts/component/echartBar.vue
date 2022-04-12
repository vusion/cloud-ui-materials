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
    baseConfig: [Object],
    size: [Object],
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
      this.processBarData(this.sourceData);
      this.initChart(myChart, this.barOption);
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
    processBarData(data) {
      const content = data && data.content;
      if (!content) return;
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!xAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查维度设置是否正确');
        return;
      }
      const multiAxisList = this.axisData.yAxis.replace(/\s+/g, '').split(',') || [];
      const multiAxisTitleList = this.axisData.yAxisTitle.replace(/\s+/g, '').split(',') || [];
      const legendData = (multiAxisTitleList.length !== 0 && multiAxisTitleList.length === multiAxisList.length) ? multiAxisTitleList : multiAxisList;
      for (let axis of multiAxisList) {
        if (!yAxisList.includes(axis)) {
          this.$toast.show('请检查指标设置是否正确');
          return;
        }
      }
      const seriesData = [];
      multiAxisList.forEach((item) => {
        seriesData.push({
          name: item,
          type: 'bar',
          data: attrDict[item],
          showBackground: true,
          emphasis: {
            focus: 'series',
          },
          label: {
            show: true,
          },
        })
      })
      this.barOption = {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          data: legendData,
        },
        xAxis: {
          data: attrDict[this.axisData.xAxis],
          name: this.axisData.xAxisTitle || this.axisData.xAxis || '',
          nameLocation: 'end',
        },
        yAxis: {
          type: 'value',
        },
        series: seriesData,
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
