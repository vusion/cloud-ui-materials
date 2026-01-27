# 级联选择器 (cw_cascader_lib)

## 依赖库介绍
`cw_cascader_lib` 是一个功能丰富的级联选择器组件库，旨在解决多层级、树形数据的展示与选择需求。该库提供了标准级联选择器及适配表单场景的表单级联选择器，支持单选、多选、远程数据加载、搜索过滤、父子节点不关联、以及高度自定义的选项内容插槽，适用于各类复杂的业务配置场景。

## 包含组件
- **cw-el-cascader-pro (级联选择器)**: 基础级联选择组件，支持丰富的数据展示和交互配置。
- **cw-el-form-cascader-pro (表单级联选择器)**: 基于基础级联选择器封装，集成了表单校验、标签显示等表单项功能。

## 组件功能说明

### 1. cw-el-cascader-pro (级联选择器)
核心级联组件，支持树形结构的递归展示。提供多级联动、路径显示、多选折叠等功能，并可通过插槽自定义每一个选项的渲染逻辑。

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| borderless | Boolean | false | 无边框模式 |
| checkStrictly | Boolean | false | 父子不关联：父子节点选中状态不再关联，可各自选中或取消 |
| clearable | Boolean | false | 是否支持清空选项 |
| disabled | Boolean | - | 是否禁用组件 |
| empty | Any | - | 无数据内容时的占位显示 |
| filterable | Boolean | false | 是否开启搜索功能 |
| dataSource | List<T> \| Object | - | 数据源，支持集合类型变量或逻辑输出 |
| dataSchema | T | - | 数据源返回的数据结构类型（自动识别） |
| textField | Function | item => item.label | 文本字段：集合元素中用于显示的属性名 |
| valueField | Function | item => item.value | 值字段：集合元素中用于标识选中值的属性名 |
| childrenField | Function | item => item.children | 子级字段：树形数据子节点的属性名 |
| parentField | Function | - | 父级值字段：用于标识父节点的属性名 |
| optionIsSlot | Boolean | - | 是否启用动态选项插槽 |
| multiple | Boolean | false | 是否允许多选 |
| max | Decimal | - | 多选数量限制，0 为不限制 |
| minCollapsedNum | Decimal | - | 最小折叠数量，超出后将折叠选中项 |
| placeholder | String | - | 输入框占位符 |
| readonly | Boolean | false | 只读状态，隐藏输入框且无法打开下拉框 |
| showAllLevels | Boolean | true | 是否在输入框中显示完整路径 |
| size | Enum | 'medium' | 组件尺寸，可选值：large, medium, small |
| status | Enum | 'default' | 输入框状态，可选值：default, success, warning, error |
| trigger | Enum | 'click' | 展开下一层级的方式，可选值：click, hover |
| value | V \| List<V> | - | 选中项的值（支持双向绑定） |
| valueMode | Enum | 'onlyLeaf' | 选中值模式：onlyLeaf (仅叶子), parentFirst (父节点优先), all (全部) |
| valueType | Enum | 'single' | 选中值类型：single (仅叶子值), full (全路径) |

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| onChange | 选中值发生变化时触发，返回当前节点及触发来源信息 |

#### 方法 (Methods)
| 名称 | 说明 |
| --- | --- |
| reload | 重新加载：清除缓存并触发数据源刷新 |

#### 插槽 (Slots)
| 名称 | 说明 |
| --- | --- |
| slotOption | 选项内容：用于自定义单个级联选项的展示样式 |

---

### 2. cw-el-form-cascader-pro (表单级联选择器)
此组件继承了 `cw-el-cascader-pro` 的所有 API 特性，并结合了 `ElFormItemPro` 的表单能力，如字段名绑定、必填校验规则等，主要用于表单容器内。