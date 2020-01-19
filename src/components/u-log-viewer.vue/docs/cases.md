### 高频日志

使用`push`方法追加日志。

日志如果在最底下，会持续跟随滚动；如果在中间，会保持当前位置。

``` vue
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-log-viewer ref="logViewer"></u-log-viewer>
    <u-linear-layout gap="small">
        <u-button @click="fetchLog">单步获取</u-button>
        <u-button @click="autoFetchLog">定时自动获取</u-button>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
const remoteLogs = [`
[43m[30m WARNING [39m[49m [33mCompiled with 3 warnings[39m[90m index: 00:00:00[39m

[43m[30m warning [39m[49m

asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  media/music.b1818dba.mp3 (3.9 MiB)
  img/bg.51084630.jpg (672 KiB)
  js/chunk-vendors.19893bbc.js (575 KiB)

[43m[30m warning [39m[49m

entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  index (695 KiB)
      css/chunk-vendors.e226ad28.css
      js/chunk-vendors.19893bbc.js
      css/index.f50b38e6.css
      js/index.00e713e9.js


[43m[30m warning [39m[49m`,
`[39m[90m index: 00:00:00[39m

webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/

  [36m[1mFile[22m[39m                                   [36m[1mSize[22m[39m              [36m[1mGzipped[22m[39m

  [32mdist/js/chunk-vendors.19893bbc.js[39m      575.12 KiB        167.44 KiB
  [32mdist/js/index.00e713e9.js[39m              11.10 KiB         4.29 KiB
  [34mdist/css/chunk-vendors.e226ad28.css[39m    81.18 KiB         15.98 KiB
  [34mdist/css/index.f50b38e6.css[39m            27.93 KiB         5.91 KiB

  [90mImages and other types of assets omitted.[39m

[42m[30m DONE [39m[49m Build complete. The [36mdist[39m directory is ready to be deployed.
[44m[30m INFO [39m[49m Check out deployment instructions at [36mhttps://cli.vuejs.org/guide/deployment.html[39m
`];

let count = 0;
const fetchLog = () => {
    if (count++ < 10000)
        return Promise.resolve(remoteLogs[count%2].replace(/00:00:00/g, count));
    else
        return Promise.resolve();
};

export default {
    methods: {
        fetchLog() {
            return fetchLog().then((content) => {
                if (typeof content === 'string')
                    this.$refs.logViewer.push(content);
                return content;
            });
        },
        autoFetchLog() {
            setTimeout(() => this.fetchLog().then((content) => {
                if (typeof content === 'string')
                    this.autoFetchLog();
            }), 10);
        },
    },
}
</script>
```
