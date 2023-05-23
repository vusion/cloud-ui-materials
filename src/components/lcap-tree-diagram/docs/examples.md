### 基本用法

``` vue
<template>
  <lcap-tree-diagram :dataSource="list" @mouseout="mouseout"> 
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
          // {id:1,label:'部门A',parentId:0},
          // {id:2,label:'部门B',parentId:1},
          // {id:3,label:'部门C',parentId:1},
          // {id:4,label:'部门D',parentId:1},
          // {id:5,label:'部门E',parentId:2},
          // {id:6,label:'部门F',parentId:3},
          // {id:7,label:'部门G',parentId:2},
          // {id:8,label:'部门H',parentId:4}
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
    methods: {
      mouseout($events) {
        console.log($events)
      }
    }
};
</script>
```

