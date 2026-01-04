#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

const buildResultsPath = path.join(repoRoot, 'build_results.json');
const buildResults = JSON.parse(fs.readFileSync(buildResultsPath, 'utf8'));
const successfulBuilds = buildResults.filter(r => r.status === 'success');

let diffDescription = '## 📝 本次变更说明\n\n';

for (const result of successfulBuilds) {
  try {
    // 生成 diff 描述
    const diff = execSync(
      `git diff HEAD^ HEAD -- ${result.relDir}`,
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
    );
    
    if (diff.trim()) {
      // 分析变更类型
      const hasFeat = /feat|feature|新增|添加/i.test(diff);
      const hasFix = /fix|修复|bug/i.test(diff);
      const changeType = hasFeat ? '✨ 功能更新' : hasFix ? '🐛 问题修复' : '📝 代码变更';
      
      diffDescription += `### ${result.name}@v${result.version} (${changeType})\n`;
      diffDescription += `- 组件路径: ${result.relDir}\n`;
      diffDescription += `- 变更类型: ${changeType}\n`;
      
      // 提取核心变更点（简化版）
      const lines = diff.split('\n').slice(0, 50);
      const keyChanges = lines
        .filter(l => l.startsWith('+') && !l.startsWith('+++'))
        .slice(0, 5)
        .map(l => l.substring(1).trim())
        .filter(l => l && l.length < 100);
      
      if (keyChanges.length > 0) {
        diffDescription += `- 核心变更点:\n`;
        keyChanges.forEach(change => {
          diffDescription += `  - ${change.substring(0, 80)}...\n`;
        });
      }
      diffDescription += '\n';
    }
    
    // 调用 AI 更新文档（如果配置了密钥）
    if (process.env.COREAGENT_AK && process.env.COREAGENT_SK) {
      try {
        const apiPath = path.join(result.dir, result.relDir.includes('legacy-yaml') ? 'components' : 'src/components');
        let apiContent = '';
        try {
          const apiFiles = fs.readdirSync(apiPath, { recursive: true });
          const apiFile = apiFiles.find(f => f.endsWith('api.ts') || f.endsWith('api.yaml'));
          if (apiFile) {
            apiContent = fs.readFileSync(path.join(apiPath, apiFile), 'utf8');
          }
        } catch (e) {
          // 忽略错误
        }
        
        const readmePath = path.join(result.dir, 'README.md');
        const isFirstTime = !fs.existsSync(readmePath);
        const stack = result.relDir.includes('legacy-yaml') ? 'Vue2 (YAML)' : 
                     result.relDir.includes('ts-vue2') ? 'Vue2 (TypeScript)' : 'Unknown';
        
        const aiContext = JSON.stringify({
          isFirstTime,
          stack,
          apiContent: apiContent.substring(0, 5000)
        });
        
        execSync(
          `node scripts/ci/call-coreagent.mjs --dir ${result.dir} --context '${aiContext}'`,
          { stdio: 'inherit', env: process.env, cwd: repoRoot }
        );
      } catch (aiError) {
        console.warn(`⚠️ AI 文档更新失败 (${result.name}): ${aiError.message}`);
      }
    } else {
      console.log(`ℹ️ 跳过 AI 文档更新 (${result.name}): 未配置 COREAGENT_AK/SK`);
    }
  } catch (err) {
    console.warn(`⚠️ 处理 ${result.name} 的 diff 时出错: ${err.message}`);
  }
}

fs.writeFileSync(path.join(repoRoot, 'diff_description.txt'), diffDescription);
console.log('✅ Diff 描述已生成');

