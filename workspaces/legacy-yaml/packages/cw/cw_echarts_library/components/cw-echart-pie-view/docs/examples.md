### 基本用法

```vue
<template>
    <div>
        <cw-echart-pie-view style="width: 100%; height: 900px" @clickItem="handleClick" width="100%" height="100%"></cw-echart-pie-view>
    </div>
</template>
<script>
export default {
    methods: {
        handleClick(...args) {
            console.log('%c [ args ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', args);
        },
    },
};
</script>
```
