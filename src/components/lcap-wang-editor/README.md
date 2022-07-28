<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapWangEditor 富文本

- [示例](#示例)
    - [基本用法](#基本用法)
    - [只读模式](#只读模式)
    - [表单验证](#表单验证)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

**Form**

请在这里添加描述

## 示例
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

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync | string |  | `''` | 需要传入的文本内容 |
| readOnly | boolean |  | `false` | 启用只读模式 |
| scroll | boolean |  | `true` | 启用滚动 |
| placeholder | string |  | `''` | 输入提示 |
| editorStyle | string |  | `''` | 编辑器样式CSS |

### Events

#### @change

内容修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 当前输入区域的内容 |
| $event.editor | string | wangeditor 实例 |

#### @input

输入时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| value | string | 当前输入区域的内容 |

