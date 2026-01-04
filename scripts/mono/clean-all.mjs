#!/usr/bin/env node
/**
 * Deep Clean (recursive, all levels)
 * 删除仓库中所有层级的：
 * - node_modules / .pnpm-store / .pnpm / .turbo / dist / build / theme-dist / cache
 * - *.zip / *.tgz / *.tar.gz 产物包
 *
 * 选项：
 *   --dry  仅预览，不实际删除
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");

const DRY = process.argv.includes("--dry");

// 命中就删的目录名（所有层级，不保留根）
const DIR_MATCH = new Set([
  "node_modules",
  ".pnpm-store",
  ".pnpm",
  ".turbo",
  "dist",
  "build",
  "theme-dist",
  "cache"
]);

// 要删除的文件扩展名（小写比较）
const FILE_EXTS = new Set([".zip", ".tgz"]);
const FILE_SUFFIXES = [".tar.gz"]; // 两段扩展的情况

// 永远跳过的目录（避免误删仓库本体）
const SKIP_DIR = new Set([".git", ".svn", ".hg"]);

function rm(targetPath, isDir) {
  if (DRY) {
    console.log("🧪 预览删除：", targetPath);
    return;
  }
  try {
    if (isDir) {
      fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3 });
    } else {
      fs.rmSync(targetPath, { force: true, maxRetries: 3 });
    }
    console.log("🗑️ 已删除：", targetPath);
  } catch (e) {
    try {
      fs.chmodSync(targetPath, 0o700);
      if (isDir) {
        fs.rmSync(targetPath, { recursive: true, force: true, maxRetries: 3 });
      } else {
        fs.rmSync(targetPath, { force: true, maxRetries: 3 });
      }
      console.log("🗑️ 已删除(重试)：", targetPath);
    } catch (e2) {
      console.error("❌ 删除失败：", targetPath, "-", e2.message);
    }
  }
}

function matchRemovableFile(name) {
  const lower = name.toLowerCase();
  if (FILE_EXTS.has(path.extname(lower))) return true;
  // 处理 .tar.gz
  for (const suf of FILE_SUFFIXES) {
    if (lower.endsWith(suf)) return true;
  }
  return false;
}

function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return; // 没权限或目录已被删
  }

  for (const ent of entries) {
    const abs = path.join(dir, ent.name);

    // 跳过版本控制目录
    if (ent.isDirectory() && SKIP_DIR.has(ent.name)) continue;

    // 先处理目录命中（命中就直接删，不再深入）
    if (ent.isDirectory() && DIR_MATCH.has(ent.name)) {
      rm(abs, true);
      continue;
    }

    // 处理符号链接：若链接名命中，也直接删掉链接本身（不跟随）
    if (ent.isSymbolicLink()) {
      if (DIR_MATCH.has(ent.name) || matchRemovableFile(ent.name)) {
        rm(abs, false);
        continue;
      }
      // 其他符号链接不跟随，直接跳过，避免循环
      continue;
    }

    // 常规文件：命中扩展名则删除
    if (ent.isFile()) {
      if (matchRemovableFile(ent.name)) {
        rm(abs, false);
      }
      continue;
    }

    // 其他目录：递归
    if (ent.isDirectory()) {
      walk(abs);
    }
  }
}

(function main() {
  console.log("🚀 开始全仓库深度清理：", ROOT, DRY ? "(预览模式)" : "");
  walk(ROOT);
  console.log("✅ 清理完成。");
})();