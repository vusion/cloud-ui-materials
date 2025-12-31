#!/usr/bin/env node
/**
 * 生成 PR Body 内容
 * 基于 commits 和变更的组件生成详细的变更说明
 */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

// 从环境变量获取 PR 信息
// 在 PR 事件中，使用 PR 的 base 和 head
// 在 push 事件中，使用 before 和 after
let baseSha, headSha;

if (process.env.GITHUB_BASE_SHA && process.env.GITHUB_HEAD_SHA) {
  // PR 事件
  baseSha = process.env.GITHUB_BASE_SHA;
  headSha = process.env.GITHUB_HEAD_SHA;
} else if (process.env.GITHUB_EVENT_PATH) {
  // 尝试从 event.json 读取
  try {
    const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    if (eventData.pull_request) {
      baseSha = eventData.pull_request.base.sha;
      headSha = eventData.pull_request.head.sha;
    } else if (eventData.before && eventData.after) {
      baseSha = eventData.before;
      headSha = eventData.after;
    }
  } catch (e) {
    console.warn(`⚠️ 无法读取 event.json: ${e.message}`);
  }
}

// 默认值
if (!baseSha || !headSha) {
  baseSha = process.env.GITHUB_BASE_REF || 'HEAD^';
  headSha = process.env.GITHUB_HEAD_REF || process.env.GITHUB_SHA || 'HEAD';
}

console.log(`📝 生成 PR Body (${baseSha}...${headSha})`);

// 1. 收集 commits 信息
function collectCommits() {
  try {
    const range = `${baseSha}...${headSha}`;
    const commitsRaw = execSync(
      `git log --format='%H|%h|%an|%ae|%s|%b' ${range}`,
      { encoding: 'utf8', cwd: repoRoot, maxBuffer: 10 * 1024 * 1024 }
    );
    
    const commits = commitsRaw
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [hash, shortHash, author, email, subject, ...bodyParts] = line.split('|');
        const body = bodyParts.join('|');
        return { hash, shortHash, author, email, subject, body };
      });
    
    console.log(`✅ 收集到 ${commits.length} 个 commits`);
    return commits;
  } catch (err) {
    console.warn(`⚠️ 收集 commits 失败: ${err.message}`);
    return [];
  }
}

// 2. 检测变更的组件包
function detectChangedPackages() {
  try {
    const range = `${baseSha}...${headSha}`;
    const changedFiles = execSync(
      `git diff --name-only ${range}`,
      { encoding: 'utf8', cwd: repoRoot }
    ).split('\n').filter(Boolean);
    
    const packages = new Map();
    
    // 查找所有组件包
    const workspacesRoot = path.join(repoRoot, 'workspaces');
    if (!fs.existsSync(workspacesRoot)) {
      return packages;
    }
    
    function findComponentPackages(dir, result = []) {
      if (!fs.existsSync(dir)) return result;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const hasApiYaml = entries.find(e => e.isFile() && (e.name === 'api.yaml' || e.name === 'api.yml'));
      const hasApiTs = entries.find(e => e.isFile() && e.name === 'api.ts');
      
      if (hasApiYaml || hasApiTs) {
        let currentDir = dir;
        let pkg = null;
        while (currentDir.startsWith(workspacesRoot)) {
          const pjPath = path.join(currentDir, 'package.json');
          if (fs.existsSync(pjPath)) {
            pkg = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
            break;
          }
          currentDir = path.dirname(currentDir);
        }
        if (pkg && pkg.name) {
          result.push({
            dir: currentDir,
            relDir: path.relative(repoRoot, currentDir),
            name: pkg.name,
            version: pkg.version
          });
          return result;
        }
      }
      for (const ent of entries) {
        if (ent.isDirectory() && !['node_modules', 'dist', '.git'].includes(ent.name)) {
          findComponentPackages(path.join(dir, ent.name), result);
        }
      }
      return result;
    }
    
    const allPackages = findComponentPackages(workspacesRoot);
    
    // 匹配变更的文件到组件包
    for (const file of changedFiles) {
      for (const pkg of allPackages) {
        if (file.startsWith(pkg.relDir)) {
          if (!packages.has(pkg.name)) {
            packages.set(pkg.name, {
              ...pkg,
              changedFiles: []
            });
          }
          packages.get(pkg.name).changedFiles.push(file);
        }
      }
    }
    
    console.log(`✅ 检测到 ${packages.size} 个变更的组件包`);
    return packages;
  } catch (err) {
    console.warn(`⚠️ 检测变更包失败: ${err.message}`);
    return new Map();
  }
}

