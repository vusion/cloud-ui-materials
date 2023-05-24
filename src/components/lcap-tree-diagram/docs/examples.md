### 基本用法

``` vue
<template>
  <lcap-tree-diagram :dataSource="list" @mouseout="mouseout" textField="label"> 
  </lcap-tree-diagram>
</template>
<script>
export default {
    data() {
      return {
        list: [
          {
            "id": 1,
            "label": "主题",
            "parentId": 0
          },
          {
            "id": 2,
            "label": "子主题",
            "parentId": 1
          },
          {
            "id": 3,
            "label": "子主题2",
            "parentId": 2
          },
          {
            "id": 4,
            "label": "子子主题1",
            "parentId": 3
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
      mouseout($events) {
        console.log($events)
      }
    }
};
</script>
```

