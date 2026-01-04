# Legacy Scripts

此目录包含已废弃或不再在 CI 中使用的旧脚本。

## 文件说明

- `changelog.js` - 旧版本的 CHANGELOG 生成脚本，已被 `scripts/ci/generate-changelog.mjs` 替代

## 迁移说明

如果你需要使用这些脚本，请考虑迁移到新的 CI 脚本：

- `changelog.js` → `scripts/ci/generate-changelog.mjs`
