### 基本用法

```vue
<template>
  <basic-swiper
    :spaceBetween="0"
    :imgWidth="240"
    :imgHeight="196"
    :slidesPerView="5"
    :delay="2500"
    :dataSource="dataSource"
  >
  </basic-swiper>
</template>
<script>
export default {
  data() {
    return {
      dataSource: new Array(7).fill({
        url: "https://projectmanage.netease-official.lcap.163yun.com/upload/app/POPO20231226140339_20231226140352462.png",
        link: "https://news.163.com/",
      }),
    };
  },
};
</script>
```
