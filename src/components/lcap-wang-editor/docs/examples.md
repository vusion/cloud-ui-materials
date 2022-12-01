### 基本用法

``` html
<lcap-wang-editor value="<p>hello</p>"></lcap-wang-editor>
```

### 只读模式

只读模式可以作为富文本编辑器的内容展示区，默认隐藏工具栏，通过`readOnly`设置

``` vue
<template>
  <lcap-wang-editor value="<p>hello</p>" :readOnly="readOnly"></lcap-wang-editor>
</template>

<script>
export default {
    data() {
        return {
            readOnly: true
        }
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