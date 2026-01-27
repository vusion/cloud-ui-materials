# 大话西游依赖库 (xy_2)

## 依赖库介绍
xy_2（大话西游依赖库）是一款专为游戏内容集成设计的库，核心功能是提供高效的网页内容抓取与实时渲染能力。它特别针对游戏资讯类页面常用的 GBK 编码提供了良好的解码支持，并允许开发者通过丰富的样式配置项和内容节选逻辑，将外部 HTML 内容以高度自定义的方式集成到应用中，适用于攻略展示、公告同步等场景。

## 包含的组件与逻辑
- **组件**：
    - **game-html-reader (游戏内容实时渲染器)**：核心渲染组件，支持远程 HTML 抓取、CSS 样式注入、DOM 节点过滤以及复杂的表格布局重构。
- **逻辑**：
    - 暂无逻辑。

## API 说明

### game-html-reader (游戏内容实时渲染器)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| 内容 URL | nasl.core.String | '' | 用于抓取 HTML 内容的地址，支持 GBK 解码 |
| 段落样式（p） | nasl.core.String | '' | 控制 <p> 标签的样式，支持对象或 CSS 字符串格式 |
| 一级标题样式（h1） | nasl.core.String | '' | 控制 <h1> 标签的样式，支持对象或 CSS 字符串格式 |
| 二级标题样式（h2） | nasl.core.String | '' | 控制 <h2> 标签的样式，支持对象或 CSS 字符串格式 |
| 三级标题样式（h3） | nasl.core.String | '' | 控制 <h3> 标签的样式，支持对象或 CSS 字符串格式 |
| 内联文字样式（span） | nasl.core.String | '' | 控制 <span> 标签的样式，支持对象或 CSS 字符串格式 |
| 列表项样式（li） | nasl.core.String | '' | 控制 <li> 标签的样式，支持对象或 CSS 字符串格式 |
| 加粗文字样式（strong） | nasl.core.String | '' | 控制 <strong> 标签的样式，支持对象或 CSS 字符串格式 |
| 图片样式（img） | nasl.core.String | '' | 控制 <img> 标签的样式，支持对象或 CSS 字符串格式 |
| 高亮文字样式 | nasl.core.String | '' | 控制文字高亮样式，如 span[style*=color]，支持对象或 CSS 字符串格式 |
| 自定义样式 | nasl.core.String | '' | 字符串，传入类似 .class1 { display: none; } 等 CSS 规则 |
| 是否启用节选 | nasl.core.Boolean | false | 控制是否启用节选功能 |
| 片段标签名称 | nasl.core.String | 'h2' | 指定作为分隔范围的 HTML 标签名称，例如 h2、h3、p 等 |
| 开始标签索引 | nasl.core.Integer | 0 | 指定开始提取内容的位置（从第几个 segmentTag 标签之后开始） |
| 结束标签索引 | nasl.core.Integer | 0 | 指定结束提取内容的位置（在第几个 segmentTag 标签之前结束） |
| 是否进行视觉表格纵向拆分 | nasl.core.Boolean | false | 将每行横向表格切分为多个视觉表格块，按照纵向排列展示 |
| 隐藏空表格 | nasl.core.Boolean | false | 在切分后，若某些区域单元格均为空白并为白色背景，则自动隐藏 |
| 表格最大宽度 | nasl.core.String | 'unset' | 用于控制表格的最大显示宽度，如 100%、800px 等 |

#### 事件 (Events)
该组件在当前版本中暂无公开事件。

#### 方法 (Methods)
| 名称 | 说明 |
| :--- | :--- |
| reloadContent | 重新拉取 HTML 内容并执行渲染逻辑 |