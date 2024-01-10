<template>
  <div :class="$style.root">
    <div ref="myChart" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'

export default {
  name: "echartBasic",
  props: {
    sourceData: [Array, Object], // 这个属性实际上不起作用
    axisData: [Object],
    options: [Object],
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
      let { axisData, sourceData, options} = this;
      return { axisData, sourceData, options};
    },
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
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
  methods: {
    reload() {
      if (this.chartInstance) {
        this.chartInstance.setOption(this.options);
        this.$nextTick(() => {
          this.chartInstance.resize();
        });
      }
    },
    createMyChart() {
      const myChart = this.$refs.myChart;
      this.initChart(myChart, this.options);
    },
    initChart(chart, config) {
      if (chart) {
        if(this.chartInstance) {
          this.chartInstance.dispose();
          this.chartInstance = null;
        }
        this.chartInstance = echarts.init(chart);
        this.chartInstance.setOption(config);
        this.chartInstance.on('click',(echartClickEvent)=>{
          this.$emit('clickItem',echartClickEvent);
        });
        this.$nextTick(() => {
          this.chartInstance.resize();
        });
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
