<!-- 单个文件按钮 -->

<template>
  <u-uploader display="inline" url="/upload" urlField="filePath" :limit="999" :file-icon-switcher="true"
    :download-icon-switcher="true" :file-size="true" maxSize="50MB" converter="json" :showFileList="false">
    <el-button type="primary" text="导入"></el-button>
    <template #file-list>
    </template>
  </u-uploader>
</template>
