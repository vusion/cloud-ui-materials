### 在表单中显示

``` vue
<template>
<u-form>
    <u-form-item label="代码段" layout="block" rules="required | minLength(10)">
        <x-ace-editor v-model="value"></x-ace-editor>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            value: 'Ace',
        };
    },
}
</script>
```
