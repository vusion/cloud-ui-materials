# lcap_markdown_doc_render_view 文档渲染组件库

## 依赖库介绍
`lcap_markdown_doc_render_view` 是一个专为 Codewave 低代码平台设计的文档渲染依赖库。它提供了强大的 Markdown 文本渲染能力，能够将 Markdown 字符串解析并展示为结构清晰的文档界面，同时支持大纲定位、滚动容器配置及交互事件处理，适用于技术文档展示、知识库阅读等场景。

## 包含的组件和逻辑列表
### 组件
- **lcap-markdown-doc-render (文档渲染组件)**：负责 Markdown 文本的解析、渲染，并提供自动生成大纲、滚动锚点及交互反馈功能。

### 逻辑
- 暂无：本依赖库目前主要通过组件及其 API 提供功能，未包含独立的全局逻辑。

## 组件 API 说明

### lcap-markdown-doc-render (文档渲染组件)

#### 属性 (Attrs)
| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| text | string | "" | 需要传入并渲染的 Markdown 文本内容 |
| scrollContainer | string | window | 监听文档滚动的容器。可选值：window (窗口)、root (根节点) |
| outline-position-top | number | 200 | 大纲定位距离窗口顶部的距离（单位 px），当滚动容器为窗口时生效 |
| outline-position-right | number | 0 | 大纲定位距离窗口右侧的距离（单位 px），当滚动容器为窗口时生效 |

#### 事件 (Events)
| 事件名 | 参数 | 类型 | 说明 |
| :--- | :--- | :--- | :--- |
| link | $event | string | 点击文档中的链接时触发，参数为链接地址 |
| linkcopied | $event | string | 链接复制成功时触发，参数为链接地址 |

#### 方法 (Methods)
| 方法名 | 参数 | 类型 | 说明 |
| :--- | :--- | :--- | :--- |
| scrollToTitle | title | string | 调用此方法可使文档滚动到指定的标题位置 |