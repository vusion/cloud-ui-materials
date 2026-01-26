import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../');

/** 调用 CoreAgent API */
async function callAgent(payload) {
  // 获取应用ID和API密钥
  const appId = process.env.COREAGENT_APP_ID;
  const appKey = process.env.COREAGENT_APP_KEY;
  
  if (!appId || !appKey) {
    throw new Error('未配置 COREAGENT_APP_ID 或 COREAGENT_APP_KEY');
  }

  // CoreAgent Workflows API 端点
  const baseUrl = process.env.COREAGENT_URL || 'https://coreagent.codewave.163.com';
  const apiPath = process.env.COREAGENT_API_PATH || '/openapi/v1/app/workflows/run';
  const url = `${baseUrl}${apiPath}`;
  
  // 响应模式：blocking（等待执行完毕）或 streaming（SSE流式）
  const responseMode = process.env.COREAGENT_RESPONSE_MODE || 'blocking';
  // 用户标识
  const userId = process.env.COREAGENT_USER || 'system';
  // 输入变量名（根据工作流定义的变量名配置，默认为 'prompt'）
  const inputVariableName = process.env.COREAGENT_INPUT_VARIABLE || 'prompt';

  // CoreAgent Workflows API 请求格式
  // 处理 payload：如果 payload 是对象且包含 prompt 字段，提取 prompt 值；否则直接使用 payload
  let inputValue;
  if (payload && typeof payload === 'object' && 'prompt' in payload) {
    // 如果传入的是 {prompt: "..."} 格式，提取 prompt 字段的值
    inputValue = payload.prompt;
  } else if (typeof payload === 'string') {
    // 如果直接传入字符串，直接使用
    inputValue = payload;
  } else {
    // 其他情况，转换为 JSON 字符串
    inputValue = JSON.stringify(payload);
  }

  const requestData = {
    inputs: {
      [inputVariableName]: inputValue
    },
    response_mode: responseMode,
    user: userId
  };

  const headers = {
    'Authorization': `Bearer ${appKey}`,
    'appId': appId,
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

      // 处理错误响应
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ 
          status: res.status,
          message: 'Unknown error' 
        }));
        const errorMsg = errorData.message || errorData.error || 'Unknown error';
        throw new Error(`CoreAgent API 请求失败: ${res.status} - ${errorMsg}`);
      }

      // 处理响应内容
      const contentType = res.headers.get('content-type') || '';
      
      // 如果是流式响应（SSE）
      if (responseMode === 'streaming' && contentType.includes('text/event-stream')) {
        // 读取 SSE 流
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const eventData = JSON.parse(line.slice(6));
                  // 处理流式事件，提取输出内容（只兼容 outputs.text 格式）
                  if (eventData.event === 'workflow.finished' && eventData.data && eventData.data.outputs) {
                    const outputs = eventData.data.outputs;
                    // 只从 outputs.text 中提取结果
                    if (outputs.text && typeof outputs.text === 'string') {
                      answer = outputs.text;
                    }
                  }
                } catch (e) {
                  // 忽略解析错误，继续处理
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
        
        if (!answer) {
          throw new Error('CoreAgent 流式响应格式错误：未找到 outputs.text 字段');
        }
        
        return {
          code: 200,
          data: {
            answer: answer
          }
        };
      }
      
      // 处理 blocking 模式响应
      const data = await res.json();
      
      // CoreAgent Workflows API 响应格式：
      // {
      //   workflow_run_id: string,
      //   task_id: string,
      //   data: {
      //     id: string,
      //     workflow_id: string,
      //     status: 'running' | 'succeeded' | 'failed' | 'stopped',
      //     outputs: {
      //       text: "```json\n{\"usage\": \"...\", \"changelog\": \"...\"}\n```"
      //     },
      //     error: string | null,
      //     ...
      //   }
      // }
      
      if (!data.data) {
        throw new Error('CoreAgent API 响应格式错误：缺少 data 字段');
      }
      
      const workflowData = data.data;
      
      // 检查执行状态
      if (workflowData.status === 'failed') {
        const errorMsg = workflowData.error || '工作流执行失败';
        throw new Error(`CoreAgent 工作流执行失败: ${errorMsg}`);
      }
      
      if (workflowData.status === 'stopped') {
        throw new Error('CoreAgent 工作流执行被停止');
      }
      
      // 从 outputs.text 中提取结果（只兼容这种格式）
      if (!workflowData.outputs || !workflowData.outputs.text) {
        throw new Error('CoreAgent API 响应格式错误：outputs.text 字段不存在');
      }
      
      const answer = workflowData.outputs.text;
      
      return {
        code: 200,
        data: {
          answer: answer
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
        console.warn(`⚠️ CoreAgent API 请求失败 (尝试 ${attempt}/${maxRetries}): ${error.message}`);
        console.log(`   等待 ${retryDelay}ms 后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      // 其他错误或重试次数用完，直接抛出
      throw error;
    }
  }
  
  // 所有重试都失败
  console.error(`❌ CoreAgent API 请求失败，已重试 ${maxRetries} 次`);
  throw lastError;
}

/** 3. 逻辑主入口 */
async function main() {
  const args = process.argv.slice(2);
  const pkgDir = args[args.indexOf('--dir') + 1];
  const aiContextStr = args[args.indexOf('--context') + 1];
  const aiContext = JSON.parse(aiContextStr);

  // 检查是否有新的 diffResult 格式（用于生成 usage.md 和 changelog.md）
  // 或者如果没有 usage 文档，需要首次生成
  const docsDir = path.join(pkgDir, 'docs');
  const usagePath = path.join(docsDir, 'usage.md');
  const hasUsageDoc = fs.existsSync(usagePath);
  
  if (aiContext.diffResult || !hasUsageDoc) {
    await generateUsageAndChangelog(pkgDir, aiContext);
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
  
  // 检查是否是首次生成（usage.md 不存在）
  const isFirstTime = !fs.existsSync(usagePath);
  
  // 检查版本是否更新（如果版本没有更新，不需要更新 changelog）
  let shouldUpdateChangelog = true;
  if (diffResult && diffResult.type !== 'version_change') {
    // 如果不是版本变更，检查现有 changelog 是否已经包含当前版本
    if (existingChangelog) {
      // 检查 changelog 中是否已经包含当前版本
      const versionPattern = new RegExp(`##\\s+${version.replace(/\./g, '\\.')}`, 'i');
      if (versionPattern.test(existingChangelog)) {
        shouldUpdateChangelog = false;
        console.log(`ℹ️ 版本 ${version} 已在 changelog.md 中存在，跳过更新 changelog`);
      }
    }
  } else if (!diffResult) {
    // 如果没有 diffResult（首次生成），需要生成 changelog
    shouldUpdateChangelog = true;
  }
  
  // 如果没有 diffResult，尝试从包路径推断工作区和分类
  let workspace = 'unknown';
  let category = 'unknown';
  if (diffResult) {
    workspace = diffResult.workspace || 'unknown';
    category = diffResult.category || 'unknown';
  } else {
    // 从 pkgDir 路径推断
    const relPath = path.relative(repoRoot, pkgDir);
    const parts = relPath.split(path.sep).filter(Boolean);
    const workspaceIndex = parts.findIndex(p => p === 'workspaces');
    if (workspaceIndex !== -1 && parts[workspaceIndex + 1]) {
      workspace = parts[workspaceIndex + 1];
    }
    const packagesIndex = parts.findIndex(p => p === 'packages');
    if (packagesIndex !== -1 && parts[packagesIndex + 1]) {
      category = parts[packagesIndex + 1];
    }
  }
  
  // 构建组件列表信息
  const componentsInfo = allComponents.length > 0 
    ? allComponents.map(c => `- ${c.name}: ${(c.apiContent || '').substring(0, 200)}`).join('\n')
    : '无组件信息';

  // 构建变更信息部分（如果有 diffResult）
  const changeInfoSection = diffResult ? `
## 变更信息
- 变更类型: ${diffResult.type}
- 变更摘要: ${diffResult.summary}
- 受影响文件: ${diffResult.affected_files.join(', ')}
- 代码变更:
\`\`\`
${diffResult.diff_content.substring(0, 8000)}
\`\`\`
` : `
## 变更信息
- 这是首次生成文档，没有变更信息
`;

  const prompt = `
请根据以下信息生成或更新依赖库的 usage.md 和 changelog.md 文档。

## 依赖库信息
- 包名: ${packageName}
- 版本: ${version}
- 工作区: ${workspace}
- 分类: ${category}
- 技术栈: ${stack}

## 包含的组件
该依赖库包含以下组件：
${componentsInfo}

## 组件 API 定义
\`\`\`
${allApiContent.substring(0, 8000)}
\`\`\`
${changeInfoSection}
## 现有文档
### 现有 usage.md:
${existingUsage || '(空 - 首次生成)'}

### 现有 changelog.md:
${existingChangelog || '(空 - 首次生成)'}

## 任务要求
请生成或更新以下两个文档：

1. **usage.md**: 
   - 前端依赖库是指开发者自行开发或引入的组件、逻辑，用于满足定制化需求和功能扩展。这些库可被用于自定义界面样式、交互效果、组件功能，或者整合特定的第三方服务（例如微信SDK、钉钉SDK），并且能够被导入到Codewave低代码平台中供开发使用。 
   - 我们需要以依赖库为维度生成文档，不是单个组件
   ${isFirstTime ? '- **这是首次生成，请创建完整的依赖库使用文档，包括：' : '- 如果是首次生成，请创建完整的依赖库使用文档，包括：'}
     * 依赖库介绍（说明该依赖库的用途和功能）
     * 包含的组件和逻辑列表（列出所有组件和逻辑名称）
     * 每个组件和逻辑的功能说明（简要说明每个组件和逻辑的作用和逻辑）
     * API 说明（汇总所有组件和逻辑的 API）
   - 如果是更新，请根据本次变更增量更新相关内容
   - **重要：不要生成代码示例，只说明功能和逻辑**
   - 保持文档结构清晰，使用 Markdown 格式

2. **changelog.md**:
${shouldUpdateChangelog 
  ? (diffResult 
    ? `   - 在文档顶部添加新版本条目（格式：## ${version}）
   - 根据变更类型和摘要，生成相应的变更说明
   - 如果是 version_change，说明版本升级原因
   - 如果是 logic_change，说明功能变更或修复（说明哪些组件受到影响）
   - 如果是 style_change，说明样式调整
   - 如果是 config_change，说明配置变更
   - 保持与现有 changelog 格式一致`
    : `   - 这是首次生成 changelog，请创建初始版本条目（格式：## ${version}）
   - 说明这是初始版本，包含所有现有组件和功能`)
  : `   - **重要：版本 ${version} 没有更新，请保持现有 changelog.md 内容不变，不要添加新版本条目**
   - 只返回现有的 changelog.md 内容，不要做任何修改`}

请以 JSON 格式返回，包含两个字段：
{
  "usage": "完整的 usage.md 内容",
  "changelog": ${shouldUpdateChangelog 
    ? '"完整的 changelog.md 内容（包含新版本条目和现有内容）"' 
    : '"保持现有的 changelog.md 内容不变（如果版本未更新，直接返回现有内容）"'}
}
  `;

  console.log(`🤖 正在请求智能体生成文档 [${path.basename(pkgDir)}]...`);
  const result = await callAgent({prompt});

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
        
        // 只有在需要更新 changelog 时才写入
        if (parsed.changelog && shouldUpdateChangelog) {
          fs.writeFileSync(changelogPath, parsed.changelog);
          console.log(`✅ changelog.md 已生成/更新: ${changelogPath}`);
        } else if (!shouldUpdateChangelog) {
          console.log(`ℹ️ 版本未更新，跳过 changelog.md 更新`);
        }
        
        // 不在这里提交，由 generate-diff-docs.mjs 统一提交
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
        
        if (changelogMatch && shouldUpdateChangelog) {
          fs.writeFileSync(changelogPath, changelogMatch[1].trim());
          console.log(`✅ changelog.md 已生成/更新: ${changelogPath}`);
        } else if (!shouldUpdateChangelog) {
          console.log(`ℹ️ 版本未更新，跳过 changelog.md 更新`);
        } else if (!usageMatch) {
          // 如果都找不到，将整个响应作为 usage.md
          fs.writeFileSync(usagePath, responseText);
          console.log(`✅ usage.md 已生成（完整响应）: ${usagePath}`);
        }
        
        // 不在这里提交，由 generate-diff-docs.mjs 统一提交
      }
    } catch (parseError) {
      console.error(`❌ 解析响应失败: ${parseError.message}`);
      console.error(`响应内容: ${result.data.answer.substring(0, 500)}`);
    }
  } else {
    console.error(`❌ 智能体返回异常:`, result.message || result);
  }
}

main().catch(console.error);