<template>
    <div ref="container" class="doc-preview-container">
      <div class="doc-preview-content" ref="docPreviewContent">
        <div>{{ emptyText }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { renderAsync } from 'docx-preview';
  import panzoom from 'panzoom';
  
  export default {
    name: 'cw-doc-preview',
    props: {
      emptyText: {
        type: String,
        default: '文件加载中'
      },
      panZoom: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '请在这里编写代码',
      },
      ignoreHeight: {
        type: Boolean,
        default: false,
      },
      ignoreWidth: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      value: {
        handler: function (val) {
          this.getData(val);
        },
      },
    },
    data() {
      return {
        docxOptions: {
          className: 'kaimo-docx',
          inWrapper: true,
          ignoreWidth: this.ignoreWidth,
          ignoreHeight: this.ignoreHeight,
          ignoreFonts: false,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          useMathMLPolyfill: false,
          showChanges: false,
          debug: false,
        },
        htmlData: '',
      };
    },
    mounted() {
      this.getData(this.value.trim());
      this.updateScale();
      window.addEventListener('resize', this.updateScale);
  
      if (!this.$env.VUE_APP_DESIGNER && this.panZoom) {
        this.$nextTick(() => {
          const element = this.$refs.container;
          panzoom(element, {
            maxZoom: this.maxScale,
            minZoom: this.minScale,
            bounds: true,
            boundsPadding: 0.1,
          });
        });
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScale);
    },
    methods: {
      async getData(url) {
        if (typeof url === 'string') {
          let buf = await fetch(url).then((r) => r.arrayBuffer());
          this.docxRender(buf);
        }
      },
      docxRender(buffer) {
        let bodyContainer = this.$refs['docPreviewContent'];
  
        renderAsync(
          buffer,
          bodyContainer,
          null,
          this.docxOptions
        ).then((res) => {
          console.log('res---->', res);
          this.updateScale();
        });
      },
      updateScale() {
        const container = this.$refs.container;
        const content = this.$refs.docPreviewContent;
  
        if (container && content) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const contentWidth = content.scrollWidth;
          const contentHeight = content.scrollHeight;
  
          const scaleX = containerWidth / contentWidth;
          const scaleY = containerHeight / contentHeight;
  
          const scale = Math.min(scaleX, scaleY);
  
          content.style.transform = `scale(${scale})`;
          content.style.transformOrigin = 'top left';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .doc-preview-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .doc-preview-content {
    transform-origin: top left;
  }
  </style>

<style>
.kaimo-docx-wrapper {
    padding: 0 !important;
    display: block !important;
    background-color: transparent !important;
}
</style>