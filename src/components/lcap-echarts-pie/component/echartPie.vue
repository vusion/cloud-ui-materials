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
        this.$toast.show('请检查指标设置是否正确');
        return;
      }
      const multiAxisList = this.axisData.yAxis.replace(/\s+/g, '').split(',') || [];
      if (multiAxisList.length > 1) {
        this.$toast.show('饼图无法设置一个以上的维度');
        return;
      }
      if (this.axisData.xAxisTitle || this.axisData.yAxisTitle) {
        this.$toast.show('饼图无法设置维度和指标的标题');
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
      let labelData = '';
      labelData = this.axisData.showLabelName ? labelData + '{b}\t' : labelData + '';
      labelData = this.axisData.showLabelValue ? labelData + '{c}\n' : labelData + '';
      labelData = this.axisData.showLabelPercent ? labelData + '{d}%' : labelData + '';

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
        label: {
          formatter: labelData,
        },
        emphasis: {
          focus: 'series',
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
</style>
