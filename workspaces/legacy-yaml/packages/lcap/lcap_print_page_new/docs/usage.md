# 页面打印 (lcap_print_page_new)

## 依赖库介绍

`lcap_print_page_new` 是一套专为 Codewave 低代码平台设计的页面导出工具库。它能够高效地捕捉页面中的 DOM 节点，并根据用户配置将其转换为高质量的 PDF 文档或 PNG 图片文件。该库支持灵活的导出配置，包括自定义导出尺寸、文件命名、是否分页以及自动下载等功能，适用于业务凭证打印、报表快照留存等场景。

## 包含组件与逻辑列表

### 组件
- **lcap-print-page-new（页面打印）**: 实现页面捕获与导出功能的核心组件。

### 逻辑
- （暂无）：本依赖库暂未包含独立的逻辑函数。

## 组件 API 说明

### lcap-print-page-new

#### 属性 (Attributes)

| 参数 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| hidden | 隐藏组件 | boolean | false | 是否显示打印按钮 |
| fileName | 文件名称 | string | 文件导出 | 设置打印的文件名称 |
| printDOM | 打印的DOM节点 | string | body | 设置打印的DOM节点 |
| isNotFullPage | PDF是否分页 | boolean | false | 打印的PDF是否分页 |
| canvasWidth | 打印文件宽度 | number|string | 1000 | 设置打印文件的宽度 |
| canvasHeight | 打印文件高度 | number|string | 800 | 设置打印文件的高度 |
| download | 是否自动下载文件 | boolean | false | 是否自动下载打印的文件 |
| fileType | 文件类型 | string | pdf | 设置打印的文件类型，支持 PDF 和 PNG |

#### 事件 (Events)

| 事件名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| print | 打印时 | $event.file (Binary) | 打印时触发，返还打印生成的二进制文件流 |

#### 方法 (Methods)

| 方法名 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| printPage | 打印当前页面 | 无 | 触发组件执行打印当前页面内容的操作 |