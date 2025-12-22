#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

/* ----------------------- 1. 环境初始化 ----------------------- */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 自动寻找仓库根目录，定位 pnpm-workspace.yaml 所在位置 */
function findRepoRoot(start) {
  let dir = start;
  while (true) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) || fs.existsSync(path.join(dir, ".git"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}

const repoRoot = findRepoRoot(path.resolve(__dirname));
const workspacesRoot = path.join(repoRoot, "workspaces");
const debug = (msg) => console.error(`[DEBUG] ${msg}`);
const IGNORE_DIRS = new Set(["node_modules", "dist", "build", "lib", ".git", ".turbo", "coverage"]);

/* ----------------------- 2. 增量识别逻辑 ----------------------- */

/** 获取 Git 变动文件列表（返回相对于 repoRoot 的路径） */
function getChangedFiles(range) {
  if (!range) return null;
  try {
    debug(`Checking git diff for range: ${range}`);
    // --name-only 返回的是相对于仓库根目录的路径，如 "workspaces/ts-vue2/packages/cw/btn/index.js"
    const output = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, encoding: "utf8" });
    return output.split("\n").filter(Boolean).map(f => f.trim());
  } catch (e) {
    debug(`Git diff failed: ${e.message}. Falling back to full scan or empty.`);
    return null;
  }
}

/* ----------------------- 3. 深度组件扫描 ----------------------- */

/** 递归扫描所有包含 api.yaml 或 api.ts 的组件 */
function findComponentPackages(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // 检查当前目录下是否有 API 特征文件
    const hasApiYaml = entries.find(e => e.isFile() && (e.name === "api.yaml" || e.name === "api.yml"));
    const hasApiTs = entries.find(e => e.isFile() && e.name === "api.ts");

    if (hasApiYaml || hasApiTs) {
      // 向上溯源寻找 package.json 确定包根目录
      let currentDir = dir;
      let pkg = null;
      while (currentDir.startsWith(workspacesRoot)) {
        const pjPath = path.join(currentDir, "package.json");
        if (fs.existsSync(pjPath)) {
          pkg = JSON.parse(fs.readFileSync(pjPath, "utf8"));
          break;
        }
        currentDir = path.dirname(currentDir);
      }

      if (pkg && pkg.name) {
        result.push({
          dir: currentDir, // package.json 所在目录
          relDir: path.relative(repoRoot, currentDir), // 相对路径用于 Diff 匹配
          name: pkg.name,
          apiPath: path.join(dir, hasApiYaml ? hasApiYaml.name : "api.ts"),
          isYaml: !!hasApiYaml
        });
        return result; // 找到组件后停止向下递归
      }
    }

    // 继续递归子目录
    for (const ent of entries) {
      if (ent.isDirectory() && !IGNORE_DIRS.has(ent.name)) {
        findComponentPackages(path.join(dir, ent.name), result);
      }
    }
  } catch (e) {
    debug(`Read Error ${dir}: ${e.message}`);
  }
  return result;
}

/* ----------------------- 4. 生成构建计划 ----------------------- */

function makePlan() {
  const isAll = process.env.PLAN_ALL === "1";
  // 优先级：参数传入 > 环境默认 > HEAD^...HEAD
  const range = isAll ? null : (process.argv[2] || "HEAD^...HEAD");
  
  const changedFiles = getChangedFiles(range);
  const allComponents = findComponentPackages(workspacesRoot);
  
  debug(`Found ${allComponents.length} components total in workspaces.`);

  const include = allComponents.filter(c => {
    // 全量模式直接通过
    if (isAll) return true;
    // 增量模式：匹配相对路径
    if (!changedFiles) return false;
    return changedFiles.some(f => f.startsWith(c.relDir));
  }).map(c => {
    // 文档标识符切换为 usage.md
    const usagePath = path.join(c.dir, "usage.md");
    const hasUsage = fs.existsSync(usagePath);
    
    return {
      name: c.name,
      dir: c.dir,
      relDir: c.relDir,
      // 分流：api.yaml -> Node 16; api.ts -> Node 18
      node: c.isYaml ? "16" : "18",
      build: c.isYaml ? ["npm run build", "npm run usage"] : ["npm run build"],
      aiContext: {
        // 如果没有 usage.md 或有改动，则标记需要 AI 处理
        shouldUpdateDoc: !hasUsage || !isAll,
        isFirstTime: !hasUsage,
        apiType: c.isYaml ? "yaml" : "ts",
        // 提取 API 定义供 AI 生成文档
        apiContent: fs.readFileSync(c.apiPath, "utf8").substring(0, 4000)
      }
    };
  });

  return {
    range: isAll ? "ALL" : range,
    include
  };
}

/* ----------------------- 5. 执行与输出 ----------------------- */
const plan = makePlan();
process.stdout.write(JSON.stringify(plan, null, 2));
debug(`Plan generated: ${plan.include.length} components included.`);