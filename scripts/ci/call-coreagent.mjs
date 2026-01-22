import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

/** 调用 API */
async function callAgent(payload) {
  // 支持两种环境变量格式：
  // 1. COREAGENT_APP_ID 和 COREAGENT_APP_KEY（新格式）
  // 2. COREAGENT_AK 和 COREAGENT_SK（旧格式，格式为 {app_id}.{app_key}）
  let authToken;
  
  if (process.env.COREAGENT_APP_ID && process.env.COREAGENT_APP_KEY) {
    authToken = `${process.env.COREAGENT_APP_ID}.${process.env.COREAGENT_APP_KEY}`;
  } else if (process.env.COREAGENT_AK && process.env.COREAGENT_SK) {
    // 如果 COREAGENT_AK 已经包含点号，说明已经是完整格式
    if (process.env.COREAGENT_AK.includes('.')) {
      authToken = process.env.COREAGENT_AK;
    } else {
      authToken = `${process.env.COREAGENT_AK}.${process.env.COREAGENT_SK}`;
    }
  } else {
    throw new Error('未配置 COREAGENT_APP_ID/COREAGENT_APP_KEY 或 COREAGENT_AK/COREAGENT_SK');
  }

  const url = process.env.COREAGENT_URL || 'https://aigw.netease.com/v1/chat/completions';
  const modelCode = process.env.COREAGENT_MODEL || 'deepseek-v3.2-think-bd-251201';

  const requestData = {
    model: modelCode,
    messages: [
      {
        role: 'user',
        content: payload
      }
    ],
    max_tokens: parseInt(process.env.COREAGENT_MAX_TOKENS || '4000'),
    temperature: parseFloat(process.env.COREAGENT_TEMPERATURE || '0.7'),
    stream: false
  };

  const headers = {
    'Authorization': `Bearer 1q6fh4tsh7fe6cye.knpc41r7ftqefjy64t6nt8jypmq9s7yf`,
    'Content-Type': 'application/json'
  };

  // 重试配置
  const maxRetries = parseInt(process.env.COREAGENT_MAX_RETRIES || '3');
  const retryDelay = parseInt(process.env.COREAGENT_RETRY_DELAY || '2000'); // 2秒

  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 创建带超时的 fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`API 请求失败: ${res.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      
      // 返回格式化的响应，兼容旧格式
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return {
          code: 200,
          data: {
            answer: data.choices[0].message.content
          }
        };
      }
      
      return {
        code: 200,
        data: {
          answer: JSON.stringify(data)
        }
      };
    } catch (error) {
      lastError = error;
      
      // 如果是超时或连接错误，且还有重试次数，则重试
      if (attempt < maxRetries && (
        error.code === 'UND_ERR_CONNECT_TIMEOUT' ||
        error.code === 'UND_ERR_SOCKET' ||
        error.name === 'AbortError' ||
        error.message.includes('timeout') ||
        error.message.includes('fetch failed')
      )) {
        console.warn(`⚠️ API 请求失败 (尝试 ${attempt}/${maxRetries}): ${error.message}`);
        console.log(`   等待 ${retryDelay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      // 其他错误或重试次数用完，直接抛出
      throw error;
    }
  }
  
  // 所有重试都失败
  console.error(`❌ API 请求失败，已重试 ${maxRetries} 次`);
  throw lastError;
}

/** 3. 逻辑主入口 */
async function main() {
  const args = process.argv.slice(2);
  const pkgDir = args[args.indexOf('--dir') + 1];
  const aiContextStr = args[args.indexOf('--context') + 1];
  const aiContext = JSON.parse(aiContextStr);

  // 检查是否有新的 diffResult 格式（用于生成 usage.md 和 changelog.md）
  if (aiContext.diffResult) {
    await generateUsageAndChangelog(pkgDir, aiContext);
  } else {
    // 兼容旧格式：生成 README
    await generateReadme(pkgDir, aiContext);
  }
}

/**
 * 生成 usage.md 和 changelog.md
 */
