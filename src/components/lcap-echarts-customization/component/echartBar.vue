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
    sourceDataPredict: [Array, Object],
    size: [Object],
    axisData: [Object],
  },
  data() {
    return {
      barData: {},
      barOption: {},
      currDataLength: 0,
      predictDataLength: 0,
    }
  },
  mounted() {
    this.createMyChart();
  },
  computed: {
    changedObj() {
      let {size, axisData, sourceData, sourceDataPredict} = this;
      return {size, axisData, sourceData, sourceDataPredict};
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
      this.processBarData(this.sourceData, this.sourceDataPredict);
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
      let res = [];
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
      // res = this.generateCurrentColorData(res, '#a90000');
      return res;
    },
    generateXAxisData(data, multiXAxisList, predictData) {
      let xAxisData = [];
      let xAxisTitleList = this.axisData.xAxisTitle.replace(/，/g, ",").replace(/\s+/g, '').split(',') || [];
      let xData = [];
      for (let item of multiXAxisList) {
        let xAxisData = this.getAxisData(data, item);
        let xAxisDataPredict = this.getAxisData(predictData, item);
        xData.push([...xAxisData, ...xAxisDataPredict]);
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
    generateSeriesData(data, multiYAxisList, predictData) {
      let seriesData = [];
      for (const item of multiYAxisList) {
        const seriesDataItem = this.getAxisData(data, item);
        this.currDataLength = seriesDataItem.length;
        const seriesDataColor = this.generateCurrentColorData(seriesDataItem);
        const seriesDataPredicted = this.getAxisData(predictData, item);
        this.predictDataLength = seriesDataPredicted.length;
        console.log(this.currDataLength, this.predictDataLength);
        const seriesDataPredictedColor = this.generatePredictColorData(seriesDataPredicted);
        seriesData.push({
          name: item,
          type: 'line',
          data: [...seriesDataColor, ...seriesDataPredictedColor],
          showBackground: true,
          label: {
            show: this.axisData.allowShowLabel,
          },
          stack: 'Total',
          lineStyle: {      // 阴影部分
            shadowOffsetX: 0, // 折线的X偏移
            shadowOffsetY: 6,// 折线的Y偏移
            shadowBlur: 10,  // 折线模糊
            shadowColor: "rgba(145, 132, 132, 1)", //折线颜色
          },
          },
        )
      }
      return seriesData;
    },
    generateCurrentColorData(list) {
      let objList = [];
      for (let item of list) {
        objList.push({
          value: item,
          itemStyle: {
              color: 'rgb(0, 110, 229)',
          },
        })
      }
      return objList;
    },
    generatePredictColorData(list) {
      let objList = [];
      for (let item of list) {
        objList.push({
          value: item,
          itemStyle: {
            color: 'rgb(132, 211, 93)'
          },
        })
      }
      return objList;
    },
    generateVisualMap(cur, pre){
      return [{
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex:0, //第一部分数据
        pieces: [{
          gt: 0,
          lte: cur,
          color: 'rgb(0, 103, 230, 0.7)',
        }, {
          gt: cur,
          lte: cur+ pre ,
          color: 'rgb(103, 202, 56, 0.7)',

        }]
      }]

    },
    processBarData(data, predictData) {
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
        multiYAxisList = ['指标1'];
        multiXAxisList = ['fakeXAxis'];
        legendData = ['指标1'];
      } else {
        // 制品应用生产环境
        legendData = multiYAxisList;
        this.axisData.xAxis = this.axisData.xAxis.split('.')[this.axisData.xAxis.split('.').length - 1] || '';
      }
      const seriesData = this.generateSeriesData(data, multiYAxisList, predictData);
      console.log('xAxisData', xAxisData);
      const xAxisData = this.generateXAxisData(data, multiXAxisList, predictData);
      if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
        xAxisData[0].data = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
      }
      let visualMapData = this.generateVisualMap(this.currDataLength, this.predictDataLength);
      console.log('xAxisData', xAxisData);
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
      this.barOption = this.generateEchartOption(legendData, seriesData, xAxisData, visualMapData);
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
    generateEchartOption(legendData, seriesData, xAxisData, visualMapData) {
      return {
        toolbox: {
          show: this.axisData.allowDownload,
          feature: {
            saveAsImage: {},
            magicType: { type: ['line', 'bar'] },
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
        visualMap: visualMapData,
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
