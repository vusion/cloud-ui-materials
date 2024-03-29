<template>
  <div :class="$style.root" ref="room" >
    <div :class="$style.container" border :style="size">
        <echart-pie
          v-if="!loading"
          :axisData="axisData"
          :customStyle="customStyle"
          :sourceData="sourceData"
          :formatter="formatter"
          @startLoading="startLoading"
          ref="echart"
          @clickItem="$emit('clickItem', $event)"
      ></echart-pie>
      <div v-else>
        <img :src="require('../../assets/pieEmpty.png')" :class="$style.emptyImage">
      </div>
    </div>
  </div>
</template>

<script>
import echartPie from "@/widgets/echartPie";
import * as echarts from 'echarts';
import {fakeData} from "@/utils/fakeData";
import "../../utils/theme.js"
import Vue from 'vue';

Vue.prototype.$echarts = echarts;
let firstFlag = true;
export default {
  name: 'cw-echart-pie-view',
  components: {echartPie},
  props: {
    dataSource: [Function, Array, Object],
    theme: {type: String, default: 'theme1'},
    width: {type: String, default: '340px'},
    height: {type: String, default: '300px'},
    xAxis: {type: String, default: ''},
    yAxis: {type: String, default: ''},
    title: {type: String, default: '标题'},
    titleFontSize: {type: Number, default: 18},
    titleFontStyle: {type: String, default: 'normal'},
    allowDownload: {type: Boolean, default: true},
    allowShowHint: {type: Boolean, default: true},
    allowShowLegend: {type: Boolean, default: true},
    showLabelName: {type: Boolean, default: true},
    showLabelValue: {type: Boolean, default: true},
    showLabelPercent: {type: Boolean, default: true},
    pieType: {type: String, default: 'pie'},
    legendPosition: {type: String, default: 'bottom'},
    legendScroll: {type: String, default: 'normal'},
    initialLoad: {type: Boolean, default: true},
    undefinedToZero: {type: String, default: 'empty'},
    formatter: String,
  },
  data() {
    return {
      sourceData: undefined,
      loading: false,
      customStyle: {},
    };
  },
  created() {
    if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
      this.init();
    } else {
      if (firstFlag && !this.initialLoad) {
        this.startLoading();
      } else {
        this.init();
      }
      setTimeout(() => {
        firstFlag = false;
      }, 1000);
    }
  },
  mounted() {
    // 监听style样式变化
    this.customStyle = this.parseCustomStyle(this.$el);
    const observer = new MutationObserver(function (mutations) {
      mutations.map(function (mutation) {
        if (mutation.type === 'attributes') {
          this.customStyle = this.parseCustomStyle(this.$el);
        }
      }.bind(this));
    }.bind(this));
    observer.observe(this.$el, { attributes: true });
    this.mutationObserver = observer;
    this.resizeObserver = new ResizeObserver(()=>{
      this.$refs.echart.resize();
    });
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy(){
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.resizeObserver){
      this.resizeObserver.disconnect();
    }
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
        pieType: this.pieType,
        legendPosition: this.legendPosition,
        legendScroll: this.legendScroll,
        undefinedToZero: this.undefinedToZero,
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
    },
  },
  methods: {
    parseCustomStyle(element) {
      const cssList = element.style.cssText.split(';');
      const cssObj = {};
      cssList.forEach(item => {
        const [key, value] = item.split(':');
        if (key && value) {
          cssObj[key.trim()] = value.trim();
        }
      });
      return cssObj;
    },
    reload() {
      this.sourceData = 'fakeData'; //? 接受字符串吗
      this.$nextTick(async () => {
        this.sourceData = await this.handleDataSource(this.dataSource);
        this.loading = false;
        this.$refs.echart && this.$refs.echart.reload();
        // console.log('source', this.sourceData);
      });
    },
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

.emptyImage {
  width: 100%;
  height: 100%;
}

</style>
