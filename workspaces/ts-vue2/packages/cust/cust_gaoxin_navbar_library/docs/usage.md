# cust_gaoxin_navbar_library 自定义导航栏

## 依赖库介绍
`cust_gaoxin_navbar_library` 是一个功能丰富的自定义导航栏组件库，主要用于构建页面顶部的导航菜单。它支持 Logo 展示、多级导航链接、用户信息集成等常见功能。该库提供了灵活的数据驱动模式，支持静态声明或通过数据源动态渲染，并深度集成路由联动，适用于各种复杂度的门户网站或管理系统。

## 包含组件
- **gx-u-navbar-multi**：导航栏根容器，支持数据源绑定和插槽扩展。
- **gx-u-navbar-item-multi**：导航栏项，用于展示具体的跳转链接或操作按钮。
- **gx-u-navbar-group-multi**：导航栏分组，支持折叠和多级嵌套。
- **gx-u-navbar-divider-multi**：导航栏分隔线，用于区分不同区域的组件。
- **gx-u-navbar-dropdown-multi**：导航栏下拉菜单，用于承载更多扩展操作。
- **其他辅助组件**：包括菜单级组件（gx-u-navbar-menu-multi 等）和选择级组件（gx-u-navbar-select-multi 等）。

## 包含逻辑
- 暂无逻辑列表。

## 组件 API 说明

### gx-u-navbar-multi (导航栏)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| hasDataSource | Boolean | false | 是否使用数据源配置 |
| optionIsSlot | Boolean | - | 动态选项插槽，自定义选项内容 |
| dataSource | List<T> \| { list, total } | - | 展示数据的输入源，支持集合类型或逻辑输出 |
| textField | (item: T) => any | item.text | 集合元素中用于显示文本的属性名称 |
| valueField | (item: T) => V | item.value | 集合元素中用于标识选中值的属性 |
| iconField | (item: T) => any | item.icon | 集合元素中用于图标的属性名称 |
| toField | (item: T) => any | item.to | 集合元素中用于跳转链接的属性名称 |
| parentField | (item: T) => any | - | 集合元素中用于标识父节点的属性 |
| router | Boolean | true | 是否根据 vue-router 来控制选择项高亮 |
| value | V | - | 当前选中的值（router 为 false 时有效） |
| readonly | Boolean | false | 是否只读，正常显示但禁止选择 |
| disabled | Boolean | false | 是否禁用，置灰且禁止交互 |
| expandIcon | String | 'bottom-arrow' | 展开图标 |
| popupExpandIcon | String | 'right-arrow' | 子菜单展开图标 |
| loadingIcon | String | 'loading' | 加载图标 |

#### 事件 (Events)
| 名称 | 参数类型 | 说明 |
| :--- | :--- | :--- |
| onSelect | (event: { selected, item, oldItem, value, oldValue }) => any | 选择某一项后触发 |

#### 方法 (Methods)
- 暂无组件方法。

---

### gx-u-navbar-item-multi (导航栏项)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| text | String | - | 文本内容 |
| value | String | - | 用于标识此项的值 |
| icon | String | '' | 图标名称 |
| to | String | - | 路由链接地址 |
| replace | Boolean | false | 是否替换当前路由记录 |
| exact | Boolean | false | 是否与路由完全一致时才高亮 |
| linkType | 'destination' \| 'download' | 'destination' | 链接类型：页面跳转或下载链接 |
| hrefAndTo | String | - | 链接地址配置 |
| target | Enum | '_self' | 链接打开方式：新窗口、当前窗口等 |
| disabled | Boolean | false | 是否禁用 |

#### 事件 (Events)
| 名称 | 说明 |
| :--- | :--- |
| onClick | 鼠标点击时触发 |
| onDblclick | 鼠标双击时触发 |
| onContextmenu | 右键点击时触发 |
| onMousedown | 鼠标按下时触发 |
| onMouseup | 鼠标释放时触发 |
| onMouseenter | 鼠标移入时触发 |
| onMouseleave | 鼠标移出时触发 |
| onFocus | 获得焦点时触发 |
| onBlur | 失去焦点时触发 |
| onNavigate | 切换路由后触发 |

#### 方法 (Methods)
- 暂无组件方法。

---

### gx-u-navbar-group-multi (导航栏分组)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | String | - | 显示的标题 |
| collapsible | Boolean | false | 是否可以展开/折叠 |
| trigger | 'click' \| 'hover' \| 'right-click' \| 'double-click' | 'click' | 触发方式 |
| expanded | Boolean | false | 展开状态 |
| disabled | Boolean | false | 禁用展开/折叠操作 |

#### 事件 (Events)
- 暂无组件事件。

#### 方法 (Methods)
- 暂无组件方法。

---

### gx-u-navbar-divider-multi (导航栏分割线)
- **属性/事件/方法**：暂无。

### gx-u-navbar-dropdown-multi (导航栏下拉菜单)
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| placement | Enum | 'bottom' | 弹出层的弹出方向 |
| trigger | Enum | 'hover' | 触发方式 |
| disabled | Boolean | false | 是否禁用 |

---

### 其他辅助组件说明
- **gx-u-navbar-menu-multi**：包含菜单、菜单项、菜单分组及分割线，用于更复杂的层级展示。
- **gx-u-navbar-select-multi**：包含选择器、选择项及分组，用于导航中的快捷选择切换。