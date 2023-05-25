### 基本用法

``` vue
<template>
  <lcap-tree-diagram :data-source="list" :value-field="id" parent-field="parentId"  @click="click" @onDelete="onDelete">  
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
            "label": "子主题2111子主题2子主题2子主题21",
            "parentId": 1
          },
          {
            "id": 4,
            "label": "子子主题111111",
            "parentId": 3
          },
          {
            "id": 5,
            "label": "子子主题4222222222",
            "parentId": 2
          }
      ],
      fakeData: {
        id: 0,
        label: 'XXXPOC测试',
        index: 0,
        children: [
          {
            id: 2,
            label: '产品研发部',
            index:1,
            children: [
              {
                id: 5,
                index:3,
                label: '研发-前端',
                children: [
                  {
                    id: 6,
                    index:4,
                    label: '研发-前端111111111',
                  },
                  {
                    id: 7,
                    index:4,
                    label: '研发-前端1223',
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            label: '销售部',
            index:1,
            children: [
              {
                id: 7,
                index:2,
                label: '销售一部',
              },
            ],
          },
        ],
      },
        };
    },
    methods: {
      // onTogglePop(e) {
      //   console.log(e)
      // },
      click(e) {
        console.log(e)
      },
      onDelete(e) {
        console.log(e, '-ee')
      }
    }
};
</script>
```

