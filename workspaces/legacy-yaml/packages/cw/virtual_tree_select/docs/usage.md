# 虚拟树 (virtual_tree)

本依赖库提供与「虚拟树」相关的组件与逻辑，专为 Codewave 低代码平台设计。它旨在解决在大数据量场景下，传统树形组件渲染性能低下的问题，通过虚拟滚动技术实现高效的层级数据展示与交互。

## 包含组件

- **virtual-node-tree-select (虚拟节点树形选择器)**：适用于需要从大量树形结构数据中选择特定项的场景，提供下拉选择交互。
- **virtual-node-tree-view (虚拟节点树形视图)**：用于在大数据量下直观展示层级结构数据，支持灵活的数据绑定和节点操作。

## 包含逻辑

- 暂无公开逻辑。

## API 说明

### virtual-node-tree-select (虚拟节点树形选择器)

#### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | array | '' | 需要传入的值 |
| data | array | '' | options 选项，数据格式如 `[ {id: **, name: **},... ]` |

#### 事件 (Events)

| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| change | 值改变时触发 | `$event` (array): 改变后的值参数 |

#### 方法 (Methods)

- 暂无公开方法。

---

### virtual-node-tree-view (虚拟节点树形视图)

#### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | - | 展示数据的输入源，支持集合变量或逻辑输出 |
| data-schema | schema | - | 数据类型说明，自动识别数据源结构 |
| text-field | string | 'text' | 集合中用于显示文本的属性名称 |
| value-field | string | 'value' | 集合中用于标识选中值的属性名称 |
| children-field | string | 'children' | 集合中用于标识子节点的属性名称 |
| parent-field | string | '' | 集合中用于标识父节点的属性名称 |
| value | any | - | 当前选中的值，支持双向绑定 (sync/model) |

#### 事件 (Events)

| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| select | 选择某一项时触发 | `$event`: 包含 value, oldValue, node, oldNode, nodeVM 等信息的对象; `senderVM`: 发送事件的实例 |

#### 方法 (Methods)

- 暂无公开方法。