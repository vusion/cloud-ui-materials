#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

// 配置 git 用户信息
execSync('git config user.name "github-actions[bot]"', { cwd: repoRoot });
execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', { cwd: repoRoot });

const buildResultsPath = path.join(repoRoot, 'build_results.json');
const buildResults = JSON.parse(fs.readFileSync(buildResultsPath, 'utf8'));
const successfulBuilds = buildResults.filter(r => r.status === 'success');

const tagsToCreate = [];

for (const result of successfulBuilds) {
  try {
    const tagName = `${result.name}@v${result.version}`;
    
    // 检查 tag 是否已存在
    try {
      execSync(`git rev-parse ${tagName}`, { stdio: 'pipe', cwd: repoRoot });
      console.log(`ℹ️ Tag ${tagName} 已存在，跳过`);
      continue;
    } catch (e) {
      // Tag 不存在，可以创建
    }
    
    // 创建 tag
    const changelogPath = path.join(result.dir, 'CHANGELOG.md');
    let tagMessage = `Release ${result.name} version ${result.version}`;
    
    if (fs.existsSync(changelogPath)) {
      const changelog = fs.readFileSync(changelogPath, 'utf8');
      const escapedVersion = result.version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const versionSection = changelog.match(new RegExp(`## ${escapedVersion}[\\s\\S]*?(?=##|$)`));
      if (versionSection) {
        tagMessage = versionSection[0].substring(0, 500);
      }
    }
    
    // 转义引号
    const escapedMessage = tagMessage.replace(/"/g, '\\"');
    execSync(`git tag -a ${tagName} -m "${escapedMessage}"`, { stdio: 'inherit', cwd: repoRoot });
    tagsToCreate.push(tagName);
    console.log(`✅ 已创建 tag: ${tagName}`);
  } catch (err) {
    console.warn(`⚠️ 创建 tag 失败 (${result.name}): ${err.message}`);
  }
}

// 提交 CHANGELOG 更改
try {
  execSync('git add -A', { stdio: 'inherit', cwd: repoRoot });
  const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: repoRoot });
  if (status.trim()) {
    execSync(`git commit -m "chore: update CHANGELOG files for released components"`, { stdio: 'inherit', cwd: repoRoot });
    console.log('✅ 已提交 CHANGELOG 更改');
  }
} catch (err) {
  console.warn(`⚠️ 提交 CHANGELOG 失败: ${err.message}`);
}

// 推送 tags 和 commits
if (tagsToCreate.length > 0) {
  try {
    execSync(`git push origin ${tagsToCreate.join(' ')}`, { stdio: 'inherit', cwd: repoRoot });
    console.log(`✅ 已推送 ${tagsToCreate.length} 个 tags`);
  } catch (err) {
    console.warn(`⚠️ 推送 tags 失败: ${err.message}`);
  }
}

try {
  execSync('git push', { stdio: 'inherit', cwd: repoRoot });
} catch (err) {
  console.warn(`⚠️ 推送 commits 失败: ${err.message}`);
}

console.log('✅ Git tags 创建完成');

