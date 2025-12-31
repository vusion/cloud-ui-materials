#!/usr/bin/env node
/* eslint-disable no-console */
import fs from "fs/promises";
import fssync from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ------------------ repo root (robust) ------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function findRepoRoot(start) {
  let dir = start;
  while (true) {
    if (fssync.existsSync(path.join(dir, ".git")) ||
        fssync.existsSync(path.join(dir, "pnpm-lock.yaml")) ||
        fssync.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}
const repoRoot = findRepoRoot(path.resolve(__dirname));
const sourceRoot = path.join(repoRoot, "packages"); // 现有结构：packages/{biz}/{component}
const workspacesRoot = path.join(repoRoot, "workspaces");

// ------------------ config ------------------
const families = {
  legacy: "legacy-yaml", // 命中 api.yaml/yml
  vue2: "ts-vue2",       // api.ts + vue2
  vue3: "ts-vue3",       // api.ts + vue3
  react: "ts-react",     // api.ts + react
  unknown: "ts-unknown"  // 兜底
};
const dryRun = !process.argv.includes("--apply");
const writeTags = true;
const MAX_DEPTH = 6;      // 递归深度上限
const MAX_FILES = 5000;   // 安全阈值，避免极端目录卡死
let visitedFiles = 0;

const targetPackagesDir = (family) =>
  path.join(workspacesRoot, families[family], "packages");

// ------------------ utils ------------------
async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
async function readJSON(p) {
  try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return null; }
}
function coerceVersionRange(v) {
  if (!v) return null;
  const m = String(v).match(/(\d+)\.(\d+)\.(\d+)/) || String(v).match(/(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2] || 0) };
}

// ------------------ deep API scanning ------------------

async function scanForApiFile(rootDir) {
  // 精准候选（相对路径）
  const prioritizedPatterns = [
    path.join("components"),
    path.join("src", "components"),
  ];

  // 快速直查（常见固定位置）
  for (const base of prioritizedPatterns) {
    const yaml1 = path.join(rootDir, base, "api.yaml");
    const yaml2 = path.join(rootDir, base, "api.yml");
    const ts1   = path.join(rootDir, base, "api.ts");
    if (await pathExists(yaml1)) return { kind: "yaml", file: yaml1 };
    if (await pathExists(yaml2)) return { kind: "yaml", file: yaml2 };
    if (await pathExists(ts1))   return { kind: "ts",   file: ts1   };
  }

  // 递归扫描（限制深度 & 文件数）
  async function walk(dir, depth, mustContainComponents = true) {
    if (depth > MAX_DEPTH || visitedFiles > MAX_FILES) return null;
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); }
    catch { return null; }

    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        const sub = await walk(
          p,
          depth + 1,
          mustContainComponents && !p.includes(`${path.sep}components${path.sep}`) && !p.endsWith(`${path.sep}components`)
        );
        if (sub) return sub;
      } else {
        visitedFiles++;
        const name = ent.name.toLowerCase();
        if (mustContainComponents) {
          // 只在包含 /components/ 的路径下认 api 文件（你们的约定）
          if (!p.includes(`${path.sep}components${path.sep}`)) continue;
        }
        if (name === "api.yaml" || name === "api.yml") {
          return { kind: "yaml", file: p };
        }
        if (name === "api.ts") {
          return { kind: "ts", file: p };
        }
      }
    }
    return null;
  }

  // 先严格在 components/** 下找
  const strictHit = await walk(rootDir, 0, true);
  if (strictHit) return strictHit;

  // 再宽松兜底：放开 components 限制（以防个别包不按约定放置）
  const looseHit = await walk(rootDir, 0, false);
  if (looseHit) return looseHit;

  return null;
}

// ------------------ family decision ------------------
function decideFamilyByPkgJson(pkgJson, { nameHint }) {
  const d = {
    ...(pkgJson.dependencies || {}),
    ...(pkgJson.devDependencies || {}),
    ...(pkgJson.peerDependencies || {})
  };

  // 名称强提示
  const hint = (nameHint || "").toLowerCase();
  if (hint.includes("vue3")) return "vue3";
  if (hint.includes("vue2")) return "vue2";
  if (hint.includes("react")) return "react";

  // 依赖判定（vue 优先于 react，避免两者皆有时误判）
  if (d.vue) {
    const v = coerceVersionRange(d.vue);
    if (v) {
      if (v.major >= 3) return "vue3";
      if (v.major === 2) return "vue2";
    }
    return "vue2";
  }
  if (d.react || d["react-dom"]) return "react";

  return "unknown";
}

