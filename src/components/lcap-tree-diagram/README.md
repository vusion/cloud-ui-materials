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
    value-field="id"
    text-field="label"
    @click="click"
    @onDelete="onDelete"
    ref="node"
    data-entity=""
  >
  </lcap-tree-diagram>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          category: {
            id: 111,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '全部风险',
            explanation: '这是全部风险',
            pid: 0,
            levelName: '全部风险',
          },
        },
        {
          category: {
            id: 112,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: '奇欣欣',
            name: '运营风险',
            explanation: '啊啊啊',
            pid: 111,
            levelName: '全部风险/运营风险',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险1',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险1',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险1',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险1',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险111',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616454501036544,
            createdTime: '2023-05-22T12:38:35.000Z',
            updatedTime: '2023-05-22T12:38:35.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '全部风险111',
            explanation: 'a',
            pid: 112,
            levelName: '全部风险/运营风险/全部风险1',
          },
        },
        {
          category: {
            id: 2616526777340416,
            createdTime: '2023-05-22T15:05:37.000Z',
            updatedTime: '2023-05-22T15:06:19.000Z',
            createdBy: '奇欣欣',
            updatedBy: '奇欣欣',
            name: '222',
            explanation: null,
            pid: 2616454501036544,
            levelName: '全部风险/运营风险/全部风险1/222',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501761,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617524968501760,
            createdTime: '2023-05-24T00:56:27.000Z',
            updatedTime: '2023-05-24T00:56:27.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '财务风险',
            explanation: '这是财务风险',
            pid: 111,
            levelName: '全部风险/财务风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617525630448128,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levelName: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 2617667365097984,
            createdTime: '2023-05-24T05:46:09.000Z',
            updatedTime: '2023-05-24T05:46:09.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试名称',
            explanation: '测试说明',
            pid: 2617525630448128,
            levelName: '全部风险/法律风险/测试名称',
          },
        },
        {
          category: {
            id: 2617677592957440,
            createdTime: '2023-05-24T06:06:58.000Z',
            updatedTime: '2023-05-24T06:06:58.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试',
            explanation: '测试',
            pid: 111,
            levelName: '全部风险/测试',
          },
        },
        {
          category: {
            id: 2617677592957441,
            createdTime: '2023-05-24T06:06:58.000Z',
            updatedTime: '2023-05-24T06:06:58.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试',
            explanation: '测试',
            pid: 2617677592957440,
            levelName: '全部风险/测试',
          },
        },
        {
          category: {
            id: 2617677592957441,
            createdTime: '2023-05-24T06:06:58.000Z',
            updatedTime: '2023-05-24T06:06:58.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试',
            explanation: '测试',
            pid: 2617677592957440,
            levelName: '全部风险/测试',
          },
        },
        {
          category: {
            id: 2617677592957441,
            createdTime: '2023-05-24T06:06:58.000Z',
            updatedTime: '2023-05-24T06:06:58.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试',
            explanation: '测试',
            pid: 2617677592957440,
            levelName: '全部风险/测试',
          },
        },
        {
          category: {
            id: 2617677592957441,
            createdTime: '2023-05-24T06:06:58.000Z',
            updatedTime: '2023-05-24T06:06:58.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试',
            explanation: '测试',
            pid: 2617677592957440,
            levelName: '全部风险/测试',
          },
        },
        {
          category: {
            id: 2618177043534336,
            createdTime: '2023-05-24T23:03:06.000Z',
            updatedTime: '2023-05-24T23:03:06.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试1',
            explanation: null,
            pid: 2616526777340416,
            levelName: '全部风险/运营风险/全部风险1/222/测试1',
          },
        },
        {
          category: {
            id: 2618177043634336,
            createdTime: '2023-05-24T23:03:06.000Z',
            updatedTime: '2023-05-24T23:03:06.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试111',
            explanation: null,
            pid: 2618177043534336,
            levelName: '全部风险/运营风险/全部风险1/222/测试1',
          },
        },
        {
          category: {
            id: 2618177043535330,
            createdTime: '2023-05-24T23:03:06.000Z',
            updatedTime: '2023-05-24T23:03:06.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '测试122',
            explanation: null,
            pid: 2618177043534336,
            levelName: '全部风险/运营风险/全部风险1/222/测试1',
          },
        },
        {
          category: {
            id: 2618303194067456,
            createdTime: '2023-05-25T03:19:45.000Z',
            updatedTime: '2023-05-25T03:19:45.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            name: '12312312312',
            explanation: null,
            pid: 2617677592957440,
            levelName: '全部风险/测试/12312312312',
          },
        },
      ],
      temp: [],
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

