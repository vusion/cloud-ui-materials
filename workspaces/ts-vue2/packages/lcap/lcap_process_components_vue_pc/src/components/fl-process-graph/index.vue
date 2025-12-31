<template>
  <div :class="$style.root" ref="root">
    <div :class="$style.designerImage" v-if="noData">
      <img :class="[$style.img, $style.lb]" :src="leftBottomImg" />
      <img :class="[$style.img, $style.rt]" :src="rightTopImg" />
      <img :class="[$style.img, $style.md]" :src="middleImg" />
    </div>
    <div v-if="!inIDE && !noData" :class="$style.graph">
      <u-loading :class="$style.loading" size="large" v-if="loading"></u-loading>
      <graph v-if="visible && !loading && !noData" :ast="currentDataSource?.data?.[0]" :initialZoom="initialZoom"></graph>
    </div>
  </div>
</template>

<script>
import Graph from './graph.vue';
import leftBottomImg from './assets/leftbottom.png';
import middleImg from './assets/middle.png';
import rightTopImg from './assets/righttop.png';
import SupportDataSource from './mixins/support.datasource';
import { sync } from '@lcap/vue2-utils';

export default {
  name: 'fl-process-graph',
  components: {
    Graph,
  },
  mixins: [
    SupportDataSource,
    sync({
      data() {
        return this.currentDataSource && Array.isArray(this.currentDataSource.data) ? this.currentDataSource.data : [];
      },
    }),
  ],
  props: {
    initialZoom: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      leftBottomImg,
      middleImg,
      rightTopImg,
      visible: true,
      inIDE: this.$env?.VUE_APP_DESIGNER ?? true,
    };
  },
  computed: {
    noData() {
      return !(this.currentDataSource && this.currentDataSource?.data?.[0]?.procInstId);
    },
  },
  mounted() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0]) {
        const rect = entries[0].boundingClientRect;
        this.visible = !(rect.width === 0 && rect.height === 0);
      }
    });
    // start observing
    intersectionObserver.observe(this.$refs.root);
    this.detachObserver = () => {
      intersectionObserver.disconnect();
    };
  },
  beforeDestroy() {
    this.detachObserver();
  },
};
</script>

<style module src="./index.css"></style>
