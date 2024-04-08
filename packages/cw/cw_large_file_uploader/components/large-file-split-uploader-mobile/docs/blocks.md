### 单个文件按钮

下面的例子为单文件上传。

```html
<large-file-split-uploader-mobile
  display="inline"
  url="/upload"
  url-field="filePath"
  :limit="999"
  max-size="50MB"
  converter="json"
>
  <van-button
    flag="large-file-uploader-button"
    type="default"
    size="middle"
    text="上传"
    squareroud="round"
  ></van-button>
</large-file-split-uploader-mobile>
```
