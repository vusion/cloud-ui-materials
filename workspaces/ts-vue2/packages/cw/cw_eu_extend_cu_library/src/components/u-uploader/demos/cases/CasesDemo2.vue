<!-- 单文件只读 -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-uploader v-model="files" list-type="card"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            url="http://localhost:7000/api/library/upload">
        </u-uploader>
    </u-linear-layout>
    <u-linear-layout>
        <u-uploader v-model="files1" list-type="card" converter="simple"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            url="http://localhost:7000/api/library/upload">
        </u-uploader>
    </u-linear-layout>
</u-linear-layout>
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
            }],
            files1: 'https://static-vusion.163yun.com/assets/breakfast.png,https://static-vusion.163yun.com/assets/breakfast.png'
        };
    },
};
</script>