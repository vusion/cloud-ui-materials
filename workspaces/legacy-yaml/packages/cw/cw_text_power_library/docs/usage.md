# cw_text_power_library 依赖库使用文档

## 依赖库介绍

`cw_text_power_library` 是一个专注于文本处理和展示的 Vue2 组件库。它提供了多种增强型的文本组件，旨在满足低代码平台中对文本内容进行特殊展示、编辑和交互的需求。该库包含打字机效果文本、功能丰富的富文本编辑器以及关键字高亮文本等组件，能够显著提升应用界面的文本表现力和功能性。

## 包含的组件和逻辑列表

该依赖库包含以下三个组件：
1.  **cw-typed-view** - 打字机文本组件
2.  **cw-wang-editor** - 富文本编辑器组件
3.  **highlight-text** - 高亮文本组件

## 组件功能说明

### 1. cw-typed-view (打字机文本)
该组件用于模拟打字机效果，将文本内容逐字显示在屏幕上。它通过控制字符的显示速度来创建动态的文本展示效果，适用于需要吸引用户注意力或营造特定氛围的文本场景。

### 2. cw-wang-editor (富文本)
这是一个功能完整的富文本编辑器组件，基于 wangEditor 构建。它支持常见的富文本编辑功能，如字体样式、段落格式、插入图片/视频、创建列表等。组件提供了丰富的配置项和事件，支持内容导出、文件上传等高级功能，适用于需要用户输入或展示复杂格式文本的场景。

### 3. highlight-text (高亮文本)
该组件用于在给定的文本内容中高亮显示指定的关键字。它能够快速定位并突出显示文本中的特定词汇，适用于搜索结果显示、关键词强调等需要视觉聚焦的场景。

## API 说明

### cw-typed-view 组件 API

**属性 (Attrs):**
- `value` (string): 需要显示的文本内容。
- `typeSpeed` (number): 打字速度，单位为毫秒，控制每个字符显示的间隔时间。
- `showCursor` (boolean): 是否在打字过程中显示闪烁的光标。

### cw-wang-editor 组件 API

**属性 (Attrs):**
- `value` (string): 编辑器的内容，支持双向绑定。
- `readOnly` (boolean): 是否启用只读模式，禁止用户编辑。
- `scroll` (boolean): 是否启用编辑器区域的滚动。
- `showDocxButton` (boolean): 是否在工具栏显示导出为 DOCX 文件的按钮。
- `placeholder` (string): 编辑器为空时显示的输入提示文本。
- `editorStyle` (string): 自定义编辑器容器的 CSS 样式。
- `uploadImgServer` (string): 图片上传的后端服务器地址。
- `accept` (string): 允许上传的图片文件类型后缀，多个类型用英文逗号分隔。
- `acceptVideo` (string): 允许上传的视频文件类型后缀，多个类型用英文逗号分隔。
- `url-field` (string): 上传接口返回结果中，代表文件访问 URL 的字段名。

**事件 (Events):**
- `change`: 当编辑器内容发生修改时触发。事件参数包含修改后的内容 (`value`) 和编辑器实例 (`editor`)。
- `upload-fail`: 当文件上传失败时触发。事件参数包含失败信息 (`value`)。
- `input`: 在编辑器输入内容时触发。事件参数为当前输入区域的内容 (`value`)。

**方法 (Methods):**
- `cancel()`: 取消当前的拖拽操作。
- `exportToBlob(result)`: 将编辑器内容导出为 Blob 对象。导出结果存储在传入的 `result` 对象的 `value` 属性上。
- `exportToDocx(filename)`: 将编辑器内容导出并下载为指定文件名的 DOCX 文件。
- `exportToDocxXml(result)`: 将编辑器内容导出为 DOCX 文件对应的 XML 片段。导出结果存储在传入的 `result` 对象的 `value` 属性上。

### highlight-text 组件 API

**属性 (Attrs):**
- `content` (string): 需要进行高亮处理的原始文本内容。
- `text` (string): 需要在 `content` 中高亮显示的关键字。
- `link` (string): 点击高亮部分时传递的标识数据。

**事件 (Events):**
- `click`: 当用户点击被高亮显示的文本部分时触发。事件参数 (`$event`) 是一个自定义对象。