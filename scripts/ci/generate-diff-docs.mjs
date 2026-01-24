#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

// 检测 workspaces 下所有有变更的包（不依赖构建结果）
const workspacesRoot = path.join(repoRoot, 'workspaces');
const changedPackages = new Set();

if (!fs.existsSync(workspacesRoot)) {
  console.error(`❌ workspaces 目录不存在: ${workspacesRoot}`);
  process.exit(1);
}

console.log('🔍 检测 workspaces 下的所有变更...');

try {
  // 获取所有变更的文件（包括未暂存、已暂存、最近提交）
  const allChangedFiles = new Set();
  
  // 1. 未暂存的变更（工作区修改）
  try {
    const unstagedFiles = execSync(
      'git diff --name-only -- workspaces/',
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
    ).trim().split('\n').filter(Boolean);
    unstagedFiles.forEach(f => allChangedFiles.add(f));
  } catch (e) {
    // 忽略错误
  }
  
  // 2. 已暂存但未提交的变更
  try {
    const stagedFiles = execSync(
      'git diff --cached --name-only -- workspaces/',
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
    ).trim().split('\n').filter(Boolean);
    stagedFiles.forEach(f => allChangedFiles.add(f));
  } catch (e) {
    // 忽略错误
  }
  
  // 3. 最近一次提交的变更（如果存在）
  try {
    const commitCount = execSync(
      'git rev-list --count HEAD',
      { encoding: 'utf8', cwd: repoRoot }
    ).trim();
    
    if (parseInt(commitCount) > 0) {
      const lastCommitFiles = execSync(
        'git diff --name-only HEAD~1 HEAD -- workspaces/',
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
      ).trim().split('\n').filter(Boolean);
      lastCommitFiles.forEach(f => allChangedFiles.add(f));
    }
  } catch (e) {
    // 忽略错误（可能是第一个提交）
  }
  
  // 从变更文件路径中提取包路径
  for (const file of allChangedFiles) {
    if (file.startsWith('workspaces/')) {
      const parts = file.split(path.sep);
      const workspaceIndex = parts.findIndex(p => p === 'workspaces');
      const packagesIndex = parts.findIndex(p => p === 'packages');
      
      if (workspaceIndex !== -1 && packagesIndex !== -1 && packagesIndex > workspaceIndex) {
        // 提取到包目录：workspaces/{workspace}/packages/{category}/{package}
        const packagePath = parts.slice(0, packagesIndex + 3).join(path.sep);
        if (fs.existsSync(path.join(repoRoot, packagePath, 'package.json'))) {
          changedPackages.add(packagePath);
        }
      }
    }
  }
  
  console.log(`✅ 检测到 ${changedPackages.size} 个有变更的包`);
} catch (e) {
  console.error(`❌ 检测变更包时出错: ${e.message}`);
  process.exit(1);
}

// 构建包信息列表
const packagesToProcess = [];

for (const packagePath of changedPackages) {
  try {
    const pkgJsonPath = path.join(repoRoot, packagePath, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      packagesToProcess.push({
        name: pkgJson.name || path.basename(packagePath),
        version: pkgJson.version || '0.0.0',
        dir: path.join(repoRoot, packagePath),
        relDir: packagePath
      });
    }
  } catch (e) {
    console.warn(`⚠️ 读取包信息失败 (${packagePath}): ${e.message}`);
  }
}

if (packagesToProcess.length === 0) {
  console.log('ℹ️  没有检测到变更的包，跳过生成 diff 描述');
  process.exit(0);
}

console.log(`📋 将处理 ${packagesToProcess.length} 个包`);

/**
 * 从 relDir 解析路径结构
 * @param {string} relDir - 相对路径，如 "workspaces/ts-vue2/packages/cw/cw_cut_printview"
 * @returns {Object} { workspace, category, package }
 */
