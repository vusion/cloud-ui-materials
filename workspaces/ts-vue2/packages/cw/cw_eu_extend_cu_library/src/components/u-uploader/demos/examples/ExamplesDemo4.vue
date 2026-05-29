<!-- 图片编辑器自定义(只支持单文件上传) -->
<template>
    <div>
    <u-uploader v-model="files" 
                converter="simple" 
                list-type="card" 
                url="/gateway/lowcode/api/v1/app/upload" 
                :openCropper="true"
                :fixedCropper="true"
                :cropperBoxWidth="150"
                :cropperBoxHeight="250"
                cropperTitle="头像裁剪"
                cropperPreviewShape="square"
    >
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