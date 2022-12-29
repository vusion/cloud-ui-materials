### 基本用法

``` html
<lcap-wang-editor value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>"></lcap-wang-editor>
```

### 只读模式

只读模式可以作为富文本编辑器的内容展示区，默认隐藏工具栏，通过`readOnly`设置

```vue
<template>
    <div>
        <lcap-wang-editor :readOnly="readOnly" value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>"></lcap-wang-editor>
        <u-button @click="handleReadOnly">切换</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            readOnly: true
        }
    },
    methods:{
        handleReadOnly() {
            this.readOnly = !this.readOnly;
        },
    }
}
</script>
```

### 表单验证

``` vue
<template>
<u-form ref="form" gap="large">
    <u-form-item :required="true" layout="block" rules="required" label="业务口径">
        <lcap-wang-editor :value.sync="value" :editorStyle="editorStyle"></lcap-wang-editor>
    </u-form-item>
    <u-form-item layout="block">
        <u-button @click="onClick">验证</u-button>
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            editorStyle: 'height: 300px',
        }
    },
    mounted() {
        setTimeout(() => {
            this.value = '我有内容了';
        }, 1000);
    },
    methods: {
        async onClick() {
            const valid = await this.$refs.form.validate();
        },
    },
}
</script>
```
