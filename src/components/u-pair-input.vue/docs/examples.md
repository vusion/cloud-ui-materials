### 基本用法

``` html
<u-pair-input></u-pair-input>
```

### 双向绑定

使用`v-model`或`:value.sync`双向绑定一个数组。

``` vue
<template>
<u-pair-input v-model="pairs"></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
            ],
        };
    },
};
</script>
```

### 指定键值字段名

可以使用`key-field`和`value-field`指定字段名。

``` vue
<template>
<u-pair-input v-model="pairs" key-field="name" value-field="fingerprinter" key-placeholder="请输入 Name" value-placeholder="请输入指纹"></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { name: 'ssh-name', fingerprinter: '2e:f7:17:a5:c4:41:00:59:dd:46:0d:be:a1:75:a2:86' },
                { name: 'gen-ssh', fingerprinter: '61:36:66:fb:b1:3f:f7:2c:c2:5d:91:45:7a:ed:82:75' },
                { name: 'c163yun', fingerprinter: 'fa:52:8b:7d:34:06:3d:6d:c8:84:ad:4b:a4:b4:dc:c0' },
            ],
        };
    },
};
</script>
```

### 表单验证

通过`key-rules`和`value-rules`设置规则，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)。

下面的例子中，键只能输入字母、数字和下划线，值只能输入数字，不得少于 4 个字符。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNumDash | minLength(4) # 键不得少于 4 个数字" value-rules="numeric | minLength(4) # 值不得少于 4 个数字"></u-pair-input>
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

通过`list-rules`设置键值对数组的规则，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)中与数组相关的一些规则。

下面的例子中，数组不能为空，且最多可以添加 2 个键值对。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNumDash | minLength(4) # 键不得少于 4 个数字" value-rules="numeric | minLength(4)" list-rules="notEmpty # 需要至少输入一个键值对 | maxLength(2) # 键值对不得超过 2 个"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [],
        };
    },
};
</script>
```

### 禁用状态

``` vue
<template>
<u-pair-input v-model="pairs" disabled></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
            ],
        };
    },
};
</script>
```

### 一键清除

添加`clearable`属性，可以开启一键清除按钮。

``` vue
<template>
<u-pair-input v-model="pairs" clearable></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
            ],
        };
    },
};
</script>
```
