<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# XMonacoEditor Monaco 编辑器

- [示例](#示例)
    - [基本用法](#基本用法)
    - [设置主题](#设置主题)
    - [设置语言](#设置语言)
    - [目前存在的问题](#目前存在的问题)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

本组件对 [Monaco Editor]([https://microsoft.github.io/monaco-editor/index.html]) 进行了 Vue 的封装，添加样式修饰，接入了 Cloud UI 表单验证体系。

## 示例
### 基本用法

使用`v-model`或`:value.sync`双向绑定。

``` vue
<template>
<x-monaco-editor v-model="value" theme="vs-dark"></x-monaco-editor>
</template>
<script>
export default {
    data() {
        return {
            value: 'Hello Monaco Editor!',
        };
    },
};
</script>
```

### 设置主题

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-form-item label="切换主题：">
        <u-select v-model="selectedTheme">
            <u-select-item v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</u-select-item>
        </u-select>
    </u-form-item>
    <x-monaco-editor v-model="value" :theme="selectedTheme" language="typescript"></x-monaco-editor>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            selectedTheme: 'vs-dark',
            themes: [
                'vs',
                'vs-dark',
                'hc-black',
            ],
            value:
`/* Game of Life
 * Implemented in TypeScript
 * To learn more about TypeScript, please visit http://www.typescriptlang.org/
 */
 
module Conway {
	export class Cell {
		public row: number;
		public col: number;
		public live: boolean;
		
		constructor(row: number, col: number, live: boolean) {
			this.row = row;
			this.col = col;
			this.live = live
		}
	}
}
`,
        };
    },
};
</script>
```

### 设置语言

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-form-item label="切换语言：">
        <u-select v-model="selectedLang">
            <u-select-item v-for="lang in langs" :key="lang" :value="lang">{{ lang }}</u-select-item>
        </u-select>
    </u-form-item>
    <x-monaco-editor v-model="values[selectedLang]" :language="selectedLang" theme="vs-dark"></x-monaco-editor>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            selectedLang: 'typescript',
            values: {
                typescript: `/* Game of Life
 * Implemented in TypeScript
 * To learn more about TypeScript, please visit http://www.typescriptlang.org/
 */
 
module Conway {
	export class Cell {
		public row: number;
		public col: number;
		public live: boolean;
		
		constructor(row: number, col: number, live: boolean) {
			this.row = row;
			this.col = col;
			this.live = live
		}
	}
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

### 目前存在的问题

- [多个编辑器共享同一主题](https://github.com/microsoft/monaco-editor/issues/1289)
- [多个编辑器共享 TypeScript Service](https://github.com/microsoft/monaco-editor/issues/262)

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | string |  | `''` | 代码段 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @before-init

初始化编辑器前触发

#### @init

初始化编辑器后触发

#### @input

输入时触发

#### @change

改变时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 改变后的值 |
| $event.oldValue | string | 旧的值 |
| $event.event | object | Monaco 的事件 |