async function generateUsageAndChangelog(pkgDir, aiContext) {
  const { diffResult, stack, allComponents = [], allApiContent = '', existingUsage, existingChangelog, packageName, version } = aiContext;
  
  // 确保 docs 目录存在
  const docsDir = path.join(pkgDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  const usagePath = path.join(docsDir, 'usage.md');
  const changelogPath = path.join(docsDir, 'changelog.md');
  
  // 构建组件列表信息
  const componentsInfo = allComponents.length > 0 
    ? allComponents.map(c => `- ${c.name}: ${(c.apiContent || '').substring(0, 200)}`).join('\n')
    : '无组件信息';

  const prompt = `
请根据以下信息生成或更新依赖库的 usage.md 和 changelog.md 文档。

## 依赖库信息
- 包名: ${packageName}
- 版本: ${version}
- 工作区: ${diffResult.workspace}
- 分类: ${diffResult.category}
- 技术栈: ${stack}

## 包含的组件
该依赖库包含以下组件：
${componentsInfo}

## 组件 API 定义
\`\`\`
${allApiContent.substring(0, 8000)}
\`\`\`

## 变更信息
- 变更类型: ${diffResult.type}
- 变更摘要: ${diffResult.summary}
- 受影响文件: ${diffResult.affected_files.join(', ')}
- 代码变更:
\`\`\`
${diffResult.diff_content.substring(0, 8000)}
\`\`\`

## 现有文档
### 现有 usage.md:
${existingUsage || '(空)'}

### 现有 changelog.md:
${existingChangelog || '(空)'}

## 任务要求
请生成或更新以下两个文档：

1. **usage.md**: 
   - 前端依赖库是指开发者自行开发或引入的组件、逻辑，用于满足定制化需求和功能扩展。这些库可被用于自定义界面样式、交互效果、组件功能，或者整合特定的第三方服务（例如微信SDK、钉钉SDK），并且能够被导入到Codewave低代码平台中供开发使用。 
   - 我们需要以依赖库为维度生成文档，不是单个组件
   - 如果是首次生成，请创建完整的依赖库使用文档，包括：
     * 依赖库介绍（说明该依赖库的用途和功能）
     * 包含的组件和逻辑列表（列出所有组件和逻辑名称）
     * 每个组件和逻辑的功能说明（简要说明每个组件和逻辑的作用和逻辑）
     * API 说明（汇总所有组件和逻辑的 API）
   - 如果是更新，请根据本次变更增量更新相关内容
   - **重要：不要生成代码示例，只说明功能和逻辑**
   - 保持文档结构清晰，使用 Markdown 格式

2. **changelog.md**:
   - 在文档顶部添加新版本条目（格式：## ${version}）
   - 根据变更类型和摘要，生成相应的变更说明
   - 如果是 version_change，说明版本升级原因
   - 如果是 logic_change，说明功能变更或修复（说明哪些组件受到影响）
   - 如果是 style_change，说明样式调整
   - 如果是 config_change，说明配置变更
   - 保持与现有 changelog 格式一致

请以 JSON 格式返回，包含两个字段：
{
  "usage": "完整的 usage.md 内容",
  "changelog": "完整的 changelog.md 内容（包含新版本条目和现有内容）"
}
  `;

  console.log(`🤖 正在请求智能体生成文档 [${path.basename(pkgDir)}]...`);
  const result = await callAgent(prompt);

  if (result.code === 200 && result.data?.answer) {
    try {
      // 尝试解析 JSON 响应
      const responseText = result.data.answer.trim();
      
      // 尝试提取 JSON（可能包含 markdown 代码块）
      let jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (!jsonMatch) {
        // 如果没有代码块，尝试直接解析
        jsonMatch = responseText.match(/(\{[\s\S]*\})/);
      }
      
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        
        if (parsed.usage) {
          fs.writeFileSync(usagePath, parsed.usage);
          console.log(`✅ usage.md 已生成/更新: ${usagePath}`);
        }
        
        if (parsed.changelog) {
          fs.writeFileSync(changelogPath, parsed.changelog);
          console.log(`✅ changelog.md 已生成/更新: ${changelogPath}`);
        }
        
        // 提交文档变更
        await commitDocs(pkgDir, packageName, repoRoot);
      } else {
        // 如果无法解析 JSON，尝试智能分割
        console.warn(`⚠️ 无法解析 JSON 响应，尝试智能分割...`);
        
        // 尝试查找 usage.md 和 changelog.md 的分隔
        const usageMatch = responseText.match(/usage[\._]?md[:\s]*\n([\s\S]*?)(?=changelog|$)/i);
        const changelogMatch = responseText.match(/changelog[\._]?md[:\s]*\n([\s\S]*?)$/i);
        
        if (usageMatch) {
          fs.writeFileSync(usagePath, usageMatch[1].trim());
          console.log(`✅ usage.md 已生成/更新: ${usagePath}`);
        }
        
        if (changelogMatch) {
          fs.writeFileSync(changelogPath, changelogMatch[1].trim());
          console.log(`✅ changelog.md 已生成/更新: ${changelogPath}`);
        } else if (!usageMatch) {
          // 如果都找不到，将整个响应作为 usage.md
          fs.writeFileSync(usagePath, responseText);
          console.log(`✅ usage.md 已生成（完整响应）: ${usagePath}`);
        }
        
        // 提交文档变更
        await commitDocs(pkgDir, packageName, repoRoot);
      }
    } catch (parseError) {
      console.error(`❌ 解析响应失败: ${parseError.message}`);
      console.error(`响应内容: ${result.data.answer.substring(0, 500)}`);
    }
  } else {
    console.error(`❌ 智能体返回异常:`, result.message || result);
  }
}

