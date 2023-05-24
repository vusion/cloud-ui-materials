### 基本用法

``` vue
<template>
  <lcap-tree-diagram :data-source="list" value-field="childId" parent-field="parentId1" @mouseout="mouseout"> 
  </lcap-tree-diagram>
</template>
<script>
export default {
    data() {
      return {
        list: [
          {
            "childId": 1,
            "label": "主题",
            "parentId1": 0
          },
          {
            "childId": 2,
            "label": "子主题",
            "parentId1": 1
          },
          {
            "childId": 3,
            "label": "子主题2",
            "parentId1": 1
          },
          {
            "childId": 4,
            "label": "子子主题1",
            "parentId1": 3
          },
          {
            "childId": 5,
            "label": "子子主题4",
            "parentId1": 2
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
      mouseout(e, data) {
        console.log(e,data)
      }
    }
};
</script>
```

