<!-- 开启图片编辑(只支持单文件上传) -->
<template>
    <div>
    <u-uploader v-model="files" converter="simple" list-type="card" url="/gateway/lowcode/api/v1/app/upload" :openCropper="true">
        <u-button color="primary">Upload</u-button>
    </u-uploader>
    <u-uploader converter="simple" url="/gateway/lowcode/api/v1/app/upload" :openCropper="true" :showErrorMessage="false" :showFileList="false">
        <u-button color="primary">Upload</u-button>
    </u-uploader>
    </div>
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