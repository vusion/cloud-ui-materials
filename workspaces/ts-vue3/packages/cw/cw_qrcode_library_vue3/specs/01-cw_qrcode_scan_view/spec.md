# cw_qrcode_scan_view — Vue2 行为规格

**提取时间**：2026-08-24
**源码路径**：`workspaces/legacy-yaml/packages/cw/cw_qrcode_library/components/cw-qrcode-scan-view`

**资产类型**：component

---

## 概述

| 项 | 内容 |
|:---|:---|
| 组件目录名 | `cw-qrcode-scan-view` |
| 组件标签 | `<cw-qrcode-scan-view>` |
| 中文名称 | 扫一扫 |
| 核心职责 | 使用后置摄像头扫码，成功后停止并清理扫码实例，并抛出扫码结果 |
| 第三方依赖 | `html5-qrcode@^2.3.8` |
| Mixin 依赖 | 无 |
| Stories 真值来源 | 旧工程：`docs/blocks.md` 与 `docs/examples.md` |

---

## Props

无。`api.yaml` 未声明 Props，`index.vue` 的 `props` 为空对象。

---

## Events

| 事件名（on+PascalCase） | 参数签名 | 触发条件 |
|:---|:---|:---|
| onScan | `event: nasl.core.String` | `Html5Qrcode.start` 解码成功时，参数为 `decodedText` |

---

## Methods

| 方法名 | 参数 | 返回值 | 副作用描述 |
|:---|:---|:---|:---|
| start | — | void | 使用后置摄像头与 30fps 配置启动扫码；解码成功后 emit `onScan`，随后 stop 并 clear；启动失败时 alert 错误并 console.log |
| getCameras | — | void | 设置 `loading=true`，调用 `Html5Qrcode.getCameras()`；有设备时以 DOM id `reader` 创建实例并调用 `start()`；失败时将错误写入 `message` 并设置 `loading=false` |

---

## Slots

无。

---

## 响应式状态

| 状态 | 来源（data/computed） | 依赖链 | 说明 |
|:---|:---|:---|:---|
| message | data | — | 设计器模式初始化为 `二维码扫码组件`；摄像头获取失败时保存错误 |
| html5QrCode | data | — | 保存 `Html5Qrcode` 实例；初始为 `null` |
| loading | data | — | 获取摄像头前设为 `true`；成功路径未复位，失败路径设为 `false` |

---

## 生命周期行为

| 生命周期 | 行为描述 |
|:---|:---|
| mounted | 设计器模式下设置 `message='二维码扫码组件'`；若已有实例，则先 stop，500ms 后 clear、置空并按非设计器条件重新获取摄像头；否则非设计器模式直接获取摄像头 |
| beforeDestroy | 调用 `html5QrCode.stop()`；500ms 后调用 `clear()` 并将实例置空 |
| watch | 无 |

---

## Mixin 调用点分析

无 Mixin。

---

## 第三方集成

| 库名 | 版本 | 初始化方式 | 配置项 | 销毁方式 |
|:---|:---|:---|:---|:---|
| html5-qrcode | ^2.3.8 | `Html5Qrcode.getCameras()` 成功且设备列表非空后，`new Html5Qrcode('reader')` | `fps:30`、`qrbox:{width:250,height:250}`、`aspectRatio:1.777778`、`experimentalFeatures.useBarCodeDetectorIfSupported:true`、`videoConstraints.facingMode:'environment'`、`focusMode:'continuous'`、宽度 `640/1280/1920`、高度 `480/720/1080` | 解码成功后 `stop().then(clear)`；卸载时 `stop()`，500ms 后 `clear()` |

---

## 全局注册

| 组件名 | 对应导出 | 来源 |
|:---|:---|:---|
| CwQrcodeScanView | `export { CwQrcodeScanView }` | 源库 `index.js` |

---

## Block Stories 真值

```html
<!-- 来源：components/cw-qrcode-scan-view/docs/blocks.md -->
### 基本用法

<cw-qrcode-scan-view></cw-qrcode-scan-view>
```

---

## Example Stories 真值

```html
<!-- 来源：components/cw-qrcode-scan-view/docs/examples.md -->
### 基本用法

<cw-qrcode-scan-view></cw-qrcode-scan-view>
```

---

## 样式行为

| 选择器 | 行为 |
|:---|:---|
| `.qrcode-view` | `width:100vw`、`height:100vh`、`overflow:hidden` |
| `.preview` | `height:100vh` |
| `.qrcode-render` | flex 垂直水平居中，宽高 `100%` |
| `#reader` | 宽高 `100%` |
| `.qrcode-view video` | 宽高 `100%`、`object-fit:cover` |

---

## 注意事项

- 设计器模式由 `$env.VUE_APP_DESIGNER` 判断；设计器模式不渲染 `#reader`、不获取摄像头，并显示 `二维码扫码组件`。
- 非设计器模式渲染 `#reader`，其文本内容初始为空，摄像头错误时显示错误对象。
- `mounted` 中“已有实例”的清理分支依赖实例已存在；组件首次挂载时实际走 `getCameras()`。
- `beforeDestroy` 直接调用 `html5QrCode.stop()`，未做实例空值保护。
- `start()` 的 Promise rejection 统一 alert；字符串与非字符串错误都会 alert，且非字符串错误会 alert 两次。
- 解码成功回调会输出 `decodedText` 与 `decodedResult` 到 console。
