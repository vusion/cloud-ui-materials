# 打印模块SDK (print_block_sdk)

本依赖库提供与「打印模块SDK」相关的组件与逻辑，可在 Codewave 低代码平台中引用。主要用于满足各种 Web 打印场景，包括基础打印、具备高度自定义能力的分页打印以及支持重叠设置的多页长图打印。

## 包含组件

- **cw-multi-page-print-view (多页打印组件)**：支持页间重叠高度设置的打印组件，常用于长内容的分页处理。
- **cw-print-designer (分页打印组件)**：功能丰富的打印设计器组件，支持纸张尺寸、页眉页脚、边距及比例缩放等细粒度配置。
- **cw-print-view (打印组件)**：基础打印显示组件，用于简单的打印需求。

## 逻辑列表

暂无逻辑列表。

## 组件 API 说明

### cw-multi-page-print-view (多页打印组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| isShowPrint | boolean | false | 是否展示打印区域 |
| overlapHeight | number | 0 | 页间重叠高度(px)。取值 0-50，0 表示不切片直接长图打印；>0 时按该值分页并在相邻页顶部重复显示。 |

#### 事件 (Events)
暂无组件内定义事件。

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| print | - | 执行打印操作 |

---

### cw-print-designer (分页打印组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| isShowPrint | boolean | false | 是否展示打印区域 |
| paperSize | string | 'a4' | 打印纸张尺寸。可选值：a3, a4, a5, b3, b4, b5, custom |
| pageWidth | number | 794 | 纸张宽度 (仅在 paperSize 为 custom 时生效) |
| pageHeight | number | 794 | 纸张高度 (仅在 paperSize 为 custom 时生效) |
| pageDirection | string | 'v' | 打印出纸方向。可选值：v (纵向), h (横向) |
| isRate | boolean | false | 是否按比例缩放打印。开启后画布宽度随内容自动变宽 |
| showHeader | boolean | false | 是否显示页眉区域 |
| showFooter | boolean | false | 是否显示页尾区域（设置页脚高度，单位mm） |
| yBorder | number | 0 | 垂直页边距，单位mm |
| xBorder | number | 0 | 水平页边距，单位mm |

#### 事件 (Events)
暂无组件内定义事件。

#### 方法 (Methods)
| 名称 | 参数说明 | 说明 |
| :--- | :--- | :--- |
| print | pagerInHeader (页眉页码), pagerSizeInHeader (页眉页码大小), pagerSizeInFooter (页脚页码大小), pagerInFooter (页脚页码), itemElement (避免分页的元素名) | 执行分页打印操作 |

---

### cw-print-view (打印组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| isShowPrint | boolean | false | 是否展示打印区域 |

#### 事件 (Events)
暂无组件内定义事件。

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| print | - | 执行打印操作 |