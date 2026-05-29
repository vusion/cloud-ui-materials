<!-- 多文件上传simple -->
<template>
<u-uploader v-model="files" converter="simple" multiple list-type="card" url="/gateway/lowcode/api/v1/app/upload">
    <u-button color="primary">Upload</u-button>
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: 'https://static-vusion.163yun.com/assets/breakfast.png,https://static-vusion.163yun.com/assets/salad.png',
        };
    },
};
</script>