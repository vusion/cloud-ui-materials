<template>
  <div :class="$style.root">
    <component :is="currentType" :baseConfig="baseConfig" :sourceData="sourceData" :size="size" :axisData="axisData"></component>
  </div>
</template>

<script>
import {fakeData} from "@/fakeData";
import echartBar from "@/component/echartBar";
import echartPie from "@/component/echartPie";
import echartLine from "@/component/echartLine";
import echartScatter from "@/component/echartScatter";
import echarts from 'echarts';
import './theme';
Vue.prototype.$echarts = echarts
const echartTypeMap = {
  bar: 'echartBar',
  line: 'echartLine',
  pie: 'echartPie',
  scatter: 'echartScatter'
};
export default {
  name: 'lcap-echarts',
  components: {echartBar, echartLine, echartPie, echartScatter},
  props: {
    dataSource: [Function, Array, Object],
    chartType: {
      type: String,
      default: 'pie',
    },
    theme: { type: [String, Object], default: 'cloud-ui' },
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
    };
  },
  async created() {
    const fnDataSource = this.$env.VUE_APP_DESIGNER ? fakeData : this.dataSource;
    // const fnDataSource = fakeData;
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
  display: inline-block;
}

.root[border] {
  border: 1px solid var(--border-color-base);
  padding: 15px;
}
</style>
