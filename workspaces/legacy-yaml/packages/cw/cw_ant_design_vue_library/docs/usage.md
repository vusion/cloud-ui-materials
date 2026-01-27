# cw_ant_design_vue_library (antd_vue_library)

## 简介
`cw_ant_design_vue_library` 是一套基于 Ant Design Vue 封装的组件库，旨在为 Codewave 低代码平台提供功能丰富、交互规范的 UI 组件。本库集成了日历、文件上传以及自动完成等核心功能，支持动态数据绑定与样式自定义，帮助开发者快速构建企业级应用界面。

## 包含的组件

- **cw-antd-calendar（日历）**：提供全屏或面板式的日历展示，支持日期选择、面板切换及主题定制。
- **cw-antd-upload（文件上传）**：支持图片上传、截图剪裁、质量控制及多种上传方式（相机/相册）。
- **cw-auto-complete（自动完成）**：输入框自动完成功能，支持从数据源中检索并展示建议列表。

## API 说明

### cw-antd-calendar (日历)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | - | 展示数据的输入源，支持 List<T> 或逻辑输出 |
| data-schema | schema | - | 数据类型，自动识别数据源元素类型（只读） |
| value | string | - | 当前选中的值（支持双向绑定） |
| value-field | string | - | 集合元素中用于标识选中值的属性字段 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| onPanelChange | value: string | 日期面板变化时的回调 |
| onSelect | value: string | 点击选择日期时的回调 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| reload | - | 清除缓存并重新加载数据 |

---

### cw-antd-upload (文件上传)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 当前选中的值（支持双向绑定） |
| outputSize | string | - | 输出图片质量，范围 0.1 - 1 |
| autoCropWidth | string | - | 默认生成截图框的宽度 |
| autoCropHeight | string | - | 默认生成截图框的高度 |
| canMoveBox | boolean | - | 截图框是否可以移动，默认可拖动 |
| fixedBox | boolean | - | 是否固定截图框大小，默认 false |
| uploadUrl | string | - | 上传地址，默认为平台地址，支持自定义 |
| zoom | string | - | 图片缩放比例，默认为 1 |
| info | boolean | true | 是否展示截图信息 |
| uploadType | string | - | 上传方式：null (默认), camera (相机) |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| onSuccess | value: string | 上传成功时的回调，返回成功的值 |
| onError | value: string | 上传失败时的回调，返回错误原因 |

#### 方法 (Methods)
暂无（本组件未定义公共方法）。

---

### cw-auto-complete (自动完成)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | - | 展示数据的输入源，支持 List<T> 或逻辑输出 |
| data-schema | schema | - | 数据类型，自动识别数据源元素类型（只读） |
| value | string | - | 当前选中的值（支持双向绑定） |
| value-field | string | - | 集合元素中用于标识选中值的属性字段 |
| placeholder | string | - | 输入框提示文字 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| onChange | value: string | 输入值改变时的回调 |

#### 方法 (Methods)
暂无（本组件未定义公共方法）。