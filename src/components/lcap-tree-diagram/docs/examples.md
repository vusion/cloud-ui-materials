### 基本用法

``` vue
<template>
  <lcap-tree-diagram :data-source="list" value-field="shuxingtu.sid" parent-field="shuxingtu.parentId"  @click="click" @onDelete="onDelete">  
  </lcap-tree-diagram>
</template>
<script>
export default {
    data() {
      return {
        list: [
  {
    "shuxingtu": {
      "id": 2618295788423680,
      "createdTime": "2023-05-25T03:04:41.000Z",
      "updatedTime": "2023-05-25T03:04:41.000Z",
      "createdBy": null,
      "updatedBy": null,
      "sid": 1,
      "label": "主题",
      "parentId": 0
    }
  },
  {
    "shuxingtu": {
      "id": 2618298826205696,
      "createdTime": "2023-05-25T03:10:52.000Z",
      "updatedTime": "2023-05-25T03:10:52.000Z",
      "createdBy": null,
      "updatedBy": null,
      "sid": 2,
      "label": "子主题",
      "parentId": 1
    }
  },
  {
    "shuxingtu": {
      "id": 2618298975726080,
      "createdTime": "2023-05-25T03:11:10.000Z",
      "updatedTime": "2023-05-25T03:11:10.000Z",
      "createdBy": null,
      "updatedBy": null,
      "sid": 3,
      "label": "子主体2",
      "parentId": 2
    }
  },
  {
    "shuxingtu": {
      "id": 2618299090250240,
      "createdTime": "2023-05-25T03:11:24.000Z",
      "updatedTime": "2023-05-25T03:11:24.000Z",
      "createdBy": null,
      "updatedBy": null,
      "sid": 4,
      "label": "字子主题",
      "parentId": 3
    }
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

