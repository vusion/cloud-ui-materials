<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapTreeDiagram 树状结构图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)
    - [Methods](#methods)

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
    @click="click"
    @onDelete="onDelete"
    ref="node"
  >
  </lcap-tree-diagram>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
            id: 2618295788423680,
            createdTime: '2023-05-25T03:04:41.000Z',
            updatedTime: '2023-05-25T03:04:41.000Z',
            createdBy: null,
            updateBy: null,
            sid: 1,
            label: '主题',
            parentId: 0,
          },
        {
            id: 2618298826205696,
            createdTime: '2023-05-25T03:10:52.000Z',
            updatedTime: '2023-05-25T03:10:52.000Z',
            createdBy: null,
            updateBy: null,
            sid: 2,
            label: '子主题',
            parentId: 1,
        },
        {
            id: 2618298975726080,
            createdTime: '2023-05-25T03:11:10.000Z',
            updatedTime: '2023-05-25T03:11:10.000Z',
            createdBy: null,
            updateBy: null,
            sid: 3,
            label: '子主体2',
            parentId: 1,
        },
        {
            id: 2618299090250240,
            createdTime: '2023-05-25T03:11:24.000Z',
            updatedTime: '2023-05-25T03:11:24.000Z',
            createdBy: null,
            updateBy: null,
            sid: 4,
            label: '字子主题',
            parentId: 3,
        },
      ]
    }
  },
  methods: {
    // onTogglePop(e) {
    //   console.log(e)
    // },
    click(e) {
      console.log(e);
    },
    onDelete(e) {
      this.$refs.node.reload();
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

Methods

#### reload()

重新加载

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

