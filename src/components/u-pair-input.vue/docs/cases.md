### 分隔符与复制粘贴

需要试验下面多种情况：

```
正确示例：www: 4444, xxx: 5555, yyy: 6666

添加框，编辑框 key, 编辑框 value：
www: 4444, xxx: 5555, y@yy: 666
www: 4444, xxx: 5555, yyy: 666
www: 4444, xxx: 5555, xxx:
www: 4444, xxx: 5555,
```

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNum" value-rules="numeric | minLength(4) # 值不得少于 4 个数字"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaaa', value: 1234 },
                { key: 'bbbb', value: 5678 },
                { key: 'cccc', value: 9101 },
            ],
        };
    },
};
</script>
```
