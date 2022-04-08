<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {processEchartData} from "@/tools";

export default {
  name: "echartScatter",
  props: {
    sourceData: [Array, Object],
    baseConfig: [Object],
    size: [Object],
    axisData: [Object],
  },
  data() {
    return {
      scatterData: {},
      scatterOption: {},
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
      this.processScatterData(this.sourceData);
      this.initChart(myChart, this.scatterOption);
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
    processScatterData(data) {
      const content = data && data.content;
      if (!content) return;
      const key = Object.keys(content[0])[0];
      const [attrDict, xAxisList, yAxisList] = processEchartData(data);
      if (!yAxisList.includes(this.axisData.yAxis) || !yAxisList.includes(this.axisData.xAxis)) {
        this.$toast.show('请检查参数轴设置是否正确');
        return;
      }
      const scatterData = [];
      for (let item of content) {
        const tempAttr = item[key];
        scatterData.push([tempAttr[this.axisData.xAxis], tempAttr[this.axisData.yAxis]])
      }
      console.log(scatterData);
      this.scatterOption = {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        xAxis: {
          type: 'value',
          name: this.axisData.xAxisTitle || this.axisData.xAxis || '',
          nameLocation: 'end',
        },
        yAxis: {
          type: 'value',
          name: this.axisData.yAxisTitle || this.axisData.yAxis || '',
          nameLocation: 'end',
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 20,
            data: scatterData,
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
