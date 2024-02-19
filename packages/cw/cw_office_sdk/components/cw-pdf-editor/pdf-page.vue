<template>
  <div 
    @mousedown="selectPage(pIndex)"
    @touchstart="selectPage(pIndex)"
    :style="{
      width: this.canvasWidth,
      height: this.canvasHeight
    }">
    <canvas ref="canvas" />
  </div>
</template>

<script>
export default {
  name: "pdf-page",
  props:{
    page:{
      type:Promise
    }
  },
  data() {
    return {
      canvasWidth: '100%',
      canvasHeight: '100%',
      clientWidth: null,
    };
  },
  mounted() {
    this.render();
  },
  
  methods: {
    selectPage() {
      this.$emit('selectPage')
    },
    getCanvasMeasurement() {
      return {
        canvasWidth: this.$refs.canvas.width,
        canvasHeight: this.$refs.canvas.height,
      };
    },
    async render() {
      const _page = await this.page;
      let canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const viewport = _page.getViewport({
        scale: 1,
        rotation: 0,
      });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      this.canvasWidth = viewport.width + 'px';
      this.canvasHeight = viewport.height + 'px';
      await _page.render({
        canvasContext: context,
        viewport,
      }).promise;
    },
  },
};
</script>
