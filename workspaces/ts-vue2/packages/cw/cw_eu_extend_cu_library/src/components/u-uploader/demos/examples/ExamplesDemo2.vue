<!-- 基本用法simple -->
<template>
<u-uploader v-model="files" converter="simple" list-type="card" url="/gateway/lowcode/api/v1/app/upload">
    <u-button color="primary">Upload</u-button>
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: "",
        };
    },
}
</script>