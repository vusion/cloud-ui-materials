### 基本用法

``` vue
<template>
<div>
  <u-button @click='savePdf'>保存pdf</u-button>
  <cw-pdf-editor ref='editor'>
  <u-button flag="uploader-pdf" color="primary" icon="upload">选择PDF</u-button>
</cw-pdf-editor>
</div>
</template>
<script>
export default {
  methods:{
    savePdf() {
      this.$refs.editor.savePDF('test')
    }
  }
}
</script>
```
