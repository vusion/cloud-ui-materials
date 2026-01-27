# 零码表单设计器依赖库 (cw_form_designer_library)

## 依赖库介绍
cw_form_designer_library 是一款专为零代码/低代码平台开发的表单设计器依赖库。它提供了从表单的可视化建模、结构定义到最终页面渲染的完整解决方案。通过该库，开发者可以快速集成表单设计界面，并根据生成的 JSON 或模版协议进行动态表单渲染，支持复杂的数据校验、权限控制及多种交互模式。

## 包含组件
- **cw-form-designer（表单设计器）**：提供可视化的拖拽界面，用于设计表单布局并生成对应的 JSON 描述、模版描述和数据结构。
- **cw-form-json-render（JSON渲染器）**：基于 JSON 描述协议实时渲染表单，支持数据填充、表单验证及颗粒度的数据权限控制。
- **cw-form-template-render（模版渲染器）**：基于模版协议渲染表单，支持在「渲染模式」与「设计模式」间切换，适用于不同的业务场景。

## 包含逻辑
- 暂无内置逻辑列表。

## API 说明

### cw-form-designer (表单设计器)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| initLayout | String | '' | 初始化布局字符串 |
| initData | String | '' | 初始化数据字符串 |

#### 事件 (Events)
- 暂无事件说明。

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| getFormJSON | - | 获取当前设计的表单 JSON 结构 |
| getFormTemplate | - | 获取当前设计的表单模版 |
| getFormEntity | - | 获取当前设计的表单数据结构定义 |

---

### cw-form-json-render (JSON渲染器)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| initJSON | String | '' | 初始化的 JSON 渲染协议 |
| initData | String | '' | 初始化的表单数据 |
| dataPermission | String | - | 数据权限控制，包括：可编辑(editable)、隐藏(hidden)、只读(readonly)、预览(preview)、禁用(disabled) |

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| onRenderSuccess | 渲染成功时触发，返回初始化参数及类型 |
| onRenderFailed | 渲染失败时触发，返回错误相关上下文 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| validate | (trigger: String, muted: Boolean) | 手动验证。trigger 可选值：submit, blur, input；muted 为是否静默验证 |
| getFormData | - | 获取当前表单的实时数据 |

---

### cw-form-template-render (模版渲染器)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'render' \| 'designer' | 'render' | 渲染类型：渲染模式 (render) 或 设计模式 (designer) |
| initLayout | String | '' | 初始化的模版布局字符串 |
| initData | String | '{}' | 初始化的表单数据 |
| dataPermission | String | - | 表单字段的数据权限设置 |

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| onRenderSuccess | 渲染成功时触发 |
| onRenderFailed | 渲染失败时触发 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| validate | (trigger: String, muted: Boolean) | 手动触发表单校验 |
| getFormData | - | 获取当前渲染器中的表单数据 |