<!-- 图片列表simple -->
<template>
<u-uploader v-model="files" converter="simple" multiple list-type="card"
    accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
    url="http://localhost:7000/api/library/upload">
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