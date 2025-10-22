### 基本用法

```javascript
const imgWidth = 200;
const imgHeight = 200;
const dataSource = new Array(10).fill({
  url:
    "https://img2.baidu.com/it/u=3006610358,19267819&fm=253&fmt=auto&app=138&f=JPEG",
  text: "我的老婆",
});
```

```html
<cover-flow
  :imgWidth="imgWidth"
  :imgHeight="imgHeight"
  :dataSource="dataSource"
></cover-flow>
```