/**
 * 提交文档变更
 */
async function commitDocs(pkgDir, packageName, repoRoot) {
  try {
    const { setupGitUser } = await import('../utils/git.js');
    
    // 在 CI 环境中设置 git 用户信息
    if (process.env.CI || process.env.GITHUB_ACTIONS) {
      setupGitUser();
    }
    
    // 计算相对于仓库根目录的路径（使用正斜杠，git 需要）
    const relPath = path.relative(repoRoot, pkgDir);
    const docsUsagePath = path.join(relPath, 'docs', 'usage.md').replace(/\\/g, '/');
    const docsChangelogPath = path.join(relPath, 'docs', 'changelog.md').replace(/\\/g, '/');
    
    // 检查文件是否存在且有变更
    const usagePath = path.join(pkgDir, 'docs', 'usage.md');
    const changelogPath = path.join(pkgDir, 'docs', 'changelog.md');
    
    if (!fs.existsSync(usagePath) && !fs.existsSync(changelogPath)) {
      console.log(`ℹ️ ${packageName} 没有生成文档，跳过提交`);
      return;
    }
    
    // 检查是否有变更
    const status = execSync('git status --porcelain', {
      encoding: 'utf8',
      cwd: repoRoot,
      stdio: 'pipe'
    });
    
    const hasChanges = status.split('\n').some(line => {
      const file = line.trim().split(/\s+/).pop();
      return file === docsUsagePath || file === docsChangelogPath;
    });
    
    if (!hasChanges) {
      console.log(`ℹ️ ${packageName} 没有文档变更，跳过提交`);
      return;
    }
    
    // 添加变更的文件
    const filesToAdd = [];
    if (fs.existsSync(usagePath)) {
      filesToAdd.push(docsUsagePath);
    }
    if (fs.existsSync(changelogPath)) {
      filesToAdd.push(docsChangelogPath);
    }
    
    if (filesToAdd.length > 0) {
      execSync(`git add ${filesToAdd.join(' ')}`, {
        encoding: 'utf8',
        cwd: repoRoot,
        stdio: 'pipe'
      });
      
      // 提交（包含 [skip ci] 避免触发 CI/CD）
      const commitMessage = `docs: update usage and changelog for ${packageName} [skip ci]`;
      execSync(`git commit -m "${commitMessage}"`, {
        encoding: 'utf8',
        cwd: repoRoot,
        stdio: 'pipe'
      });
      
      console.log(`✅ 已提交文档变更: ${packageName}`);
      
      // 如果设置了环境变量，自动 push（需要配置 git 权限）
      if (process.env.AUTO_PUSH_DOCS === 'true') {
        try {
          execSync('git push', {
            encoding: 'utf8',
            cwd: repoRoot,
            stdio: 'pipe'
          });
          console.log(`✅ 已推送文档变更: ${packageName}`);
        } catch (pushError) {
          console.warn(`⚠️ 推送文档失败 (${packageName}): ${pushError.message}`);
        }
      }
    }
  } catch (error) {
    // 如果提交失败（例如没有变更或不在 git 仓库中），只记录警告
    const errorMsg = error.message || String(error);
    if (errorMsg.includes('nothing to commit') || 
        errorMsg.includes('not a git repository') ||
        errorMsg.includes('no changes added to commit')) {
      console.log(`ℹ️ ${packageName} 跳过提交: ${errorMsg}`);
    } else {
      console.warn(`⚠️ 提交文档失败 (${packageName}): ${errorMsg}`);
    }
  }
}

/**
 * 生成 README（兼容旧格式）
 */
async function generateReadme(pkgDir, aiContext) {
  const diff = execSync(`git diff HEAD^ HEAD -- ${pkgDir}`).toString();
  const readmePath = path.join(pkgDir, 'README.md');

  const prompt = `
    任务类型: ${aiContext.isFirstTime ? '首次生成 README' : '更新 README 与生成变更说明'}
    组件路径: ${pkgDir}
    技术栈: ${aiContext.stack}
    特征文件内容: ${aiContext.apiContent}
    本次代码变更: ${diff}
    当前文档内容: ${aiContext.isFirstTime ? '空' : fs.readFileSync(readmePath, 'utf8')}
  `;

  console.log(`🤖 正在请求智能体处理 [${path.basename(pkgDir)}]...`);
  const result = await callAgent(prompt);

  if (result.code === 200 && result.data?.answer) {
    fs.writeFileSync(readmePath, result.data.answer);
    console.log(`✅ 文档已同步至: ${readmePath}`);
  } else {
    console.error(`❌ 智能体返回异常:`, result.message);
  }
}

main().catch(console.error);