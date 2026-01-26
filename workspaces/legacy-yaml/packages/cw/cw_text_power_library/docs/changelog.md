# 更新日志

## 1.3.7

*初始版本发布*

- **新增** `cw-typed-view` 打字机文本组件。
  - 支持通过 `typeSpeed` 属性控制打字速度。
  - 支持通过 `showCursor` 属性控制是否显示光标。
- **新增** `cw-wang-editor` 富文本编辑器组件。
  - 集成 wangEditor，提供完整的富文本编辑功能。
  - 支持图片、视频上传，并可配置上传服务器地址和文件类型限制。
  - 支持只读模式、自定义样式和占位符。
  - 提供 `change`、`upload-fail`、`input` 事件。
  - 提供 `exportToBlob`、`exportToDocx`、`exportToDocxXml` 等方法用于内容导出。
- **新增** `highlight-text` 高亮文本组件。
  - 支持在指定文本内容中高亮显示关键字。
  - 提供 `click` 事件，用于响应高亮部分的点击操作。
