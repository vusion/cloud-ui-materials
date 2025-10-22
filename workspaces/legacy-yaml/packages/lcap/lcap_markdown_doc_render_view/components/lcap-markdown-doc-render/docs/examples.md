### 基本用法

``` vue
<template>
  <lcap-markdown-doc-render :text="text"></lcap-markdown-doc-render>
</template>
<script>
import text from '!!raw-loader!./test.md'
export default {
  data() {
    return {
      text
    }
  }
}
</script>
```
