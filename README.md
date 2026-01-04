# Cloud UI Materials

前端依赖库公共仓库，使用 pnpm workspace 和 Turbo 进行管理和构建。

## 📁 项目结构

```
cloud-ui-materials/
├── workspaces/              # 工作区目录
│   ├── legacy-yaml/        # 遗留 YAML 配置的组件
│   ├── ts-vue2/            # TypeScript + Vue 2 组件
│   ├── ts-vue3/            # TypeScript + Vue 3 组件
│   ├── ts-react/           # TypeScript + React 组件
│   └── ts-unknown/         # 其他 TypeScript 组件
├── scripts/                 # 构建和 CI/CD 脚本
│   ├── ci/                 # CI/CD 相关脚本
│   ├── mono/               # Monorepo 管理脚本
│   └── utils/              # 公共工具函数
├── package.json            # 根 package.json
├── pnpm-workspace.yaml     # pnpm workspace 配置
└── turbo.json              # Turbo 构建配置
```

## 🚀 快速开始

### 环境要求

- Node.js: >=18 <=20
- pnpm: >=8 (推荐使用 10.18.3)

### 安装依赖

**重要提示：本项目使用 pnpm workspace，所有依赖尽量在项目根目录统一安装，不要在子组件目录中单独安装依赖。**

```bash
# 在项目根目录执行（推荐方式）
pnpm install

# 安装所有工作区依赖（会自动执行，也可手动执行）
pnpm run install:workspaces
```

#### 为什么推荐在根目录统一安装，即使只是子组件自己的依赖？

虽然技术上可以在子组件中单独安装依赖，但推荐在根目录统一安装，原因如下：

1. **pnpm workspace 的依赖提升机制**

   - pnpm workspace 会将所有子包的依赖提升到根目录的 `node_modules`
   - 即使你在子组件目录中安装，依赖最终也会被提升到根目录
   - 单独安装可能导致依赖结构不一致，影响其他包的依赖解析

2. **lockfile 一致性**

   - 项目使用统一的 `pnpm-lock.yaml` 管理所有依赖版本
   - 在子组件中单独安装可能生成不同的 lockfile 或导致 lockfile 冲突
   - 统一的 lockfile 确保所有开发者使用相同的依赖版本

3. **依赖版本统一管理**

   - 多个子组件可能使用相同的依赖（如 Vue、lodash 等）
   - 在根目录统一安装可以确保版本一致性，避免重复安装
   - 如果不同子组件需要不同版本，可以在根目录的 `package.json` 中使用 `pnpm.overrides` 统一管理

4. **CI/CD 和构建流程**

   - CI 流程在根目录执行 `pnpm install`，如果子组件单独安装，可能导致构建不一致
   - 统一的安装方式确保开发环境和 CI 环境一致

5. **性能和维护性**

   - 统一安装可以更好地利用 pnpm 的缓存机制
   - 更容易排查依赖问题，所有依赖都在根目录统一管理
   - 减少 `node_modules` 的重复，节省磁盘空间

6. **避免常见错误**
   - pnpm store 位置冲突
   - workspace 配置冲突
   - 依赖解析路径错误

#### 正确的依赖管理流程

1. **添加依赖**：在子组件的 `package.json` 中添加依赖声明
2. **统一安装**：在项目根目录运行 `pnpm install`
3. **自动处理**：pnpm 会自动识别所有 workspace 包的依赖并统一安装

#### 示例

```bash
# ✅ 正确：在子组件的 package.json 中添加依赖后，在根目录安装
cd /path/to/cloud-ui-materials
pnpm install

# ❌ 错误：不要在子组件目录中单独安装
cd workspaces/legacy-yaml/packages/lcap/lcap_markdown_doc_render_view
pnpm install  # 这会导致错误
```

#### 单独安装依赖（不推荐）

虽然不推荐，但在某些特殊情况下，如果确实需要在子组件中单独安装依赖，可以使用以下方式：

**方式 1：使用 pnpm filter（推荐，在根目录执行）**

```bash
# 在项目根目录执行，使用 filter 指定包
cd /path/to/cloud-ui-materials
pnpm install --filter lcap_markdown_doc_render_view

# 或者使用包名
pnpm install --filter lcap_markdown_doc_render_view oh-vue-icons
```

