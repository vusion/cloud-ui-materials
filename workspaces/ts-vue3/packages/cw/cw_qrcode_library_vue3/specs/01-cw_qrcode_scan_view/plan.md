# cw_qrcode_scan_view — 迁移方案

**Date**：2026-08-24
**Input**：`specs/01-cw_qrcode_scan_view/spec.md`

---

## 摘要

将 Vue2 Options API 扫码组件迁移为 Vue3 `script setup` 组件，保留无 Props、单一 `onScan` 事件、两个原方法与 H5 全屏样式。核心复杂点是 `html5-qrcode` 实例的异步初始化、解码后的 stop/clear 序列、卸载清理与设计器模式守卫。技术路线为组件内聚扫码状态与生命周期，不创建无来源的共享 composable；用 CSS module 与可覆盖 CSS 变量保持原布局并满足主题适配。

**资产类型**：component

---

## 转换策略表

| Vue2 模式 / 决策点 | Vue3 目标 | KB 章节 | 备注 |
|:---|:---|:---|:---|
| Options API `data` | `ref` 保存 `message`、`html5QrCode`、`loading` | §mixin-composable | 无 Mixin，不额外拆共享 Hook |
| `mounted` / `beforeDestroy` | `onMounted` / `onBeforeUnmount`，显式跟踪并清理 500ms timer | §discipline、§alignment-checklist | 保留原 500ms stop→clear 语义，避免卸载后延迟回调 |
| `$env.VUE_APP_DESIGNER` | 读取 Vue app `globalProperties.$env`，兼容 `window.$uilibenv.IDE_DESIGNER` 与 `import.meta.env.VUE_APP_DESIGNER` | §pitfalls、§alignment-checklist | Storybook 可通过父 story setup 预置设计器环境 |
| `$emit('onScan', decodedText)` | `defineEmits<{ onScan: [event: string] }>` 并保持事件名 `onScan` | §discipline | api.ts 声明单一 event 对象 |
| `defineExpose` | 仅暴露源组件 methods：`start`、`getCameras` | §mixin-composable、§alignment-checklist | 不新增对外 API |
| `html5-qrcode` | 继续使用 `^2.3.8`，先 `getCameras()`，有设备后在 DOM 挂载后创建实例并 start | §discipline、§alignment-checklist | 保留 fps、qrbox、摄像头约束与解码后清理 |
| 旧工程 stories | `block.stories.js` 与 `example.stories.js` 均还原 `<cw-qrcode-scan-view></cw-qrcode-scan-view>` | §stories-truth | block 仅一个静态 story；example 增加设计器演示用于验证无摄像头分支 |
| 全局导出 | `src/components/index.ts` 具名导出 `CwQrcodeScanView` | §plugin-barrel | 入口 install 注册名保持 PascalCase |
| 样式 | CSS module + `--cw-qrcode-*` CSS 变量，默认值等于 Vue2 尺寸 | §css-vars | 无颜色与字体主题值；保留 `100vw/100vh`、flex 与 video cover 行为 |

### Mixin → Composable 映射

无 Mixin，不创建 composable。

### 样式转换

| 原始值 | Vue3 目标 | 验证状态 |
|:---|:---|:---|
| `100vw` / `100vh` | `var(--cw-qrcode-width, 100vw)` / `var(--cw-qrcode-height, 100vh)` | 保留源布局并允许主题覆盖 |
| flex 居中 | 直接保留 | 无主题魔法值 |
| `object-fit: cover` | 直接保留 | 源视频裁剪行为 |
| `overflow: hidden` | 直接保留 | 源全屏行为 |

**样式隔离**：`<style module>`

### 第三方库处理

| 库名 | Vue2 初始化方式 | Vue3 初始化方式 | 注意事项 |
|:---|:---|:---|:---|
| html5-qrcode | mounted 后 getCameras，成功后 new Html5Qrcode('reader') | onMounted 且非设计器时 getCameras；确认 `#reader` 存在后创建实例 | 解码成功后 emit、stop、clear；卸载时 stop 与延迟 clear，并清理 timer |

---

