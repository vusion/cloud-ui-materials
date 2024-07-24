<template>
  <div :class="{
    [$style.container]: true,
    [$style.room]: $env.VUE_APP_DESIGNER
  }">
    <vue-pdf-embed :source="value" />
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import panzoom from 'panzoom';

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
  },
  components: {
    VuePdfEmbed,
  },
  mounted() {
    this.$nextTick(() => {
      const element = document.querySelector('.vue-pdf-embed');
      panzoom(element, {
        maxZoom: this.maxScale,
        minZoom: this.minScale,
        bounds: true,
        boundsPadding: 0.1
      });
    })
  },
};
</script>

<style module>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.pinch-zoom {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.room {
  border: 1px dashed #ccc;
  height: 300px;
}
</style>