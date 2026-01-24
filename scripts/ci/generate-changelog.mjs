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

const githubServerUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
const githubRepo = process.env.GITHUB_REPOSITORY || '';

// 为每个成功构建的组件生成 CHANGELOG
for (const result of successfulBuilds) {
  try {
    const changelogPath = path.join(result.dir, 'CHANGELOG.md');
    const pkgJsonPath = path.join(result.dir, 'package.json');
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    const version = pkgJson.version || '0.0.0';
    
    // 获取最近的 commit 信息
    let changelogContent = '';
    try {
      const commits = execSync(
        `git log --format='%H|%h|%an|%s' HEAD^..HEAD -- ${result.relDir}`,
        { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024, cwd: repoRoot }
      ).trim().split('\n').filter(Boolean);
      
      if (commits.length > 0) {
        changelogContent = `## ${version}\n\n`;
        changelogContent += `**发布日期**: ${new Date().toISOString().split('T')[0]}\n\n`;
        
        const featCommits = [];
        const fixCommits = [];
        
        commits.forEach(commit => {
          const [hash, shortHash, author, subject] = commit.split('|');
          const isFeat = /feat|feature|新增|添加/i.test(subject);
          const isFix = /fix|修复|bug/i.test(subject);
          
          if (isFeat) featCommits.push({ hash, shortHash, author, subject });
          else if (isFix) fixCommits.push({ hash, shortHash, author, subject });
        });
        
        if (featCommits.length > 0) {
          changelogContent += '### ✨ Features\n\n';
          featCommits.forEach(c => {
            changelogContent += `- [${c.shortHash}](${githubServerUrl}/${githubRepo}/commit/${c.hash}) Thanks [${c.author}]! - ${c.subject}\n`;
          });
          changelogContent += '\n';
        }
        
        if (fixCommits.length > 0) {
          changelogContent += '### 🐛 Bug Fixes\n\n';
          fixCommits.forEach(c => {
            changelogContent += `- [${c.shortHash}](${githubServerUrl}/${githubRepo}/commit/${c.hash}) Thanks [${c.author}]! - ${c.subject}\n`;
          });
          changelogContent += '\n';
        }
        
        if (featCommits.length === 0 && fixCommits.length === 0 && commits.length > 0) {
          changelogContent += '### 📝 Changes\n\n';
          commits.slice(0, 10).forEach(commit => {
            const [hash, shortHash, author, subject] = commit.split('|');
            changelogContent += `- [${shortHash}](${githubServerUrl}/${githubRepo}/commit/${hash}) - ${subject}\n`;
          });
          changelogContent += '\n';
        }
      }
    } catch (err) {
      console.warn(`⚠️ 获取 commit 信息失败 (${result.name}): ${err.message}`);
      changelogContent = `## ${version}\n\n**发布日期**: ${new Date().toISOString().split('T')[0]}\n\n### 📝 Changes\n\n- 本次更新包含代码变更\n\n`;
    }
    
    // 读取现有 CHANGELOG 并合并
    let existingContent = '';
    try {
      existingContent = fs.readFileSync(changelogPath, 'utf8');
      // 如果已有相同版本，跳过
      if (existingContent.includes(`## ${version}`)) {
        console.log(`ℹ️ ${result.name} 的 CHANGELOG 已包含版本 ${version}，跳过`);
        continue;
      }
    } catch (e) {
      // 文件不存在，创建新的
    }
    
    // 合并内容
    const finalContent = changelogContent + (existingContent ? '\n' + existingContent : '');
    fs.writeFileSync(changelogPath, finalContent);
    console.log(`✅ 已生成/更新 ${result.name} 的 CHANGELOG.md`);
  } catch (err) {
    console.warn(`⚠️ 生成 CHANGELOG 失败 (${result.name}): ${err.message}`);
  }
}

// 提交生成的 CHANGELOG 文件（如果存在变更）
try {
  const { setupGitUser } = await import('../utils/git.js');
  
  // 在 CI 环境中设置 git 用户信息
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    setupGitUser();
  }
  
  // 检查是否有 CHANGELOG.md 文件的变更
  const status = execSync('git status --porcelain', {
    encoding: 'utf8',
    cwd: repoRoot,
    stdio: 'pipe'
  });
  
  const changelogFiles = status.split('\n')
    .filter(line => line.trim())
    .map(line => line.trim().split(/\s+/).pop())
    .filter(file => file && file.endsWith('CHANGELOG.md'));
  
  if (changelogFiles.length > 0) {
    // 添加所有 CHANGELOG.md 文件
    execSync(`git add ${changelogFiles.join(' ')}`, {
      encoding: 'utf8',
      cwd: repoRoot,
      stdio: 'pipe'
    });
    
    // 提交（包含 [skip ci] 避免触发 CI/CD）
    const commitMessage = `docs: update CHANGELOG files [skip ci]`;
    execSync(`git commit -m "${commitMessage}"`, {
      encoding: 'utf8',
      cwd: repoRoot,
      stdio: 'pipe'
    });
    
    console.log(`✅ 已提交 ${changelogFiles.length} 个 CHANGELOG.md 文件`);
    
    // 在 CI 环境中自动 push（需要配置 git 权限）
    // 或者在非 CI 环境中，如果设置了 AUTO_PUSH_DOCS 环境变量也 push
    if (process.env.CI || process.env.GITHUB_ACTIONS || process.env.AUTO_PUSH_DOCS === 'true') {
      try {
        execSync('git push', {
          encoding: 'utf8',
          cwd: repoRoot,
          stdio: 'pipe'
        });
        console.log(`✅ 已推送 CHANGELOG 变更`);
      } catch (pushError) {
        console.warn(`⚠️ 推送 CHANGELOG 失败: ${pushError.message}`);
        // 输出更多调试信息
        if (process.env.GITHUB_ACTIONS) {
          console.warn(`   提示: 请确保工作流有 contents: write 权限，并且 checkout 步骤配置了 persist-credentials: true`);
        }
      }
    }
  } else {
    console.log(`ℹ️ 没有 CHANGELOG.md 文件变更，跳过提交`);
  }
} catch (error) {
  // 如果提交失败（例如没有变更或不在 git 仓库中），只记录警告
  const errorMsg = error.message || String(error);
  if (errorMsg.includes('nothing to commit') || 
      errorMsg.includes('not a git repository') ||
      errorMsg.includes('no changes added to commit')) {
    console.log(`ℹ️ 跳过提交 CHANGELOG: ${errorMsg}`);
  } else {
    console.warn(`⚠️ 提交 CHANGELOG 失败: ${errorMsg}`);
  }
}

console.log('✅ CHANGELOG 生成完成');