## 风险与陷阱

| # | 陷阱摘要 | 是否命中 | 预防/处理 |
|:--|:---|:---|:---|
| 1 | `$children` 操控 slot | ✗ | 源组件无 slots、无 `$children` |
| 2 | CSS 属性选择器依赖未声明 prop | ✗ | 源组件无 Props |
| 3 | `$emitPrevent` | ✗ | 源组件无 Emitter Mixin |
| 4 | 地图 ready 回调 | ✗ | 非地图组件 |
| 5 | 第三方初始化时机错误 | ✓ | `#reader` 由 `v-if` 控制，需在 onMounted 后由 getCameras 成功回调创建实例 |
| 6 | 依赖缺失 | ✓ | `html5-qrcode@^2.3.8` 已写入 dependencies |
| 7 | 布局高度语义丢失 | ✓ | CSS 变量默认值保留 `100vw/100vh` 与 `100%` 继承链 |
| 8 | DOM 监听器未断开 | ✗ | 源组件无自建 DOM listener |
| 9 | Vue2 工具方法漏迁 | ✗ | 无 Mixin/support 工具 |
| 10 | 地图内存 | ✗ | 非地图组件，但同样显式 stop/clear |
| 11 | `process.env` → Vite env | ✓ | 设计器检测优先读取注入 `$env`，并兼容 `import.meta.env` 与平台 `window.$uilibenv` |
| 12 | 静态资源路径 | ✗ | 无静态资源 |
| 13 | Hooks 强行复用 | ✗ | 单组件内聚实现 |
| 14 | 桶导出模糊 | ✓ | `components/index.ts` 具名导出 |
| 15 | 作用域插槽传参错误 | ✗ | 无插槽 |
| 16 | Vue3 draggable slot 空模板 | ✗ | 无列表与 draggable |
| 17 | block story 设计器空态 | ✓ | 设计器 example 通过父 setup 预置 `window.$uilibenv`，避免摄像头权限 |

**预估复杂度**：MEDIUM
**主要复杂点**：第三方扫码实例生命周期、设计器模式等价、E2E 避免真实摄像头依赖。

---

## 文件路径规划表

| 模块 | 职责 | 产出路径 | 测试层 | 操作 |
|:---|:---|:---|:---|:---|
| api.ts | NASL H5 组件与 onScan 事件声明 | `src/components/cw-qrcode-scan-view/api.ts` | — | 修改 |
| index.vue | UI、扫码状态、生命周期与暴露方法 | `src/components/cw-qrcode-scan-view/index.vue` | Vitest(DOM/调用参数) + E2E | 修改 |
| index.ts | 组件桶导出 | `src/components/cw-qrcode-scan-view/index.ts` | — | 修改 |
| components/index.ts | 库级具名导出 | `src/components/index.ts` | — | 修改 |
| block.stories.js | 旧工程 blocks.md 真值 | `src/components/cw-qrcode-scan-view/stories/block.stories.js` | — | 修改 |
| example.stories.js | 旧工程 examples.md 真值 + 设计器演示 | `src/components/cw-qrcode-scan-view/stories/example.stories.js` | — | 修改 |
| 单测 | 生命周期、事件、方法、设计器与清理 | `src/components/cw-qrcode-scan-view/__tests__/index.spec.ts` | Vitest | 修改 |
| E2E | Storybook 渲染与控制台错误 | `e2e/cw-qrcode-scan-view.spec.ts` | E2E | 修改 |

---

## 复杂度评估

| 维度 | 评估 | 说明 |
|:---|:---|:---|
| Mixin 数量 | 0 | 无 |
| Props 数量 | 0 | api.yaml 与 index.vue 均无 |
| 第三方库 | 1 | html5-qrcode |
| **综合复杂度** | MEDIUM | 第三方异步与摄像头权限 |

---

## 用户审批门禁

⚠️ 以上方案需用户确认后方可进入 migrate.tasks。

**确认要点**：
- [ ] 转换策略是否合理
- [ ] 文件路径规划是否正确
- [ ] 风险处理是否接受
- [ ] 复杂度评估是否准确