function parsePathStructure(relDir) {
  const parts = relDir.split(path.sep).filter(Boolean);
  const workspaceIndex = parts.findIndex(p => p === 'workspaces');
  
  if (workspaceIndex === -1) {
    return { workspace: null, category: null, package: null };
  }
  
  const workspace = parts[workspaceIndex + 1] || null;
  const packagesIndex = parts.findIndex(p => p === 'packages');
  
  if (packagesIndex === -1) {
    return { workspace, category: null, package: null };
  }
  
  const category = parts[packagesIndex + 1] || null;
  const packageName = parts[packagesIndex + 2] || null;
  
  return { workspace, category, package: packageName };
}

/**
 * 从目录结构或 diff 文件路径检测组件名
 * @param {string} pkgDir - 包目录绝对路径
 * @param {string} relDir - 相对路径
 * @param {string} diff - git diff 内容
 * @returns {string} 组件名，如果找不到则返回 "Root/Package"
 */
function detectComponent(pkgDir, relDir, diff) {
  // 尝试从目录结构查找组件
  const componentsDirs = [
    path.join(pkgDir, 'src', 'components'),
    path.join(pkgDir, 'components')
  ];
  
  for (const componentsDir of componentsDirs) {
    if (fs.existsSync(componentsDir)) {
      try {
        const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
        const componentDirs = entries
          .filter(e => e.isDirectory())
          .map(e => e.name);
        
        // 从 diff 中提取变更的文件路径
        const changedFiles = extractChangedFiles(diff);
        
        // 查找匹配的组件目录
        for (const file of changedFiles) {
          for (const compDir of componentDirs) {
            if (file.includes(compDir) || file.includes(compDir.replace(/-/g, '_'))) {
              return compDir;
            }
          }
        }
      } catch (e) {
        // 忽略错误，继续尝试
      }
    }
  }
  
  // 如果只变更了 package.json，返回 "Root/Package"
  const changedFiles = extractChangedFiles(diff);
  const onlyPackageJson = changedFiles.length === 1 && 
    (changedFiles[0].endsWith('package.json') || changedFiles[0].includes('package.json'));
  
  if (onlyPackageJson) {
    return 'Root/Package';
  }
  
  // 默认返回包名
  return path.basename(pkgDir);
}

/**
 * 从 diff 中提取变更的文件列表
 * @param {string} diff - git diff 内容
 * @returns {string[]} 变更的文件路径列表
 */
function extractChangedFiles(diff) {
  const files = new Set();
  const lines = diff.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('diff --git')) {
      // diff --git a/path/to/file b/path/to/file
      const match = line.match(/diff --git a\/(.+?) b\/(.+?)$/);
      if (match) {
        files.add(match[1]);
        files.add(match[2]);
      }
    } else if (line.startsWith('--- a/') || line.startsWith('+++ b/')) {
      // --- a/path/to/file
      // +++ b/path/to/file
      const match = line.match(/^[-+]{3} [ab]\/(.+?)$/);
      if (match) {
        files.add(match[1]);
      }
    }
  }
  
  return Array.from(files);
}

/**
 * 分析变更类型
 * @param {string} diff - git diff 内容
 * @param {string[]} affectedFiles - 变更的文件列表
 * @returns {string} 变更类型
 */
function analyzeChangeType(diff, affectedFiles) {
  // 检查是否只有 package.json 版本变更
  const onlyPackageJson = affectedFiles.length === 1 && 
    affectedFiles[0].endsWith('package.json');
  
  if (onlyPackageJson) {
    const versionMatch = diff.match(/^\+.*"version"\s*:\s*"([^"]+)"/m);
    const oldVersionMatch = diff.match(/^-.*"version"\s*:\s*"([^"]+)"/m);
    if (versionMatch && oldVersionMatch && versionMatch[1] !== oldVersionMatch[1]) {
      return 'version_change';
    }
  }
  
  // 检查样式文件变更
  const hasStyleFiles = affectedFiles.some(f => 
    f.endsWith('.css') || f.endsWith('.scss') || f.endsWith('.less') || f.endsWith('.styl')
  );
  if (hasStyleFiles && !affectedFiles.some(f => 
    f.endsWith('.vue') || f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.tsx')
  )) {
    return 'style_change';
  }
  
  // 检查配置文件变更
  const configFiles = ['package.json', 'tsconfig.json', 'vite.config.js', 'webpack.config.js', '.babelrc'];
  const onlyConfigFiles = affectedFiles.every(f => 
    configFiles.some(cf => f.endsWith(cf)) || f.includes('config')
  );
  if (onlyConfigFiles && !affectedFiles.some(f => 
    f.endsWith('.vue') || f.endsWith('.js') || f.endsWith('.ts')
  )) {
    return 'config_change';
  }
  
  // 默认逻辑变更
  return 'logic_change';
}

