### 单个文件按钮

下面的例子为单文件上传。

```html
<large-file-split-uploader
  display="inline"
  url="/upload"
  url-field="filePath"
  :limit="999"
  max-size="50MB"
  converter="json"
>
  <u-button flag="large-file-uploader-button" color="primary" icon="upload">上传</u-button>
</large-file-split-uploader>
```
