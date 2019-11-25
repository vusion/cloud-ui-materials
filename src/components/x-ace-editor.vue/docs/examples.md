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
