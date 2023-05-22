<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapTreeDiagram 树状结构图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

**Other**

请在这里添加描述

## 示例
### 基本用法

``` html
<lcap-tree-diagram></lcap-tree-diagram>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| valueField | string |  |  | 用户标识选中值的属性 |
| text | string |  | `'树状结构图'` | 用于显示文本的字段名 |
| showChildDotNum | boolean |  | `true` | 默认开启；开启后显示其子节点的全部数量 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @click



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 点击 |

#### @dblclick



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 双击 |

#### @mouseover



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 鼠标移入 |

#### @mouseout



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 鼠标移出 |

