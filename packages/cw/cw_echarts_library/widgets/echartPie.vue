<template>
  <div :class="$style.root">
    <div ref="myChart" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
const legendPositionMap = {
  top: {
    orient: 'horizontal',
    top: '7%',
    left: 'center',
  },
  bottom: {
    orient: 'horizontal',
    bottom: '0%',
    left: 'center',
  },
  left: {
    orient: 'vertical',
    top: 'middle',
    left: '0%',
  },
  right: {
    orient: 'vertical',
    top: 'middle',
    right: '0%',
  },
}
import * as echarts from 'echarts/dist/echarts.min.js';

export default {
  name: "echartPie",
  props: {
    sourceData: [Array, Object],
    axisData: [Object],
    customStyle: [Object],
    formatter: String,
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
      let {axisData, sourceData, customStyle, formatter} = this;
      return {axisData, sourceData, customStyle, formatter};
    },
    // formattedSize() {
    //   const styleWidth = this.customStyle.width && Number(this.customStyle.width.replace("px", "")) - 30;
    //   const styleHeight = this.customStyle.height && Number(this.customStyle.height.replace("px", ""));
    //   const propsWidth = this.size.width && this.size.width.replace("px", "");
    //   const propsHeight = this.size.height && this.size.height.replace("px", "");
    //   const width = styleWidth || propsWidth || 340;
    //   const height = styleHeight || propsHeight || 300;
    //   return {
    //     width: `${width}px`,
    //     height: `${height}px`,
    //   }
    // }
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
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
  methods: {
    reload() {
      if (this.chartInstance) {
        this.processPieData(this.sourceData);
        this.chartInstance.setOption(this.pieOption);
        this.$nextTick(() => {
          this.chartInstance.resize();
        });
      }
    },
    createMyChart() {
      const myChart = this.$refs.myChart;
      this.processPieData(this.sourceData);
      this.initChart(myChart, this.pieOption);
    },
    initChart(chart, config) {
      if (chart) {
        // this.$refs.myChart.removeAttribute('_echarts_instance_');
        if(this.chartInstance) {
          this.chartInstance.dispose();
          this.chartInstance = null;
        }
        this.chartInstance = echarts.init(chart, this.axisData.theme);
        this.chartInstance.setOption(config);
        this.chartInstance.on('click',(echartClickEvent)=>{
          this.$emit('clickItem',echartClickEvent);
        });
        this.$nextTick(() => {
          this.chartInstance.resize();
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
          const showZero = this.axisData.undefinedToZero === 'empty' ? null : 0;
          res.push(axisData || axisData === 0 ? this.recurGetValue(item, axis) : showZero);
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
      const pieSectorsColor = this.customStyle['--pie-sectors-color'] && this.customStyle['--pie-sectors-color'].split(' ');
      for (let index = 0; index < xAxisData.length; index++) {
        pieData.push({
          value: yAxisData[index],
          name: xAxisData[index],
          });
        if (pieSectorsColor && pieSectorsColor.length) {
          pieData.map((item, index) => {
            item.itemStyle = {color: pieSectorsColor[index]};
          })
        }
      }
      if (this.axisData.pieType === 'semiCircle') {
        const sum = yAxisData.reduce((total, num) => total + num);
        pieData.push({
          value: sum,
          itemStyle: {
            color: 'none',
            decal: {symbol: 'none'}
          },
          label: {show: false}
        })
      }
      return pieData;
    },
    generateLabelData() {
      if( this.formatter ) {
        return this.formatter;
      }
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
          type: this.axisData.legendScroll === 'normal' ? 'plain' : 'scroll',
          show: this.axisData.allowShowLegend,
          ...legendPositionMap[this.axisData.legendPosition],
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
            fontSize: this.customStyle['--echart-title-font-size'] || this.axisData.titleFontSize,
            color: this.customStyle['--title-font-color'] || '#000',
            fontStyle: this.axisData.titleFontStyle,
          }
        },
        series: [
          {
            type: 'pie',
            data: pieData,
            radius: this.axisData.pieType !== 'pie' ? ['40%', '65%'] : [0, '65%'],
            startAngle: this.axisData.pieType === 'semiCircle' ? 180 : 0,
            center: this.axisData.pieType === 'semiCircle' ? ['50%', '70%'] : ['50%', '50%'],
            label: {
              show: showLabel,
              formatter: labelData,
              color: this.customStyle['--label-font-color'],
              fontSize: this.customStyle['--label-font-size'],
              position: this.axisData.pieType !== 'pie' ? 'center' : 'outside',
            },
            itemStyle: this.axisData.pieType !== 'semiCircle' ? {
              borderColor: this.customStyle['--pie-sectors-border-color'],
              borderWidth: 1,
              borderRadius: 5,
            } : {
              borderRadius: 5,
            },
          }
        ],
      };
    },
    resize(){
      if(this.chartInstance){
        this.chartInstance.resize();
      }
    },
  },
}
</script>
<style module>
.root {
  width: 100%;
  height: 100%;
}

.canvasWrap {
  width: 100%;
  height: 100%;
}
</style>
