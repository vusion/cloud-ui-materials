### 基本用法

```vue
<template>
  <cw-antd-custom-table
    :value="value"
    :titleMap="titleMap"
  ></cw-antd-custom-table>
</template>
<script>
let data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrw1ard ${i}`,
    age: `32${i}`,
    address: `London Park no. ${i}`,
    six: "[女]",
    six222: null,
    s11ix: "男",
    create_time: new Date().valueOf(),
    six2221: "男",
    s11ix1: "男",
    s11ix32: 13232,
    six2224:
      "男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男男",
    // '你是谁你是谁你是谁你是谁你':"",
    // s11ix3s11ix:"男122",
    // s11ix3s11ix32:"男",
    // s11ix4:"男",
    // s11ix38:"男122",
    // six2220:"男",
    // s11ix2:"男",
    // s11ix34:"男122",
    // six2222:"男",
    // s11ix12:"男",
    // s11ix333:"男122",
    // six22222:"男",
    // s11ix46:"男",
    // s11ix334:"男122",
    // create_time:"fafda"
  });
}
// for (let i = 0; i < 100; i++) {
//   data.push(   {
//     key: i.toString()+i,
//     name: `Edrw1ard ${i}`,
//     age: `32${i}`,
//     address: `London Park no. ${i}`,
//     six: "[男,女]",
//     s11ix3:"男122",
//   });
// }
export default {
  data() {
    return {
      titleMap: {
        name: { type: "string", comment: "数字框" },
        age: { type: "Long", comment: "年龄" },
        six: {
          type: "string",
          comment: "性别",
          options: '[{value:"男",label:"男"},{value:"女",label:"女"}]',
        },
        six222: {
          type: "string",
          comment: "性别",
          options: '[{value:"男",label:"男"},{value:"女",label:"女"}]',
        },
      },
      value: data,
    };
  },
};
</script>
```

### 基本用法

```html
<cw-antd-custom-table></cw-antd-custom-table>
```