async function decideFamily(componentDir) {
  const apiHit = await scanForApiFile(componentDir);
  const nameHint = path.basename(componentDir);
  const pkg = await readJSON(path.join(componentDir, "package.json")) || {};

  if (apiHit?.kind === "yaml") return { family: "legacy", meta: `yaml:${path.relative(componentDir, apiHit.file)}` };
  if (apiHit?.kind === "ts") {
    const fam = decideFamilyByPkgJson(pkg, { nameHint });
    return { family: fam, meta: `ts:${path.relative(componentDir, apiHit.file)}` };
  }

  // 两个都没命中：依赖/名称推断
  const fam = decideFamilyByPkgJson(pkg, { nameHint }) || "unknown";
  return { family: fam, meta: "none" };
}

function addTagsToPkgJson(pkg, family, biz) {
  const tags = new Set([
    ...((pkg.turbo && pkg.turbo.tags) || []),
    `family:${families[family]}`,
    `biz:${biz}`,
    "kind:component",
  ]);
  pkg.turbo = Object.assign({}, pkg.turbo || {}, { tags: Array.from(tags) });

  const kw = new Set([...(pkg.keywords || []), ...pkg.turbo.tags]);
  pkg.keywords = Array.from(kw);
  return pkg;
}

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }

async function moveComponent({ fromDir, toDir }) {
  await ensureDir(path.dirname(toDir));
  await fs.rename(fromDir, toDir);
}

function fmtRow(row, widths) {
  const pad = (s, w) => (s + " ".repeat(w)).slice(0, w);
  const meta = row.meta ? ` [${row.meta}]` : "";
  return [
    pad(row.family, widths.family),
    pad(row.biz, widths.biz),
    pad(row.comp, widths.comp),
    (row.from + "  ->  " + row.to + meta)
  ].join(" | ");
}

// ------------------ main scan & run ------------------
async function scan() {
  const result = [];
  if (!(await pathExists(sourceRoot))) {
    console.error(`Source directory not found: ${sourceRoot}`);
    process.exit(1);
  }

  const bizDirs = (await fs.readdir(sourceRoot, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const biz of bizDirs) {
    const bizPath = path.join(sourceRoot, biz);
    const comps = (await fs.readdir(bizPath, { withFileTypes: true }))
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const comp of comps) {
      const compPath = path.join(bizPath, comp);
      visitedFiles = 0; // reset counter per component
      const { family, meta } = await decideFamily(compPath);

      const toBase = targetPackagesDir(family);
      const toDir = path.join(toBase, biz, comp);
      result.push({ biz, comp, family, from: compPath, to: toDir, meta });
    }
  }
  return result;
}

async function main() {
  const moves = await scan();

  // 输出计划
  const widths = {
    family: Math.max(12, ...moves.map(m => String(m.family).length)),
    biz:    Math.max(6,  ...moves.map(m => m.biz.length)),
    comp:   Math.max(18, ...moves.map(m => m.comp.length)),
  };

  console.log("\nPlanned moves:");
  console.log("-".repeat(100));
  for (const m of moves) console.log(fmtRow(m, widths));
  console.log("-".repeat(100));
  console.log(dryRun
    ? "\nDry run: no files will be moved. Use --apply to execute.\n"
    : "\nAPPLY mode: moving files...\n");

  if (dryRun) return;

  // 真正执行移动
  for (const m of moves) {
    // 写 turbo.tags
    if (writeTags) {
      const pkgPath = path.join(m.from, "package.json");
      const pkg = await readJSON(pkgPath);
      if (pkg) {
        const updated = addTagsToPkgJson(pkg, m.family, m.biz);
        await fs.writeFile(pkgPath, JSON.stringify(updated, null, 2) + "\n", "utf8");
      }
    }

    await ensureDir(path.join(targetPackagesDir(m.family), m.biz));
    if (await pathExists(m.to)) {
      const alt = m.to + "-" + Date.now();
      console.warn(`WARN: target exists, renaming to ${alt}`);
      m.to = alt;
    }
    await moveComponent({ fromDir: m.from, toDir: m.to });
    console.log(`Moved: ${m.from} -> ${m.to}`);
  }

  console.log("\nAll done ✅");
  console.log("Next steps:");
  console.log("  1) 在各 workspaces/<family>/ 下放入 .npmrc / pnpm-workspace.yaml / .nvmrc");
  console.log("  2) 分别执行安装：pnpm -C workspaces/ts-vue2 install 等");
  console.log("  3) 用 Turbo 分批构建：npx turbo run build --filter='#family:ts-vue2'");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});