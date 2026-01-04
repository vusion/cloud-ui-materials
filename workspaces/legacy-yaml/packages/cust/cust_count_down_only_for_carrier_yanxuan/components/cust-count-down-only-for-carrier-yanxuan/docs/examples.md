### 基本用法

```vue
<template>
    <div>
        <cust-count-down-only-for-carrier-yanxuan
            :inquiryStartTime="now"
        ></cust-count-down-only-for-carrier-yanxuan>
        <div @click="now = Date.now() - 2 * 24 * 3600 * 1000">update</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            now: Date.now(),
        };
    },
};
</script>
```
