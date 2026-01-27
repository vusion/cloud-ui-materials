# 分页打印组件 (cw_cut_printview)

## 依赖库介绍
cw_cut_printview 是一款专门用于实现分页打印功能的组件库。它提供了强大的容器和分页管理组件，能够帮助开发者在低代码应用中轻松实现复杂页面的自动分页、打印样式控制（如页边距、打印方向）以及打印预览功能，确保打印输出的效果符合预期。

## 组件列表
- **cut-print-header**：分页组件表头组件。用于定义打印时每一页顶部需要重复显示的表头内容。
- **pagination-print-block**：分页打印容器。作为打印功能的核心外层容器，负责控制打印的全局配置（如边距、方向）并提供触发打印的方法。
- **pagination-print-item**：分页组件。用于包裹具体的业务内容项，配合容器实现内容的分页逻辑。

## 逻辑列表
暂无逻辑列表。

## API 说明

### cut-print-header (分页组件表头组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| slotDefault | Slot | - | 默认插槽，用于插入表头显示的内容 |

#### 事件 (Events)
暂无该组件的相关事件说明。

#### 方法 (Methods)
暂无该组件的可调用方法。

---

### pagination-print-block (分页打印容器)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| yBorder | Integer | 10 | 垂直页边距 |
| xBorder | Integer | 10 | 水平页边距 |
| hideOnScreen | Boolean | false | 是否在屏幕显示时隐藏打印内容 |
| debug | Boolean | false | 是否开启调试模式，开启后通常会显示分页辅助线 |
| printDirection | Enum | 'vertical' | 默认打印方向。可选值：'vertical' (纵向), 'horizontal' (横向) |
| slotDefault | Slot | - | 默认插槽，用于放置需要打印的内容区域 |

#### 事件 (Events)
暂无该组件的相关事件说明。

#### 方法 (Methods)
| 名称 | 参数 | 返回值 | 说明 |
| :--- | :--- | :--- | :--- |
| print | - | void | 触发打印操作，调起系统打印窗口 |

---

### pagination-print-item (分页组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| isHorizontal | Boolean | false | 标记该分页项是否按横向布局进行打印处理 |

#### 事件 (Events)
暂无该组件的相关事件说明。

#### 方法 (Methods)
暂无该组件的可调用方法。