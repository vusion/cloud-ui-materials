<template>
  <div :class="$style.root" border>
    <echart-line
      v-if="!loading"
      :axisData="axisData"
      :size="size"
      :sourceData="sourceData"
    ></echart-line>
    <div v-else :class="$style.loading" :style="size">
      <u-loading size="large"></u-loading>
      正在加载或配置折线图中...
    </div>
  </div>
</template>

<script>
import {fakeData} from "@/fakeData";
import echartLine from "@/component/echartLine";
import echarts from 'echarts';
import './theme';

Vue.prototype.$echarts = echarts
export default {
  name: 'lcap-echarts-line',
  components: {echartLine},
  props: {
    dataSource: [Function, Array, Object],
    theme: {type: String, default: ''},
    width: {type: String, default: '400px'},
    height: {type: String, default: '300px'},
    xAxis: {type: String, default: ''},
    yAxis: {type: String, default: ''},
    xAxisTitle: {type: String, default: ''},
    yAxisTitle: {type: String, default: ''},
    title: {type: String, default: '默认标题'},
    titleFontSize: {type: Number, default: 18},
    titleFontStyle: {type: String, default: 'normal'},
    allowDownload: {type: Boolean, default: false},
    allowShowLabel: {type: Boolean, default: true},
    allowShowHint: {type: Boolean, default: true},
    allowShowLegend: {type: Boolean, default: true},
    showXAxisLine: {type: Boolean, default: true},
    showYAxisLine: {type: Boolean, default: true},
    showXAxisLabel: {type: Boolean, default: true},
    showYAxisLabel: {type: Boolean, default: true},
    xAxisLabelRotate: {type: Number, default: 0},
  },
  data() {
    return {
      sourceData: undefined,
      loading: false,
    };
  },
  created() {
    this.init();
  },
  computed: {
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
        xAxisTitle: this.xAxisTitle,
        yAxisTitle: this.yAxisTitle,
        theme: this.theme,
        title: this.title,
        titleFontSize: this.titleFontSize,
        titleFontStyle: this.titleFontStyle,
        allowDownload: this.allowDownload,
        allowShowLabel: this.allowShowLabel,
        allowShowHint: this.allowShowHint,
        allowShowLegend: this.allowShowLegend,
        showXAxisLine: this.showXAxisLine,
        showYAxisLine: this.showYAxisLine,
        showXAxisLabel: this.showXAxisLabel,
        showYAxisLabel: this.showYAxisLabel,
        xAxisLabelRotate: this.xAxisLabelRotate,
      }
    },
    changedObj() {
      let {xAxis, yAxis} = this;
      return {xAxis, yAxis};
    },
  },
  watch: {
    changedObj: {
      handler() {
        this.init();
      }
    }
  },
  methods: {
    async init() {
      this.loading = true;
      const fnDataSource = this.$env.VUE_APP_DESIGNER ? fakeData : this.dataSource;
      // const fnDataSource = fakeData;
      const rawData = await this.handleDataSource(fnDataSource);
      this.sourceData = this.processRawData(rawData);
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
      if (!this.xAxis || !this.yAxis) {
        this.loading = true;
        return
      }
      this.loading = false;
      return data;
    },
    async handleDataSource(dataSource) {
      this.loading = true;
      if (!dataSource) {
        return [];
      }
      if (dataSource instanceof Promise || typeof dataSource === 'function') {
        const result = await dataSource();
        this.loading = false;
        return this.getData(result);
      }
      this.loading = false;
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

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}

.root[border] {
  border: 1px solid var(--border-color-base);
  padding: 15px;
}
</style>
