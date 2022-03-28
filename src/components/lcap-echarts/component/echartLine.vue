<template>
  <div :class="$style.root">
    <div ref="myChart" :style="size"></div>
  </div>
</template>

<script>
// import {initChart} from "@/tools";
import * as echarts from 'echarts/core'

export default {
  name: "echartLine",
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
      lineData: {},
      lineOption: {},
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
      this.processLineData(this.sourceData);
      this.initChart(myChart, this.lineOption);
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

    processLineData(data) {
      const content = data.content;
      const key = Object.keys(content[0])[0];
      const attrDict = {};
      // 删除自带的，不必要的属性, 根据数据类型分类
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
      // x轴必须是非数字类型， y轴必须是数字类型
      const xAxisList = [], yAxisList = [];
      for (let attr of attrList) {
        typeof (attrDict[attr][0]) === 'string' ? xAxisList.push(attr) : yAxisList.push(attr);
      }
      this.$emit('getAxisData', [xAxisList, yAxisList]);
      // 初始化默认第一个x,y列表里的值
      const xAxis = xAxisList.length > 0 ? xAxisList[0] : '';
      const yAxis = yAxisList.length > 0 ? yAxisList[0] : '';
      const tempOption = {
        legend: {
          top: '5%',
          left: 'center'
        },
        xAxis: {
          data: attrDict[xAxis],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: attrDict[yAxis],
          }
        ],
        ...this.baseConfig,
      }
      this.lineOption = tempOption;
    },
  },


}
</script>

<style module>
.root {
}
</style>
