### 基本用法

下面的例子为单文件上传。

```vue
<template>
  <large-file-split-uploader
    v-model="file"
    url="/gateway/lowcode/api/v1/app/upload"
  >
    <u-button color="primary">Upload</u-button>
  </large-file-split-uploader>
</template>
<script>
export default {
  data() {
    return {
      file: "",
    };
  },
};
</script>
```
