### 基本用法

```vue
<template>
  <lcap-tree-diagram
    :data-source="list"
    value-field="id"
    parent-field="pid"
    text-field="label"
    @click="click"
    @onDelete="onDelete"
    ref="node"
    data-entity="category"
  >
    <u-button slot="dialog" color="primary" text="Primary"></u-button>
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
            label: '全部风险',
            explanation: '这是全部风险',
            pid: 0,
            levellabel: '全部风险',
          },
        },
        {
          category: {
            id: 112,
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
            id: 113,
            createdTime: '2023-05-24T23:03:06.000Z',
            updatedTime: '2023-05-24T23:03:06.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '测试122',
            explanation: null,
            pid: 112,
            levellabel: '全部风险/运营风险/全部风险1/222/测试1',
          },
        },
        {
          category: {
            id: 114,
            createdTime: '2023-05-25T03:19:45.000Z',
            updatedTime: '2023-05-25T03:19:45.000Z',
            createdBy: '奇欣欣',
            updatedBy: null,
            label: '12312312312',
            explanation: null,
            pid: 112,
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
