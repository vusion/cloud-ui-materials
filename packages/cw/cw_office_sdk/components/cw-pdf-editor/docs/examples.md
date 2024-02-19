### 基本用法

``` vue
<template>
<div style="height:300px">
  <u-button @click='savePdf'>保存pdf</u-button>
  <cw-pdf-editor ref='editor'>
    <!-- <template #pdf>
      <u-button flag="uploader-pdf" color="primary" for='pdf'>选择PDF</u-button>
    </template>
    
    <template #image>
      <u-button flag="uploader-pdf" color="primary" for='pdf'>image</u-button>
    </template> -->
    
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
