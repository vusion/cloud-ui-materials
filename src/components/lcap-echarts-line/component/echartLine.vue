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
    size: [Object],
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
      let {axisData, sourceData} = this;
      return {axisData, sourceData};
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
    let thisChart = echarts.init(this.$refs.myChart, this.axisData.theme);
    removeEventListener("resize", function () {
      thisChart.resize();
    });
    thisChart.dispose();
    thisChart = null;
  },
  methods: {
    createMyChart() {
      const myChart = this.$refs.myChart;
      this.processLineData(this.sourceData);
      this.initChart(myChart, this.lineOption);
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
    processLineData(data) {
      const content = data && data.content;
      if (!content) return;
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!xAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查参数轴设置是否正确');
        return;
      }
      const multiAxisList = this.axisData.yAxis.replace(/\s+/g, '').split(',') || [];
      const legendData = multiAxisList.length > 1 ? multiAxisList : []
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
          type: 'line',
          data: attrDict[item],
          showBackground: true,
          label: {
            show: this.axisData.allowShowLabel,
          },
        })
      })
      this.lineOption = {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          show: this.axisData.allowShowLegend,
          top: '5%',
          left: 'center',
          data: legendData,
        },
        tooltip: {
          show: this.axisData.allowShowHint,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        emphasis: {
          focus: 'series',
        },
        title: {
          text: this.axisData.title,
          textStyle: {
            fontSize: this.axisData.titleFontSize,
            fontStyle: this.axisData.titleFontStyle,
          }
        },
        xAxis: {
          data: attrDict[this.axisData.xAxis],
          name: this.axisData.xAxisTitle || this.axisData.xAxis || '',
          nameLocation: 'end',
          axisLine: {
            show: this.axisData.showXAxisLine,
          },
          axisLabel: {
            show: this.axisData.showXAxisLabel,
            rotate: this.axisData.xAxisLabelRotate
          },
        },
        yAxis: {
          type: 'value',
          name: this.axisData.yAxisTitle || this.axisData.yAxis || '',
          axisLine: {
            show: this.axisData.showYAxisLine,
          },
          axisLabel: {
            show: this.axisData.showYAxisLabel,
          },
        },
        series: seriesData,
      };
    },
  },

};
</script>

<style module>
.root {
}
</style>
