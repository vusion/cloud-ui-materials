### 基本用法

``` vue
<template>
<u-log-viewer :content="content"></u-log-viewer>
</template>
<script>
export default {
    data() {
        return {
            content: `[2020-01-10 10:14:55] [git] start to download source code
[2020-01-10 10:14:55] [git] fetch source code
[2020-01-10 10:14:58] [git] delete all untracked files and directories
[2020-01-10 10:14:59] [git] start to fetch new code
[2020-01-10 10:15:00] [git] successfully fetched new code
[2020-01-10 10:15:00] [git] start to checkout to branch master
[2020-01-10 10:15:01] [git] successfully downloaded source code
repo: The project module generate build xml success.
deploy:
     [echo] begin auto deploy......
clean:
webapp:
     [exec]
     [exec] *****************| npm run init:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm install
     [exec]
     [exec] npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
     [exec] npm WARN deprecated @types/globby@9.1.0: This is a stub types definition. globby provides its own type definitions, so you do not need this installed.
     [exec] npm WARN deprecated @types/axios@0.14.0: This is a stub types definition for axios (https://github.com/mzabriskie/axios). axios provides its own type definitions, so you don't need @types/axios installed!
     [exec] npm WARN deprecated kleur@2.0.2: Please upgrade to kleur@3 or migrate to 'ansi-colors' if you prefer the old syntax. Visit <https://github.com/lukeed/kleur/releases/tag/v3.0.0\> for migration path(s).
     [exec]
     [exec] > ((node-gyp configure && node-gyp build) > builderror.log) || (exit 0)
     [exec]
     [exec] g++: error: unrecognized command line option ‘-std=gnu++1y’
     [exec] make: *** [Release/obj.target/addon/csrc/addon.o] Error 1
     [exec] gyp ERR! build error
     [exec] gyp ERR! stack Error: make failed with exit code: 2
     [exec] gyp ERR! stack     at ChildProcess.emit (events.js:193:13)
     [exec] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:255:12)
     [exec] gyp ERR! System Linux 3.2.0-4-amd64
     [exec] gyp ERR! node -v v11.15.0
     [exec] gyp ERR! node-gyp -v v3.8.0
     [exec] gyp ERR! not ok
     [exec]
     [exec] > node husky install
     [exec]
     [exec] husky > Setting up git hooks
     [exec] Husky requires Git >= 2.13.0, please upgrade Git
     [exec] husky > Failed to install
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
     [exec]
     [exec] The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
     [exec] > https://opencollective.com/core-js
     [exec] > https://www.patreon.com/zloirock
     [exec]
     [exec] Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)
     [exec]
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec]
     [exec] > node ./postinstall.js
     [exec]
     [exec] Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
     [exec]
     [exec]
     [exec] > node scripts/postinstall
     [exec]
     [exec]
     [exec] > node bin/postinstall || exit 0
     [exec]
     [exec]
     [exec] > opencollective-postinstall || exit 0
     [exec]
     [exec] Thank you for using husky!
     [exec] If you rely on this package, please consider supporting our open collective:
     [exec] > https://opencollective.com/husky/donate
     [exec]
     [exec] npm notice created a lockfile as package-lock.json. You should commit this file.
     [exec] npm WARN eslint-config-vusion@3.0.3 requires a peer of eslint@^5.12.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN stylelint-config-vusion@1.1.2 requires a peer of stylelint@^9.3.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN eslint-plugin-vue@5.2.3 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN vue-eslint-parser@5.0.0 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/vusion-api/node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 2900 packages from 2170 contributors in 89.77s
     [exec]
     [exec] *****************| npm run init:client end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run init:server start |*******************
     [exec]
     [exec]
     [exec] > cd server && npm run initPro
     [exec]
     [exec]
     [exec] > rm -rf node_modules && npm install
     [exec]
     [exec]
     [exec] > node-gyp rebuild || node suppress-error.js
     [exec]
     [exec]   TOUCH Release/obj.target/DTraceProviderStub.stamp
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] npm WARN vusion-materials-platform@0.0.2 No repository field.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 1272 packages from 1248 contributors in 20.74s
     [exec]
     [exec] *****************| npm run init:server end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run build:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm run build && npm run publish
     [exec]
     [exec]
     [exec] > vue-cli-service build --apply-theme
     [exec]
     [exec] -  Building for production...
     [exec]
     [exec]  WARNING  Compiled with 2 warnings10:17:34 AM
     [exec]
     [exec]  warning
     [exec]
     [exec] asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
     [exec] This can impact web performance.
     [exec] Assets:
     [exec]   img/vscode-init-block.8a496f0a.png (410 KiB)
     [exec]   img/vscode-init-component.90fa0a7e.png (402 KiB)
     [exec]   css/chunk-common.4ff942db.css (261 KiB)
     [exec]   js/chunk-common.1a66be39.js (650 KiB)
     [exec]   js/docs.2934dfaa.js (400 KiB)
     [exec]   vendor.79f2d5e6.js (291 KiB)
     [exec]
     [exec]  warning
     [exec]
     [exec] entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
     [exec] Entrypoints:
     [exec]   index (990 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/index.42d05824.css
     [exec]       index.2fffbce0e0003a9a.js
     [exec]   vscode (974 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/vscode.ff148367.css
     [exec]       vscode.238e0ff67d270ef1.js
     [exec]
     [exec]
     [exec]   File                                     Size             Gzipped
     [exec]
     [exec]   public/js/chunk-common.1a66be39.js       650.24 KiB       161.93 KiB
     [exec]   public/js/docs.2934dfaa.js               399.51 KiB       42.87 KiB
     [exec]   public/vendor.79f2d5e6.js                290.98 KiB       102.23 KiB
     [exec]   public/chunk-2d0c15b8.f3f7b883.js        83.96 KiB        17.33 KiB
     [exec]   public/js/chunk-vendors.4c125764.js      50.88 KiB        15.59 KiB
     [exec]   public/index.2fffbce0e0003a9a.js         21.56 KiB        10.00 KiB
     [exec]   public/js/component.d32a029d.js          21.04 KiB        6.63 KiB
     [exec]   public/js/block.b4ca5833.js              8.50 KiB         2.70 KiB
     [exec]   public/js/template.c96ca802.js           8.20 KiB         2.55 KiB
     [exec]   public/js/account.04fe2fc5.js            7.36 KiB         1.88 KiB
     [exec]   public/vscode.238e0ff67d270ef1.js        6.61 KiB         2.88 KiB
     [exec]   public/js/team.4f74c0c9.js               5.76 KiB         1.90 KiB
     [exec]   public/js/demo.16381d57.js               3.33 KiB         1.42 KiB
     [exec]   public/js/search.0640a254.js             2.98 KiB         1.22 KiB
     [exec]   public/css/chunk-common.4ff942db.css     260.83 KiB       57.26 KiB
     [exec]   public/css/index.42d05824.css            6.34 KiB         2.10 KiB
     [exec]   public/css/vscode.ff148367.css           4.91 KiB         1.70 KiB
     [exec]   public/css/block.7fb46ef8.css            1.58 KiB         0.63 KiB
     [exec]   public/css/template.841fdf1f.css         1.58 KiB         0.63 KiB
     [exec]   public/css/component.849d7e14.css        1.23 KiB         0.48 KiB
     [exec]   public/css/search.ebafb1cd.css           0.81 KiB         0.40 KiB
     [exec]   public/css/chunk-vendors.bb08a24d.css    0.37 KiB         0.16 KiB
     [exec]   public/css/account.f21933f1.css          0.37 KiB         0.26 KiB
     [exec]   public/css/docs.5f316a89.css             0.25 KiB         0.20 KiB
     [exec]   public/css/team.2cc09e17.css             0.09 KiB         0.09 KiB
     [exec]   public/css/demo.486d2fb0.css             0.05 KiB         0.07 KiB
     [exec]
     [exec]   Images and other types of assets omitted.
     [exec]
     [exec]  DONE  Build complete. The public directory is ready to be deployed.
     [exec]  INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
     [exec]
     [exec]
     [exec] > node ./bin/publish
     [exec]
     [exec]
     [exec] *****************| npm run build:client end |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client start |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client end |*******************
     [exec]
compress-web:
cp:
BUILD SUCCESSFUL

Total time: 2 minutes 38 seconds
start to upload package to nos
repo: Upload compressed file to nos success!
successfully uploaded package to nos
fetch source second:5
compile code second:159
upload file  second:4

build total  second:175
` };
    },
}
</script>
```

### 日志多次追加

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
const remoteLogs = [`[2020-01-10 10:14:55] [git] start to download source code
[2020-01-10 10:14:55] [git] fetch source code
[2020-01-10 10:14:58] [git] delete all untracked files and directories
[2020-01-10 10:14:59] [git] start to fetch new code
[2020-01-10 10:15:00] [git] successfully fetched new code
[2020-01-10 10:15:00] [git] start to checkout to branch master
[2020-01-10 10:15:01] [git] successfully downloaded source code
repo: The project module generate build xml success.`,
`deploy:
     [echo] begin auto deploy......
clean:
webapp:
     [exec]
     [exec] *****************| npm run init:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm install
     [exec]
     [exec] npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
     [exec] npm WARN deprecated @types/globby@9.1.0: This is a stub types definition. globby provides its own type definitions, so you do not need this installed.
     [exec] npm WARN deprecated @types/axios@0.14.0: This is a stub types definition for axios (https://github.com/mzabriskie/axios). axios provides its own type definitions, so you don't need @types/axios installed!
     [exec] npm WARN deprecated kleur@2.0.2: Please upgrade to kleur@3 or migrate to 'ansi-colors' if you prefer the old syntax. Visit <https://github.com/lukeed/kleur/releases/tag/v3.0.0\> for migration path(s).
     [exec]
     [exec] > ((node-gyp configure && node-gyp build) > builderror.log) || (exit 0)
     [exec]
     [exec] g++: error: unrecognized command line option ‘-std=gnu++1y’`,
`     [exec] make: *** [Release/obj.target/addon/csrc/addon.o] Error 1
     [exec] gyp ERR! build error
     [exec] gyp ERR! stack Error: make failed with exit code: 2
     [exec] gyp ERR! stack     at ChildProcess.emit (events.js:193:13)
     [exec] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:255:12)
     [exec] gyp ERR! System Linux 3.2.0-4-amd64
     [exec] gyp ERR! node -v v11.15.0
     [exec] gyp ERR! node-gyp -v v3.8.0
     [exec] gyp ERR! not ok`,
`     [exec]
     [exec] > node husky install
     [exec]
     [exec] husky > Setting up git hooks
     [exec] Husky requires Git >= 2.13.0, please upgrade Git
     [exec] husky > Failed to install
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
     [exec]
     [exec] The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
     [exec] > https://opencollective.com/core-js
     [exec] > https://www.patreon.com/zloirock`,
`     [exec]
     [exec] Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)
     [exec]
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec]
     [exec] > node ./postinstall.js
     [exec]
     [exec] Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
     [exec]
     [exec]
     [exec] > node scripts/postinstall
     [exec]
     [exec]
     [exec] > node bin/postinstall || exit 0
     [exec]
     [exec]
     [exec] > opencollective-postinstall || exit 0
     [exec]
     [exec] Thank you for using husky!
     [exec] If you rely on this package, please consider supporting our open collective:
     [exec] > https://opencollective.com/husky/donate
     [exec]`,
`     [exec] npm notice created a lockfile as package-lock.json. You should commit this file.
     [exec] npm WARN eslint-config-vusion@3.0.3 requires a peer of eslint@^5.12.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN stylelint-config-vusion@1.1.2 requires a peer of stylelint@^9.3.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN eslint-plugin-vue@5.2.3 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN vue-eslint-parser@5.0.0 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/vusion-api/node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})`,
`     [exec]
     [exec] added 2900 packages from 2170 contributors in 89.77s
     [exec]
     [exec] *****************| npm run init:client end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run init:server start |*******************
     [exec]
     [exec]
     [exec] > cd server && npm run initPro
     [exec]`,
`     [exec]
     [exec] > rm -rf node_modules && npm install
     [exec]
     [exec]
     [exec] > node-gyp rebuild || node suppress-error.js
     [exec]
     [exec]   TOUCH Release/obj.target/DTraceProviderStub.stamp
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] npm WARN vusion-materials-platform@0.0.2 No repository field.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 1272 packages from 1248 contributors in 20.74s
     [exec]
     [exec] *****************| npm run init:server end |*******************
     [exec]
     [exec]`,
`     [exec] *****************| npm run build:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm run build && npm run publish
     [exec]
     [exec]
     [exec] > vue-cli-service build --apply-theme
     [exec]
     [exec] -  Building for production...
     [exec]
     [exec]  WARNING  Compiled with 2 warnings10:17:34 AM
     [exec]
     [exec]  warning
     [exec]
     [exec] asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).`,
`     [exec] This can impact web performance.
     [exec] Assets:
     [exec]   img/vscode-init-block.8a496f0a.png (410 KiB)
     [exec]   img/vscode-init-component.90fa0a7e.png (402 KiB)
     [exec]   css/chunk-common.4ff942db.css (261 KiB)
     [exec]   js/chunk-common.1a66be39.js (650 KiB)
     [exec]   js/docs.2934dfaa.js (400 KiB)
     [exec]   vendor.79f2d5e6.js (291 KiB)
     [exec]
     [exec]  warning
     [exec]
     [exec] entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
     [exec] Entrypoints:
     [exec]   index (990 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css`,
`     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/index.42d05824.css
     [exec]       index.2fffbce0e0003a9a.js
     [exec]   vscode (974 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/vscode.ff148367.css
     [exec]       vscode.238e0ff67d270ef1.js
     [exec]
     [exec]
     [exec]   File                                     Size             Gzipped
     [exec]
     [exec]   public/js/chunk-common.1a66be39.js       650.24 KiB       161.93 KiB
     [exec]   public/js/docs.2934dfaa.js               399.51 KiB       42.87 KiB
     [exec]   public/vendor.79f2d5e6.js                290.98 KiB       102.23 KiB
     [exec]   public/chunk-2d0c15b8.f3f7b883.js        83.96 KiB        17.33 KiB
     [exec]   public/js/chunk-vendors.4c125764.js      50.88 KiB        15.59 KiB`,
`     [exec]   public/index.2fffbce0e0003a9a.js         21.56 KiB        10.00 KiB
     [exec]   public/js/component.d32a029d.js          21.04 KiB        6.63 KiB
     [exec]   public/js/block.b4ca5833.js              8.50 KiB         2.70 KiB
     [exec]   public/js/template.c96ca802.js           8.20 KiB         2.55 KiB
     [exec]   public/js/account.04fe2fc5.js            7.36 KiB         1.88 KiB
     [exec]   public/vscode.238e0ff67d270ef1.js        6.61 KiB         2.88 KiB
     [exec]   public/js/team.4f74c0c9.js               5.76 KiB         1.90 KiB
     [exec]   public/js/demo.16381d57.js               3.33 KiB         1.42 KiB
     [exec]   public/js/search.0640a254.js             2.98 KiB         1.22 KiB
     [exec]   public/css/chunk-common.4ff942db.css     260.83 KiB       57.26 KiB
     [exec]   public/css/index.42d05824.css            6.34 KiB         2.10 KiB
     [exec]   public/css/vscode.ff148367.css           4.91 KiB         1.70 KiB
     [exec]   public/css/block.7fb46ef8.css            1.58 KiB         0.63 KiB
     [exec]   public/css/template.841fdf1f.css         1.58 KiB         0.63 KiB
     [exec]   public/css/component.849d7e14.css        1.23 KiB         0.48 KiB
     [exec]   public/css/search.ebafb1cd.css           0.81 KiB         0.40 KiB
     [exec]   public/css/chunk-vendors.bb08a24d.css    0.37 KiB         0.16 KiB
     [exec]   public/css/account.f21933f1.css          0.37 KiB         0.26 KiB
     [exec]   public/css/docs.5f316a89.css             0.25 KiB         0.20 KiB
     [exec]   public/css/team.2cc09e17.css             0.09 KiB         0.09 KiB
     [exec]   public/css/demo.486d2fb0.css             0.05 KiB         0.07 KiB
     [exec]`,
`     [exec]   Images and other types of assets omitted.
     [exec]
     [exec]  DONE  Build complete. The public directory is ready to be deployed.
     [exec]  INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
     [exec]
     [exec]
     [exec] > node ./bin/publish
     [exec]
     [exec]
     [exec] *****************| npm run build:client end |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client start |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client end |*******************
     [exec]
compress-web:`,
`cp:
BUILD SUCCESSFUL

Total time: 2 minutes 38 seconds
start to upload package to nos
repo: Upload compressed file to nos success!
successfully uploaded package to nos
fetch source second:5
compile code second:159
upload file  second:4

build total  second:175
`];
let count = 0;
const fetchLog = () => Promise.resolve(count < remoteLogs.length ? remoteLogs[count++] : undefined);

export default {
    methods: {
        fetchLog() {
            return fetchLog().then((content) => {
                if (typeof content === 'string')
                    this.$refs.logViewer.append(content);
                return content;
            });
        },
        autoFetchLog() {
            setTimeout(() => this.fetchLog().then((content) => {
                if (typeof content === 'string')
                    this.autoFetchLog();
            }), 500);
        },
    },
}
</script>
```

### 设置初始显示方式

默认显示方式为`'static'`，嵌入在文档流中。`'fixed'`表示固定显示，`'fullWindow'`表示全窗口显示，`'fullScreen'`表示全屏显示。


``` vue
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-linear-layout gap="small">
        <u-button @click="display = (display === 'fixed' ? 'static' : 'fixed')">切换为{{ display === 'fixed' ? '静态' : '固定' }}显示</u-button>
    </u-linear-layout>
    <u-log-viewer :content="content" :display="display" :normal-display="display"></u-log-viewer>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            display: 'static',
            content: `[2020-01-10 10:14:55] [git] start to download source code
[2020-01-10 10:14:55] [git] fetch source code
[2020-01-10 10:14:58] [git] delete all untracked files and directories
[2020-01-10 10:14:59] [git] start to fetch new code
[2020-01-10 10:15:00] [git] successfully fetched new code
[2020-01-10 10:15:00] [git] start to checkout to branch master
[2020-01-10 10:15:01] [git] successfully downloaded source code
repo: The project module generate build xml success.
deploy:
     [echo] begin auto deploy......
clean:
webapp:
     [exec]
     [exec] *****************| npm run init:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm install
     [exec]
     [exec] npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
     [exec] npm WARN deprecated @types/globby@9.1.0: This is a stub types definition. globby provides its own type definitions, so you do not need this installed.
     [exec] npm WARN deprecated @types/axios@0.14.0: This is a stub types definition for axios (https://github.com/mzabriskie/axios). axios provides its own type definitions, so you don't need @types/axios installed!
     [exec] npm WARN deprecated kleur@2.0.2: Please upgrade to kleur@3 or migrate to 'ansi-colors' if you prefer the old syntax. Visit <https://github.com/lukeed/kleur/releases/tag/v3.0.0\> for migration path(s).
     [exec]
     [exec] > ((node-gyp configure && node-gyp build) > builderror.log) || (exit 0)
     [exec]
     [exec] g++: error: unrecognized command line option ‘-std=gnu++1y’
     [exec] make: *** [Release/obj.target/addon/csrc/addon.o] Error 1
     [exec] gyp ERR! build error
     [exec] gyp ERR! stack Error: make failed with exit code: 2
     [exec] gyp ERR! stack     at ChildProcess.emit (events.js:193:13)
     [exec] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:255:12)
     [exec] gyp ERR! System Linux 3.2.0-4-amd64
     [exec] gyp ERR! node -v v11.15.0
     [exec] gyp ERR! node-gyp -v v3.8.0
     [exec] gyp ERR! not ok
     [exec]
     [exec] > node husky install
     [exec]
     [exec] husky > Setting up git hooks
     [exec] Husky requires Git >= 2.13.0, please upgrade Git
     [exec] husky > Failed to install
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
     [exec]
     [exec] The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
     [exec] > https://opencollective.com/core-js
     [exec] > https://www.patreon.com/zloirock
     [exec]
     [exec] Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)
     [exec]
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec]
     [exec] > node ./postinstall.js
     [exec]
     [exec] Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
     [exec]
     [exec]
     [exec] > node scripts/postinstall
     [exec]
     [exec]
     [exec] > node bin/postinstall || exit 0
     [exec]
     [exec]
     [exec] > opencollective-postinstall || exit 0
     [exec]
     [exec] Thank you for using husky!
     [exec] If you rely on this package, please consider supporting our open collective:
     [exec] > https://opencollective.com/husky/donate
     [exec]
     [exec] npm notice created a lockfile as package-lock.json. You should commit this file.
     [exec] npm WARN eslint-config-vusion@3.0.3 requires a peer of eslint@^5.12.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN stylelint-config-vusion@1.1.2 requires a peer of stylelint@^9.3.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN eslint-plugin-vue@5.2.3 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN vue-eslint-parser@5.0.0 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/vusion-api/node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 2900 packages from 2170 contributors in 89.77s
     [exec]
     [exec] *****************| npm run init:client end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run init:server start |*******************
     [exec]
     [exec]
     [exec] > cd server && npm run initPro
     [exec]
     [exec]
     [exec] > rm -rf node_modules && npm install
     [exec]
     [exec]
     [exec] > node-gyp rebuild || node suppress-error.js
     [exec]
     [exec]   TOUCH Release/obj.target/DTraceProviderStub.stamp
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] npm WARN vusion-materials-platform@0.0.2 No repository field.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 1272 packages from 1248 contributors in 20.74s
     [exec]
     [exec] *****************| npm run init:server end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run build:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm run build && npm run publish
     [exec]
     [exec]
     [exec] > vue-cli-service build --apply-theme
     [exec]
     [exec] -  Building for production...
     [exec]
     [exec]  WARNING  Compiled with 2 warnings10:17:34 AM
     [exec]
     [exec]  warning
     [exec]
     [exec] asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
     [exec] This can impact web performance.
     [exec] Assets:
     [exec]   img/vscode-init-block.8a496f0a.png (410 KiB)
     [exec]   img/vscode-init-component.90fa0a7e.png (402 KiB)
     [exec]   css/chunk-common.4ff942db.css (261 KiB)
     [exec]   js/chunk-common.1a66be39.js (650 KiB)
     [exec]   js/docs.2934dfaa.js (400 KiB)
     [exec]   vendor.79f2d5e6.js (291 KiB)
     [exec]
     [exec]  warning
     [exec]
     [exec] entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
     [exec] Entrypoints:
     [exec]   index (990 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/index.42d05824.css
     [exec]       index.2fffbce0e0003a9a.js
     [exec]   vscode (974 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/vscode.ff148367.css
     [exec]       vscode.238e0ff67d270ef1.js
     [exec]
     [exec]
     [exec]   File                                     Size             Gzipped
     [exec]
     [exec]   public/js/chunk-common.1a66be39.js       650.24 KiB       161.93 KiB
     [exec]   public/js/docs.2934dfaa.js               399.51 KiB       42.87 KiB
     [exec]   public/vendor.79f2d5e6.js                290.98 KiB       102.23 KiB
     [exec]   public/chunk-2d0c15b8.f3f7b883.js        83.96 KiB        17.33 KiB
     [exec]   public/js/chunk-vendors.4c125764.js      50.88 KiB        15.59 KiB
     [exec]   public/index.2fffbce0e0003a9a.js         21.56 KiB        10.00 KiB
     [exec]   public/js/component.d32a029d.js          21.04 KiB        6.63 KiB
     [exec]   public/js/block.b4ca5833.js              8.50 KiB         2.70 KiB
     [exec]   public/js/template.c96ca802.js           8.20 KiB         2.55 KiB
     [exec]   public/js/account.04fe2fc5.js            7.36 KiB         1.88 KiB
     [exec]   public/vscode.238e0ff67d270ef1.js        6.61 KiB         2.88 KiB
     [exec]   public/js/team.4f74c0c9.js               5.76 KiB         1.90 KiB
     [exec]   public/js/demo.16381d57.js               3.33 KiB         1.42 KiB
     [exec]   public/js/search.0640a254.js             2.98 KiB         1.22 KiB
     [exec]   public/css/chunk-common.4ff942db.css     260.83 KiB       57.26 KiB
     [exec]   public/css/index.42d05824.css            6.34 KiB         2.10 KiB
     [exec]   public/css/vscode.ff148367.css           4.91 KiB         1.70 KiB
     [exec]   public/css/block.7fb46ef8.css            1.58 KiB         0.63 KiB
     [exec]   public/css/template.841fdf1f.css         1.58 KiB         0.63 KiB
     [exec]   public/css/component.849d7e14.css        1.23 KiB         0.48 KiB
     [exec]   public/css/search.ebafb1cd.css           0.81 KiB         0.40 KiB
     [exec]   public/css/chunk-vendors.bb08a24d.css    0.37 KiB         0.16 KiB
     [exec]   public/css/account.f21933f1.css          0.37 KiB         0.26 KiB
     [exec]   public/css/docs.5f316a89.css             0.25 KiB         0.20 KiB
     [exec]   public/css/team.2cc09e17.css             0.09 KiB         0.09 KiB
     [exec]   public/css/demo.486d2fb0.css             0.05 KiB         0.07 KiB
     [exec]
     [exec]   Images and other types of assets omitted.
     [exec]
     [exec]  DONE  Build complete. The public directory is ready to be deployed.
     [exec]  INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
     [exec]
     [exec]
     [exec] > node ./bin/publish
     [exec]
     [exec]
     [exec] *****************| npm run build:client end |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client start |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client end |*******************
     [exec]
compress-web:
cp:
BUILD SUCCESSFUL

Total time: 2 minutes 38 seconds
start to upload package to nos
repo: Upload compressed file to nos success!
successfully uploaded package to nos
fetch source second:5
compile code second:159
upload file  second:4

build total  second:175
` };
    },
}
</script>
```

### 设置初始深浅色

默认`color="dark"`。通过设置`color="light"`，可以将初始显示设置为浅色。

``` vue
<template>
<u-log-viewer :content="content" color="light"></u-log-viewer>
</template>
<script>
export default {
    data() {
        return {
            content: `[2020-01-10 10:14:55] [git] start to download source code
[2020-01-10 10:14:55] [git] fetch source code
[2020-01-10 10:14:58] [git] delete all untracked files and directories
[2020-01-10 10:14:59] [git] start to fetch new code
[2020-01-10 10:15:00] [git] successfully fetched new code
[2020-01-10 10:15:00] [git] start to checkout to branch master
[2020-01-10 10:15:01] [git] successfully downloaded source code
repo: The project module generate build xml success.
deploy:
     [echo] begin auto deploy......
clean:
webapp:
     [exec]
     [exec] *****************| npm run init:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm install
     [exec]
     [exec] npm WARN deprecated core-js@2.6.11: core-js@<3 is no longer maintained and not recommended for usage due to the number of issues. Please, upgrade your dependencies to the actual version of core-js@3.
     [exec] npm WARN deprecated @types/globby@9.1.0: This is a stub types definition. globby provides its own type definitions, so you do not need this installed.
     [exec] npm WARN deprecated @types/axios@0.14.0: This is a stub types definition for axios (https://github.com/mzabriskie/axios). axios provides its own type definitions, so you don't need @types/axios installed!
     [exec] npm WARN deprecated kleur@2.0.2: Please upgrade to kleur@3 or migrate to 'ansi-colors' if you prefer the old syntax. Visit <https://github.com/lukeed/kleur/releases/tag/v3.0.0\> for migration path(s).
     [exec]
     [exec] > ((node-gyp configure && node-gyp build) > builderror.log) || (exit 0)
     [exec]
     [exec] g++: error: unrecognized command line option ‘-std=gnu++1y’
     [exec] make: *** [Release/obj.target/addon/csrc/addon.o] Error 1
     [exec] gyp ERR! build error
     [exec] gyp ERR! stack Error: make failed with exit code: 2
     [exec] gyp ERR! stack     at ChildProcess.emit (events.js:193:13)
     [exec] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:255:12)
     [exec] gyp ERR! System Linux 3.2.0-4-amd64
     [exec] gyp ERR! node -v v11.15.0
     [exec] gyp ERR! node-gyp -v v3.8.0
     [exec] gyp ERR! not ok
     [exec]
     [exec] > node husky install
     [exec]
     [exec] husky > Setting up git hooks
     [exec] Husky requires Git >= 2.13.0, please upgrade Git
     [exec] husky > Failed to install
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!
     [exec]
     [exec] The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
     [exec] > https://opencollective.com/core-js
     [exec] > https://www.patreon.com/zloirock
     [exec]
     [exec] Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)
     [exec]
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec]
     [exec] > node ./postinstall.js
     [exec]
     [exec] Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)
     [exec]
     [exec]
     [exec] > node scripts/postinstall
     [exec]
     [exec]
     [exec] > node bin/postinstall || exit 0
     [exec]
     [exec]
     [exec] > opencollective-postinstall || exit 0
     [exec]
     [exec] Thank you for using husky!
     [exec] If you rely on this package, please consider supporting our open collective:
     [exec] > https://opencollective.com/husky/donate
     [exec]
     [exec] npm notice created a lockfile as package-lock.json. You should commit this file.
     [exec] npm WARN eslint-config-vusion@3.0.3 requires a peer of eslint@^5.12.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN stylelint-config-vusion@1.1.2 requires a peer of stylelint@^9.3.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN eslint-plugin-vue@5.2.3 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN vue-eslint-parser@5.0.0 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/vusion-api/node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 2900 packages from 2170 contributors in 89.77s
     [exec]
     [exec] *****************| npm run init:client end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run init:server start |*******************
     [exec]
     [exec]
     [exec] > cd server && npm run initPro
     [exec]
     [exec]
     [exec] > rm -rf node_modules && npm install
     [exec]
     [exec]
     [exec] > node-gyp rebuild || node suppress-error.js
     [exec]
     [exec]   TOUCH Release/obj.target/DTraceProviderStub.stamp
     [exec]
     [exec] > node -e "try{require('./postinstall')}catch(e){}"
     [exec]
     [exec] npm WARN vusion-materials-platform@0.0.2 No repository field.
     [exec] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/fsevents):
     [exec] npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
     [exec]
     [exec] added 1272 packages from 1248 contributors in 20.74s
     [exec]
     [exec] *****************| npm run init:server end |*******************
     [exec]
     [exec]
     [exec] *****************| npm run build:client start |*******************
     [exec]
     [exec]
     [exec] > cd client && npm run build && npm run publish
     [exec]
     [exec]
     [exec] > vue-cli-service build --apply-theme
     [exec]
     [exec] -  Building for production...
     [exec]
     [exec]  WARNING  Compiled with 2 warnings10:17:34 AM
     [exec]
     [exec]  warning
     [exec]
     [exec] asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
     [exec] This can impact web performance.
     [exec] Assets:
     [exec]   img/vscode-init-block.8a496f0a.png (410 KiB)
     [exec]   img/vscode-init-component.90fa0a7e.png (402 KiB)
     [exec]   css/chunk-common.4ff942db.css (261 KiB)
     [exec]   js/chunk-common.1a66be39.js (650 KiB)
     [exec]   js/docs.2934dfaa.js (400 KiB)
     [exec]   vendor.79f2d5e6.js (291 KiB)
     [exec]
     [exec]  warning
     [exec]
     [exec] entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
     [exec] Entrypoints:
     [exec]   index (990 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/index.42d05824.css
     [exec]       index.2fffbce0e0003a9a.js
     [exec]   vscode (974 KiB)
     [exec]       css/chunk-vendors.bb08a24d.css
     [exec]       js/chunk-vendors.4c125764.js
     [exec]       css/chunk-common.4ff942db.css
     [exec]       js/chunk-common.1a66be39.js
     [exec]       css/vscode.ff148367.css
     [exec]       vscode.238e0ff67d270ef1.js
     [exec]
     [exec]
     [exec]   File                                     Size             Gzipped
     [exec]
     [exec]   public/js/chunk-common.1a66be39.js       650.24 KiB       161.93 KiB
     [exec]   public/js/docs.2934dfaa.js               399.51 KiB       42.87 KiB
     [exec]   public/vendor.79f2d5e6.js                290.98 KiB       102.23 KiB
     [exec]   public/chunk-2d0c15b8.f3f7b883.js        83.96 KiB        17.33 KiB
     [exec]   public/js/chunk-vendors.4c125764.js      50.88 KiB        15.59 KiB
     [exec]   public/index.2fffbce0e0003a9a.js         21.56 KiB        10.00 KiB
     [exec]   public/js/component.d32a029d.js          21.04 KiB        6.63 KiB
     [exec]   public/js/block.b4ca5833.js              8.50 KiB         2.70 KiB
     [exec]   public/js/template.c96ca802.js           8.20 KiB         2.55 KiB
     [exec]   public/js/account.04fe2fc5.js            7.36 KiB         1.88 KiB
     [exec]   public/vscode.238e0ff67d270ef1.js        6.61 KiB         2.88 KiB
     [exec]   public/js/team.4f74c0c9.js               5.76 KiB         1.90 KiB
     [exec]   public/js/demo.16381d57.js               3.33 KiB         1.42 KiB
     [exec]   public/js/search.0640a254.js             2.98 KiB         1.22 KiB
     [exec]   public/css/chunk-common.4ff942db.css     260.83 KiB       57.26 KiB
     [exec]   public/css/index.42d05824.css            6.34 KiB         2.10 KiB
     [exec]   public/css/vscode.ff148367.css           4.91 KiB         1.70 KiB
     [exec]   public/css/block.7fb46ef8.css            1.58 KiB         0.63 KiB
     [exec]   public/css/template.841fdf1f.css         1.58 KiB         0.63 KiB
     [exec]   public/css/component.849d7e14.css        1.23 KiB         0.48 KiB
     [exec]   public/css/search.ebafb1cd.css           0.81 KiB         0.40 KiB
     [exec]   public/css/chunk-vendors.bb08a24d.css    0.37 KiB         0.16 KiB
     [exec]   public/css/account.f21933f1.css          0.37 KiB         0.26 KiB
     [exec]   public/css/docs.5f316a89.css             0.25 KiB         0.20 KiB
     [exec]   public/css/team.2cc09e17.css             0.09 KiB         0.09 KiB
     [exec]   public/css/demo.486d2fb0.css             0.05 KiB         0.07 KiB
     [exec]
     [exec]   Images and other types of assets omitted.
     [exec]
     [exec]  DONE  Build complete. The public directory is ready to be deployed.
     [exec]  INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
     [exec]
     [exec]
     [exec] > node ./bin/publish
     [exec]
     [exec]
     [exec] *****************| npm run build:client end |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client start |*******************
     [exec]
     [exec]
     [exec] *****************| rm -rf client end |*******************
     [exec]
compress-web:
cp:
BUILD SUCCESSFUL

Total time: 2 minutes 38 seconds
start to upload package to nos
repo: Upload compressed file to nos success!
successfully uploaded package to nos
fetch source second:5
compile code second:159
upload file  second:4

build total  second:175
` };
    },
}
</script>
```
