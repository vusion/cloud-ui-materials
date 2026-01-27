# cw_monaco_editor json代码编辑器

## 依赖库介绍
`cw_monaco_editor` 是一款专为 JSON 数据编辑与展示设计的组件库。它集成了 Monaco Editor 的核心能力，为 Web 应用提供专业的代码编辑体验，支持 JSON 语法高亮、格式校验、内容双向绑定以及行数限制等功能，适用于配置文件编辑、接口数据模拟等业务场景。

## 包含的组件与逻辑
### 组件
- **json-monaco-editor**：提供可视化 JSON 编辑界面，支持属性配置与事件交互。

### 逻辑
- 暂无逻辑列表。

## 组件功能说明
### json-monaco-editor
该组件是库的核心编辑器，允许用户在界面上直接编辑 JSON 字符串。它支持同步外部传入的内容，并能通过设置最大行数来控制编辑器的大小或输入限制。在用户输入过程中，组件会实时监控内容状态并反馈变更或错误信息。

## API 说明
### json-monaco-editor

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | nasl.core.String | '' | 内容，显示文本。支持双向同步。 |
| attrThreshold | nasl.core.Integer | 0 | 最大行数，用于控制编辑器可编辑的最大行数限制。 |
| placeholder | nasl.core.String | '' | 例子占位符，当编辑器为空时显示的提示信息。 |

#### 事件 (Events)
| 名称 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| onChange | 输入内容发生变化时触发 | event: { newValue: nasl.core.String, oldValue: nasl.core.String } |
| onError | 编辑器检测到错误（如 JSON 语法错误）时触发 | errorMessage: nasl.core.String |
| onMaxLength | 当输入内容超出设定的最大行数时触发 | event: any |

#### 方法 (Methods)
| 名称 | 说明 |
| :--- | :--- |
| loadMonacoEditor | 初始化编辑器，用于手动触发编辑器实例的加载与挂载。 |