/**
 * 生成变更摘要
 * @param {string} diff - git diff 内容
 * @param {string} changeType - 变更类型
 * @param {string[]} affectedFiles - 变更的文件列表
 * @returns {string} 摘要文本
 */
function generateSummary(diff, changeType, affectedFiles) {
  if (changeType === 'version_change') {
    const versionMatch = diff.match(/^\+.*"version"\s*:\s*"([^"]+)"/m);
    const oldVersionMatch = diff.match(/^-.*"version"\s*:\s*"([^"]+)"/m);
    if (versionMatch && oldVersionMatch) {
      return `Version bumped from ${oldVersionMatch[1]} to ${versionMatch[1]}`;
    }
    return 'Version change detected';
  }
  
  if (changeType === 'style_change') {
    return `Detected changes in style files: ${affectedFiles.filter(f => 
      f.endsWith('.css') || f.endsWith('.scss') || f.endsWith('.less')
    ).join(', ')}`;
  }
  
  if (changeType === 'config_change') {
    return `Detected changes in configuration files: ${affectedFiles.join(', ')}`;
  }
  
  // logic_change
  const hasVue = affectedFiles.some(f => f.endsWith('.vue'));
  const hasJs = affectedFiles.some(f => f.endsWith('.js') || f.endsWith('.ts'));
  const hasTemplate = diff.includes('template') || diff.includes('<template>');
  const hasLogic = diff.includes('function') || diff.includes('export') || diff.includes('const ') || diff.includes('let ');
  
  const parts = [];
  if (hasVue && hasTemplate) {
    parts.push('component template');
  }
  if (hasLogic || hasJs) {
    parts.push('core logic');
  }
  if (hasVue) {
    parts.push('component structure');
  }
  
  if (parts.length > 0) {
    return `Detected changes in ${parts.join(' and ')}.`;
  }
  
  return `Detected changes in ${affectedFiles.slice(0, 3).join(', ')}${affectedFiles.length > 3 ? '...' : ''}`;
}

/**
 * 递归查找文件
 * @param {string} dir - 目录路径
 * @param {string[]} extensions - 文件扩展名列表
 * @returns {string[]} 文件路径列表
 */
function findFilesRecursively(dir, extensions = []) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findFilesRecursively(fullPath, extensions));
      } else if (entry.isFile()) {
        if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    }
  } catch (e) {
    // 忽略错误
  }
  return files;
}

/**
 * 按组件聚合 diff
 * @param {string} diff - 完整的 git diff
 * @param {string} component - 组件名
 * @param {string[]} affectedFiles - 变更的文件列表
 * @returns {string} 聚合后的 diff 内容
 */
