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

