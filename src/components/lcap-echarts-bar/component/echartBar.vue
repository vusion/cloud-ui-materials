<template>
  <div :class="$style.root">
    <div ref="myChart" :style="formattedSize" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
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
      let {size, axisData, sourceData} = this;
      return {size, axisData, sourceData};
    },
    formattedSize() {
      let width = this.size.width.replace("px", "") || 380;
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
    },
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
      this.processBarData(this.sourceData);
      this.initChart(myChart, this.barOption);
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
          if (axisData) {
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
    generateXAxisData(data, multiXAxisList) {
      let xAxisData = [];
      let xAxisTitleList = this.axisData.xAxisTitle.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      let xData = [];
      for (let item of multiXAxisList) {
        xData.push(this.getAxisData(data, item))
      }
      for (let index = 0; index < xData.length; index++) {
        xAxisData.push({
            data: xData[index],
            name: xAxisTitleList[index] ||  multiXAxisList[index] || '',
            nameLocation: 'end',
            axisLine: {
              show: this.axisData.showXAxisLine,
            },
            axisLabel: {
              show: this.axisData.showXAxisLabel,
              rotate: Number(this.axisData.xAxisLabelRotate),
            },
          }
        )
      }
      return xAxisData;
    },
    generateSeriesData(data, multiYAxisList) {
      let seriesData = [];
      for (const item of multiYAxisList) {
        seriesData.push({
          name: item,
          type: 'bar',
          data: this.getAxisData(data, item),
          showBackground: true,
          label: {
            show: this.axisData.allowShowLabel,
          },
        })
      }
      return seriesData;
    },
    processBarData(data) {
      if (!data) {
        return;
      }
      console.log('x', this.axisData.xAxis);
      console.log('y', this.axisData.yAxis);
      let legendData;
      let multiYAxisList = this.axisData.yAxis.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      let multiXAxisList = this.axisData.xAxis.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      // 针对多层嵌套的坐标轴输入，取最后一个值
      multiYAxisList = multiYAxisList.map((item) => item.split('.')[item.split('.').length -1])
      multiXAxisList = multiXAxisList.map((item) => item.split('.')[item.split('.').length -1])
      // IDE开发环境坐标轴替换为假数据坐标轴字段
      if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
        multiYAxisList = ['指标1', '指标2', '指标3'];
        multiXAxisList = ['fakeXAxis'];
        legendData = ['指标1', '指标2', '指标3'];
      } else {
        // 制品应用生产环境
        legendData = multiYAxisList;
        this.axisData.xAxis = this.axisData.xAxis.split('.')[this.axisData.xAxis.split('.').length - 1] || '';
      }
      const seriesData = this.generateSeriesData(data, multiYAxisList);
      const xAxisData = this.generateXAxisData(data, multiXAxisList);
      // 发布部署后，如果字段不合法，加载默认图片
      if (!this.$env.VUE_APP_DESIGNER) {
        for (let axis of multiXAxisList) {
          if (this.getAxisData(data, axis).length === 0) {
            this.$emit("startLoading");
            return;
          }
        }
        for (let axis of multiYAxisList) {
          if (this.getAxisData(data, axis).length === 0) {
            this.$emit("startLoading");
            return;
          }
        }
      }
      this.barOption = this.generateEchartOption(legendData, seriesData, xAxisData);
    },
    // 处理自定义图例，开发环境修改成功，图例名称从"指标"->"别名"，生产环境会自动替换为真实数据
    legendFormatter(name) {
      let multiYAxisList = this.axisData.yAxis.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      let legendAliasList = this.axisData.legendName.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      legendAliasList = legendAliasList.filter((item) => item!== '');
      let fakeAliasList = ['别名1', '别名2', '别名3'];
      // 因为生产环境展示的是假数据，所以指标数量无法根据实际情况渲染，默认展示三个图例，通过更改值提示用户修改成功
      if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
        const showAxisList = ['指标1', '指标2', '指标3'];
        return (legendAliasList.length !== 0 && multiYAxisList.length === legendAliasList.length) ?
          fakeAliasList[showAxisList.indexOf(name)] : showAxisList[showAxisList.indexOf(name)];
      } else {
        // 如果数量匹配则显示别名，不匹配显示指标原始值
        return (legendAliasList.length !== 0 && multiYAxisList.length === legendAliasList.length) ?
          legendAliasList[multiYAxisList.indexOf(name)] : name;
      }
    },
    generateEchartOption(legendData, seriesData, xAxisData) {
      return {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
          }
        },
        legend: {
          show: this.axisData.allowShowLegend,
          data: legendData,
          formatter: this.legendFormatter,
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
        xAxis: xAxisData,
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
      }
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
