<!-- 单文件卡片 -->
<template>
<u-uploader v-model="files" list-type="card"
    accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
    url="http://localhost:7000/api/library/upload">
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: [],
        };
    },
};
</script>