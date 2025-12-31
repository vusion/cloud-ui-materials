/**
 * Git 相关工具函数
 * 统一提供 Git 操作的封装
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../");

/**
 * 执行 Git 命令
 * @param {string} command - Git 命令
 * @param {object} options - 执行选项
 * @returns {string} 命令输出
 */
export function execGitCommand(command, options = {}) {
  const {
    cwd = repoRoot,
    encoding = "utf8",
    maxBuffer = 10 * 1024 * 1024,
  } = options;
  try {
    return execSync(command, {
      encoding,
      maxBuffer,
      cwd,
      stdio: "pipe",
    }).trim();
  } catch (error) {
    throw new Error(`Git command failed: ${command}\n${error.message}`);
  }
}

/**
 * 获取两个 commit 之间的差异文件
 * @param {string} range - Git range (如: "HEAD^..HEAD" 或 "base...head")
 * @returns {string[]} 变更的文件路径数组
 */
export function getChangedFiles(range) {
  try {
    const output = execGitCommand(`git diff --name-only ${range}`, {
      cwd: repoRoot,
    });
    return output ? output.split("\n").filter(Boolean) : [];
  } catch (error) {
    console.warn(`⚠️ 获取变更文件失败: ${error.message}`);
    return [];
  }
}

/**
 * 获取 commit 信息
 * @param {string} range - Git range
 * @param {string} format - Git log format
 * @returns {string[]} Commit 信息数组
 */
export function getCommits(range, format = "%H|%h|%an|%s") {
  try {
    const output = execGitCommand(`git log --format='${format}' ${range}`, {
      cwd: repoRoot,
    });
    return output ? output.split("\n").filter(Boolean) : [];
  } catch (error) {
    console.warn(`⚠️ 获取 commit 信息失败: ${error.message}`);
    return [];
  }
}

/**
 * 配置 Git 用户信息（用于 CI）
 */
export function setupGitUser() {
  execGitCommand('git config user.name "github-actions[bot]"', {
    cwd: repoRoot,
  });
  execGitCommand(
    'git config user.email "github-actions[bot]@users.noreply.github.com"',
    { cwd: repoRoot }
  );
}
