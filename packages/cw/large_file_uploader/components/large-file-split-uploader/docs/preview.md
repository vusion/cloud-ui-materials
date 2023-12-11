<template>
<div>
     <div style="margin-bottom:40px;">
        <div class="componentClassTitle">大文件上传按钮</div>
        <u-uploader
            url="http://localhost:7000/api/library/upload" mutiple>
            <u-button color="primary">Upload</u-button>
        </u-uploader>
    </div>
</div>
</template>
