### 基本用法

``` html
<u-chip-input></u-chip-input>
```

### 双向绑定

使用`v-model`或`:value.sync`双向绑定一个数组。

``` vue
<template>
<u-chip-input v-model="list"></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'aaa',
                'bbb',
                'ccc',
            ],
        };
    },
};
</script>
```

### 表单验证

通过`rules`设置规则，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)。

下面的例子中，需要输入合法的 IP 地址。

``` vue
<template>
<u-form-item label="IP 地址" bubble>
    <u-chip-input v-model="list" placeholder="请输入 IP 地址" rules="ip # 请输入正确的 IP 地址"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '10.0.10.32',
                '192.168.1.1',
            ],
        };
    },
};
</script>
```

通过`list-rules`设置数组的验证规则，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)中与数组相关的一些规则。

下面的例子中，数组不能为空，且最多可以添加 2 个条目。

``` vue
<template>
<u-form-item label="数字列表" bubble>
    <u-chip-input v-model="list" rules="numeric | minLength(4)" list-rules="notEmpty # 需要至少输入一个数字项 | maxLength(2) # 数字项不得超过 2 个"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [],
        };
    },
};
</script>
```

### 分隔符与一键粘贴

如果验证到中间有错误的一项，会停止粘贴处理。

示例：尝试复制`2020-02-02,2020-02-29,2019-12-18,2019-02-,2019-02-29`，并粘贴到输入框。

``` vue
<template>
<u-form-item label="日期" bubble>
    <u-chip-input v-model="list" separators="\n\t ," placeholder="请输入多个日期" rules="iso8601(true) # 请输入合法的日期"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '2019-06-25',
            ],
        };
    },
};
</script>
```

### 禁用状态

``` vue
<template>
<u-chip-input v-model="list" disabled></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'a-value',
                'b-value',
                'c-value',
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
<u-chip-input v-model="list" clearable></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'a-value',
                'b-value',
                'c-value',
            ],
        };
    },
};
</script>
```
