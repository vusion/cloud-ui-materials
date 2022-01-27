<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapRichTextEditor 富文本编辑器

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

**Editor**

基于第三方富文本插件Quill Editor进行封装

## 示例
### 基本用法

通过双向绑定输入内容

``` vue
<template>
<div>
<u-form ref="form" @validate="onValidate">
    <u-form-item label="测试" required rules="required">
        <lcap-rich-text-editor v-model="tip"></lcap-rich-text-editor>
    </u-form-item>
    <u-button @click="onClick">确认</u-button>
</u-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            tip: "",
            bool: true
        }
    },
    mounted() {
        setTimeout(() => {
            this.tip = '<p>123</p>';
        }, 1500);
    },
    methods: {
        onClick() {
            console.log('确认');
            this.$refs.form.validate();
        },
        onValidate(e) {
            console.log('onValidate', e.valid);
        },
    }
}
</script>
```
## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync | string |  | `''` | 需要传入的文本内容 |
| readOnly | boolean |  | `false` | 启用只读模式 |
| textSub | boolean |  | `false` | 启用文本下标工具 |
| textSuper | boolean |  | `false` | 启用文本上标工具 |
| formula | boolean |  | `false` | 启用公式输入工具 |
| placeholder | string |  | `''` | 输入提示 |
| imgUploadUrl | string |  | `'/gateway/lowcode/api/v1/app/upload'` | 请填入上传图片的接口路径 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @change

内容修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 当前输入区域的内容 |

#### @input

输入时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 当前输入区域的内容 |

