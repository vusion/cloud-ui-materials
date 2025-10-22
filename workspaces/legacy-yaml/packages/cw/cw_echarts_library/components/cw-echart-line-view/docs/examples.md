### 基本用法

```vue
<template>
    <div>
        <cw-echart-line-view style="width: 100%; height: 300px; --label-font-size: 12;" @clickItem="handleClick" formatter="{c}%jjj"></cw-echart-line-view>
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
