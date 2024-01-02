### 基本用法

``` vue
<template>
  <lcap-markdown-doc-render :text="text"></lcap-markdown-doc-render>
</template>
<script>
export default {
  data() {
    return {
      text: `# Adding or modifying rules## Default renderer rules
        Rules on how to translate markdown content to HTML elements are stored in :
        These are the default renderer rules. For any element that is not explicitly listed in this array its default rule applies. For example the rule is not defined, so when markdown-it tries to parse a list to HTML it defaults to ua generic renderer called .
      `
    }
  }
}
</script>
```
