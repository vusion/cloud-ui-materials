<template>
  <canvas ref="canvas" />
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
      clientWidth: null,
    };
  },
  mounted() {
    this.render();
  },
  methods: {
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
      await _page.render({
        canvasContext: context,
        viewport,
      }).promise;
    },
  },
};
</script>
