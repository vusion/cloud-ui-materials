<template>
<div :class="$style.pdfContainer">
  <div id="originPDFPreview"></div>
  <div :class="$style.pdfOverlay"></div>
</div>
</template>
<script>
import PDFObject from 'pdfobject'; 
export default {
  name: 'pdf-preview',
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  watch: {
    url: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  methods: {
    init() {
      PDFObject.embed(this.url, '#originPDFPreview', {
        pdfOpenParams: {
          toolbar: 0,  // 隐藏工具栏
          navpanes: 0, // 隐藏导航栏
          statusbar: 0, // 隐藏状态栏
        }
      });
    }
  }
};
</script>
<style module>
.pdfContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto; /* 启用滚动 */
}
.pdfOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* 默认允许穿透所有事件 */
}
.pdfOverlay::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  cursor: default;
}
</style>
<style>
.pdfobject-container {
  height: 100%;
}
.pdfobject {
  border: 1px solid #ccc;
}
</style>