function aggregateDiffByComponent(diff, component, affectedFiles) {
  if (component === 'Root/Package') {
    // 对于包级别的变更，只返回 package.json 相关的 diff
    const lines = diff.split('\n');
    const result = [];
    let inPackageJson = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('package.json')) {
        inPackageJson = true;
      }
      if (inPackageJson) {
        result.push(line);
        // 检查是否到了下一个文件的 diff
        if (i < lines.length - 1 && lines[i + 1].startsWith('diff --git') && !lines[i + 1].includes('package.json')) {
          break;
        }
      }
    }
    
    return result.join('\n');
  }
  
  // 对于组件级别的变更，过滤出相关文件的 diff
  const lines = diff.split('\n');
  const result = [];
  let currentFile = null;
  let inRelevantFile = false;
  
  // 创建组件路径模式（支持多种命名格式）
  const componentPatterns = [
    component,
    component.replace(/-/g, '_'),
    component.replace(/_/g, '-'),
    path.join('components', component),
    path.join('components', component.replace(/-/g, '_')),
    path.join('src', 'components', component),
    path.join('src', 'components', component.replace(/-/g, '_'))
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('diff --git')) {
      // 检查这个文件是否属于当前组件
      const fileMatch = line.match(/diff --git a\/(.+?) b\/(.+?)$/);
      if (fileMatch) {
        const filePath = fileMatch[1];
        // 检查文件路径是否包含组件相关的模式
        const isRelevant = componentPatterns.some(pattern => 
          filePath.includes(pattern) || filePath.includes(pattern.replace(/\\/g, '/'))
        ) || affectedFiles.some(f => {
          // 更精确的匹配：检查文件是否在组件目录下
          const normalizedF = f.replace(/\\/g, '/');
          return componentPatterns.some(pattern => {
            const normalizedPattern = pattern.replace(/\\/g, '/');
            return normalizedF.includes(normalizedPattern);
          });
        });
        currentFile = filePath;
        inRelevantFile = isRelevant;
      }
    }
    
    if (inRelevantFile) {
      result.push(line);
    }
  }
  
  return result.length > 0 ? result.join('\n') : diff;
}

// 主处理逻辑
const diffResults = [];

for (const result of packagesToProcess) {
  try {
    // 生成 diff（包括未暂存的变更）
    let diff = '';
    
    // 获取未暂存的变更（工作区的修改）
    try {
      const unstagedDiff = execSync(
        `git diff -- ${result.relDir}`,
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
      );
      if (unstagedDiff.trim()) {
        diff = unstagedDiff;
      }
    } catch (e) {
      // 忽略错误
    }
    
    // 获取已暂存但未提交的变更
    try {
      const stagedDiff = execSync(
        `git diff --cached -- ${result.relDir}`,
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
      );
      if (stagedDiff.trim()) {
        diff = diff ? diff + '\n' + stagedDiff : stagedDiff;
      }
    } catch (e) {
      // 忽略错误
    }
    
    // 获取最近一次提交的变更（如果存在）
    try {
      const commitCount = execSync(
        'git rev-list --count HEAD',
        { encoding: 'utf8', cwd: repoRoot }
      ).trim();
      
      if (parseInt(commitCount) > 1) {
        const lastCommitDiff = execSync(
          `git diff HEAD~1 HEAD -- ${result.relDir}`,
          { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, cwd: repoRoot }
        );
        if (lastCommitDiff.trim()) {
          diff = diff ? diff + '\n' + lastCommitDiff : lastCommitDiff;
        }
      }
    } catch (e) {
      // 忽略错误（可能是第一个提交或没有提交）
    }
    
    if (!diff.trim()) {
      continue;
    }
    
    // 解析路径结构
    const { workspace, category, package: packageName } = parsePathStructure(result.relDir);
    
    // 检测组件
    const component = detectComponent(result.dir, result.relDir, diff);
    
    // 提取变更文件
    const affectedFiles = extractChangedFiles(diff);
    
    // 分析变更类型
    const changeType = analyzeChangeType(diff, affectedFiles);
    
    // 生成摘要
    const summary = generateSummary(diff, changeType, affectedFiles);
    
    // 聚合 diff
    const aggregatedDiff = aggregateDiffByComponent(diff, component, affectedFiles);
    
    // 添加到结果列表
    diffResults.push({
      workspace: workspace || 'unknown',
      category: category || 'unknown',
      package: packageName || result.name,
      component,
      type: changeType,
      summary,
      affected_files: affectedFiles,
      diff_content: aggregatedDiff
    });
    
    console.log(`✅ 处理完成: ${packageName || result.name} - ${component} (${changeType})`);
  } catch (err) {
    console.warn(`⚠️ 处理 ${result.name} 的 diff 时出错: ${err.message}`);
  }
}

