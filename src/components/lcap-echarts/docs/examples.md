### 基本用法

``` vue
<template>
<div>
<button @click="onClick">temp
</button>
    <lcap-echarts :chart-type="type"></lcap-echarts>
</div>
</template>

<script>
export default {
    data() {
        return {
            type: 'bar',
    };
    },
    methods: {
        onClick() {
        console.log(this.type);
            return this.type = this.type !== 'line' ? 'line' : 'pie';
        },
    },
};
</script>
```
