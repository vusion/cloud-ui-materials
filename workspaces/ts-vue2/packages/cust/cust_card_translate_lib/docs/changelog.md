# cust_card_translate_lib 更新日志

## 1.0.2

### Bug 修复

- 修复卡片悬停无响应的问题。原实现依赖 `mounted` 后手动 `querySelectorAll` 绑定 `mouseover`，存在挂载时机、DOM 复用、全局选择器串扰等失效风险；改为 Vue 响应式绑定（`activeIndex` + `:class` + `@mouseover`），不再操作 DOM。
- 顺带修复 `list` 变化时重复绑定监听器导致的泄漏问题（响应式绑定后该问题不复存在）。

## 1.0.1

### Bug 修复

- 修复 `init()` 仅在 `list` 变化时调用、父组件初始传入数据时监听器未绑定的问题，改为挂载时初始化。
- 修复 `init()` 使用全局 `document.querySelector` 的问题，改为限定在组件自身 `$el` 内查询，避免同页面多实例互相干扰。
- 修复 `.gitignore` 为 CRLF 行尾导致构建产物 `source.zip` 忽略规则失效、误打包 `node_modules`（71MB）并触发 `EMFILE` 构建失败的问题。

## 1.0.0

这是初始版本，包含上述组件和逻辑，基于当前代码状态生成，无历史变更记录。