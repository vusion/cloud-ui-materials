#!/usr/bin/env node
/**
 * 配置 Turbo 以优化增量构建
 * 使用 Turbo 的远程缓存和过滤功能
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

/**
 * 读取或创建 turbo.json 配置
 */
function configureTurbo() {
  const turboJsonPath = path.join(repoRoot, 'turbo.json');
  let turboConfig = {};

  if (fs.existsSync(turboJsonPath)) {
    turboConfig = JSON.parse(fs.readFileSync(turboJsonPath, 'utf8'));
  }

  // 确保 tasks.build 配置存在
  if (!turboConfig.tasks) {
    turboConfig.tasks = {};
  }

  if (!turboConfig.tasks.build) {
    turboConfig.tasks.build = {};
  }

  // 优化构建配置
  const buildConfig = {
    dependsOn: ['^build'],
    outputs: ['dist/**', 'dist-theme/**', 'lib/**', 'es/**', 'esm/**', 'types/**'],
    cache: true,
    env: ['NODE_ENV', 'VITE_*', 'ROLLUP_*', 'CI'],
    // 使用远程缓存（如果配置了 TURBO_TOKEN）
    ...(process.env.TURBO_TOKEN && {
      cache: true
    })
  };

  turboConfig.tasks.build = {
    ...turboConfig.tasks.build,
    ...buildConfig
  };

  // 添加全局环境变量
  if (!turboConfig.globalEnv) {
    turboConfig.globalEnv = [];
  }
  
  if (!turboConfig.globalEnv.includes('CI')) {
    turboConfig.globalEnv.push('CI');
  }
  if (!turboConfig.globalEnv.includes('PNPM_HOME')) {
    turboConfig.globalEnv.push('PNPM_HOME');
  }

  // 添加 $schema
  turboConfig.$schema = turboConfig.$schema || 'https://turbo.build/schema.json';

  fs.writeFileSync(turboJsonPath, JSON.stringify(turboConfig, null, 2));
  console.log('✅ 已优化 turbo.json 配置');
}

/**
 * 主函数
 */
function main() {
  console.log('⚡ 开始配置 Turbo...');
  configureTurbo();
  console.log('✅ Turbo 配置完成');
}

main();

