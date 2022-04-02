<template>
  <div :class="$style.root">
    <component :is="currentType" :baseConfig="baseConfig" :sourceData="sourceData"  :size="size" @getAxisData="getAxisList" :axisData="axisData"></component>
  </div>
</template>

<script>
import { fakeData } from "@/fakeData";
import echartBar from "@/component/echartBar";
import echartPie from "@/component/echartPie";
import echartLine from "@/component/echartLine";
import echarts from 'echarts';
Vue.prototype.$echarts = echarts

const echartTypeMap = {
  bar : 'echartBar',
  line: 'echartLine',
  pie: 'echartPie',
};
export default {
  name: 'lcap-echarts',
  components: { echartBar, echartLine, echartPie},
  props: {
    dataSource: [Function, Array, Object],
    chartType: {
      type: String,
      default: 'pie',
    },
    width: {
      type: String,
      default: '400px',
    },
    height: {
      type: String,
      default: '300px',
    },
    xAxis: {
      type: String,
      default: '',
    },
    yAxis: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '默认标题',
    },
    titleFontSize: {
      type: Number,
      default: 18,
    }

  },
  data() {
    return {
      sourceData: undefined,
      xAxisList: [],
      yAxisList: [],
    };
  },
  async created() {
    const fnDataSource = this.$env.VUE_APP_DESIGNER ? this.dataSource: fakeData;
    // const fnDataSource = fakeData;
    console.log(fnDataSource);
    const rawData = await this.handleDataSource(fnDataSource);
    this.sourceData = this.processRawData(rawData);
  },
  computed: {
    currentType() {
      return echartTypeMap[this.chartType];
    },
    size() {
      return {
        width: this.width,
        height: this.height,
      }
    },
    axisData() {
      return {
        xAxis: this.xAxis,
        yAxis: this.yAxis,
      }
    },
    baseConfig() {
      const myConfig = {
        title: {
          text: this.title,
          textStyle: {
            fontSize: this.fontSize,
          }
        },
      };
      return myConfig;
    }
  },
  mounted() {
  },
  methods: {
    init() {
    },
    getAxisList(data) {
      this.xAxisList = data[0];
      this.yAxisList = data[1];
    },
    // 删除不必要字段
    processRawData(data) {
      const content = data.content;
      const key = Object.keys(content[0])[0];
      // 删除自带的，不必要的属性
      for (let item of content) {
        const tempAttr = item[key];
        delete tempAttr.id && delete tempAttr.createdTime && delete tempAttr.updatedTime && delete tempAttr.createdBy && delete tempAttr.updatedBy
      }
      return data;
    },
    async handleDataSource(dataSource) {
      if (!dataSource) {
        return [];
      }
      if (dataSource instanceof Promise || typeof dataSource === 'function') {
        const result = await dataSource();
        return this.getData(result);
      }
      return this.getData(dataSource);
    },
    isDataSource(data) {
      return Object.prototype.toString.call(data) === '[object Object]' && data.content;
    },
    getData(dataSource) {
      if (Array.isArray(dataSource)) {
        return dataSource;
      } else if (this.isDataSource(dataSource)) {
        return dataSource;
      }
      return [];
    },
  }
};
</script>

<style module>
.root {
}
</style>
