<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# XHighlight 代码高亮

**三方组件**, **块级展示**

本组件对 [highlight.js](https://highlightjs.org/usage/) 进行了封装，方便代码高亮展示。

## 安装配置
### 安装

``` shell
npm i --save @cloud-ui/x-highlight.vue
```

### 引入

直接注册

``` js
import XHighlight from '@cloud-ui/x-highlight.vue';

Vue.component('x-highlight', XHighlight);
```

或者使用 vusion-utils 安装（常用于同时安装多个组件）

``` js
import { install } from 'vusion-utils';
import XHighlight from '@cloud-ui/x-highlight.vue';

install(Vue, { XHighlight });
```

### 打包配置

由于 highlight.js 包较大，可以添加在 Webpack 的配置里 externals 中。

或者用 dll 进行处理。

## 示例
### 基本用法

在组件上设置`lang`和`content`属性。

为了控制打包大小，我们没有引入全量包。使用时还需按照下面的方式，自行引入语言包和样式包。

``` js
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/tomorrow.css';
```

更多语言和样式可以查看源码中的[语言目录](https://github.com/highlightjs/highlight.js/tree/master/src/languages)，[样式目录](https://github.com/highlightjs/highlight.js/tree/master/src/styles)。

下面是一段 javascript 的例子。

``` vue
<template>
<x-highlight lang="javascript" :content="content"></x-highlight>
</template>

<script>
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
    data() {
        return {
            content: `
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
    const flatten = memo.concat(item);
    flat[index] = flatten;
    return flatten;
});
            `,
        };
    },
};
</script>
```

下面是一段 html 的例子，html 的语言包名称是 xml。

``` vue
<template>
<x-highlight lang="html" :content="content"></x-highlight>
</template>

<script>
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);

export default {
    data() {
        return {
            content: `
<div class="app">
    <button>Button</button>
</div>
            `,
        };
    },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| content | string |  | `''` | 原始代码内容 |
| lang | string |  | `''` | 语言 |
| auto | boolean |  | `false` | 是否自动探测代码中的语言 |
| preRender | Function\<content: string, lang: string\> |  | `'this.defaultPreRender'` | 渲染前对代码的处理函数 |
| postRender | Function\<result: string\> |  | `'this.defaultPostRender'` | 渲染后对结果的处理函数 |

### Events

#### @before-render

渲染前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.content | string | 原始代码内容 |
| $event.lang | string | 语言 |
| $event.result | string | 渲染后的结果 |
| $event.preventDefault | Function | 阻止渲染流程 |
| senderVM | XHighlight | 发送事件实例 |

#### @render

渲染后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.content | string | 原始代码内容 |
| $event.lang | string | 语言 |
| $event.result | string | 渲染后的结果 |
| senderVM | XHighlight | 发送事件实例 |

### Methods

#### render()

渲染代码。初始化时和`content`属性改变时会自动调用。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
