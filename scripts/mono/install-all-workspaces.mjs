#!/usr/bin/env node
/**
 * 安装代理：在根 install 后，自动分别进入每个子 workspace 执行 pnpm install
 * 目标：新人只需在根执行一次 `pnpm i`，其余由脚本代理完成
 */
import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");

const WORKSPACE_ROOTS = [
  "workspaces/legacy-yaml",
  "workspaces/ts-vue2",
  "workspaces/ts-vue3",   // 预留将来
  "workspaces/react"      // 预留将来
];

const CONCURRENCY = Math.max(1, Math.min(os.cpus().length, 4)); // 控制并发，避免 I/O 抖动
const VERBOSE = process.argv.includes("--verbose");

function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }

function isWorkspaceRoot(dir) {
  // 识别一个目录是否是“子 workspace 根”
  if (!fs.statSync(dir).isDirectory()) return false;
  const hasWs = exists(path.join(dir, "pnpm-workspace.yaml"));
  const hasPkg = exists(path.join(dir, "package.json"));
  // 至少要有 package.json；若有 pnpm-workspace.yaml 则更明确
  return hasPkg && (hasWs || true);
}

function findSubWorkspaces() {
  const found = [];
  for (const base of WORKSPACE_ROOTS) {
    const abs = path.join(ROOT, base);
    if (!exists(abs)) continue;
    if (isWorkspaceRoot(abs)) {
      found.push(abs);
      continue;
    }
    // 有些人会多包裹一层目录，这里扫描一层
    for (const name of fs.readdirSync(abs)) {
      const dir = path.join(abs, name);
      if (exists(dir) && isWorkspaceRoot(dir)) found.push(dir);
    }
  }
  // 去重 & 排序稳定
  return Array.from(new Set(found)).sort((a, b) => a.localeCompare(b));
}

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, stdio: VERBOSE ? "inherit" : "pipe", shell: process.platform === "win32" });
    let out = "", err = "";
    if (!VERBOSE) {
      child.stdout.on("data", d => out += d.toString());
      child.stderr.on("data", d => err += d.toString());
    }
    child.on("close", code => resolve({ code, out, err }));
  });
}

async function withPool(items, worker, limit = CONCURRENCY) {
  const results = new Array(items.length);
  let idx = 0;
  const runners = new Array(limit).fill(0).map(async () => {
    while (idx < items.length) {
      const cur = idx++;
      results[cur] = await worker(items[cur], cur);
    }
  });
  await Promise.all(runners);
  return results;
}

(async () => {
  const subRoots = findSubWorkspaces();
  if (!subRoots.length) {
    console.log("⚠️ 未找到任何子 workspace；已跳过。");
    process.exit(0);
  }

  console.log("📦 将初始化以下子 workspace：\n" + subRoots.map(p => " - " + path.relative(ROOT, p)).join("\n"));

  const t0 = Date.now();
  const results = await withPool(subRoots, async (dir) => {
    const rel = path.relative(ROOT, dir);
    console.log(`\n▶︎ [${rel}] pnpm install`);
    // 使用 --prefer-offline 加速；如需严格一致性可去掉
    const r = await run("pnpm", ["install", "--prefer-offline"], dir);
    return { dir: rel, ...r };
  });

  // 汇总
  const failed = results.filter(r => r.code !== 0);
  const succeeded = results.filter(r => r.code === 0);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ 成功：${succeeded.length}  ·  ❌ 失败：${failed.length}  ·  ⏱️ 耗时：${Math.round((Date.now()-t0)/1000)}s`);
  if (failed.length) {
    console.log("\n失败清单：");
    for (const f of failed) {
      console.log(` - ${f.dir}`);
      if (!VERBOSE) {
        // 打印关键摘要，避免刷屏
        const snippet = (f.err || f.out || "").split("\n").slice(-30).join("\n");
        console.log(snippet);
      }
    }
    process.exit(1);
  }
})();