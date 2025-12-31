# Scripts 目录说明

本目录包含项目构建、CI/CD 和 Monorepo 管理相关的脚本。

## 目录结构

```
scripts/
├── ci/              # CI/CD 相关脚本（GitHub Actions 使用）
├── mono/            # Monorepo 管理脚本
├── utils/           # 公共工具函数
└── legacy/          # 已废弃的旧脚本
```

## CI 脚本 (`scripts/ci/`)

这些脚本在 GitHub Actions 工作流中使用：

- **plan-changed-packages.mjs** - 检测变更的组件包，生成构建矩阵
- **setup-dependencies.mjs** - 设置依赖（Stubs & Config）
- **configure-turbo.mjs** - 配置 Turbo 缓存
- **build-and-package.mjs** - 构建并打包组件
- **generate-pr-body.mjs** - 生成 PR 描述（用于 `pr-description.yml`）
- **generate-diff-docs.mjs** - 生成差异说明和更新文档
- **generate-changelog.mjs** - 生成 CHANGELOG.md
- **create-tags.mjs** - 创建 Git Tags
- **create-release.js** - 创建或更新 GitHub Release
- **call-coreagent.mjs** - 调用 AI 代理更新文档

## Monorepo 脚本 (`scripts/mono/`)

- **install-all-workspaces.mjs** - 安装所有工作区依赖（在 `package.json` 的 `postinstall` 中使用）
- **clean-all.mjs** - 清理所有构建产物和依赖
- **migrate-components.mjs** - 组件迁移工具

## 工具函数 (`scripts/utils/`)

- **git.js** - Git 操作工具（ESM）
- **fs.js** - 文件系统操作工具（ESM）
- **execCommand.js** - 命令执行工具（CommonJS，用于旧脚本）
- 其他工具函数（CommonJS，用于 legacy 脚本）

## 使用说明

### CI 脚本

CI 脚本由 GitHub Actions 自动调用，通常不需要手动执行。

### Monorepo 脚本

```bash
# 安装所有工作区依赖
pnpm run install:workspaces

# 清理所有构建产物
node scripts/mono/clean-all.mjs

# 预览清理（不实际删除）
node scripts/mono/clean-all.mjs --dry
```

## 代码风格

- **CI 脚本**: 使用 ESM (`.mjs` 或 `import/export`)
- **旧脚本**: 使用 CommonJS (`require/module.exports`)
- **新工具函数**: 使用 ESM

## 迁移指南

如果发现使用旧脚本的地方，请迁移到新的 CI 脚本：

- `changelog.js` → `scripts/ci/generate-changelog.mjs`

