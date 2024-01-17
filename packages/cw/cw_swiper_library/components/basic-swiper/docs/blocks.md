### 基本用法

```html
<basic-swiper
  :spaceBetween="0"
  :imgWidth="240"
  :imgHeight="196"
  :slidesPerView="5"
  :delay="2500"
>
  <template #default="current">
    <u-linear-layout gap="small"></u-linear-layout>
  </template>
</basic-swiper>
```
