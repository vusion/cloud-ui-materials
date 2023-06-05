### 基本用法

```vue
<template>
  <lcap-tree-diagram-demo
    :data-source="list"
    value-field="category.id"
    parent-field="category.pid"
    text-field="category.label"
    @click="click"
    @onDelete="onDelete"
    ref="node"
  >
  </lcap-tree-diagram-demo>
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
            label: '全部风险全部风险全部风险',
            explanation: '这是全部风险',
            pid: 0,
            levellabel: '全部风险',
          },
        },
        {
          category: {
            id: 12,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '法律3风险345678',
            explanation: '这是法律风险',
            pid: 111,
            levellabel: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 182,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '法律风险',
            explanation: '这是法律风险',
            pid: 12,
            levellabel: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 201,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '法律风险',
            explanation: '这是法律风险',
            pid: 111,
            levellabel: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 210,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '法律风险',
            explanation: '这是法律风险',
            pid: 182,
            levellabel: '全部风险/法律风险',
          },
        },
        {
          category: {
            id: 211,
            createdTime: '2023-05-24T00:57:48.000Z',
            updatedTime: '2023-05-24T00:57:48.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '法律风险',
            explanation: '这是法律风险',
            pid: 182,
            levellabel: '全部风险/法律风险',
          },
        },
        // {
        //   category: {
        //     id: 1131,
        //     createdTime: '2023-05-24T23:03:06.000Z',
        //     updatedTime: '2023-05-24T23:03:06.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: '测试122',
        //     explanation: null,
        //     pid: 112,
        //     levellabel: '全部风险/运营风险/全部风险1/222/测试1',
        //   },
        // },
        // {
        //   category: {
        //     id: 1132,
        //     createdTime: '2023-05-24T23:03:06.000Z',
        //     updatedTime: '2023-05-24T23:03:06.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: '测试122',
        //     explanation: null,
        //     pid: 112,
        //     levellabel: '全部风险/运营风险/全部风险1/222/测试1',
        //   },
        // },
        // {
        //   category: {
        //     id: 113,
        //     createdTime: '2023-05-24T23:03:06.000Z',
        //     updatedTime: '2023-05-24T23:03:06.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: '测试122',
        //     explanation: null,
        //     pid: 112,
        //     levellabel: '全部风险/运营风险/全部风险1/222/测试1',
        //   },
        // },
        // {
        //   category: {
        //     id: 13,
        //     createdTime: '2023-05-24T23:03:06.000Z',
        //     updatedTime: '2023-05-24T23:03:06.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: '测试122',
        //     explanation: null,
        //     pid: 112,
        //     levellabel: '全部风险/运营风险/全部风险1/222/测试1',
        //   },
        // },
        // {
        //   category: {
        //     id: 120,
        //     createdTime: '2023-05-25T03:19:45.000Z',
        //     updatedTime: '2023-05-25T03:19:45.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: '12312312312',
        //     explanation: null,
        //     pid: 112,
        //     levellabel: '全部风险/测试/12312312312',
        //   },
        // },
        // {
        //   category: {
        //     id: 1411,
        //     createdTime: '2023-05-25T03:19:45.000Z',
        //     updatedTime: '2023-05-25T03:19:45.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: 'ces',
        //     explanation: null,
        //     pid: 111,
        //     levellabel: '全部风险/测试/12312312312',
        //   },
        // },
        // {
        //   category: {
        //     id: 143,
        //     createdTime: '2023-05-25T03:19:45.000Z',
        //     updatedTime: '2023-05-25T03:19:45.000Z',
        //     createdBy: '奇欣欣',
        //     updatedBy: null,
        //     label: 'ces',
        //     explanation: null,
        //     pid: 111,
        //     levellabel: '全部风险/测试/12312312312',
        //   },
        // },
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
            levellabel: '全部风险/测试/12312312312',
          },
        },
      ],
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
  created() {},
};
</script>
```
