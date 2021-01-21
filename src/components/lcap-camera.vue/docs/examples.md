### 基本用法

``` html
<lcap-camera></lcap-camera>
```

### 默认值

```vue
<template>
<lcap-camera list-type="image"
    url="/gateway/lowcode/api/v1/app/upload" v-model="value"
    converter="json">
</lcap-camera>

</template>
<script>
    export default {
        data() {
            return {
                value: '[]',
            };
        },
    };
</script>
```
