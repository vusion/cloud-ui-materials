# cw_large_file_uploader 使用指南

## 1. 依赖库介绍
`cw_large_file_uploader` 库专为 Codewave 低代码平台设计，旨在提供稳定高效的「大文件上传」解决方案。该库通过组件化封装，支持大文件的切片上传，能够有效应对网络波动带来的上传风险，并提供了包括拖拽、粘贴在内的多种交互方式，极大增强了开发者在处理大体积文件时的灵活性。

## 2. 组件与逻辑列表

### 2.1 组件列表
- **large-file-split-uploader (大文件上传)**：支持分片上传、多文件上传、进度反馈及错误提示的 PC 端文件上传组件。

### 2.2 逻辑列表
- 暂无：本依赖库目前未包含独立的逻辑实体。

## 3. 组件 API 说明

### 3.1 large-file-split-uploader (大文件上传)

#### 属性 (Attributes)
| 参数名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-type | string | `json` | 接收数据类型。可选值：`text`、`xml`、`json` |
| pastable | boolean | `false` | 是否可以通过粘贴文件进行上传 |
| value | string | `""` | 当前文件列表，支持同步（Sync）和模型绑定（Model） |
| name | string | `file` | 上传的文件字段名，后端通过该字段获取文件对象 |
| accept | string | - | 限制上传的文件类型，格式如 ".jpeg,.png"，多个以逗号隔开 |
| with-credentials | boolean | `false` | 是否在跨域请求中携带 cookie |
| data | object | - | 随文件一起发送的附加业务数据 |
| url-field | string | `url` | 接口返回结果中用于表示文件 URL 的字段名 |
| headers | Object | - | 自定义请求头 (Request Headers) |
| converter | string | `json` | 转换器，可选 `json` 或 `simple` (URL 字符串) |
| display | string | `block` | 展示方式：`inline` (行内展示) 或 `block` (块级充满) |
| description | string | `null` | 上传组件下方的辅助说明文本 |
| showErrorMessage | boolean | `true` | 是否展示上传过程中的错误提示（如超限等） |
| dragDescription | string | `点击/拖动/粘贴文件到这里` | 拖拽上传区域的引导文字 |
| access | string | - | 文件访问策略：`public` (任何人访问) 或 `private` (登录访问) |
| draggable | boolean | `false` | 是否开启拖拽上传功能 |
| readonly | boolean | `false` | 只读状态，禁止选择或输入 |
| disabled | boolean | `false` | 禁用状态，禁止所有交互并置灰 |
| viaOriginURL | boolean | `false` | 是否通过源地址访问 |
| multiple | boolean | `false` | 是否支持选择多个文件上传 |

#### 事件 (Events)
| 事件名 | 说明 | 参数 |
| :--- | :--- | :--- |
| before-upload | 文件上传前触发 | `$event.file`: 文件对象; `$event.preventDefault`: 阻止函数; `senderVM`: 组件实例 |
| progress | 上传进度改变时触发 | `$event.data`: 进度详细信息; `senderVM`: 组件实例 |
| success | 文件上传成功后触发 | `$event.data`: 服务端响应; `$event.file`: 文件元信息; `senderVM`: 组件实例 |
| error | 上传过程发生错误时触发 | `$event.name`: 错误名; `$event.message`: 错误描述; `$event.maxSize`: 限制大小; `senderVM`: 组件实例 |
| remove | 点击删除文件按钮时触发 | `$event.value`: 当前展示数据; `$event.item`: 被删除项数据; `$event.index`: 索引 |

#### 方法 (Methods)
| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| select | 手动触发文件选择对话框 | 无 |