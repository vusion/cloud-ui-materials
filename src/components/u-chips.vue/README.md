<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UChips 条目输入

**UI 组件**, **表单类**

@deprecated 请使用最新的 UChipInput 组件。表单输入组件，基于`<u-textarea>`控件进行了一些功能扩展，可以输入字符串卡片，并结合`<u-validator>`进行验证。

## 示例
### 基本形式

点击输入区域并进行输入。在完成输入后，通过鼠标失焦、空格、逗号或tab键生成字符串卡片。

``` html
<u-chips placeholder="请输入内容，按空格或逗号结束"></u-chips>
```

### 双向绑定

使用`v-model`或`:value.sync`进行双向绑定。

``` vue
<template>
<u-linear-layout>
    <u-chips v-model="value"  placeholder="请输入日期"></u-chips>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: ['2019-07-01', '2019-07-02'],
        };
    },
};
</script>
```

### 禁用

``` html
<u-linear-layout>
    <u-chips placeholder="禁用" disabled></u-chips>
</u-linear-layout>
```

### 复制粘贴

复制`2019-01-02 2019-01-03 2019-01-04 2019-02-05`，并粘贴到输入框。

``` html
<u-linear-layout>
     <u-chips placeholder="请输入日期"></u-chips>
</u-linear-layout>
```

### 输入内容验证

通过`rules`属性，定义输入字符串的验证规则。具体的规则写法与`<u-validator>`中的写法一致。

``` vue
<template>
<u-linear-layout>
    <u-validator>
        <u-chips v-model="value"  placeholder="请输入IP地址" rules="ip"></u-chips>
    </u-validator>
</u-linear-layout>
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

### 数量验证与重复值检测

通过`list-rules`属性，定义生成项的验证规则，如非空和数量上限等。具体的规则写法与`<u-validator>`中的写法一致。

``` html
<u-linear-layout>
    <u-validator>
        <u-chips placeholder="请输入IP地址，最多输入3个" rules="ip" list-rules="notEmpty | noDuplicates | maxLength(3)"></u-chips>
    </u-validator>
</u-linear-layout>
```

### 分隔符

通过`separators`属性，定义生成项的分隔符，默认为逗号和空格均可作为分隔符。

``` html
<u-linear-layout>
    <u-validator>
        <u-chips placeholder="使用逗号作为分隔符" separators="comma"></u-chips>
    </u-validator>
    <u-validator>
        <u-chips placeholder="使用空格作为分隔符" separators="space"></u-chips>
    </u-validator>
</u-linear-layout>
```

### searchInput

当`type='searchInput'`时，呈现为搜索框形式。

``` vue
<template>
<u-linear-layout>
    <u-chips v-model="value"  placeholder="多个搜索条件用回车分隔" type="searchInput" list-rules="maxLength(6)"></u-chips>
</u-linear-layout>
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

### 表单提交

由于现在`<u-chips>`的验证由`<u-validator>`完成，所以可以作为`<u-form-item>`中的表单子组件，在表单提交时与其它内容一起验证

``` vue
<template>
<u-form ref="form" gap="large">
    <u-form-item required label="用户名" rules="alphaNum | required">
        <u-input v-model="name" placeholder="请输入用户名"></u-input>
    </u-form-item>
    <u-form-item required label="密码" rules="alphaNum | required">
         <u-input v-model="password" placeholder="请输入密码" type="password"></u-input>
    </u-form-item>
    <u-form-item required label="白名单" layout="block" :bubble="true">
         <u-chips v-model="list"  placeholder="请输入IP地址，最多三个" rules="ip" list-rules="notEmpty | maxLength(3) | noDuplicates"></u-chips>
    </u-form-item>
    <u-form-item>
         <u-button color="primary" @click="submit">立即创建</u-button>
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            name: 'csr123',
            password: 'csr123',
            list: [],
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate()
             .then(() => this.$toast.show('验证通过，提交成功！'))
             .catch(() => this.$toast.show('验证失败！'));
            },
        },
};
</script>
```
## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| type | string |  |  | 输入框的类型，目前支持两种：默认和`'searchInput'` |
| value.sync, v-model | Array |  | `[]` | 输入框的内容 |
| placeholder | string |  |  | 原生属性。对 IE9 做了兼容。 |
| disabled | boolean |  | `false` | 是否禁用 |
| rules | Array |  |  | 对于每一个输入字符串的验证规则 |
| list-rules | Array |  |  | 对于chips的验证规则，如数量范围、是否允许重复项等 |
| separators | string |  | `'all'` | 指定输入的分隔符。当设置为`'comma'`或`'space'`时，分别指定逗号或空格为分隔符 |

### Events

#### @change

chip 数量变化时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 输入框的值 |
| senderVM | UInput | 发送事件实例 |

#### @validate

验证时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.isValid | boolean | 当前内容是否合法 |
| $event.errMessage | string | 当前错误提示 |
| $event.value | string | 当前校验内容 |
| $event.current | number | 当前项目的索引 |