**方式 2：在子组件目录中安装（不推荐，可能导致错误）**

```bash
# 进入子组件目录
cd workspaces/legacy-yaml/packages/lcap/lcap_markdown_doc_render_view

# 使用 npm 安装（如果 pnpm 报错，可以尝试 npm）
npm install oh-vue-icons

# 或者使用 pnpm，但需要确保 workspace 配置正确
pnpm install oh-vue-icons --no-workspace-root-check
```

**注意事项：**

- ⚠️ 单独安装可能导致依赖版本冲突
- ⚠️ 可能破坏 workspace 的依赖结构
- ⚠️ 如果遇到 pnpm store 位置冲突，需要先解决 store 配置问题
- ✅ 安装完成后，建议在根目录运行 `pnpm install` 同步依赖

### 开发命令

```bash
# 构建所有包
pnpm run build

# 快速构建（并行）
pnpm run build:fast

# 代码检查
pnpm run lint

# 类型检查
pnpm run typecheck

# 运行测试
pnpm run test
```

## 🌿 分支命名规范

**所有分支必须遵循以下命名格式，否则 CI 将无法正确识别和处理。**

### 标准格式

采用业界主流的 **"前缀 / 任务 ID / 库名-简短描述"** 格式：

```
<前缀>/<任务ID>/<库名>-<简短描述>
```

或简化格式（不带任务 ID）：

```
<前缀>/<库名>-<简短描述>
```

### 格式说明

- **前缀**: 分支类型前缀，常见的有：
  - `feature` / `feat` - 新功能
  - `fix` / `bugfix` - 修复 bug
  - `hotfix` - 紧急修复
  - `refactor` - 重构
  - `docs` - 文档更新
  - `style` - 代码格式调整
  - `test` - 测试相关
  - `chore` - 构建/工具链相关
- **任务 ID** (可选): 任务标识符，支持字母、数字、下划线、连字符
- **库名**: **必填**，组件库名称，用于标识本次修改涉及的组件库
  - 使用下划线命名，如：`cw_countup`、`cw_form`、`cust_swiper`
- **简短描述**: **必填**，清晰描述本次提交的目的和内容
  - 使用连字符分隔多个单词
  - 支持字母、数字、下划线、连字符
  - 建议使用动词开头，如：`add-animation`、`fix-validation`、`update-api`

### 命名原则

1. **必须包含库名**：明确标识修改的组件库
2. **必须包含简短描述**：清晰说明本次提交的目的
3. **描述要简洁明了**：使用常见的动词和名词组合
4. **使用小写字母**：分支名称统一使用小写

### 示例

✅ **正确示例：**

```bash
# 带任务ID的格式
feature/12345/cw_countup-add-animation
fix/67890/cw_form-fix-validation
feat/TASK-123/cust_swiper-update-style
hotfix/99999/cw_countup-fix-critical-bug

# 不带任务ID的简化格式
feature/cw_countup-add-animation
fix/cw_form-fix-validation
feat/cust_swiper-update-style
refactor/cw_countup-optimize-performance
```

❌ **错误示例：**

```bash
feature/cw_countup              # 缺少描述
fix/add-animation               # 缺少库名
feature/12345                    # 缺少库名和描述
cw_countup-add-feature          # 缺少前缀和分隔符
Feature/12345/cw_countup-add    # 前缀应使用小写
feature/12345/cw_countup        # 缺少描述
```

### 分支命名验证

项目中的 CI 脚本会自动验证分支名称，如果不符合规范，构建将失败并提示：

```
Error: invalid branch name. skip the rest!
```

## 📝 代码提交规范

**所有提交信息必须遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。**

### 提交信息格式

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

### 提交类型

目前支持以下提交类型：

- **feat**: 新功能
- **fix**: 修复 bug
- **revert**: 回滚提交

### 范围（Scope）

范围用于指定修改的组件库名称，例如：

- `cw_countup` - 修改了 cw_countup 组件
- `cw_form` - 修改了 cw_form 组件
- `cust_swiper` - 修改了 cust_swiper 组件

