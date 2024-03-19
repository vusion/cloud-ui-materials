### 基本用法

``` vue
<template>
<div style="height:300px">
  <cw-pdf-editor ref='editor'>
    <u-button @click='savePdf'>保存pdf</u-button>
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