// 生成结构化 JSON
const diffResultsPath = path.join(repoRoot, 'diff_results.json');
fs.writeFileSync(diffResultsPath, JSON.stringify({ results: diffResults }, null, 2));
console.log(`✅ 已生成 diff_results.json，共 ${diffResults.length} 条记录`);

// 调用 LLM 生成文档（如果配置了密钥）
for (const diffResult of diffResults) {
  try {
    // 从 packagesToProcess 中找到对应的包信息
    const packageInfo = packagesToProcess.find(p => {
      const { package: pkg } = parsePathStructure(p.relDir);
      return pkg === diffResult.package || p.name === diffResult.package;
    });
    
    if (!packageInfo) {
      console.warn(`⚠️ 未找到对应的包信息: ${diffResult.package}`);
      continue;
    }
    
    // 读取现有文档（从 docs 目录）
    const docsDir = path.join(packageInfo.dir, 'docs');
    const usagePath = path.join(docsDir, 'usage.md');
    const changelogPath = path.join(docsDir, 'changelog.md');
    const existingUsage = fs.existsSync(usagePath) ? fs.readFileSync(usagePath, 'utf8') : '';
    const existingChangelog = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, 'utf8') : '';
    
    // 收集包中所有组件的信息
    const componentsPath = path.join(packageInfo.dir, packageInfo.relDir.includes('legacy-yaml') ? 'components' : 'src/components');
    const allComponents = [];
    
    try {
      if (fs.existsSync(componentsPath)) {
        const entries = fs.readdirSync(componentsPath, { withFileTypes: true });
        const componentDirs = entries.filter(e => e.isDirectory()).map(e => e.name);
        
        for (const compDir of componentDirs) {
          const compPath = path.join(componentsPath, compDir);
          const componentInfo = {
            name: compDir,
            path: compPath
          };
          
          // 查找 API 文件
          const apiFiles = findFilesRecursively(compPath, ['.ts', '.yaml', '.yml']);
          const apiFile = apiFiles.find(f => 
            f.endsWith('api.ts') || f.endsWith('api.yaml') || f.endsWith('api.yml')
          );
          
          if (apiFile) {
            try {
              componentInfo.apiContent = fs.readFileSync(apiFile, 'utf8');
            } catch (e) {
              // 忽略错误
            }
          }
          
          allComponents.push(componentInfo);
        }
      }
    } catch (e) {
      console.warn(`⚠️ 读取组件信息失败 (${packageInfo.name}): ${e.message}`);
    }
    
    // 汇总所有组件的 API 内容
    const allApiContent = allComponents
      .map(c => c.apiContent || '')
      .filter(Boolean)
      .join('\n\n---\n\n');
    
    const stack = packageInfo.relDir.includes('legacy-yaml') ? 'Vue2 (YAML)' : 
                 packageInfo.relDir.includes('ts-vue2') ? 'Vue2 (TypeScript)' : 
                 packageInfo.relDir.includes('ts-vue3') ? 'Vue3 (TypeScript)' :
                 packageInfo.relDir.includes('ts-react') ? 'React (TypeScript)' : 'Unknown';
    
    const aiContext = JSON.stringify({
      diffResult,
      stack,
      allComponents: allComponents.map(c => ({
        name: c.name,
        apiContent: (c.apiContent || '').substring(0, 3000)
      })),
      allApiContent: allApiContent.substring(0, 10000),
      existingUsage,
      existingChangelog,
      packageDir: packageInfo.dir,
      packageName: packageInfo.name,
      version: packageInfo.version
    });
    
    execSync(
      `node scripts/ci/call-coreagent.mjs --dir ${packageInfo.dir} --context '${aiContext}'`,
      { stdio: 'inherit', env: process.env, cwd: repoRoot }
    );
  } catch (aiError) {
    console.warn(`⚠️ AI 文档生成失败 (${diffResult.package}): ${aiError.message}`);
  }
}

console.log('✅ Diff 处理完成');

