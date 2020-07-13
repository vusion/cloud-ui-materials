<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# XAceEditor Ace编辑器

- [示例](#示例)
    - [基本用法](#基本用法)
    - [设置语言](#设置语言)
    - [设置主题](#设置主题)
    - [只读和禁用](#只读和禁用)
    - [设置尺寸](#设置尺寸)
    - [调整大小](#调整大小)
- [API]()
    - [Props/Attrs](#propsattrs)

**表单控件**, **块级展示**

本组件对 Ace Editor 进行了 Vue 的封装，添加样式修饰，接入了 Cloud UI 表单验证体系。

## 示例
### 基本用法

使用`v-model`或`:value.sync`双向绑定。

``` vue
<template>
<x-ace-editor v-model="value"></x-ace-editor>
</template>
<script>
export default {
    data() {
        return {
            value: 'Ace Editor',
        };
    },
}
</script>
```

### 设置语言

通过`lang`属性设置语言。更多语言包请查看 [brace mode](https://github.com/thlorenz/brace/tree/master/mode)。

注意：需要用如下方式引入 brace 包中的语言包。

``` js
import 'brace';
import 'brace/mode/json';
```

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

下面再多举一些例子：

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-form-item label="切换语言：">
        <u-select v-model="selectedLang">
            <u-select-item v-for="lang in langs" :key="lang" :value="lang">{{ lang }}</u-select-item>
        </u-select>
    </u-form-item>
    <x-ace-editor v-model="values[selectedLang]" :lang="selectedLang"></x-ace-editor>
</u-linear-layout>
</template>
<script>
import 'brace';
import 'brace/mode/json';
import 'brace/mode/python';
import 'brace/mode/sql';

export default {
    data() {
        return {
            selectedLang: 'json',
            values: {
                json: `{
    "name": "Alice",
    "age": 24,
    "phone": "18612345678"
}
`,
                python: `def factorial(n):
    return reduce(lambda x,y:x*y,[1]+range(1,n+1))`,
                sql: 'SELECT * FROM articles WHERE user_id = "123abc";',
            },
        };
    },
    computed: {
        langs() {
            return Object.keys(this.values);
        },
    },
}
</script>
```

### 设置主题

通过`theme`属性设置常见的编辑器主题。更多主题请查看 [brace theme](https://github.com/thlorenz/brace/tree/master/theme)。

注意：同样需要提前引入 brace 包中的主题文件。

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

下面再多举一些例子：

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-form-item label="切换主题：">
        <u-select v-model="selectedTheme">
            <u-select-item v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</u-select-item>
        </u-select>
    </u-form-item>
    <x-ace-editor v-model="value" lang="javascript" :theme="selectedTheme"></x-ace-editor>
</u-linear-layout>
</template>
<script>
import 'brace';
import 'brace/mode/javascript';

const themes = ['ambiance','chaos','chrome','clouds','clouds_midnight','cobalt','crimson_editor','dawn','dracula','dreamweaver','eclipse','github','gob','gruvbox','idle_fingers','iplastic','katzenmilch','kr_theme','kuroir','merbivore','merbivore_soft','mono_industrial','monokai','pastel_on_dark','solarized_dark','solarized_light','sqlserver','terminal','textmate','tomorrow','tomorrow_night','tomorrow_night_blue','tomorrow_night_bright','tomorrow_night_eighties','twilight','vibrant_ink','xcode'];
themes.map((theme) => import(`brace/theme/${theme}`));

export default {
    data() {
        return {
            selectedTheme: '',
            themes,
            value: `[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
`,
        };
    },
}
</script>
```

### 只读和禁用

``` html
<u-grid-layout :repeat="2">
    <u-grid-layout-column>
        <x-ace-editor value="var i = 0; // 只读" readonly></x-ace-editor>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <x-ace-editor value="var i = 0; // 禁用" disabled></x-ace-editor>
    </u-grid-layout-column>
</u-grid-layout>
```

### 设置尺寸

``` html
<u-linear-layout direction="vertical">
    <x-ace-editor size="small" value="small" readonly></x-ace-editor>
    <x-ace-editor size="small normal" value="small normal" readonly></x-ace-editor>
    <x-ace-editor size="normal" value="normal" readonly></x-ace-editor>
    <x-ace-editor size="large" value="large" readonly></x-ace-editor>
    <x-ace-editor size="large full" value="large full" readonly></x-ace-editor>
</u-linear-layout>
```

### 调整大小

通过设置`resize`属性，决定水平垂直方向是否可以调整大小。

``` html
<u-linear-layout direction="vertical">
    <div><x-ace-editor value="none：默认不可以调整大小" resize="none"></x-ace-editor></div>
    <div><x-ace-editor value="vertical：仅允许垂直方向调整大小" resize="vertical"></x-ace-editor></div>
    <div><x-ace-editor value="horizontal：仅允许水平方向调整大小" resize="horizontal"></x-ace-editor></div>
    <div><x-ace-editor value="both：垂直水平方向均可" resize="both"></x-ace-editor></div>
</u-linear-layout>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | string |  | `''` | 代码段 |
| lang | string |  | `'text'` | 设置语言 |
| theme | string |  |  | 设置主题。如果不设置，默认使用 Cloud UI 风格的主题。 |
| readonly | boolean |  | `false` | 是否只读 |
| disabled | boolean |  | `false` | 是否禁用 |
| options | object |  |  | 配置项对象 |
| autofocus | boolean |  | `false` | 组件挂载时自动获取焦点 |

