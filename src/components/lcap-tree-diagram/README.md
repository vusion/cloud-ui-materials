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
  <lcap-tree-diagram :data-source="list" value-field="childId" parent-field="parentId1" @mouseout="mouseout"> 
  </lcap-tree-diagram>
</template>
<script>
export default {
    data() {
      return {
        list: [
          {
            "childId": 1,
            "label": "主题",
            "parentId1": 0
          },
          {
            "childId": 2,
            "label": "子主题",
            "parentId1": 1
          },
          {
            "childId": 3,
            "label": "子主题2",
            "parentId1": 1
          },
          {
            "childId": 4,
            "label": "子子主题1",
            "parentId1": 3
          },
          {
            "childId": 5,
            "label": "子子主题4",
            "parentId1": 2
          }
      ],
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
            ],
          },
        ],
      },
        };
    },
    methods: {
      mouseout(e, data) {
        console.log(e,data)
      }
    }
};
</script>
```


## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| value-field | string |  | `'id'` | 用户标识选中值的属性 |
| text-field | string |  | `'label'` | 用于显示文本的字段名 |
| showChildDotNum | boolean |  | `true` | 默认开启；开启后显示其子节点的全部数量 |
| parent-field | string |  | `'parentId'` | 集合的元素类型中，用于标识父节点的属性 |

### Slots

#### dialog

自定义插槽

### Events

#### @click



| Param | Type | Description |
| ----- | ---- | ----------- |
| e | object | 当前坐标等信息 |
| data | object | 当前选项数据 |

#### @dblclick



| Param | Type | Description |
| ----- | ---- | ----------- |
| e | object | 当前坐标等信息 |
| data | object | 当当前选项数据 |

#### @mouseover



| Param | Type | Description |
| ----- | ---- | ----------- |
| e | object | 当前坐标等信息 |
| data | object | 当当前选项数据 |

#### @mouseout



| Param | Type | Description |
| ----- | ---- | ----------- |
| e | object | 当前坐标等信息 |
| data | object | 当当前选项数据 |
