### 基本用法

```vue
<template>
  <lcap-tree-diagram-demo
    :data-source="demo"
    value-field="tree.sid"
    parent-field="tree.pid"
    text-field="tree.label"
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
      demo: [
        {
          tree: {
            id: 2626361034054912,
            createdTime: '2023-06-05T12:33:28.000Z',
            updatedTime: '2023-06-05T12:33:28.000Z',
            createdBy: null,
            updatedBy: null,
            pid: 0,
            sid: 1,
            label: 'zhuti',
          },
        },
        {
          tree: {
            id: 2626361154837760,
            createdTime: '2023-06-05T12:33:43.000Z',
            updatedTime: '2023-06-05T12:33:43.000Z',
            createdBy: null,
            updatedBy: null,
            pid: 1,
            sid: 2,
            label: '主图2',
          },
        },
        {
          tree: {
            id: 2626361499647232,
            createdTime: '2023-06-05T12:34:25.000Z',
            updatedTime: '2023-06-05T12:34:25.000Z',
            createdBy: null,
            updatedBy: null,
            pid: 1,
            sid: 3,
            label: 'zhuti3',
          },
        },
      ],
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
      ],
    };
  },
  methods: {
    click(e) {},
    onDelete(e) {
      this.$refs.node.reload();
    },
  },
};
</script>
```

### load 方法

```vue
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
const mockRequest = (data, timeout = 300) =>
  new Promise((res, rej) => setTimeout(() => res(data), timeout));
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
      },
    ]);
  },
};

export default {
  methods: {
    load() {
      return mockService.load();
    },
    click(e) {},
  },
};
</script>
```
