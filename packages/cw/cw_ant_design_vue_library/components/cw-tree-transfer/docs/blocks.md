### 基本用法

```vue
<template>
  <cw-tree-transfer
    :targetKeys.sync="targetKeys"
    :source="dataSource"
    textField="key"
    valueField="value"
    childrenField="children"
  ></cw-tree-transfer>
</template>
<script>
export default {
  data() {
    return {
      targetKeys: [],
      dataSource: [
        { key: "0-0", title: "0-0" },
        {
          key: "0-1",
          title: "0-1",
          children: [
            { key: "0-1-0", title: "0-1-0" },
            { key: "0-1-1", title: "0-1-1" },
          ],
        },
        { key: "0-2", title: "0-3" },
      ],
    };
  },
};
</script>
```
