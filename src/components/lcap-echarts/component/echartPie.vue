<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
// import {initChart} from "@/tools";
import * as echarts from 'echarts/core'

export default {
  name: "echartPie",
  props: {
    sourceData: {
      type: Object,
      default() {
        return {};
      },
    },
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
    xAxis: {
      type: String,
      default: '',
    },
    yAxis: {
      type: String,
      default: '',
    },
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
      let {xAxis, yAxis, baseConfig, sourceData} = this;
      return {xAxis, yAxis, baseConfig, sourceData};
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
      console.log(this.size);
    },
    initChart(chart, config) {
      if (chart) {
        const thisChart = echarts.init(chart);
        thisChart.setOption(config);
        window.addEventListener("resize", function () {
          thisChart.resize();
        });
      }
    },

    processPieData(data) {
      const content = data.content;
      const key = Object.keys(content[0])[0];
      const attrDict = {};
      // 删除自带的，不必要的属性, 根据数据类型分类x轴， y轴
      for (let item of content) {
        const tempAttr = item[key];
        delete tempAttr.id && delete tempAttr.createdTime && delete tempAttr.updatedTime && delete tempAttr.createdBy && delete tempAttr.updatedBy
        for (let attr in tempAttr) {
          if (!attrDict[attr]) attrDict[attr] = [];
          tempAttr[attr] ? attrDict[attr].push(tempAttr[attr]) : attrDict[attr].push('');
        }
      }
      console.log(attrDict);
      const attrList = Object.keys(attrDict);
      // x轴为饼图的分类轴，y为数值轴
      const yAxisList = [], xAxisList = [];
      for (let attr of attrList) {
        typeof (attrDict[attr][0]) === 'string' ? xAxisList.push(attr) : yAxisList.push(attr);
      }
      this.$emit('getAxisData', [xAxisList, yAxisList]);
      const yAxis = yAxisList.length > 0 ? yAxisList[0] : '';
      const xAxis = xAxisList.length > 0 ? xAxisList[0] : '';
      const pieData = [];
      for (let item of content) {
        const tempAttr = item[key];
        pieData.push(
          {
            value: tempAttr[yAxis],
            name: tempAttr[xAxis],
          }
        );
      }
      const tempOption = {
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
      }
      this.pieOption = tempOption;
    },
  },


}
</script>

<style module>
.root {
}
</style>
