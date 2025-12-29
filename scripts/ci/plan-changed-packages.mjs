#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

/* ----------------------- 1. 环境与路径初始化 ----------------------- */
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
    // 获取变动文件的相对路径列表
    const output = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, encoding: "utf8" });
    return output.split("\n").filter(Boolean).map(f => f.trim());
  } catch (e) {
    debug(`Git diff failed: ${e.message}`);
    return null;
  }
}

/* ----------------------- 3. 深度扫描组件包 ----------------------- */

/** 递归扫描 workspaces 下所有包含 api.yaml 或 api.ts 的组件 */
function findComponentPackages(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // 检查特征文件：识别是 Legacy 还是 Modern
    const hasApiYaml = entries.find(e => e.isFile() && (e.name === "api.yaml" || e.name === "api.yml"));
    const hasApiTs = entries.find(e => e.isFile() && e.name === "api.ts");

    if (hasApiYaml || hasApiTs) {
      let currentDir = dir;
      let pkg = null;
      // 向上寻找 package.json 以确定组件包根目录
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
          dir: currentDir, 
          relDir: path.relative(repoRoot, currentDir),
          name: pkg.name,
          apiPath: path.join(dir, hasApiYaml ? hasApiYaml.name : "api.ts"),
          isYaml: !!hasApiYaml
        });
        return result; 
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

/* ----------------------- 4. 构建任务计划 ----------------------- */

function makePlan() {
  const isAll = process.env.PLAN_ALL === "1";
  const range = isAll ? null : (process.argv[2] || "HEAD^...HEAD");
  
  const changedFiles = getChangedFiles(range);
  const allComponents = findComponentPackages(workspacesRoot);
  
  debug(`Found ${allComponents.length} components total in workspaces.`);

  const include = allComponents.filter(c => {
    if (isAll) return true;
    if (!changedFiles) return false;
    // 增量过滤：只有当组件相对路径命中变动文件时才包含
    return changedFiles.some(f => f.startsWith(c.relDir));
  }).map(c => {
    // 文档标识符：判断 usage.md 是否存在
    const usagePath = path.join(c.dir, "usage.md");
    const hasUsage = fs.existsSync(usagePath);
    
    return {
      name: c.name,
      dir: c.dir,
      relDir: c.relDir,
      // Node 分流：Legacy (yaml) 使用 Node 16
      node: c.isYaml ? "16" : "18",
      build: c.isYaml ? ["npm run build", "npm run usage"] : ["npm run build"],
      aiContext: {
        // 如果没有 usage.md，则标记为初次生成
        shouldUpdateDoc: !hasUsage || !isAll,
        isFirstTime: !hasUsage,
        apiType: c.isYaml ? "yaml" : "ts",
        // 提取 API 定义作为 AI 的上下文输入
        apiContent: fs.readFileSync(c.apiPath, "utf8").substring(0, 4000)
      }
    };
  });

  return {
    range: isAll ? "ALL" : range,
    include
  };
}

/* ----------------------- 5. 输出结果 ----------------------- */
const plan = makePlan();
process.stdout.write(JSON.stringify(plan, null, 2));
debug(`Plan generated: ${plan.include.length} components included.`);