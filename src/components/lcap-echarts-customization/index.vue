<template>
  <div :class="$style.root" border>
    <echart-bar
      v-if="!loading"
      :axisData="axisData"
      :size="size"
      :sourceData="sourceData"
      :sourceDataPredict="sourceDataPredict"
      @startLoading="startLoading"
      ref="echart"
    ></echart-bar>
    <div v-else :style="size">
      <img :src="require('./assets/barEmpty.png')" :class="$style.emptyImage">
    </div>
  </div>
</template>

<script>
import {fakeData} from "@/fakeData";
import echartBar from "@/component/echartBar";
import * as echarts from 'echarts';
import './theme';

Vue.prototype.$echarts = echarts
export default {
  name: 'lcap-echarts-customization',
  components: {echartBar},
  props: {
    dataSource: [Function, Array, Object],
    dataSourcePredict: [Function, Array, Object],
    theme: {type: String, default: 'theme1'},
    width: {type: String, default: '380px'},
    height: {type: String, default: '300px'},
    xAxis: {type: String, default: ''},
    yAxis: {type: String, default: ''},
    xAxisTitle: {type: String, default: '维度'},
    yAxisTitle: {type: String, default: '指标'},
    title: {type: String, default: ''},
    titleFontSize: {type: Number, default: 18},
    titleFontStyle: {type: String, default: 'normal'},
    allowDownload: {type: Boolean, default: true},
    allowShowLabel: {type: Boolean, default: true},
    allowShowHint: {type: Boolean, default: true},
    allowShowLegend: {type: Boolean, default: true},
    legendName: {type: String, default: ''},
    showXAxisLine: {type: Boolean, default: true},
    showYAxisLine: {type: Boolean, default: true},
    showXAxisLabel: {type: Boolean, default: true},
    showYAxisLabel: {type: Boolean, default: true},
    xAxisLabelRotate: {type: String, default: '0'},
  },
  data() {
    return {
      sourceData: undefined,
      sourceDataPredict: undefined,
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
        legendName: this.legendName,
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
    reload() {
      this.sourceData = 'fakeData';
      this.sourceDataPredict = 'fakeData';
      this.$nextTick(async () => {
        this.sourceData = await this.handleDataSource(this.dataSource);
        this.sourceDataPredict = await this.handleDataSource(this.dataSourcePredict);
        this.loading = false;
        this.$refs.echart && this.$refs.echart.reload();
        console.log('source', this.sourceData);
      });
    },
    async init() {
      // 本地启动和开发环境使用假数据，生产环境替换为真数据
      const fnDataSource = (this.$env.VUE_APP_DESIGNER || !window.appInfo) ? fakeData : this.dataSource;
      const fnDataSourcePredict = (this.$env.VUE_APP_DESIGNER || !window.appInfo) ? fakeData : this.dataSourcePredict;
      this.sourceData = await this.handleDataSource(fnDataSource);
      this.sourceDataPredict = await this.handleDataSource(fnDataSourcePredict);
    },
    // 删除不必要字段
    processRawData(data) {
      if (data.length === 0) {
        this.loading = true;
        return;
      }
      const content = Array.isArray(data) ? data: data.content;
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
    getData(dataSource) {
      if (typeof (dataSource) === 'string') {
        dataSource = dataSource.replace(/'/g, '"');
        return JSON.parse(dataSource);
      }
      return dataSource;
    },
    startLoading() {
      this.loading = true;
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

.emptyImage {
  width: 100%;
  height: 100%;
}
</style>
