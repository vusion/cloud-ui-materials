# markdown依赖库 (cw_bytemarkdown)

## 依赖库介绍
cw_bytemarkdown 是一款专注于 Markdown 文本处理的依赖库。它提供了功能完善的 Markdown 编辑器和渲染组件，旨在帮助开发者快速在应用中集成 Markdown 的撰写、编辑以及高性能的预览展示功能。

## 包含的组件与逻辑

### 组件列表
- **byte-markdown-editor**：功能强大的 Markdown 编辑器组件，支持内容的实时输入与同步。
- **byte-markdown-preview**：高效的 Markdown 渲染组件，支持将 Markdown 文本转换为格式化的视图，并提供可选的目录大纲展示。

### 逻辑列表
暂无逻辑组件。

## 组件 API 说明

### byte-markdown-editor（markdown编辑器）

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | nasl.core.String | '' | 编辑器的显示文本内容，支持双向同步 |

#### 事件 (Events)
| 名称 | 类型 | 说明 |
| :--- | :--- | :--- |
| onChange | (value: string) => void | 当编辑器内容发生变化时触发 |

#### 方法 (Methods)
暂无方法说明。

---

### byte-markdown-preview（markdown渲染组件）

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| text | nasl.core.String | '' | 需要进行渲染展示的 Markdown 文本内容 |
| showToc | nasl.core.Boolean | false | 是否在渲染结果中显示目录大纲 |

#### 事件 (Events)
暂无事件说明。

#### 方法 (Methods)
暂无方法说明。