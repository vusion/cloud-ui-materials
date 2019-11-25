<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# XAceEditor

## 示例
### 基本用法

``` html
<x-ace-editor></x-ace-editor>
```

### 设置语言

``` vue
<template>
<x-ace-editor v-model="value" lang="json"></x-ace-editor>
</template>
<script>
import 'brace';
import 'brace/mode/json';

export default {
    data() {
        return {
            value:
`{
    "name": "Alice",
    "age": 24,
    "phone": "18612345678"
}
`,
        };
    },
}
</script>
```

### 设置主题

``` vue
<template>
<x-ace-editor v-model="value" lang="json" theme="monokai"></x-ace-editor>
</template>
<script>
import 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';

export default {
    data() {
        return {
            value:
`{
    "name": "Alice",
    "age": 24,
    "phone": "18612345678"
}
`,
        };
    },
}
</script>
```

### 禁用

``` html
<x-ace-editor value="var i = 0;" disabled></x-ace-editor>
```

### 只读

``` html
<x-ace-editor value="var i = 0;" readonly></x-ace-editor>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | any |  |  | 当前选择的值 |
| lang | string |  | `'text'` | 设置语言 |
| theme | string |  |  | 设置主题 |
| readonly | boolean |  | `false` | 是否只读 |
| disabled | boolean |  | `false` | 是否禁用 |
| options | object |  |  | 配置项对象 |
| autofocus | boolean |  | `false` | 默认focus状态 |
