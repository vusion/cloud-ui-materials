<!-- 单文件卡片 -->

<template>
  <u-uploader list-type="card"
    accept=".png,.jpg,.jpeg,.gif,.bmp"
    url="/upload" urlField="filePath"
    :limit="999"
    maxSize="50MB"
    converter="json">
    <template #file-list>
        <i-ico style="margin: 0px 8px 0px 0px;" flag="file-icon" name="file-default" icotype="only"></i-ico>
        <u-text style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;" flag="file-name" text="文件名称"></u-text>
        <u-text style="margin: 0px 8px 0px 0px;" flag="file-size" text="文件大小"></u-text>
        <i-ico style="margin: 0px 8px 0px 0px;" flag="download-icon" name="download" icotype="only"></i-ico>
    </template>
</u-uploader>
</template>
