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
      if (!content) {
        this.$emit("startLoading");
        return;
      }
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      let multiAxisList = [];
      if (this.$env.VUE_APP_DESIGNER) {
        multiAxisList = ['指标1', '指标2', '指标3'];
        this.axisData.xAxis = 'fakeXAxis';
      } else {
        multiAxisList = this.axisData.yAxis.replace(/\s+/g, '').split(',') || [];
      }
      let legendData = multiAxisList.length > 1 ? multiAxisList : [];
      legendData = this.$env.VUE_APP_DESIGNER ? ['指标1', '指标2', '指标3'] : legendData;
      const seriesData = [];
      multiAxisList.forEach((item) => {
        seriesData.push({
          name: item,
          type: 'bar',
          data: attrDict[item],
          showBackground: true,
          label: {
            show: this.axisData.allowShowLabel,
          },
        })
      })
      this.barOption = {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          show: this.axisData.allowShowLegend,
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


}
</script>

<style module>
.root {
}
</style>