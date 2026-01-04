#!/usr/bin/env node
/**
 * 设置依赖管理：创建 stubs 和配置 pnpm
 * 这是一个更优雅的方案，使用 pnpm overrides 而不是动态删除依赖
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

// 问题依赖列表（从配置文件或环境变量读取）
const problematicPackages = [
  {
    name: '@oa/iframe-channel',
    stubPath: 'workspaces/legacy-yaml/stubs/oa/iframe-channel'
  },
  {
    name: '@popo-bridge/web',
    stubPath: 'workspaces/legacy-yaml/stubs/popo-bridge-web'
  },
  {
    name: '@popo-bridge/web-vue2',
    stubPath: 'workspaces/legacy-yaml/stubs/popo-bridge-web-vue2'
  },
  {
    name: '@ysf/fetch',
    stubPath: 'workspaces/legacy-yaml/stubs/ysf/fetch'
  }
];

/**
 * 创建 stub 包
 */
function createStub(stubPath, packageName) {
  const fullPath = path.join(repoRoot, stubPath);
  const packageJsonPath = path.join(fullPath, 'package.json');
  const indexJsPath = path.join(fullPath, 'index.js');
  const indexTsPath = path.join(fullPath, 'index.d.ts');

  // 创建目录
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  // 创建 package.json
  const packageJson = {
    name: packageName,
    version: '0.0.0-stub',
    description: `Stub package for ${packageName} (CI build only)`,
    main: 'index.js',
    types: 'index.d.ts',
    private: true
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // 创建 index.js (空实现)
  if (!fs.existsSync(indexJsPath)) {
    fs.writeFileSync(indexJsPath, `// Stub for ${packageName}\nmodule.exports = {};\n`);
  }

  // 创建 index.d.ts (类型定义)
  if (!fs.existsSync(indexTsPath)) {
    fs.writeFileSync(indexTsPath, `// Stub types for ${packageName}\nexport {};\n`);
  }

  console.log(`✅ 已创建 stub: ${stubPath}`);
}

/**
 * 确保所有 stubs 存在
 */
function ensureStubs() {
  problematicPackages.forEach(({ stubPath, name }) => {
    createStub(stubPath, name);
  });
}

/**
 * 配置 .npmrc
 */
function configureNpmrc() {
  const npmrcPath = path.join(repoRoot, '.npmrc');
  const npmrcContent = `registry=https://registry.npmjs.org/
auto-install-peers=true
strict-peer-dependencies=false
`;
  fs.writeFileSync(npmrcPath, npmrcContent);
  console.log('✅ 已配置 .npmrc');
}

/**
 * 主函数
 */
function main() {
  console.log('🔧 开始设置依赖管理...');
  
  // 1. 创建 stubs
  ensureStubs();
  
  // 2. 配置 .npmrc
  configureNpmrc();
  
  console.log('✅ 依赖管理设置完成');
  console.log('💡 提示: pnpm.overrides 已在 package.json 中配置，将自动使用本地 stubs');
}

main();

