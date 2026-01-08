# Byte Markdown Components

基于 [ByteMD](https://github.com/bytedance/bytemd) 封装的 Vue 2 Markdown 组件库，专为低代码平台（NASL）设计。包含编辑器和预览两个核心组件。

## 组件列表

### 1. ByteMarkdownEditor (Markdown 编辑器)

提供功能丰富的 Markdown 编辑体验，支持多种插件扩展和图片上传。

#### 特性
- **内置插件**: GFM, Highlight, Frontmatter, Math (KaTeX), Mermaid, Gemoji, Breaks, Medium Zoom.
- **汉化支持**: 界面已配置为简体中文。
- **图片上传**: 支持自定义 `uploadUrl`，默认对接低代码平台网关接口。
- **IDE 适配**: 针对低代码平台 IDE 环境进行了样式和交互优化。

#### 属性 (Props)
| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `String` | `''` | 编辑器内容，支持双向绑定 (`sync`) |
| `uploadUrl` | `String` | `'/gateway/lowcode/api/v1/app/upload'` | 图片上传接口地址 |

#### 事件 (Events)
| 事件名 | 参数 | 描述 |
| --- | --- | --- |
| `onChange` | `(value: string)` | 内容变化时触发 |

---

### 2. ByteMarkdownPreview (Markdown 渲染组件)

用于高性能渲染 Markdown 内容，并提供美观的排版和目录导航。

#### 特性
- **主题风格**: 采用 GitHub 风格渲染样式。
- **目录导航**: 支持可选的侧边栏目录大纲（TOC）。
- **增强插件**:
    - 自动修改链接 `target="_blank"`。
    - 优化代码块展示。
    - 支持 iframe 嵌入（如视频、外部网页）。
- **透明背景**: 预览区域背景透明，易于嵌入各种页面设计。

#### 属性 (Props)
| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `text` | `String` | (内置测试文本) | 需要渲染的 Markdown 文本内容 |
| `showToc` | `Boolean` | `false` | 是否显示侧边栏目录大纲 |

## 快速开始

### 安装依赖

在工作区根目录下执行：
```bash
pnpm install
```

### 运行 Demo (Storybook)

```bash
pnpm run storybook
```

## 技术栈
- Vue 2.x
- ByteMD (Markdown 核心)
- NASL (低代码平台元数据定义)
- Less / PostCSS
