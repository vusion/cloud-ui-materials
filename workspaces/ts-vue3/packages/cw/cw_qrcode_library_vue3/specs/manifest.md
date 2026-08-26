# cw_qrcode_library_vue3 迁移清单

**源码库**：`D:\wb.jiwenpeng01\Desktop\netEase\cloudUI\cloud-ui-materials\workspaces\legacy-yaml\packages\cw\cw_qrcode_library`
**目标工程**：`D:\wb.jiwenpeng01\Desktop\netEase\cloudUI\cloud-ui-materials\workspaces\cw_qrcode_library_vue3`
**最后更新**：2026-08-25

---

## 迁移进度

总资产: 1 | ✅ 完成: 1 | 🔨 进行中: 0 | ⏳ 待开始: 0 | 🚫 阻塞: 0
进度: [██████████] 1/1 (100%)

---

## 库级状态

| 字段 | 值 |
|------|-----|
| library_status | 🏁 library-verified |
| library_verified_at | 2026-08-25 |
| 末次库级三门禁 | test=0 / build=0 / e2e=0 |

---

## 资产状态表

| # | 资产名 | 类型 | 复杂度 | 推荐序号 | depends_on | 状态 | Stories 来源 | Mixin 依赖 |
|:--|:---|:---|:---|:---|:---|:---|:---|:---|
| 01 | cw_qrcode_scan_view | component | MEDIUM | 1 | — | ✅ verified | `components/cw-qrcode-scan-view/docs/blocks.md`、`docs/examples.md` | — |

---

## 状态流转

| 状态 | 含义 | 由哪个命令设置 |
|:---|:---|:---|
| ⏳ pending | 已识别，未开始 | migrate.scan |
| 🔍 spec-done | 行为真值已提取 | migrate.spec |
| 🔄 planned | 迁移方案已制定 | migrate.plan |
| 📋 tasks-ready | TDD 编排已完成 | migrate.tasks |
| 🔴 red-done | 测试已编码（全 FAIL） | migrate.red |
| 🟢 green-done | 实现完成（测试全 PASS） | migrate.green |
| ✅ verified | 等价性验证通过 | migrate.check |
| 🚫 blocked | 阻塞（需用户介入） | 断路器触发 |

---

## 推荐迁移顺序

1. cw_qrcode_scan_view（component，推荐序号 1）

---

## 共享依赖

### Mixin 全量清单

无。

### 第三方依赖

| 库名 | 版本 | 引用组件 |
|:---|:---|:---|
| html5-qrcode | ^2.3.8 | cw_qrcode_scan_view |

---

## 更新规则

- 仅改本表对应行的状态列
- 状态变更由各 migrate 命令自动驱动
- 禁止手动跳跃状态