// 3. 解析 commit 信息，提取变更类型和组件
function parseCommits(commits) {
  const titleReg = /^(\S+?)(?:\((\S+)\))?\s*[:：]\s*(.*)/;
  const result = {
    packages: new Map(),
    types: new Set(),
    breakingChanges: []
  };
  
  for (const commit of commits) {
    const match = commit.subject.match(titleReg);
    if (match) {
      const [, type, scope, subject] = match;
      const normalizedType = type.toLowerCase();
      
      result.types.add(normalizedType);
      
      if (scope) {
        // 尝试匹配包名
        const pkgName = scope.replace(/^@[^/]+\//, '').replace(/-/g, '_');
        if (!result.packages.has(pkgName)) {
          result.packages.set(pkgName, {
            name: pkgName,
            commits: [],
            types: new Set()
          });
        }
        const pkg = result.packages.get(pkgName);
        pkg.commits.push({
          hash: commit.shortHash,
          subject,
          type: normalizedType,
          author: commit.author
        });
        pkg.types.add(normalizedType);
      }
    }
    
    // 检查 BREAKING CHANGE
    if (commit.body && /BREAKING CHANGE/i.test(commit.body)) {
      result.breakingChanges.push({
        hash: commit.shortHash,
        subject: commit.subject,
        body: commit.body
      });
    }
  }
  
  return result;
}

// 4. 生成 PR Body
function generatePRBody(commits, changedPackages, parsedCommits) {
  let body = '## 📋 变更概览\n\n';
  
  // 统计信息
  const totalCommits = commits.length;
  const totalPackages = changedPackages.size;
  const types = Array.from(parsedCommits.types);
  
  body += `- **提交数量**: ${totalCommits} 个\n`;
  body += `- **涉及组件**: ${totalPackages} 个\n`;
  if (types.length > 0) {
    body += `- **变更类型**: ${types.join(', ')}\n`;
  }
  body += '\n';
  
  // 变更的组件详情
  if (changedPackages.size > 0) {
    body += '## 📦 变更的组件\n\n';
    
    for (const [pkgName, pkg] of changedPackages) {
      body += `### ${pkg.name}@v${pkg.version}\n\n`;
      body += `- **路径**: \`${pkg.relDir}\`\n`;
      
      // 关联的 commits
      const relatedCommits = parsedCommits.packages.get(pkgName);
      if (relatedCommits && relatedCommits.commits.length > 0) {
        body += `- **相关提交**:\n`;
        for (const commit of relatedCommits.commits) {
          const typeEmoji = commit.type === 'feat' ? '✨' : 
                           commit.type === 'fix' ? '🐛' : 
                           commit.type === 'refactor' ? '♻️' : '📝';
          body += `  - ${typeEmoji} [${commit.hash}](${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/commit/${commit.hash}) ${commit.subject}\n`;
        }
      }
      
      // 变更的文件
      if (pkg.changedFiles && pkg.changedFiles.length > 0) {
        body += `- **变更文件** (${pkg.changedFiles.length} 个):\n`;
        const fileList = pkg.changedFiles.slice(0, 10).map(f => `  - \`${f}\``).join('\n');
        body += fileList;
        if (pkg.changedFiles.length > 10) {
          body += `\n  - ... 还有 ${pkg.changedFiles.length - 10} 个文件`;
        }
        body += '\n';
      }
      
      body += '\n';
    }
  }
  
  // 所有 commits 列表
  if (commits.length > 0) {
    body += '## 📝 提交记录\n\n';
    for (const commit of commits.slice(0, 20)) {
      const match = commit.subject.match(/^(\S+?)(?:\((\S+)\))?\s*[:：]\s*(.*)/);
      if (match) {
        const [, type, scope, subject] = match;
        const typeEmoji = type.toLowerCase() === 'feat' ? '✨' : 
                         type.toLowerCase() === 'fix' ? '🐛' : 
                         type.toLowerCase() === 'refactor' ? '♻️' : '📝';
        body += `- ${typeEmoji} [${commit.shortHash}](${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/commit/${commit.hash}) ${subject} (@${commit.author})\n`;
      } else {
        body += `- 📝 [${commit.shortHash}](${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/commit/${commit.hash}) ${commit.subject} (@${commit.author})\n`;
      }
    }
    if (commits.length > 20) {
      body += `\n... 还有 ${commits.length - 20} 个提交\n`;
    }
    body += '\n';
  }
  
  // Breaking Changes
  if (parsedCommits.breakingChanges.length > 0) {
    body += '## ⚠️ Breaking Changes\n\n';
    for (const bc of parsedCommits.breakingChanges) {
      body += `### [${bc.hash}] ${bc.subject}\n\n`;
      body += `${bc.body}\n\n`;
    }
  }
  
  body += '---\n\n';
  body += '*此 PR 描述由 CI 自动生成*\n';
  
  return body;
}

// 主函数
async function main() {
  const commits = collectCommits();
  const changedPackages = detectChangedPackages();
  const parsedCommits = parseCommits(commits);
  
  const prBody = generatePRBody(commits, changedPackages, parsedCommits);
  
  // 保存到文件
  const outputPath = path.join(repoRoot, 'pr_body.txt');
  fs.writeFileSync(outputPath, prBody);
  console.log(`✅ PR Body 已生成: ${outputPath}`);
  
  // 输出到 stdout（供 GitHub Actions 使用）
  console.log('\n--- PR Body ---');
  console.log(prBody);
  console.log('--- End PR Body ---\n');
}

main().catch(err => {
  console.error('❌ 生成 PR Body 失败:', err);
  process.exit(1);
});