### 描述

- 使用中文或英文描述本次提交的内容
- 首字母小写
- 结尾不加句号

### 破坏性变更

如果提交包含破坏性变更，需要在提交信息中添加：

```
BREAKING CHANGE: <描述破坏性变更的内容>
```

### 提交示例

✅ **正确示例：**

```bash
feat(cw_countup): 添加数字动画功能

fix(cw_form): 修复表单验证问题

feat(cust_swiper): 支持自定义样式

BREAKING CHANGE: 移除旧版 API，请使用新 API

fix(cw_countup): 修复数字格式化错误
```

❌ **错误示例：**

```bash
添加新功能                    # 缺少类型和范围
fix: 修复bug                  # 缺少范围
feat(cw_countup)添加功能      # 缺少冒号和空格
feat(cw_countup): 添加功能。  # 结尾不应有句号
```

### 提交信息解析

CI 系统会自动解析提交信息，并根据类型和范围生成：

- CHANGELOG.md
- PR 描述
- Release 说明

## 🔄 工作流程

### 开发流程

1. **创建分支**

   ```bash
   # 带任务ID
   git checkout -b feature/12345/cw_countup-add-animation

   # 不带任务ID（简化格式）
   git checkout -b feature/cw_countup-add-animation
   ```

2. **开发并提交**

   ```bash
   git add .
   git commit -m "feat(cw_countup): 添加数字动画功能"
   ```

3. **推送并创建 PR**

   ```bash
   git push origin feature/12345/cw_countup-add-animation
   ```

4. **CI 自动构建**
   - 检测变更的组件包
   - 构建并打包组件
   - 生成 PR 描述和变更说明

### CI/CD 流程

项目使用 GitHub Actions 进行自动化构建和发布：

- **触发条件**:

  - Push 到 `main` 或 `test-ci-branch` 分支
  - PR 合并
  - 手动触发（workflow_dispatch）

- **构建流程**:

  1. 检测变更的组件包
  2. 并行构建变更的包
  3. 生成构建产物
  4. 生成 CHANGELOG
  5. 创建 Git Tags
  6. 创建 GitHub Release

- **增量构建**:
  - CI 会自动检测变更的组件包，只构建有变更的包
  - 支持手动触发构建所有包或指定单个包

## 📦 组件包结构

每个组件包位于 `workspaces/{工作区}/packages/{分类}/{组件名}/` 目录下。

### 组件分类

- **cw**: 平台通用组件
- **cust**: 客户定制化组件
- **lcap**: 原有扩展组件
- **demo**: 示例组件

### 组件包命名

组件包名称使用下划线命名，例如：

- `cw_countup`
- `cw_form_designer_library`
- `cust_swiper_lib`

## 🛠️ 脚本说明

### CI 脚本 (`scripts/ci/`)

- `plan-changed-packages.mjs` - 检测变更的组件包，生成构建矩阵
- `build-and-package.mjs` - 构建并打包组件
- `generate-changelog.mjs` - 生成 CHANGELOG.md
- `create-tags.mjs` - 创建 Git Tags
- `create-release.js` - 创建或更新 GitHub Release

### Monorepo 脚本 (`scripts/mono/`)

- `install-all-workspaces.mjs` - 安装所有工作区依赖
- `clean-all.mjs` - 清理所有构建产物和依赖

详细说明请参考 [scripts/README.md](./scripts/README.md)

## 📚 相关文档

- **依赖库开发文档**: https://docs.popo.netease.com/lingxi/06477b87702045c4af0b0b71d29debb3
- **依赖库记录文档**: https://docs.popo.netease.com/lingxi/27557b64abc644f7b513573708c8de84
- **依赖库下载中心**: https://docs.popo.netease.com/drive/folder/5965d06c680a448f843951d4992cd8b6

## ⚙️ 技术栈

- **包管理**: pnpm (workspace)
- **构建工具**: Turbo
- **CI/CD**: GitHub Actions
- **Node.js**: >=18 <=20

---

**注意**: 请严格遵守分支命名规范和代码提交规范，否则可能导致 CI 构建失败或无法正确生成变更日志。
