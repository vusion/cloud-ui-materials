# cw_eu_extend_cu_library

## 依赖库介绍
`cw_eu_extend_cu_library`（ElementUI扩展CloudUI组件依赖库）是一款专为增强数据展示能力而设计的组件库。它基于 ElementUI 进行了深度扩展，提供了一套功能强大的数据表格（u-table-view）及其配套组件。该库旨在满足复杂的数据交互需求，如海量数据渲染、树形结构展示、动态列配置、拖拽排序以及高度自定义的列样式，帮助开发者快速构建高性能、高交互性的企业级数据管理界面。

## 包含组件
- **u-table-view（数据表格）**: 核心组件，支持排序、过滤、分页、虚拟滚动、树形数据及导出功能。
- **u-table-view-column（表格列）**: 用于定义表格的列属性，支持普通、序号、单选、多选、展开、编辑等多种列类型。
- **u-table-view-column-config（表格配置列）**: 提供用户自定义展示列的功能。
- **u-table-view-column-dynamic（表格动态列）**: 根据数据源动态生成表格列。
- **u-table-view-column-group（表格列分组）**: 用于表头合并与列分组展示。
- **u-table-view-expander（展开列图标）**: 自定义树形或展开列的交互图标。

---

## 组件 API 说明

### u-table-view (数据表格)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| dataSource | List<T> \| {list, total} | - | 展示的数据源，支持数组或带总数的对象 |
| pagination | Boolean | - | 是否开启分页 |
| pageSize | Integer | 20 | 每页展示条数 |
| showSizer | Boolean | true | 是否显示每页条数切换器 |
| pageSizeOptions | List<Integer> | [10, 20, 50] | 每页条数的可选选项 |
| pageNumber | Integer | 1 | 当前默认页数 |
| showTotal | Boolean | false | 分页组件是否显示总条数 |
| showJumper | Boolean | false | 分页组件是否显示跳转输入 |
| sorting | Object | {field: undefined, order: 'desc'} | 初始排序规则 |
| valueField | (item: T) => V | - | 指定数据唯一值的字段名 |
| value | V | - | 单选选中的值 |
| values | List<V> | - | 多选选中的值列表 |
| treeDisplay | Boolean | false | 是否以树形模式展示 |
| parentField | (item: T) => any | - | 树形模式下的父级字段名 |
| childrenField | (item: T) => List | item.children | 树形模式下的子级字段名 |
| treeCheckType | String | 'up+down' | 树形多选时的关联类型：'up+down', 'down', 'up', 'none' |
| title | String | - | 表格上方显示的标题 |
| showHead | Boolean | true | 是否显示表头 |
| stickHead | Boolean | false | 表头是否吸顶固定 |
| thEllipsis | Boolean | false | 表头文本过长是否省略 |
| ellipsis | Boolean | false | 内容区文本过长是否省略 |
| selectable | Boolean | false | 是否开启行选中 |
| draggable | Boolean | false | 是否开启行拖拽排序 |
| resizable | Boolean | false | 是否允许调整列宽 |
| configurable | Boolean | false | 是否开启展示列配置功能 |
| virtual | Boolean | false | 是否开启虚拟滚动（处理大数据量） |
| lazyLoad | Boolean | false | 是否开启懒加载 |
| itemHeight | Decimal \| Integer | - | 虚拟滚动/懒加载时的行高 |
| disabled | Boolean | false | 是否禁用表格交互 |
| readonly | Boolean | false | 是否设为只读 |
| striped | Boolean | false | 是否开启斑马条纹 |

#### 事件 (Events)
| 名称 | 说明 |
| :--- | :--- |
| onBeforeLoad | 数据加载前触发 |
| onLoad | 数据加载完成后触发 |
| onPage | 分页切换或分页大小改变后触发 |
| onSort | 排序规则改变后触发 |
| onClickRow | 点击某一行时触发 |
| onSelect | 选中某一项后触发 |
| onCheck | 多选模式下勾选状态改变触发 |
| onChange | 选择值发生变化后触发 |
| onResize | 调整列宽后触发 |
| onToggleExpanded | 点击展开/折叠按钮后触发 |
| onDrop | 拖拽放置结束时触发 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| reload | - | 清除缓存并从第一页开始重新加载 |
| loadTo | page: Integer | 保持当前页码或跳转到指定页刷新 |
| getFields | - | 获取所有表格列的 field 字段 |
| setAllTreeNodeExpanded | expanded: Boolean | 树形表格展开或折叠所有节点 |
| setTreeNodeExpanded | value: V, expanded: Boolean | 展开或折叠指定值的树节点 |
| exportExcel | filename, sort, order... | 导出表格数据为 Excel 文件 |
| resetEdit | item?: object | 重置编辑列的编辑状态 |

---

### u-table-view-column (表格列)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| field | (item: T) => any | - | 绑定数据项中的字段名 |
| title | String | - | 列标题 |
| type | String | 'normal' | 列类型：普通、序号(index)、单选(radio)、多选(checkbox)、展开(expander)、树形(tree)、编辑(editable)、拖拽(dragHandler) |
| sortable | Boolean | false | 该列是否支持排序 |
| defaultOrder | String | 'asc' | 初始排序方向 |
| fixed | Boolean | false | 是否固定该列（左侧或右侧） |
| width | String \| Number | - | 列宽度（如 100, '10%'） |
| hidden | Boolean | false | 是否隐藏该列 |
| autoRowSpan | Boolean | false | 是否自动合并相同数据的行 |

#### 事件与方法
- **事件**: 暂无特定组件事件。
- **方法**: 暂无特定组件方法。

---

### u-table-view-column-dynamic (表格动态列)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| dataSource | List<T1> | - | 动态列的数据源 |
| valueField | (item: T1) => any | item.value | 动态列的标识字段 |
| sortable | Boolean | false | 是否支持排序 |
| fixed | Boolean | false | 是否固定列 |
| width | String \| Number | - | 列宽度 |

---

### u-table-view-expander (展开列图标)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| expandIcon | String | - | 展开时的图标名称 |
| collapseIcon | String | - | 折叠时的图标名称 |