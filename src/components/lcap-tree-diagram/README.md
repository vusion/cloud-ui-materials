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

```vue
<template>
  <lcap-tree-diagram
    :data-source="list"
    value-field="sid"
    parent-field="parentId"
    data-entity="shuxingtu"
    @click="click"
    @onDelete="onDelete"
    dEntity="shuxingtu"
  >
  </lcap-tree-diagram>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          shuxingtu: {
            id: 2618295788423680,
            createdTime: '2023-05-25T03:04:41.000Z',
            updatedTime: '2023-05-25T03:04:41.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 1,
            label: '主题',
            parentId: 0,
          },
        },
        {
          shuxingtu: {
            id: 2618298826205696,
            createdTime: '2023-05-25T03:10:52.000Z',
            updatedTime: '2023-05-25T03:10:52.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 2,
            label: '子主题',
            parentId: 1,
          },
        },
        {
          shuxingtu: {
            id: 2618298975726080,
            createdTime: '2023-05-25T03:11:10.000Z',
            updatedTime: '2023-05-25T03:11:10.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 3,
            label: '子主体2',
            parentId: 1,
          },
        },
        {
          shuxingtu: {
            id: 2618299090250240,
            createdTime: '2023-05-25T03:11:24.000Z',
            updatedTime: '2023-05-25T03:11:24.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 4,
            label: '字子主题',
            parentId: 3,
          },
        },
      ],
      fakeData: {
        id: 0,
        label: 'XXXPOC测试',
        index: 0,
        children: [
          {
            id: 2,
            label: '产品研发部',
            index: 1,
            children: [
              {
                id: 5,
                index: 3,
                label: '研发-前端',
                children: [
                  {
                    id: 6,
                    index: 4,
                    label: '研发-前端111111111',
                  },
                  {
                    id: 7,
                    index: 4,
                    label: '研发-前端1223',
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            label: '销售部',
            index: 1,
            children: [
              {
                id: 7,
                index: 2,
                label: '销售一部',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    // onTogglePop(e) {
    //   console.log(e)
    // },
    click(e) {
      console.log(e);
    },
    onDelete(e) {
      console.log(e, '-ee');
    },
  },
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
| data-entity | string |  | `''` | 属于匿名数据结构的需要传递数据实体名称，否则不用 |

### Slots

#### dialog

自定义插槽

### Events

#### @onEdit



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | ChangeItemEvent | 鼠标事件对象 |

#### @onDelete



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | ChangeItemEvent | 鼠标事件对象 |

