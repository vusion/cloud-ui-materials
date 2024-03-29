<template>
  <div :class="$style.root" ref="room"> 
    <div :class="$style.container" border>
      <echart-basic
        v-if="!loading"
        :sourceData="sourceData"
        :options="options"
        @startLoading="startLoading"
        ref="echart"
        @clickItem="$emit('clickItem', $event)"
      ></echart-basic>
      <div v-else>
        <img :src="require('../../assets/barEmpty.png')" :class="$style.emptyImage">
      </div>
    </div>

  </div>
</template>

<script>
import echartBasic from "@/widgets/echartBasic";
import * as echarts from 'echarts';
import {fakeData} from "@/utils/fakeData";
import "@/utils/theme.js"
import Vue from 'vue';
Vue.prototype.$echarts = echarts

export default {
  name: 'cw-echart-basic-view',
  components: {echartBasic},
  props: {
    dataSource: [Function, Array, Object],
    options: {type: Object, default: () => ({})},
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
  mounted(){
    this.resizeObserver = new ResizeObserver(()=>{
      this.$refs.echart.resize();
    });
    this.resizeObserver.observe(this.$el);
  },
  beforeDestroy(){
    if (this.resizeObserver){
      this.resizeObserver.disconnect();
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
    reload() {
      this.sourceData = 'fakeData';
      this.$nextTick(async () => {
        this.sourceData = await this.handleDataSource(this.dataSource);
        this.loading = false;
        this.$refs.echart && this.$refs.echart.reload();
        console.log('source', this.sourceData);
      });
    },
    async init() {
      // 本地启动和开发环境使用假数据，生产环境替换为真数据
      const fnDataSource = (this.$env.VUE_APP_DESIGNER || !window.appInfo) ? fakeData : this.dataSource;
      this.sourceData = await this.handleDataSource(fnDataSource);
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

.container[border] {
  padding: 15px;
  width: 100%;
  height: 100%;
}

.emptyImage {
  width: 100%;
  height: 100%;
}
</style>
