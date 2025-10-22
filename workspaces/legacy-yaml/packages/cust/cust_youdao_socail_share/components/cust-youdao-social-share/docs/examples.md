### 基本用法

```vue
<template>
    <div>
        <u-button @click="handleClick">click</u-button>
        <cust-youdao-social-share :sites="sites"></cust-youdao-social-share>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sites: undefined,
        };
    },
    methods: {
        handleClick() {
            this.sites = ['google', 'wechat'];
        },
    },
};
</script>
```
