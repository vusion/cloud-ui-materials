# cw_office_sdk 文档SDK

本依赖库提供与「文档SDK」相关的组件与逻辑，可在 Codewave 低代码平台中引用。它涵盖了多种办公文档格式（docx, pdf, ppt, xlsx）的预览功能，并提供了 PDF 编辑、页面选择及特定逻辑处理能力。

## 包含组件
- **cw-doc-preview**: 用于预览 Word (.docx) 格式文档。
- **cw-pdf-editor**: 提供 PDF 文件编辑功能，支持插入文本、图片等操作。
- **cw-pdf-preview**: 用于预览 PDF 格式文档。
- **cw-pdf-select-view**: 提供 PDF 文件的选择容器，支持文件访问策略设置及选择列表获取。
- **cw-ppt-preview**: 用于预览 PowerPoint (.ppt/.pptx) 格式文档。
- **cw-xlsx-preview**: 用于预览 Excel (.xlsx) 格式文档。

## 包含逻辑
- **uploadPdfFirstPage**: 专门用于提取并上传 PDF 文件的第一页内容。

## API 说明

### cw-doc-preview (docx预览)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | 请在这里编写代码 | 需要传入的链接地址 |
| panZoom | boolean | false | 是否开启缩放 |
| emptyText | string | '文件加载中' | 加载中显示的提示文字 |
| ignoreWidth | boolean | false | 禁用页面的渲染宽度 |
| ignoreHeight | boolean | false | 禁用页面的渲染高度 |

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
暂无。该组件目前未定义对外调用的方法。

### cw-pdf-editor (pdf编辑器)
#### 属性 (Attrs)
暂无。该组件目前未定义可通过属性配置的内容。

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| savePDF | 保存当前编辑的 PDF 文件 | [] |

### cw-pdf-preview (pdf预览)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | 请在这里编写代码 | 需要传入的链接地址 |
| cMapUrl | string | '' | 字体地址 (cMapUrl) |
| panZoom | boolean | false | 是否开启缩放 |
| maxScale | number | 3 | 最大缩放比例 |
| minScale | number | 1 | 最小缩放比例 |

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
暂无。该组件目前未定义对外调用的方法。

### cw-pdf-select-view (pdf选择容器)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 文件地址链接 |
| access | string | public | 文件访问策略。可选值：public (任何人可访问), private (用户登录后可访问) |

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| uploadFile | 上传修改后的 PDF 文件 | [] |
| getSelected | 获取当前选择的列表 | [] |

### cw-ppt-preview (ppt预览)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 预览的文件链接地址 |

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
暂无。该组件目前未定义对外调用的方法。

### cw-xlsx-preview (xlsx预览)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 预览的文件，支持 blob、url 或 arraybuffer |

#### 事件 (Events)
暂无。该组件目前未定义对外触发的事件。

#### 方法 (Methods)
暂无。该组件目前未定义对外调用的方法。

### 逻辑 API 说明
#### uploadPdfFirstPage
- **功能**: 上传 PDF 文件的第一页。
- **适用范围**: 前端与后端 (both)。