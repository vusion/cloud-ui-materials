<!-- 拖拽和粘贴上传 -->
<template>
<u-uploader v-model="files" url="/gateway/lowcode/api/v1/app/upload" draggable pastable></u-uploader>
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