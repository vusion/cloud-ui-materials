# cw_qrcode_scan_view — TDD 执行编排

**Date**：2026-08-25
**Input**：`specs/01-cw_qrcode_scan_view/plan.md`
**资产类型**：component
**复杂度**：MEDIUM

## 行为等价矩阵

| # | 行为描述（来自 spec.md） | 维度 | RED 测试编码 | GREEN 实现 | 等价状态 |
|:--|:---|:---|:---|:---|:---|
| 1 | 非设计器模式渲染 `#reader` 与 `.qrcode-render` | Lifecycle | `__tests__/index.spec.ts:54` | `index.vue:2,onMounted` | ✅ |
| 2 | 设计器模式不渲染 `#reader`，显示 `二维码扫码组件` 且不获取摄像头 | Lifecycle | `__tests__/index.spec.ts:62` | `index.vue:2,onMounted` | ✅ |
| 3 | `getCameras` 获取设备前置 `loading=true`，无设备时不创建实例 | Methods | `__tests__/index.spec.ts:72` | `index.vue:getCameras` | ✅ |
| 4 | 有设备时创建 `Html5Qrcode('reader')` 并调用 `start` | Methods | `__tests__/index.spec.ts:89` | `index.vue:getCameras` | ✅ |
| 5 | `start` 使用源配置与后置摄像头调用第三方 start | Methods | `__tests__/index.spec.ts:89` | `index.vue:start` | ✅ |
| 6 | 解码成功时 emit `onScan(decodedText)`，随后 stop 并 clear | Events | `__tests__/index.spec.ts:115` | `index.vue:start` | ✅ |
| 7 | 摄像头获取失败时 `message` 保存错误且 `loading=false` | State | `__tests__/index.spec.ts:130` | `index.vue:getCameras` | ✅ |
| 8 | `start` Promise 失败时 alert 错误并输出 console.log | Methods | `__tests__/index.spec.ts:140` | `index.vue:start` | ✅ |
| 9 | 卸载时 stop，500ms 后 clear 并置空实例 | Lifecycle | `__tests__/index.spec.ts:159` | `index.vue:onBeforeUnmount` | ✅ |
| 10 | 暴露且仅暴露 `start`、`getCameras` | Methods | `__tests__/index.spec.ts:174` | `index.vue:defineExpose` | ✅ |
| 11 | 基础 Story 与源文档模板一致且无页面错误 | Storybook | `e2e/cw-qrcode-scan-view.spec.ts:9` | `stories/block.stories.js`、`stories/example.stories.js` | ✅ |

## Phase RED 任务组

| 序号 | 任务 | 对应矩阵行 | 测试层 | 状态 |
|:--|:---|:---|:---|:---|
| R1 | 编写组件行为单测并确认 FAIL | #1-#10 | Vitest | [x] |
| R2 | 编写 Storybook E2E 骨架 | #11 | E2E | [x] |

**RED 证据**：2026-08-25 `npm run test` exit 1，9 failed / 9 tests。

## Phase GREEN 任务组

| 序号 | 任务 | 产出文件 | 验收 | 状态 |
|:--|:---|:---|:---|:---|
| G1 | 修正 api.ts | `src/components/cw-qrcode-scan-view/api.ts` | 无 Props、仅 onScan | [x] |
| G2 | 实现 Vue3 组件 | `src/components/cw-qrcode-scan-view/index.vue` | 单测 PASS | [x] |
| G3 | 对齐 Stories | `stories/block.stories.js`、`stories/example.stories.js` | 源模板一致 | [x] |
| G4 | 具名桶导出 | `src/components/index.ts` | `CwQrcodeScanView` | [x] |
| G5 | 迭代至测试全过 | ✅ | `npm run test` exit 0 | [x] |

**GREEN 证据**：2026-08-25 `npm run test` exit 0，1 file passed / 9 tests passed。

## Phase CHECK 执行清单

| 序号 | 验证项 | component |
|:--|:---|:---|
| V1 | 单测门禁 | `npm run test` exit 0 |
| V2 | 构建门禁 | `npm run build` exit 0 |
| V3 | E2E 门禁 | `npm run test:e2e` exit 0 |
| V4 | 行为等价矩阵 | 无 ❌ |
| V5 | 五维审计 | 对齐/API/合规/Storybook/机制差异 |
| V6 | 产物验证 | ZIP 与 viewComponents |
| V7 | 跨资产回归 | 全量 test + e2e |

## 断路器记录

| 触发时间 | 错误模式 | 已尝试方案 | 决策 |
|:--|:---|:---|:---|
| ✅ | — | ✅ | — |

