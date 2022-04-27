<template>
  <div :class="$style.root">
    <div ref="myChart" :style="formattedSize" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
import {processEchartData} from "@/tools";
import * as echarts from 'echarts/core'

export default {
  name: "echartPie",
  props: {
    sourceData: [Array, Object],
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
      let {size, axisData, sourceData} = this;
      return {size, axisData, sourceData};
    },
    formattedSize() {
      let width = this.size.width.replace("px", "") || 400;
      let height = this.size.height.replace("px", "") || 300;
      return {
        width: `${width}px`,
        height: `${height}px`,
      }
    }
  },
  watch: {
    changedObj: {
      handler() {
        this.$refs.myChart.removeAttribute('_echarts_instance_');
        const thisChart = echarts.init(this.$refs.myChart, this.axisData.theme);
        thisChart.dispose();
        this.createMyChart();
      },
      deep: true,
    }
  },
  beforeDestroy() {
    let thisChart = echarts.init(this.$refs.myChart, this.axisData.theme);
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
        this.$refs.myChart.removeAttribute('_echarts_instance_');
        const thisChart = echarts.init(chart, this.axisData.theme);
        thisChart.setOption(config);
        this.$nextTick(() => {
          thisChart.resize();
        });
      }
    },
    processPieData(data) {
      if (!data) {
        this.$emit("startLoading");
        return;
      }
      const content = Array.isArray(data) ? data: data.content;
      const pieData = [];
      const key = Object.keys(content[0])[0];
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      const multiXAxisList = this.axisData.xAxis.replace(/\s+/g, '').split(',') || [];
      const multiYAxisList = this.axisData.yAxis.replace(/\s+/g, '').split(',') || [];
      if (multiYAxisList.length > 1 || multiXAxisList.length > 1) {
        this.$emit("startLoading");
        this.$toast.single = true;
        this.$toast.show('饼图无法设置一个以上的维度', 3000);
        return;
      }
      if (this.$env.VUE_APP_DESIGNER) {
        this.axisData.xAxis = 'fakeXAxis';
        this.axisData.yAxis = '指标1';
      }
      this.axisData.xAxis = this.axisData.xAxis.split('.')[this.axisData.xAxis.split('.').length - 1] || '';
      this.axisData.yAxis = this.axisData.yAxis.split('.')[this.axisData.yAxis.split('.').length - 1] || '';
      for (let item of content) {
        const tempAttr = item[key];
        pieData.push(
          {
            value: tempAttr[this.axisData.yAxis],
            name: tempAttr[this.axisData.xAxis],
          }
        );
      }
      let labelData = '';
      labelData = this.axisData.showLabelName ? labelData + '{b}\t' : labelData + '';
      labelData = this.axisData.showLabelValue ? labelData + '{c}\n' : labelData + '';
      labelData = this.axisData.showLabelPercent ? labelData + '{d}%' : labelData + '';
      const showLabel = !this.axisData.showLabelName && !this.axisData.showLabelValue && !this.axisData.showLabelPercent ? false : true;
      this.pieOption = {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          show: this.axisData.allowShowLegend,
          bottom: '-2%',
          left: 'center'
        },
        tooltip: {
          show: this.axisData.allowShowHint,
          trigger: 'item',
        },
        emphasis: {
          focus: 'self',
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
        },
        title: {
          text: this.axisData.title,
          textStyle: {
            fontSize: this.axisData.titleFontSize,
            fontStyle: this.axisData.titleFontStyle,
          }
        },
        series: [
          {
            type: 'pie',
            data: pieData,
            label: {
              show: showLabel,
              formatter: labelData,
            }
          }
        ],
      };
    },
  },
}
</script>
<style module>
.root {
}

.canvasWrap {
  width: 100%;
  height: 100%;
}
</style>
