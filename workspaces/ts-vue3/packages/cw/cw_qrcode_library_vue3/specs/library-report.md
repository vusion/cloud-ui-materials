# cw_qrcode_library_vue3 — 库级迁移验证报告

**验证时间**：2026-08-25
**library_status**：🏁 library-verified
**触发方式**：自动（末资产 verified）

---

## 资产统计

| 类型 | 总数 | ✅ verified | 🚫 blocked |
|------|------|-------------|------------|
| component | 1 | 1 | 0 |
| logic | 0 | 0 | 0 |
| shared-composable | 0 | 0 | 0 |

---

## 三门禁证据

| 命令 | 退出码 | 结果摘要 |
|:---|:---|:---|
| `npm run test` | 0 | 1 file passed，9 tests passed |
| `npm run build` | 0 | 构建与打包成功 |
| `npm run test:e2e` | 0 | 2 tests passed |

---

## 产物验证

| # | 检查项 | 结果 | 证据 |
|:---|:---|:---|:---|
| 1 | package.json name/version | PASS | `cw_qrcode_library_vue3@1.0.5` |
| 2 | nasl.extension.json 存在 | PASS | 根目录文件存在 |
| 3 | ZIP 产物存在 | PASS | `cw_qrcode_library_vue3@1.0.5.zip` |
| 4 | viewComponents 全量非空 | PASS | `CwQrcodeScanView` |

---

## 阻塞资产

无。

---

## 总体结论

**PASS**
