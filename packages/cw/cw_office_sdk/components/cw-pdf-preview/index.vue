<template>
  <div :class="{
    [$style.container]: true,
    [$style.room]: $env.VUE_APP_DESIGNER
  }">
    <div :class="$style.viewport" ref="viewport" v-if="panZoom">
      <div :class="$style['zoomable-content']" ref="content">
        <pinch-zoom ref="pinchZoom"  :limitPan="true" :limitZoom="maxScale" :backgroundColor="'rgb(0, 0, 0, 0)'" :minScale="minScale" >
          <vue-pdf-embed :source="{
            url: value,
            cMapUrl: cMapUrl,
            cMapPacked: true
          }" />
        </pinch-zoom>
      </div>
    </div>
    <vue-pdf-embed v-else :source="{
      url: value,
      cMapUrl: cMapUrl,
      cMapPacked: true
    }" :options="pdfOptions"/>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import PinchZoom from "vue-pinch-zoom";
const pdfjsLib = require('pdfjs-dist');
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default {
  name: "cw-pdf-preview",
  props: {
    value: {
      type: String,
    },
    panZoom: {
      type: Boolean,
      default: false,
    },
    maxScale: {
      type: Number,
      default: 3,
    },
    minScale: {
      type: Number,
      default: 1,
    },
    cMapUrl: {
      type: String,
      default: '',
    },
  },
  components: {
    VuePdfEmbed,
    PinchZoom
  },
  data() {
    return {
      pdfOptions: {},
    };
  }
};

</script>

<style module>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  /* overflow: hidden; */
}

.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  /* overflow: hidden; */
  touch-action: pan-y;
  /* 禁用浏览器默认手势 */
}
.room {
  border: 1px dashed #ccc;
  height: 300px;
}
.zoomable-content {
  transform-origin: top;
}
</style>

<style>
.vue-pdf-embed {
  margin: auto;
}

.vue-pdf-embed canvas {
  width: 100% !important;
  height: auto !important;
}

</style>