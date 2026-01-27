# cw_markdown 依赖库说明

## 依赖库介绍
本依赖库提供与「cw_markdown」相关的组件与逻辑，旨在为 Codewave 低代码平台提供 Markdown 编辑与渲染的核心功能，方便用户在应用中集成文本创作与展示能力。

## 包含组件与逻辑
- 组件列表：markdown（md编辑器）
- 逻辑列表：暂无

## 组件功能说明
### markdown（md编辑器）
该组件用于处理 Markdown 格式的文本内容。它支持两种工作模式：编辑模式（editor）用于撰写和修改 Markdown 源码，渲染模式（viewer）用于将 Markdown 源码转换并展示为格式化的 HTML 视图。

## API 说明

### markdown 组件

#### 属性 (attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | "" | 需要传入的值，即 Markdown 源码内容 |
| mode | string | editor | markdown模式。可选值：editor（编辑器）、viewer（渲染器） |

#### 事件 (events)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| change | 内容变化时 | $event: string | 当编辑器内容发生变化时触发，返回最新的字符串内容 |

#### 方法 (methods)
暂无。该组件目前未定义可供外部调用的方法。