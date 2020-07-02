### 基本用法

``` vue
<template>
<u-color-picker v-model="color"></u-color-picker>
</template>
<script>
export default {
    data() {
        return {
            color: '#ff5a5a',
        };
    },
};
</script>
```

### 直接使用调色板

``` vue
<template>
<u-pallette v-model="color"></u-pallette>
</template>
<script>
export default {
    data() {
        return {
            color: '#ff5a5a',
        };
    },
};
</script>
```
