<!-- 多文件上传 -->
<template>
<u-uploader v-model="files" multiple url="/gateway/lowcode/api/v1/app/upload">
    <u-button color="primary">Upload</u-button>
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: [{
                uid: '1',
                name: 'breakfast.png',
                status: 'success',
                url: 'https://static-vusion.163yun.com/assets/breakfast.png',
            }, {
                uid: '2',
                name: 'salad.png',
                status: 'success',
                url: 'https://static-vusion.163yun.com/assets/salad.png',
            }],
        };
    },
};
</script>