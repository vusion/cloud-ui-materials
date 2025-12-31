#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../");
const workspacesRoot = path.join(repoRoot, "workspaces");
const debug = (msg) => console.error(`[DEBUG] ${msg}`);

/* ----------------------- 1. 基础逻辑 ----------------------- */
function getChangedFiles(range) {
  if (!range) return null;
  try {
    const output = execSync(`git diff --name-only ${range}`, { cwd: repoRoot, encoding: "utf8" });
    return output.split("\n").filter(Boolean).map(f => f.trim());
  } catch (e) { return null; }
}

function findComponentPackages(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasApiYaml = entries.find(e => e.isFile() && (e.name === "api.yaml" || e.name === "api.yml"));
  const hasApiTs = entries.find(e => e.isFile() && e.name === "api.ts");

  if (hasApiYaml || hasApiTs) {
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
        dir: currentDir,
        relDir: path.relative(repoRoot, currentDir),
        name: pkg.name,
        version: pkg.version,
        apiPath: path.join(dir, hasApiYaml ? (hasApiYaml.name) : "api.ts"),
        isYaml: !!hasApiYaml,
        dependencies: { ...pkg.dependencies, ...pkg.devDependencies }
      });
      return result;
    }
  }
  for (const ent of entries) {
    if (ent.isDirectory() && !["node_modules", "dist", ".git"].includes(ent.name)) {
      findComponentPackages(path.join(dir, ent.name), result);
    }
  }
  return result;
}

/* ----------------------- 2. 依赖追踪与分组 ----------------------- */
function makePlan() {
  const isAll = process.env.PLAN_ALL === "1";
  const testPackage = process.env.TEST_PACKAGE;
  const range = isAll ? null : (process.argv[2] || "HEAD^...HEAD");
  const changedFiles = getChangedFiles(range);
  const allComponents = findComponentPackages(workspacesRoot);

  // 识别直接变动的包
  let affectedDirs = new Set();
  if (testPackage) {
    // 测试模式：只构建指定的包
    debug(`测试模式：查找包 "${testPackage}"`);
    const targetPkg = allComponents.find(c => 
      c.name === testPackage || 
      c.name.includes(testPackage) ||
      c.relDir.includes(testPackage)
    );
    if (targetPkg) {
      affectedDirs.add(targetPkg.dir);
      debug(`找到包: ${targetPkg.name} (${targetPkg.relDir})`);
    } else {
      console.error(`❌ 未找到包 "${testPackage}"`);
      console.error(`可用包列表（前20个）:`);
      allComponents.slice(0, 20).forEach(c => {
        console.error(`  - ${c.name} (${c.relDir})`);
      });
      process.exit(1);
    }
  } else if (isAll) {
    allComponents.forEach(c => affectedDirs.add(c.dir));
  } else if (changedFiles) {
    allComponents.forEach(c => {
      if (changedFiles.some(f => f.startsWith(c.relDir))) affectedDirs.add(c.dir);
    });
  }

  // 依赖追踪：如果 A 变了，找出所有依赖 A 的包 B
  const finalAffected = new Set(affectedDirs);
  allComponents.forEach(c => {
    for (const dir of affectedDirs) {
      const sourcePkg = allComponents.find(item => item.dir === dir);
      if (sourcePkg && c.dependencies[sourcePkg.name]) {
        finalAffected.add(c.dir);
      }
    }
  });

  const include = allComponents.filter(c => finalAffected.has(c.dir)).map(c => {
    const hasUsage = fs.existsSync(path.join(c.dir, "usage.md"));
    return {
      name: c.name,
      version: c.version,
      // dir: c.dir,
      relDir: c.relDir,
      node: c.isYaml ? "16" : "18",
      build: c.isYaml ? ["npm run build", "npm run usage"] : ["npm run build"],
      hasUsage: hasUsage,
      // apiPath: c.apiPath,
      // aiContext: { shouldUpdateDoc: !hasUsage || !isAll, isFirstTime: !hasUsage }
    };
  });

  // 分片逻辑：解决 256 矩阵限制，每组处理 10 个包
  const batchSize = 20;
  const batches = [];
  for (let i = 0; i < include.length; i += batchSize) {
    const items = include.slice(i, i + batchSize);
    batches.push({ id: `batch-${i / batchSize}`, items });
  }

  return { include: batches };
}

process.stdout.write(JSON.stringify(makePlan()));