# cw_virtual_tree 虚拟树

## 依赖库介绍
本依赖库提供与「虚拟树」相关的组件与逻辑，可在 Codewave 低代码平台中引用。其核心目标是解决在大数据量场景下树形结构的渲染性能问题，通过虚拟滚动技术，在保持流畅交互的同时支持海量节点的展示、搜索与操作。

## 包含的组件与逻辑
### 组件列表
- **virtual-node-tree-select（虚拟节点树形选择器）**：适用于需要在大数据量树形结构中进行搜索和单选/多选的场景。
- **virtual-node-tree-view（虚拟节点树形视图）**：适用于大数据量树形结构的展示、节点管理（增删改）以及拖拽交互场景。

### 逻辑列表
- 暂无逻辑。

## API 说明

### virtual-node-tree-select 虚拟节点树形选择器
#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | array | '' | 需要传入的值，支持双向绑定 |
| data | array | '' | options选项，数据结构如：[ {id: **, name: **, children: [...]},... ] |
| placeholder | string | 请选择 | 选择器的占位文本 |
| emptyText | string | 暂无数据 | 数据为空时显示的文本 |
| checkedButtonText | string | 已选 | 已选按钮显示的文字 |
| searchPlaceholder | string | 搜索关键字 | 搜索输入框的占位文本 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| change | $event: array | 当选择的值发生改变时触发 |

#### 方法 (Methods)
该组件暂无公开方法。

---

### virtual-node-tree-view 虚拟节点树形视图
#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data-source | Array<Item> \| Function \| object \| DataSource | - | 展示数据的输入源，可设置为集合变量或输出参数为集合类型的逻辑 |
| data-schema | schema | - | 数据源返回的数据结构类型，系统自动识别 |
| title-field | string | title | 集合中用于显示节点文本的属性名称 |
| value-field | string | id | 集合中用于标识选中值的属性名称 |
| children-field | string | children | 集合中用于标识子节点的属性名称 |
| parent-field | string | '' | 集合中用于标识父节点的属性名称 |
| isLeaf-field | string | '' | 集合中用于标识是否是叶节点的属性名称 |
| sorted-field | string | '' | 集合中用于排序的属性名称 |
| expand-field | string | '' | 集合中用于控制展开状态的属性名称 |
| value | any | - | 当前选中的值，支持双向绑定 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| select | $event, senderVM | 选择某一项时触发。$event 包含当前值、旧值、节点对象等详细信息 |
| drop | $event, ceshi | 节点拖拽后触发。$event 包含改变前后的值及节点相关信息 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| updateNode | node: object | 更新某个节点（注意：无法更新其关联的子节点） |
| insertNode | node: object, parentNodeKey: string | 将指定节点插入到目标父节点下 |
| removeNode | key: string | 根据节点 ID 删除某个节点 |