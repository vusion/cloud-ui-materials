<template>
  <div :class="$style.root">
    <div ref="myChart" :style="formattedSize" :class="$style.canvasWrap"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import case1 from '../cases/case1'

export default {
  name: "echartBasic",
  props: {
    sourceData: [Array, Object],
    size: [Object],
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
    let thisChart = echarts.init(this.$refs.myChart);
    thisChart.dispose();
    thisChart = null;
  },
  methods: {
    reload() {
      this.$refs.myChart.removeAttribute('_echarts_instance_');
      const thisChart = echarts.init(this.$refs.myChart);
      thisChart.dispose();
      this.createMyChart();
    },
    createMyChart() {
      const myChart = this.$refs.myChart;
      // console.log(case1)
      this.initChart(myChart, this.options);
    },
    initChart(chart, config) {
      if (chart) {
        this.$refs.myChart.removeAttribute('_echarts_instance_');
        const thisChart = echarts.init(chart);
        thisChart.setOption(config);
        this.$nextTick(() => {
          thisChart.resize();
        });
      }
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
