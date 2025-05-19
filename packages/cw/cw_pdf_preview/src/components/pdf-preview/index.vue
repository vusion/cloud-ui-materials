<template>
<div id="originPDFPreview"></div>
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
      PDFObject.embed(this.url, '#originPDFPreview');
    }
  }
};
</script>
<style module>
#originPDFPreview {
  width: 100%;
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
