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

``` vue

<template>
  <lcap-tree-diagram :dataSource="fakeData"></lcap-tree-diagram>
</template>
<script>
export default {
    data() {
        return {
      fakeData: {
        id: 0,
        label: 'XXXPOC测试',
        children: [
          {
            id: 2,
            label: '产品研发部',
            children: [
              {
                id: 5,
                label: '研发-前端',
              },
              {
                id: 6,
                label: '研发-后端',
              },
              {
                id: 9,
                label: 'UI设计',
              },
              {
                id: 10,
                label: '产品经理',
              },
            ],
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部',
              },
              {
                id: 8,
                label: '销售二部',
              },
            ],
          },
          {
            id: 4,
            label: '财务部',
          },
          {
            id: 9,
            label: 'HR人事',
          },
        ],
      },
        };
    },
};
</script>
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
| $event | object | 参数 |

#### @dblclick



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 参数 |

#### @mouseover



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 参数 |

#### @mouseout



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 参数 |

