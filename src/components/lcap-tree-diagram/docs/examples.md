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
            updatedBy: null,
            sid: 1,
            label: '主题',
            parentId: 0,
          },
        {
            id: 2618298826205696,
            createdTime: '2023-05-25T03:10:52.000Z',
            updatedTime: '2023-05-25T03:10:52.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 2,
            label: '子主题',
            parentId: 1,
        },
        {
            id: 2618298975726080,
            createdTime: '2023-05-25T03:11:10.000Z',
            updatedTime: '2023-05-25T03:11:10.000Z',
            createdBy: null,
            updatedBy: null,
            sid: 3,
            label: '子主体2',
            parentId: 1,
        },
        {
            id: 2618299090250240,
            createdTime: '2023-05-25T03:11:24.000Z',
            updatedTime: '2023-05-25T03:11:24.000Z',
            createdBy: null,
            updatedBy: null,
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
