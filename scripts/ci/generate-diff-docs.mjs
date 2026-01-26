#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

/**
 * 上传文档文件（转成 base64）
 */
async function uploadDocumentFile(filePath, fileName) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl || baseUrl.trim() === "") {
    console.log("ℹ️  未配置 BASE_URL，跳过文档上传");
    return { skipped: true };
  }

  if (!fs.existsSync(filePath)) {
    console.log(`ℹ️  文档文件不存在，跳过上传: ${filePath}`);
    return { skipped: true };
  }

  const uploadUrl = `${baseUrl}/expand/base64/file_upload`;
  const domainName = process.env.UPLOAD_DOMAIN_NAME || "material";
  const connectionGroup =
    process.env.UPLOAD_CONNECTION_GROUP || "lcap_default_connection";
  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const uploadMethod = process.env.UPLOAD_METHOD || "POST";

  console.log(`📤 开始上传文档 ${fileName} 到 ${uploadUrl}...`);

  try {
    // 读取文件为 Buffer，然后转换为 base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString("base64");

    // 构建请求体：JSON 格式，包含 base64String 和 fileName
    const requestBody = {
      base64String: base64String,
      fileName: fileName,
    };

    // 构建 Headers
    const headers = {
      "Content-Type": "application/json",
      "domainname": domainName,
      "file-connection-group": connectionGroup,
      "accept": "*/*",
      "cache-control": "no-cache",
      "pragma": "no-cache",
    };

    // 处理 Token
    if (uploadToken && uploadToken !== "undefined") {
      if (uploadToken.startsWith("Token ")) {
        headers["Authorization"] = uploadToken;
      } else if (uploadToken.includes(":")) {
        const [username, password] = uploadToken.split(":");
        const basicAuth = Buffer.from(`${username}:${password}`).toString(
          "base64"
        );
        headers["Authorization"] = `Basic ${basicAuth}`;
      } else {
        headers["Authorization"] = `Bearer ${uploadToken}`;
      }
    }

    // 处理自定义 Header (如果有)
    if (process.env.UPLOAD_HEADERS) {
      try {
        const customHeaders = JSON.parse(process.env.UPLOAD_HEADERS);
        Object.assign(headers, customHeaders);
      } catch (e) {
        console.warn("⚠️  UPLOAD_HEADERS 格式错误，忽略自定义请求头");
      }
    }

    // 发送请求
    const response = await fetch(uploadUrl, {
      method: uploadMethod,
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      throw new Error(
        `文档上传失败 (${response.status}): ${JSON.stringify(responseData)}`
      );
    }

    // 解析上传结果
    let uploadResultUrl = null;

    // 检查 Data 字段（新接口格式）
    if (responseData && responseData.Data) {
      const data = responseData.Data;
      if (data.result && typeof data.result === "string") {
        uploadResultUrl = data.result;
      } else if (data.filePath && typeof data.filePath === "string") {
        if (data.filePath.startsWith("http")) {
          uploadResultUrl = data.filePath;
        } else {
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = `${urlObj.origin}${data.filePath}`;
        }
      }
    }

    // 兼容旧格式
    if (!uploadResultUrl && responseData && responseData.result) {
      if (Array.isArray(responseData.result)) {
        uploadResultUrl = responseData.result[0] || null;
      } else if (typeof responseData.result === "string") {
        uploadResultUrl = responseData.result;
      }
    }

    if (!uploadResultUrl && responseData && responseData.filePath) {
      if (Array.isArray(responseData.filePath)) {
        if (responseData.filePath.length > 0) {
          const filePath = responseData.filePath[0];
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = filePath.startsWith("http")
            ? filePath
            : `${urlObj.origin}${filePath}`;
        }
      } else if (typeof responseData.filePath === "string") {
        const urlObj = new URL(uploadUrl);
        uploadResultUrl = responseData.filePath.startsWith("http")
          ? responseData.filePath
          : `${urlObj.origin}${responseData.filePath}`;
      }
    }

    if (!uploadResultUrl && responseData && responseData.url) {
      uploadResultUrl =
        typeof responseData.url === "string"
          ? responseData.url
          : String(responseData.url);
    }

    if (uploadResultUrl) {
      console.log(`✅ 文档上传成功: ${fileName}`);
      console.log(`🔗 文档链接: ${uploadResultUrl}`);
    } else {
      console.warn(`⚠️  文档上传成功但未获取到 URL: ${fileName}`);
      console.log(`📋 响应数据: ${JSON.stringify(responseData)}`);
    }

    return {
      success: true,
      url: uploadResultUrl,
      response: responseData,
    };
  } catch (error) {
    console.error(`❌ 文档上传失败 (${fileName}): ${error.message}`);
    if (process.env.UPLOAD_FAIL_CONTINUE === "true") {
      console.warn("⚠️  文档上传失败但继续执行（UPLOAD_FAIL_CONTINUE=true）");
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}

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

// 如果没有检测到变更的包，尝试从其他来源获取包列表（用于首次生成文档）
// 注意：如果有 git 变更，会优先走 git diff 流程，不会进入这个分支
if (packagesToProcess.length === 0) {
  console.log('ℹ️  没有检测到变更的包，尝试从其他来源获取包列表（用于首次生成文档）...');
  
  // 1. 尝试从 batch_items.json 读取（如果存在）
  const batchItemsPath = path.join(repoRoot, 'batch_items.json');
  if (fs.existsSync(batchItemsPath)) {
    try {
      const batchItems = JSON.parse(fs.readFileSync(batchItemsPath, 'utf8'));
      const items = Array.isArray(batchItems) ? batchItems : (batchItems.items || []);
      
      for (const item of items) {
        const relDir = item.relDir || item.dir || '';
        if (relDir && !packagesToProcess.find(p => p.relDir === relDir)) {
          const pkgJsonPath = path.join(repoRoot, relDir, 'package.json');
          if (fs.existsSync(pkgJsonPath)) {
            try {
              const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
              const docsDir = path.join(repoRoot, relDir, 'docs');
              const usagePath = path.join(docsDir, 'usage.md');
              const hasUsageDoc = fs.existsSync(usagePath);
              
              // 如果文档不存在，添加到处理列表（首次生成）
              if (!hasUsageDoc) {
                packagesToProcess.push({
                  name: pkgJson.name || path.basename(relDir),
                  version: pkgJson.version || '0.0.0',
                  dir: path.join(repoRoot, relDir),
                  relDir: relDir
                });
                console.log(`📦 从 batch_items.json 添加包（首次生成文档）: ${pkgJson.name || relDir}`);
              }
            } catch (e) {
              console.warn(`⚠️ 读取包信息失败 (${relDir}): ${e.message}`);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`⚠️ 读取 batch_items.json 失败: ${e.message}`);
    }
  }
  
  // 2. 尝试从 build_results.json 读取（如果存在）
  const buildResultsPath = path.join(repoRoot, 'build_results.json');
  if (fs.existsSync(buildResultsPath) && packagesToProcess.length === 0) {
    try {
      const buildResults = JSON.parse(fs.readFileSync(buildResultsPath, 'utf8'));
      const results = Array.isArray(buildResults) ? buildResults : [];
      
      for (const result of results) {
        const relDir = result.relDir || result.dir || '';
        if (relDir && !packagesToProcess.find(p => p.relDir === relDir)) {
          const pkgJsonPath = path.join(repoRoot, relDir, 'package.json');
          if (fs.existsSync(pkgJsonPath)) {
            try {
              const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
              const docsDir = path.join(repoRoot, relDir, 'docs');
              const usagePath = path.join(docsDir, 'usage.md');
              const hasUsageDoc = fs.existsSync(usagePath);
              
              // 如果文档不存在，添加到处理列表（首次生成）
              if (!hasUsageDoc) {
                packagesToProcess.push({
                  name: pkgJson.name || path.basename(relDir),
                  version: pkgJson.version || '0.0.0',
                  dir: path.join(repoRoot, relDir),
                  relDir: relDir
                });
                console.log(`📦 从 build_results.json 添加包（首次生成文档）: ${pkgJson.name || relDir}`);
              }
            } catch (e) {
              console.warn(`⚠️ 读取包信息失败 (${relDir}): ${e.message}`);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`⚠️ 读取 build_results.json 失败: ${e.message}`);
    }
  }
  
  // 如果仍然没有包需要处理，退出
  if (packagesToProcess.length === 0) {
    console.log('ℹ️  没有检测到需要生成文档的包，跳过生成 diff 描述');
    process.exit(0);
  } else {
    console.log(`📋 找到 ${packagesToProcess.length} 个需要首次生成文档的包`);
  }
} else {
  console.log(`📋 通过 git diff 检测到 ${packagesToProcess.length} 个有变更的包，将走 git diff 流程`);
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
    
    // 解析路径结构
    const { workspace, category, package: packageName } = parsePathStructure(result.relDir);
    
    // 检查是否已有文档（用于判断是否需要首次生成）
    const docsDir = path.join(result.dir, 'docs');
    const usagePath = path.join(docsDir, 'usage.md');
    const hasUsageDoc = fs.existsSync(usagePath);
    
    // 如果没有 diff，但文档不存在，也需要生成文档（首次生成场景）
    if (!diff.trim()) {
      if (!hasUsageDoc) {
        // 首次生成：没有 diff，但需要生成文档
        console.log(`ℹ️ ${packageName || result.name}: 没有检测到变更，但文档不存在，将基于当前代码生成文档`);
        diffResults.push({
          workspace: workspace || 'unknown',
          category: category || 'unknown',
          package: packageName || result.name,
          component: 'Root/Package',
          type: 'initial_generation',
          summary: '首次生成文档，基于当前代码状态',
          affected_files: [],
          diff_content: ''
        });
      } else {
        // 有文档且没有 diff，跳过
        console.log(`ℹ️ ${packageName || result.name}: 没有检测到变更，且文档已存在，跳过`);
      }
      continue;
    }
    
    // 有 diff 的情况：正常处理
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

// 上传生成的文档（只上传，不调用接口，由 upload-packages.mjs 统一调用）
const docUploadResults = {};

try {
  // 为每个生成文档的包上传文档
  for (const packageInfo of packagesToProcess) {
    try {
      const docsDir = path.join(packageInfo.dir, 'docs');
      const usagePath = path.join(docsDir, 'usage.md');
      const changelogPath = path.join(docsDir, 'changelog.md');
      
      // 检查是否有生成的文档
      const hasUsage = fs.existsSync(usagePath);
      const hasChangelog = fs.existsSync(changelogPath);
      
      if (!hasUsage && !hasChangelog) {
        continue; // 没有生成文档，跳过
      }

      // 上传文档
      let uploadedChangelogPath = null;
      let uploadedReadmePath = null;

      if (hasChangelog) {
        try {
          const changelogUploadResult = await uploadDocumentFile(
            changelogPath,
            `${packageInfo.name}-changelog.md`
          );
          if (changelogUploadResult && changelogUploadResult.success && changelogUploadResult.url) {
            uploadedChangelogPath = changelogUploadResult.url;
            console.log(`✅ ${packageInfo.name}: changelog.md 上传成功`);
          }
        } catch (e) {
          console.warn(`⚠️ ${packageInfo.name}: changelog.md 上传失败: ${e.message}`);
        }
      }

      if (hasUsage) {
        try {
          const usageUploadResult = await uploadDocumentFile(
            usagePath,
            `${packageInfo.name}-usage.md`
          );
          if (usageUploadResult && usageUploadResult.success && usageUploadResult.url) {
            uploadedReadmePath = usageUploadResult.url;
            console.log(`✅ ${packageInfo.name}: usage.md 上传成功`);
          }
        } catch (e) {
          console.warn(`⚠️ ${packageInfo.name}: usage.md 上传失败: ${e.message}`);
        }
      }

      // 保存上传结果，供 upload-packages.mjs 使用
      // 同时保存包名信息用于验证
      if (uploadedChangelogPath || uploadedReadmePath) {
        docUploadResults[packageInfo.name] = {
          packageName: packageInfo.name, // 保存包名用于验证
          changelogPath: uploadedChangelogPath,
          readmePath: uploadedReadmePath,
          // 保存原始文件名用于验证
          changelogFileName: uploadedChangelogPath ? `${packageInfo.name}-changelog.md` : null,
          readmeFileName: uploadedReadmePath ? `${packageInfo.name}-usage.md` : null
        };
      }
    } catch (error) {
      console.warn(`⚠️ ${packageInfo.name}: 文档上传出错: ${error.message}`);
      // 继续处理其他包
    }
  }

  // 保存文档上传结果到文件
  if (Object.keys(docUploadResults).length > 0) {
    const docUploadResultsPath = path.join(repoRoot, 'doc_upload_results.json');
    fs.writeFileSync(docUploadResultsPath, JSON.stringify(docUploadResults, null, 2));
    console.log(`✅ 已保存文档上传结果到 doc_upload_results.json`);
  }
} catch (error) {
  console.warn(`⚠️ 文档上传过程出错: ${error.message}`);
  // 不影响主流程，继续执行
}

// 统一提交所有生成的文档（避免重复触发构建）
try {
  const { setupGitUser } = await import('../utils/git.js');
  
  // 在 CI 环境中设置 git 用户信息
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    setupGitUser();
  }
  
  // 检查是否有文档文件的变更
  // 先查找所有生成的文档文件
  const allDocFiles = [];
  for (const packageInfo of packagesToProcess) {
    const docsDir = path.join(packageInfo.dir, 'docs');
    const usagePath = path.join(docsDir, 'usage.md');
    const changelogPath = path.join(docsDir, 'changelog.md');
    
    if (fs.existsSync(usagePath)) {
      const relPath = path.relative(repoRoot, usagePath).replace(/\\/g, '/');
      allDocFiles.push(relPath);
    }
    if (fs.existsSync(changelogPath)) {
      const relPath = path.relative(repoRoot, changelogPath).replace(/\\/g, '/');
      allDocFiles.push(relPath);
    }
  }
  
  console.log('🔍 检查文档文件变更...');
  console.log(`📋 找到 ${allDocFiles.length} 个生成的文档文件:`, allDocFiles);
  
  // 检查这些文件在 git 中的状态
  const docFiles = [];
  for (const file of allDocFiles) {
    try {
      // 检查文件是否在 git 中（已跟踪或未跟踪）
      const status = execSync(`git status --porcelain -- "${file}"`, {
        encoding: 'utf8',
        cwd: repoRoot,
        stdio: 'pipe'
      }).trim();
      
      if (status) {
        // 文件有变更（已修改、已添加或未跟踪）
        const parts = status.trim().split(/\s+/);
        const statusCode = parts[0];
        const fileName = parts[parts.length - 1];
        
        // 检查状态码：M=已修改, A=已添加, ??=未跟踪
        if (statusCode.includes('M') || statusCode.includes('A') || statusCode === '??') {
          docFiles.push(fileName);
          console.log(`   ✅ ${fileName} (状态: ${statusCode})`);
        }
      } else {
        // 文件存在但 git 没有检测到变更，可能是新文件，也添加
        if (fs.existsSync(path.join(repoRoot, file))) {
          docFiles.push(file);
          console.log(`   ✅ ${file} (新文件)`);
        }
      }
    } catch (e) {
      // 如果 git status 失败，但文件存在，也尝试添加
      if (fs.existsSync(path.join(repoRoot, file))) {
        docFiles.push(file);
        console.log(`   ✅ ${file} (文件存在，尝试添加)`);
      }
    }
  }
  
  console.log(`📋 检测到 ${docFiles.length} 个需要提交的文档文件`);
  
  if (docFiles.length > 0) {
    // 添加所有文档文件
    console.log(`📝 准备添加 ${docFiles.length} 个文档文件`);
    // 逐个添加文件，避免路径问题
    for (const file of docFiles) {
      try {
        const filePath = path.join(repoRoot, file);
        if (fs.existsSync(filePath)) {
          console.log(`   ➕ 添加: ${file}`);
          execSync(`git add -- "${file}"`, {
            encoding: 'utf8',
            cwd: repoRoot,
            stdio: 'pipe'
          });
        } else {
          console.warn(`   ⚠️ 文件不存在: ${file}`);
        }
      } catch (e) {
        console.warn(`   ⚠️ 添加文件失败 ${file}: ${e.message}`);
      }
    }
    
    // 提交（包含 [skip ci] 避免触发 CI/CD）
    const commitMessage = `docs: update usage and changelog files [skip ci]`;
    execSync(`git commit -m "${commitMessage}"`, {
      encoding: 'utf8',
      cwd: repoRoot,
      stdio: 'pipe'
    });
    
    console.log(`✅ 已提交 ${docFiles.length} 个文档文件`);
    
    // 在 CI 环境中自动 push
    if (process.env.CI || process.env.GITHUB_ACTIONS || process.env.AUTO_PUSH_DOCS === 'true') {
      try {
        // 检查当前分支状态，确保不在 detached HEAD 状态
        const currentBranch = execSync('git branch --show-current', {
          encoding: 'utf8',
          cwd: repoRoot,
          stdio: 'pipe'
        }).trim();
        
        if (!currentBranch) {
          // 如果在 detached HEAD 状态，尝试从 GITHUB_REF 获取分支名
          if (process.env.GITHUB_REF) {
            const branchName = process.env.GITHUB_REF.replace('refs/heads/', '');
            if (branchName && branchName !== process.env.GITHUB_REF) {
              console.log(`📌 检测到 detached HEAD，切换到分支: ${branchName}`);
              execSync(`git checkout -B ${branchName}`, {
                encoding: 'utf8',
                cwd: repoRoot,
                stdio: 'pipe'
              });
            }
          }
        }
        
        // 获取当前分支名（如果仍然没有，使用 HEAD）
        const branchToPush = execSync('git branch --show-current', {
          encoding: 'utf8',
          cwd: repoRoot,
          stdio: 'pipe'
        }).trim() || 'HEAD';
        
        console.log(`📤 推送分支: ${branchToPush}`);
        execSync(`git push origin ${branchToPush}`, {
          encoding: 'utf8',
          cwd: repoRoot,
          stdio: 'pipe'
        });
        console.log(`✅ 已推送文档变更`);
      } catch (pushError) {
        console.warn(`⚠️ 推送文档失败: ${pushError.message}`);
        // 输出更多调试信息
        if (process.env.GITHUB_ACTIONS) {
          console.warn(`   提示: 请确保工作流有 contents: write 权限，并且 checkout 步骤配置了 persist-credentials: true`);
        }
      }
    }
  } else {
    console.log(`ℹ️ 没有文档文件变更，跳过提交`);
  }
} catch (error) {
  // 如果提交失败（例如没有变更或不在 git 仓库中），只记录警告
  const errorMsg = error.message || String(error);
  if (errorMsg.includes('nothing to commit') || 
      errorMsg.includes('not a git repository') ||
      errorMsg.includes('no changes added to commit')) {
    console.log(`ℹ️ 跳过提交文档: ${errorMsg}`);
  } else {
    console.warn(`⚠️ 提交文档失败: ${errorMsg}`);
  }
}

console.log('✅ Diff 处理完成');

