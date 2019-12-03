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
