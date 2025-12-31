/**
 * 文件系统相关工具函数
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../");

/**
 * 获取仓库根目录
 */
export function getRepoRoot() {
  return repoRoot;
}

/**
 * 安全读取 JSON 文件
 * @param {string} filePath - 文件路径（相对或绝对）
 * @returns {object|null} JSON 对象，失败返回 null
 */
export function readJSON(filePath) {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(repoRoot, filePath);
    const content = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.warn(`⚠️ 读取 JSON 文件失败: ${filePath} - ${error.message}`);
    return null;
  }
}

/**
 * 安全写入 JSON 文件
 * @param {string} filePath - 文件路径
 * @param {object} data - 要写入的数据
 * @param {number} indent - 缩进空格数
 */
export function writeJSON(filePath, data, indent = 2) {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(repoRoot, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, JSON.stringify(data, null, indent), "utf8");
  } catch (error) {
    throw new Error(`写入 JSON 文件失败: ${filePath} - ${error.message}`);
  }
}

/**
 * 安全读取文本文件
 * @param {string} filePath - 文件路径
 * @returns {string|null} 文件内容，失败返回 null
 */
export function readFile(filePath) {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(repoRoot, filePath);
    return fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.warn(`⚠️ 读取文件失败: ${filePath} - ${error.message}`);
    return null;
  }
}

/**
 * 安全写入文本文件
 * @param {string} filePath - 文件路径
 * @param {string} content - 文件内容
 */
export function writeFile(filePath, content) {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(repoRoot, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, "utf8");
  } catch (error) {
    throw new Error(`写入文件失败: ${filePath} - ${error.message}`);
  }
}

/**
 * 检查文件或目录是否存在
 * @param {string} filePath - 文件路径
 * @returns {boolean}
 */
export function exists(filePath) {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(repoRoot, filePath);
  return fs.existsSync(fullPath);
}
