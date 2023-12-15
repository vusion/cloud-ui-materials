### 基本用法

```vue
<template>
    <div>
        <u-button @click="flag = !flag">toggle</u-button>
        <cust-community-icon-image fit="fill" :src="flag ? '//test-lcpapp-static.nos-eastchina1.126.net/assets/cloud-ui/1.jpg' : ''" style="border-radius: 16px"></cust-community-icon-image>

        <cust-community-icon-image fit="fill" style="border-radius: 16px"></cust-community-icon-image>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: true,
        };
    },
};
</script>
```
