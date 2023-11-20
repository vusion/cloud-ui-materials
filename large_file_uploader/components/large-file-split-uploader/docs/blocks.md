### 单个文件按钮

下面的例子为单文件上传。

```html
<u-uploader
  display="inline"
  url="/upload"
  url-field="filePath"
  :limit="999"
  max-size="50MB"
  converter="json"
>
  <u-button color="primary" icon="upload">上传</u-button>
</u-uploader>
```
