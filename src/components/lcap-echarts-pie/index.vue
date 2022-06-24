<template>
  <div :class="$style.root" border>
    <echart-pie
      v-if="!loading"
      :axisData="axisData"
      :size="size"
      :sourceData="sourceData"
      @startLoading="startLoading"
    ></echart-pie>
    <div v-else :style="size">
      <img :src="require('./assets/pieEmpty.png')" :class="$style.emptyImage">
    </div>
  </div>
</template>

<script>
import {fakeData} from "@/fakeData";
import echartPie from "@/component/echartPie";
import * as echarts from 'echarts';
import './theme';

Vue.prototype.$echarts = echarts
export default {
  name: 'lcap-echarts-pie',
  components: {echartPie},
  props: {
    dataSource: [Function, Array, Object],
    theme: {type: String, default: 'theme1'},
    width: {type: String, default: '400px'},
    height: {type: String, default: '300px'},
    xAxis: {type: String, default: ''},
    yAxis: {type: String, default: ''},
    title: {type: String, default: '默认标题'},
    titleFontSize: {type: Number, default: 18},
    titleFontStyle: {type: String, default: 'normal'},
    allowDownload: {type: Boolean, default: true},
    allowShowHint: {type: Boolean, default: true},
    allowShowLegend: {type: Boolean, default: true},
    showLabelName: {type: Boolean, default: true},
    showLabelValue: {type: Boolean, default: true},
    showLabelPercent: {type: Boolean, default: true},
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
        theme: this.theme,
        title: this.title,
        titleFontSize: this.titleFontSize,
        titleFontStyle: this.titleFontStyle,
        allowDownload: this.allowDownload,
        allowShowHint: this.allowShowHint,
        allowShowLegend: this.allowShowLegend,
        showLabelName: this.showLabelName,
        showLabelValue: this.showLabelValue,
        showLabelPercent: this.showLabelPercent,
      }
    },
    changedObj() {
      let {xAxis, yAxis} = this;
      return {xAxis, yAxis};
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
  watch: {
    changedObj: {
      handler() {
        this.init();
      }
    }
  },
  methods: {
    async init() {
      // 本地启动和开发环境使用假数据，生产环境替换为真数据
      const fnDataSource = (this.$env.VUE_APP_DESIGNER || !window.appInfo) ? fakeData : this.dataSource;
      this.sourceData = await this.handleDataSource(fnDataSource);
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
