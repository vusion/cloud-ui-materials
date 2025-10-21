#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/* ----------------------- 基础工具 ----------------------- */

const repoRoot = process.cwd();
const pkgsRoot = path.join(repoRoot, "packages");

const IGNORE_DIRS = new Set([
  "node_modules", "dist", "build", "lib",
  ".git", ".turbo", ".nx", ".next", ".cache", "coverage"
]);

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

function listWorkspacePackages() {
  const result = [];

  function walk(dir) {
    if (!exists(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue;
        const pkgJson = path.join(full, "package.json");
        if (exists(pkgJson)) {
          result.push({ dir: full, pkg: readJSON(pkgJson) });
          // 不再下钻：认为 package.json 是包根
          continue;
        }
        walk(full);
      }
    }
  }

  walk(pkgsRoot);
  return result;
}

/** 从文件反推其所属包（最近的 package.json，且在 packages/ 下） */
function resolvePackageRootForFile(file) {
  let cur = path.dirname(file);
  while (cur.startsWith(repoRoot)) {
    const pj = path.join(cur, "package.json");
    if (exists(pj) && cur.startsWith(pkgsRoot)) {
      return cur;
    }
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return null;
}

/** 递归查找 api.yaml / api.ts（任意深度），命中即记录路径 */
function detectApiType(pkgDir) {
  let foundYaml = null;
  let foundTs = null;

  function walk(dir) {
    if (!exists(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue;
        // 两者都已找到就提前返回提速
        if (foundYaml && foundTs) return;
        walk(full);
      } else if (ent.isFile()) {
        if (ent.name === "api.yaml") foundYaml = full;
        if (ent.name === "api.ts")   foundTs  = full;
        if (foundYaml && foundTs) return;
      }
    }
  }

  walk(pkgDir);

  if (foundYaml && foundTs) {
    return { type: "conflict", yamlPath: foundYaml, tsPath: foundTs };
  }
  if (foundYaml) return { type: "yaml", yamlPath: foundYaml };
  if (foundTs)   return { type: "ts",   tsPath:   foundTs   };
  return { type: "none" };
}

/** 选取本次 diff 范围 */
function pickDiffRange() {
  const argsRange = process.argv.slice(2).find(a => a.includes("..."));
  const envBase = process.env.GITHUB_BASE_SHA || process.env.BASE_SHA || process.env.PR_BASE_SHA;
  const envHead = process.env.GITHUB_SHA      || process.env.HEAD_SHA || "HEAD";

  if (process.argv.includes("--all") || process.env.PLAN_ALL === "1") {
    return null; // 特殊值：表示全量
  }

  if (envBase) return `${envBase}...${envHead}`;
  if (argsRange) return argsRange;

  // 默认：上一次提交到当前提交
  return "HEAD^...HEAD";
}

/** 取改动文件列表 */
function changedFiles(range) {
  if (range === null) return []; // 全量模式由上层处理
  try {
    const out = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, stdio: ["ignore","pipe","pipe"] });
    return out.toString("utf8").split("\n").map(s => s.trim()).filter(Boolean);
  } catch (e) {
    // 回退到与 main 比较（有些 CI merge 前没有 HEAD^）
    try {
      const out = execSync(`git fetch origin main --depth=1 >/dev/null 2>&1 || true; git diff --name-only origin/main...HEAD`, { cwd: repoRoot, shell: "/bin/bash" });
      return out.toString("utf8").split("\n").map(s => s.trim()).filter(Boolean);
    } catch {
      return [];
    }
  }
}

/* ----------------------- 生成计划 ----------------------- */

function makePlan() {
  const workspaces = listWorkspacePackages();
  const range = pickDiffRange();

  let selected = new Map(); // dir -> {dir, pkg}

  if (range === null) {
    // 全量：全部包
    for (const w of workspaces) selected.set(w.dir, w);
  } else {
    const files = changedFiles(range);
    for (const f of files) {
      const abs = path.join(repoRoot, f);
      const root = resolvePackageRootForFile(abs);
      if (root) {
        const pj = path.join(root, "package.json");
        if (exists(pj)) selected.set(root, { dir: root, pkg: readJSON(pj) });
      }
    }
  }

  // 没有命中改动包：输出空计划（CI 可直接跳过）
  if (selected.size === 0) {
    return { range, include: [] };
  }

  const include = [];
  for (const { dir, pkg } of selected.values()) {
    const name = pkg.name || path.basename(dir);
    const apiInfo = detectApiType(dir);

    let nodeVersion = null;
    let buildCmds = [];
    let artifacts = [];
    let error = undefined;

    if (apiInfo.type === "yaml") {
      nodeVersion = "14";
      buildCmds = [
        "npm install --legacy-peer-deps",
        "npm run build",
        "lcap usage",
      ];
      artifacts = ["*@*.*.*.zip", "dist-theme"];
    } else if (apiInfo.type === "ts") {
      nodeVersion = "18";
      buildCmds = [
        "npm install --legacy-peer-deps",
        "npm run build",
      ];
      artifacts = ["*@*.*.*.zip"];
    } else if (apiInfo.type === "conflict") {
      error = `Both api.yaml and api.ts detected (should be mutually exclusive).\n  yaml: ${apiInfo.yamlPath}\n  ts:   ${apiInfo.tsPath}`;
    } else {
      // 未检测到 api 文件：可以按项目需要选择跳过或给默认策略
      // 这里选择“跳过构建但记录原因”
      error = "No api.yaml or api.ts found, skipped by plan.";
    }

    include.push({
      name,
      dir,
      node: nodeVersion,
      build: buildCmds,
      artifacts,
      error
    });
  }

  // 稳定排序（按 name）
  include.sort((a, b) => a.name.localeCompare(b.name));

  return { range, include };
}

/* ----------------------- 主流程 ----------------------- */

const plan = makePlan();
console.log(JSON.stringify(plan, null, 2));