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

const exists = (p) => { try { fs.accessSync(p); return true; } catch { return false; } };
const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

function listWorkspacePackages() {
  const result = [];
  (function walk(dir) {
    if (!exists(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue;
        const pj = path.join(full, "package.json");
        if (exists(pj)) { result.push({ dir: full, pkg: readJSON(pj) }); continue; }
        walk(full);
      }
    }
  })(pkgsRoot);
  return result;
}

/** 从文件反推其所属包（最近的 package.json，且在 packages/ 下） */
function resolvePackageRootForFile(file) {
  let cur = path.dirname(file);
  while (cur.startsWith(repoRoot)) {
    const pj = path.join(cur, "package.json");
    if (exists(pj) && cur.startsWith(pkgsRoot)) return cur;
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return null;
}

/** 递归查找 api.yaml / api.ts */
function detectApiType(pkgDir) {
  let foundYaml = null, foundTs = null;
  (function walk(dir) {
    if (!exists(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (IGNORE_DIRS.has(ent.name)) continue;
        if (foundYaml && foundTs) return;
        walk(full);
      } else if (ent.isFile()) {
        if (ent.name === "api.yaml") foundYaml = full;
        if (ent.name === "api.ts")   foundTs  = full;
        if (foundYaml && foundTs) return;
      }
    }
  })(pkgDir);

  if (foundYaml && foundTs) return { type: "conflict", yamlPath: foundYaml, tsPath: foundTs };
  if (foundYaml) return { type: "yaml", yamlPath: foundYaml };
  if (foundTs)   return { type: "ts",   tsPath:   foundTs   };
  return { type: "none" };
}

/** 读取依赖版本 */
function getDepsVersion(pkg, name) {
  const s = (pkg.dependencies && pkg.dependencies[name]) ||
            (pkg.devDependencies && pkg.devDependencies[name]) ||
            (pkg.peerDependencies && pkg.peerDependencies[name]);
  return typeof s === "string" ? s : null;
}

/** 简单判断主版本 */
function detectStack(pkg, apiInfo) {
  const vueVer = getDepsVersion(pkg, "vue");
  const vue3 = vueVer && /^(\^|~|>=|<=|>|<)?\s*3(\D|$)/.test(vueVer);
  const vue2 = vueVer && /^(\^|~|>=|<=|>|<)?\s*2(\D|$)/.test(vueVer);
  const hasReact = !!getDepsVersion(pkg, "react") || !!getDepsVersion(pkg, "react-dom");
  const hasCompilerSfc = !!getDepsVersion(pkg, "@vue/compiler-sfc");

  // 优先级：vue2(yaml) > vue2(ts) > vue3 > react
  if (apiInfo.type === "yaml") return "vue2(api.yaml)";
  if (apiInfo.type === "ts" && vue2) return "vue2(api.ts)";
  if (vue3 || hasCompilerSfc) return "vue3";
  if (hasReact) return "react";
  if (apiInfo.type === "ts") return "vue2(api.ts)"; // 兜底：未标明vue版本但有api.ts，归入vue2(ts)
  return "unknown";
}

/** 选取 diff 范围 */
function pickDiffRange() {
  const argsRange = process.argv.slice(2).find(a => a.includes("..."));
  const envBase = process.env.GITHUB_BASE_SHA || process.env.BASE_SHA || process.env.PR_BASE_SHA;
  const envHead = process.env.GITHUB_SHA      || process.env.HEAD_SHA || "HEAD";
  if (process.argv.includes("--all") || process.env.PLAN_ALL === "1") return null;
  if (envBase) return `${envBase}...${envHead}`;
  if (argsRange) return argsRange;
  return "HEAD^...HEAD";
}

/** 改动文件列表 */
function changedFiles(range) {
  if (range === null) return [];
  try {
    const out = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, stdio: ["ignore","pipe","pipe"] });
    return out.toString("utf8").split("\n").map(s => s.trim()).filter(Boolean);
  } catch {
    try {
      const out = execSync(`git fetch origin main --depth=1 >/dev/null 2>&1 || true; git diff --name-only origin/main...HEAD`, { cwd: repoRoot, shell: "/bin/bash" });
      return out.toString("utf8").split("\n").map(s => s.trim()).filter(Boolean);
    } catch { return []; }
  }
}

/* ----------------------- 生成计划 ----------------------- */

function makePlan() {
  const workspaces = listWorkspacePackages();
  const range = pickDiffRange();

  const selected = new Map(); // dir -> {dir,pkg}
  if (range === null) {
    for (const w of workspaces) selected.set(w.dir, w);
  } else {
    for (const f of changedFiles(range)) {
      const abs = path.join(repoRoot, f);
      const root = resolvePackageRootForFile(abs);
      if (root) selected.set(root, { dir: root, pkg: readJSON(path.join(root,"package.json")) });
    }
  }

  if (selected.size === 0) return { range, include: [] };

  const include = [];
  for (const { dir, pkg } of selected.values()) {
    const name = pkg.name || path.basename(dir);
    const apiInfo = detectApiType(dir);
    const stack = detectStack(pkg, apiInfo);

    let nodeVersion = null, buildCmds = [], artifacts = [], error = undefined;

    if (apiInfo.type === "yaml") {
      nodeVersion = "14";
      buildCmds = ["npm install --legacy-peer-deps", "npm run build", "npm run usage"];
      artifacts = ["*@*.*.*.zip", "dist-theme"];
    } else if (apiInfo.type === "ts") {
      nodeVersion = "18";
      buildCmds = ["npm install --legacy-peer-deps", "npm run build"];
      artifacts = ["*@*.*.*.zip"];
    } else if (apiInfo.type === "conflict") {
      error = `Both api.yaml and api.ts detected.\n  yaml: ${apiInfo.yamlPath}\n  ts:   ${apiInfo.tsPath}`;
    } else {
      error = "No api.yaml or api.ts found, skipped by plan.";
    }

    include.push({ name, dir, node: nodeVersion, build: buildCmds, artifacts, stack, error });
  }

  include.sort((a,b)=>a.name.localeCompare(b.name));
  return { range, include };
}

/* ----------------------- 主流程 ----------------------- */
console.log(JSON.stringify(makePlan(), null, 2));
