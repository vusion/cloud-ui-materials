### 基本用法

下面的例子为单文件上传。

``` vue
<template>
<u-uploader v-model="files" url="/gateway/lowcode/api/v1/app/upload">
    <u-button color="primary">Upload</u-button>
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: [],
        };
    },
}
</script>
```
