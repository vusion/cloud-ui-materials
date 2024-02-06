### 基本用法

```vue
<template>
  <basic-swiper
    :spaceBetween="0"
    :imgWidth="240"
    :imgHeight="196"
    :slidesPerView="5"
    :delay="2500"
  >
    <template #item="current"> current -- {{ current }} </template>
  </basic-swiper>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
```
