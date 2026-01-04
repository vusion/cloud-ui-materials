# Cloud UI Materials

前端依赖库公共仓库，使用 pnpm workspace 和 Turbo 进行管理和构建。

## 📑 目录

- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [如何提交代码](#-如何提交代码) ⭐
  - [分支命名规范](#-分支命名规范)
  - [代码提交规范](#-代码提交规范)
  - [完整开发流程](#-完整开发流程)
- [依赖管理](#-依赖管理)
- [组件包结构](#-组件包结构)
- [CI/CD 流程](#cicd-流程)
- [脚本说明](#️-脚本说明)
- [相关文档](#-相关文档)

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

```bash
# 在项目根目录执行
pnpm install

# 安装所有工作区依赖（会自动执行，也可手动执行）
pnpm run install:workspaces
```

**重要提示**：本项目使用 pnpm workspace，所有依赖应在项目根目录统一安装。详见[依赖管理](#-依赖管理)部分。

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

## 💻 如何提交代码

### 🌿 分支命名规范

**所有分支必须遵循以下命名格式，否则 CI 将无法正确识别和处理。**

#### 标准格式

采用业界主流的 **"前缀 / 任务 ID / 库名-简短描述"** 格式：

```
<前缀>/<任务ID>/<库名>-<简短描述>
```

或简化格式（不带任务 ID）：

```
<前缀>/<库名>-<简短描述>
```

#### 格式说明

- **前缀**: 分支类型前缀
  - `feature` / `feat` - 新功能
  - `fix` / `bugfix` - 修复 bug
  - `hotfix` - 紧急修复
  - `refactor` - 重构
  - `docs` - 文档更新
  - `style` - 代码格式调整
  - `test` - 测试相关
  - `chore` - 构建/工具链相关
- **任务 ID** (可选): 任务标识符，支持字母、数字、下划线、连字符
- **库名**: **必填**，组件库名称（使用下划线命名）
  - 例如：`cw_countup`、`cw_form`、`cust_swiper`
- **简短描述**: **必填**，清晰描述本次提交的目的
  - 使用连字符分隔多个单词
  - 建议使用动词开头，如：`add-animation`、`fix-validation`、`update-api`

#### 示例

✅ **正确示例：**

```bash
# 带任务ID
feature/12345/cw_countup-add-animation
fix/67890/cw_form-fix-validation

# 不带任务ID（简化格式）
feature/cw_countup-add-animation
fix/cw_form-fix-validation
refactor/cw_countup-optimize-performance
```

❌ **错误示例：**

```bash
feature/cw_countup              # 缺少描述
fix/add-animation               # 缺少库名
feature/12345                    # 缺少库名和描述
cw_countup-add-feature          # 缺少前缀和分隔符
```

### 📝 代码提交规范

**所有提交信息必须遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。**

#### 提交信息格式

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

#### 提交类型

- **feat**: 新功能
- **fix**: 修复 bug
- **revert**: 回滚提交

#### 范围（Scope）

范围用于指定修改的组件库名称，例如：

- `cw_countup` - 修改了 cw_countup 组件
- `cw_form` - 修改了 cw_form 组件
- `cust_swiper` - 修改了 cust_swiper 组件

#### 描述要求

- 使用中文或英文描述本次提交的内容
- 首字母小写
- 结尾不加句号

#### 提交示例

✅ **正确示例：**

```bash
feat(cw_countup): 添加数字动画功能
fix(cw_form): 修复表单验证问题
feat(cust_swiper): 支持自定义样式
```

❌ **错误示例：**

```bash
添加新功能                    # 缺少类型和范围
fix: 修复bug                  # 缺少范围
feat(cw_countup)添加功能      # 缺少冒号和空格
feat(cw_countup): 添加功能。  # 结尾不应有句号
```

### 🔄 完整开发流程

#### 步骤 1：创建分支

根据分支命名规范创建分支：

```bash
# 带任务ID
git checkout -b feature/12345/cw_countup-add-animation

# 不带任务ID（简化格式）
git checkout -b fix/cw_form-fix-validation
```

#### 步骤 2：开发代码

进行代码开发，修改相关文件。

#### 步骤 3：提交代码

使用符合规范的提交信息：

```bash
# 添加修改的文件
git add .

# 提交（使用符合规范的提交信息）
git commit -m "feat(cw_countup): 添加数字动画功能"

# 如果有多个相关修改，可以分多次提交
git commit -m "fix(cw_countup): 修复数字格式化错误"
```

#### 步骤 4：推送并创建 PR

```bash
# 推送分支到远程
git push origin feature/12345/cw_countup-add-animation

# 然后在 GitHub 上创建 Pull Request
```

#### 步骤 5：CI 自动构建

创建 PR 后，CI 会自动：

- 检测变更的组件包
- 构建并打包组件
- 生成 PR 描述和变更说明

### ⚠️ 常见问题

**Q: 分支名称不符合规范怎么办？**

A: CI 会验证分支名称，如果不符合规范会报错：`Error: invalid branch name. skip the rest!`。请按照规范重新创建分支。

**Q: 提交信息格式错误怎么办？**

A: 可以使用 `git commit --amend` 修改最后一次提交信息：

```bash
git commit --amend -m "fix(cw_countup): 修复数字格式化错误"
```

**Q: 如何查看分支命名是否规范？**

A: 分支名称必须包含：`<前缀>/<库名>-<简短描述>` 或 `<前缀>/<任务ID>/<库名>-<简短描述>`

## 📦 依赖管理

### 推荐方式：在根目录统一安装

**所有依赖应在项目根目录统一安装，不要在子组件目录中单独安装。**

#### 正确的依赖管理流程

1. **添加依赖**：在子组件的 `package.json` 中添加依赖声明
2. **统一安装**：在项目根目录运行 `pnpm install`
3. **自动处理**：pnpm 会自动识别所有 workspace 包的依赖并统一安装

#### 为什么推荐在根目录统一安装？

1. **pnpm workspace 机制**：依赖会被提升到根目录的 `node_modules`，单独安装会破坏依赖结构
2. **lockfile 一致性**：统一的 `pnpm-lock.yaml` 确保所有开发者使用相同的依赖版本
3. **CI/CD 一致性**：CI 流程在根目录执行 `pnpm install`，统一安装确保开发环境和 CI 环境一致
4. **避免错误**：单独安装可能导致 pnpm store 位置冲突、workspace 配置冲突等问题

#### 示例

```bash
# ✅ 正确：在子组件的 package.json 中添加依赖后，在根目录安装
cd /path/to/cloud-ui-materials
pnpm install

# ❌ 错误：不要在子组件目录中单独安装
cd workspaces/legacy-yaml/packages/lcap/lcap_markdown_doc_render_view
pnpm install  # 这会导致错误
```

### 单独安装依赖

如果确实需要在子组件中单独安装依赖，可以使用以下方式：

**方式 1：使用 pnpm filter（推荐，在根目录执行）**

```bash
# 在项目根目录执行
cd /path/to/cloud-ui-materials
pnpm install --filter lcap_markdown_doc_render_view oh-vue-icons
```

**方式 2：在子组件目录中安装（不推荐，可能导致错误）**

```bash
# 进入子组件目录
cd workspaces/legacy-yaml/packages/lcap/lcap_markdown_doc_render_view

# 使用 npm 安装（如果 pnpm 报错，可以尝试 npm）
npm install oh-vue-icons

# 或者使用 pnpm
pnpm install oh-vue-icons --no-workspace-root-check
```

**注意事项：**

- ⚠️ 单独安装可能导致依赖版本冲突
- ⚠️ 可能破坏 workspace 的依赖结构
- ✅ 安装完成后，建议在根目录运行 `pnpm install` 同步依赖

## 📦 组件包结构

每个组件包位于 `workspaces/{工作区}/packages/{分类}/{组件名}/` 目录下。

### 组件分类

- **cw**: 平台通用前端依赖库
- **cust**: 客户定制化前端依赖库
- **lcap**: 原有前端依赖库

### 组件包命名

组件包名称使用下划线命名，例如：

- `cw_countup`
- `cw_form_designer_library`
- `cust_swiper_lib`

## 🔄 CI/CD 流程

项目使用 GitHub Actions 进行自动化构建和发布：

### 触发条件

- PR 合并到 main 分支

### 构建流程

1. 检测变更的组件包
2. 并行构建变更的包
3. 生成构建产物
4. 生成 CHANGELOG
5. 创建 Git Tags
6. 创建 GitHub Release

### 增量构建

- CI 会自动检测变更的组件包，只构建有变更的包
- 支持手动触发构建所有包或指定单个包

## 🛠️ 脚本说明

### CI 脚本 (`scripts/ci/`)

- `plan-changed-packages.mjs` - 检测变更的前端依赖库包，生成构建矩阵
- `build-and-package.mjs` - 构建并打包组件
- `generate-changelog.mjs` - 生成 CHANGELOG.md
- `create-tags.mjs` - 创建 Git Tags
- `create-release.js` - 创建或更新 GitHub Release

### Monorepo 脚本 (`scripts/mono/`)

- `install-all-workspaces.mjs` - 安装所有工作区依赖
- `clean-all.mjs` - 清理所有构建产物和依赖

详细说明请参考 [scripts/README.md](./scripts/README.md)

## 📚 相关文档

- **依赖库开发文档**: https://community.codewave.163.com/CommunityParent/fileIndex?filePath=40.%E6%89%A9%E5%B1%95%E4%B8%8E%E9%9B%86%E6%88%90%2F10.%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%96%B9%E5%BC%8F%2F20.%E5%89%8D%E7%AB%AF%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%2F10.%E5%89%8D%E7%AB%AF%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%A6%82%E8%BF%B0.md&version=4.3&selectType=codewave
- **依赖库资产市场**: https://community.codewave.163.com/CommunityParent/CodeWaveMarket?navia=&currentType=%E6%90%9C%E6%A8%A1%E6%9D%BF&userId=&tenantPhone=&templateIdFormSaas=0&tenantName=&tId=&token=&platformUserId=

## ⚙️ 技术栈

- **包管理**: pnpm (workspace)
- **构建工具**: Turbo
- **CI/CD**: GitHub Actions
- **Node.js**: >=18 <=20

---

**注意**: 请严格遵守分支命名规范和代码提交规范，否则可能导致 CI 构建失败或无法正确生成变更日志。
