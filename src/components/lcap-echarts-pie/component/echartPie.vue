<template>
  <div :class="$style.root">
    <div ref="myChart" :style="formattedSize" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
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
      let width = this.size.width.replace("px", "") || 340;
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
        this.reload();
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
    reload() {
      this.$refs.myChart.removeAttribute('_echarts_instance_');
      const thisChart = echarts.init(this.$refs.myChart, this.axisData.theme);
      thisChart.dispose();
      this.createMyChart();
    },
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
    // 递归列表中的数据，查找对应属性的值
    recurGetValue(obj, val) {
      if (!obj) return;
      if (obj.hasOwnProperty(val)) {
        return obj[val];
      }
      for (let item in obj) {
        if (Object.prototype.toString.call(obj[item]) === '[object Object]') {
          return this.recurGetValue(obj[item], val);
        }
      }
    },
    // 根据用户输入的坐标轴属性，返还对应数据
    getAxisData(data, axis) {
      if (!data || !data instanceof Object) return [];
      const res = [];
      if (Array.isArray(data)) {
        for (let item of data) {
          let axisData = this.recurGetValue(item, axis);
          if (axisData || axisData === 0) {
            res.push(this.recurGetValue(item, axis));
          }
        }
      } else {
        for (let item in data) {
          res.push(...this.getAxisData(data[item], axis))
        }
      }
      return res;
    },
    generatePieData(data, xAxisData, yAxisData) {
      let pieData = [];
      for (let index = 0; index < xAxisData.length; index++) {
        pieData.push({
            value: yAxisData[index],
            name: xAxisData[index],
          });
      }
      return pieData;
    },
    generateLabelData() {
      let labelData = '';
      labelData = this.axisData.showLabelName ? labelData + '{b}\t' : labelData + '';
      labelData = this.axisData.showLabelValue ? labelData + '{c}\n' : labelData + '';
      labelData = this.axisData.showLabelPercent ? labelData + '{d}%' : labelData + '';
      return labelData;
    },
    processPieData(data) {
      if (!data) {
        return;
      }
      this.axisData.xAxis = this.axisData.xAxis.split('.')[this.axisData.xAxis.split('.').length - 1] || '';
      this.axisData.yAxis = this.axisData.yAxis.split('.')[this.axisData.yAxis.split('.').length - 1] || '';
      // IDE开发环境坐标轴替换为假数据坐标轴字段
      if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
        this.axisData.xAxis = 'fakeXAxis';
        this.axisData.yAxis = '指标1';
      }
      let xAxisData = this.getAxisData(data, this.axisData.xAxis);
      let yAxisData = this.getAxisData(data, this.axisData.yAxis);
      const pieData = this.generatePieData(data, xAxisData, yAxisData);
      let labelData = this.generateLabelData();
      const showLabel = !this.axisData.showLabelName && !this.axisData.showLabelValue && !this.axisData.showLabelPercent ? false : true;
      const multiXAxisList = this.axisData.xAxis.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      const multiYAxisList = this.axisData.yAxis.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      // 发布部署后，如果无数据和维度指标多于一个，加载默认图片
      if (!this.$env.VUE_APP_DESIGNER) {
        if (xAxisData.length === 0 || yAxisData.length === 0) {
          this.$emit("startLoading");
          return;
        }
        if (multiYAxisList.length > 1 || multiXAxisList.length > 1) {
          this.$emit("startLoading");
          return;
        }
      }
      this.pieOption = this.generateEchartOption(pieData, showLabel, labelData);
    },
    generateEchartOption(pieData, showLabel, labelData) {
      return {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          show: this.axisData.allowShowLegend,
          bottom: '-1%',
          left: 'center',
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
    }
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
