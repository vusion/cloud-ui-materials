### 基本用法

```javascript
const grid = 2;
const spaceBetween = 0;
const imgWidth = 240;
const imgHeight = 196;
const slidesPerView = 5;
const delay = 2500;
const dataSource = new Array(10).fill({
  url:
    "https://img2.baidu.com/it/u=3006610358,19267819&fm=253&fmt=auto&app=138&f=JPEG",
  link: "https://news.163.com/",
});
```

```html
<gallery
  :grid="grid"
  :spaceBetween="spaceBetween"
  :imgWidth="imgWidth"
  :imgHeight="imgHeight"
  :slidesPerView="slidesPerView"
  :delay="delay"
  :dataSource="dataSource"
></gallery>
```
