### 基本用法

```vue
<template>
  <div>
    <div @click="handleClick">123</div>
    <cw-flow-simble-view ref="my-view"></cw-flow-simble-view>
  </div>
</template>
<script>
export default {
  methods: {
    async handleClick() {
      console.log(await this.$refs["my-view"].toPNG());
    },
  },
};
</script>
```
