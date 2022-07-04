### 基本用法

``` vue
<template>
    <lcap-carousel
        :data-source="dataList"
        :speed="speed"
        :hoverStop="hoverStop"
        :gap="gap"
        @click="onClick"
    ></lcap-carousel>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      speed: 30,
      hoverStop: true,
      gap: 30,
    }
  },
  mounted() {
    this.dataList = ["第1条数据xxxxxxxxxxx",
      "第2条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第3条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第4条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第5条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第6条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第7条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第8条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第9条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第10条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第11条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第12条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ];
  },
  methods: {
    onClick(item, index) {
      console.log(item, index);
    },
  }
}
</script>
```
