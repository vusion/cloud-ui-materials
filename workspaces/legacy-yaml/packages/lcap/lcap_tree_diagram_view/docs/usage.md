# lcap_tree_diagram_view 依赖库说明

本依赖库提供与「树状结构图」相关的组件与逻辑，旨在为 Codewave 低代码平台提供可视化层级结构的展示与操作能力。通过该库，用户可以轻松构建组织架构图、分类树等具有父子关系的图表。

## 包含组件

- **lcap-tree-diagram（树状结构图）**：用于展示和操作树形层级数据的核心组件。

## 逻辑列表

暂无相关逻辑。

## 组件 API 说明

### lcap-tree-diagram（树状结构图）

#### 属性 (Attributes)

| 属性名 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| value-field | 值字段 | string | "id" | 用户标识选中值的属性 |
| text-field | 文本字段 | string | 'label' | 用于显示文本的字段名 |
| showChildDotNum | 子节点收起显示子节点总数 | boolean | true | 默认开启；开启后显示其子节点的全部数量 |
| parent-field | 父级选项值 | string | "parentId" | 集合的元素类型中，用于标识父节点的属性 |
| data-entity | 数据实体名称 | string | "" | 属于匿名数据结构的需要传递数据实体名称，否则不用 |

#### 事件 (Events)

| 事件名 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| onEdit | 弹窗编辑 | $event: ChangeItemEvent | 鼠标事件对象 |
| onDelete | 弹窗删除 | $event: ChangeItemEvent | 鼠标事件对象 |

#### 方法 (Methods)

| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| reload | 重新加载 | 无 | 无 |

#### 插槽 (Slots)

| 插槽名 | 说明 | 插槽属性 |
| :--- | :--- | :--- |
| dialog | 自定义插槽 | scope: T (当前节点数据) |