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
