<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapTreeDiagramDemo 树状结构图demo

- [示例](#示例)
    - [基本用法](#基本用法)
    - [load 方法](#load-方法)
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
  <lcap-tree-diagram-demo
    :data-source="list"
    value-field="id"
    parent-field="pid"
    text-field="label"
    @click="click"
    @onDelete="onDelete"
    ref="node"
  >
  <template #dialog> 
     <h1 style="color: red">111111111</h1>
   </template>
  </lcap-tree-diagram-demo>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          label: '主题主题',
          pid: 0,
        },
        {
          id: 2,
          label: '主题主题1',
          pid: 1,
        },
        {
          id: 3,
          label: '主题主题3',
          pid: 1,
        },
        {
          id: 4,
          label: '主题主题4',
          pid: 3,
        },
        {
          id: 5,
          label: '主题主题5',
          pid: 3,
        },
        {
          id: 6,
          label: '主题6',
          pid: 4,
        },
        {
          id: 7,
          label: '主题7',
          pid: 4,
        },
        {
          id: 8,
          label: '主题8',
          pid: 5,
        },
        {
          id: 9,
          label: '主题主题9',
          pid: 5,
        },
        {
          id: 10,
          label: '主题主题10',
          pid: 5,
        },
        {
          id: 11,
          label: '主题主题11',
          pid: 8,
        },
        {
          id: 12,
          label: '主题主题12',
          pid: 11,
        },
        {
          id: 13,
          label: '主题主题13',
          pid: 12,
        },
        {
          id: 14,
          label: '主题主题14',
          pid: 1,
        },
        {
          id: 15,
          label: '主题主题15',
          pid: 1,
        },
        {
          id: 16,
          label: '主题题主题16',
          pid: 1,
        },
        {
          id: 17,
          label: '主题主题主题17',
          pid: 1,
        },
        {
          id: 18,
          label: '主题主题主18',
          pid: 1,
        },
        {
          id: 19,
          label: '主题主题主题主题19',
          pid: 1,
        },
        {
          id: 20,
          label: '主题主题20',
          pid: 1,
        },
      ]
       
    };
  },
  methods: {
    click(e) {
    },
    onDelete(e) {
      this.$refs.node.reload();
    },
  },
};
</script>
```

### load 方法

``` vue
<template>
  <lcap-tree-diagram-demo
    :data-source="load"
    value-field="category.id"
    parent-field="category.pid"
    text-field="category.label"
  >
  </lcap-tree-diagram-demo>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟数据服务
const mockService = {
    load() {
      return mockRequest([
        {
          category: {
            id: 111,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            label: '全部风险全',
            explanation: '这是全部风险',
            pid: 0,
            levellabel: '全部风险',
          },
        },
        {
          category: {
            id: 145,
            createdTime: '2023-05-25T03:19:45.000Z',
            updatedTime: '2023-05-25T03:19:45.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: 'ces',
            explanation: null,
            pid: 111,
            levellabel: '全部风险/测试',
          },
        },
        {
          category: {
            id: 10,
            createdTime: '2023-05-25T03:19:45.000Z',
            updatedTime: '2023-05-25T03:19:45.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '测试测试册',
            explanation: null,
            pid: 111,
            levellabel: '全部风险/测试/12312312312',
          },
        }
      ]);
    },
};

export default {
  methods: {
    load() {
      return mockService.load();
    },
    click(e) {
    }
  }
};
</script>
```
## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| show-child-dot-num | boolean |  | `true` | 默认开启；开启后显示其子节点的全部数量 |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema |  |  | 选择器每一行的数据类型 |
| value-field | string |  | `'id'` | 用户标识选中值的属性 |
| text-field | string |  | `'label'` | 用于显示文本的字段名 |
| parent-field | string |  | `'parentId'` | 集合的元素类型中，用于标识父节点的属性 |
| show-text-ellipsis | boolean |  | `false` | 文字超出6个后多余的文字用省略号展示 |

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

