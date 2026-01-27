# cw_text_power_library 文本功能依赖库

## 依赖库介绍
`cw_text_power_library` 是一个专为 Codewave 低代码平台设计的文本功能增强依赖库。它集成了打字机效果动态展示、功能完善的富文本编辑器以及关键词高亮文本显示等组件，并提供了实用的文本空值处理逻辑。该库旨在提升应用在处理和展示文本内容时的交互性与专业度。

## 包含内容

### 组件列表
- **cw-typed-view（打字机文本）**：模拟打字机输入效果的动态文本展示组件。
- **cw-wang-editor（富文本）**：基于 wangEditor 封装的富文本编辑组件，支持图片视频上传及 Docx 文档导出。
- **highlight-text（高亮文本）**：支持对文本内容中的特定关键字进行高亮标记，并支持点击交互。

### 逻辑列表
- **emptyTextFilling**：用于文字组件空字符串的统一替换与填充逻辑。

--- 

## API 说明

### cw-typed-view (打字机文本)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | 请在这里输入内容 | 需要传入的文本内容 |
| typeSpeed | number | 40 | 打字速度，单位为毫秒 |
| showCursor | boolean | false | 是否展示光标 |

#### 事件 (Events)
暂无事件说明。

#### 方法 (Methods)
暂无方法说明。

### cw-wang-editor (富文本)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | '' | 需要传入的文本内容（支持双向绑定） |
| readOnly | boolean | false | 是否启用只读模式 |
| scroll | boolean | true | 是否启用内部滚动 |
| showDocxButton | boolean | false | 是否显示导出 docx 按钮 |
| placeholder | string | '' | 输入框占位符提示 |
| editorStyle | string | '' | 编辑器自定义样式 CSS |
| uploadImgServer | string | '' | 上传图片的服务器地址 |
| accept | string | .png,.jpg,.jpeg,.webp | 支持上传图片的文件类型后缀 |
| acceptVideo | string | mp4,avi... | 支持上传视频的文件类型后缀 |
| url-field | string | filePath | 请求返回数据中 URL 对应的字段名 |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| change | 内容修改时触发 | $event.value (当前内容), $event.editor (编辑器实例) |
| upload-fail | 上传文件失败时触发 | $event.value (失败文案) |
| input | 输入时触发 | value (当前输入区域的内容) |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| cancel | 取消拖拽操作 | 无 |
| exportToBlob | 导出内容为 Blob 对象 | result (导出结果存放在 result.value 上) |
| exportToDocx | 导出为 docx 文件 | filename (导出文件名) |
| exportToDocxXml | 导出 docx 对应的 XML 片段 | result (导出结果存放在 result.value 上) |

### highlight-text (高亮文本)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| content | string | '' | 需要展示的完整文本内容 |
| text | string | '' | 需要高亮显示的关键字 |
| link | string | '' | 点击时携带的标识数据 |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| click | 选择某一项（点击高亮部分）时触发 | $event (自定义事件对象) |

#### 方法 (Methods)
暂无方法说明。

--- 

## 逻辑说明

### emptyTextFilling

**功能描述**：文字组件空字符串替换逻辑，当传入文本为空时进行特定处理。

**输入参数**：
- **text** (String): 需要检查和填充的原始文本内容。