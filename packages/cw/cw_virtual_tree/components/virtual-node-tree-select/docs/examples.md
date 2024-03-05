### 基本用法

```vue
<template>
    <virtual-node-tree-select
        placeholder="123"
        emptyText="emptyText"
        checkedButtonText="checkedButtonText"
        searchPlaceholder="searchPlaceholder"
        :value.sync="value"></virtual-node-tree-select>
</template>

<script>
export default {
    data() {
        return {
            value: [],
        };
    },
};
</script>
```
