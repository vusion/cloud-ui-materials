#!/usr/bin/env node
/**
 * 将 printExp.html 中根元素 #printBody 的每一个直接子节点用
 * <div data-hg-print-item>...</div> 包裹（与 hg-print-item 组件的 DOM 一致）。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const inputPath = path.join(rootDir, 'printExp.html');
const outputPath = path.join(rootDir, 'printExp.html');

const html = fs.readFileSync(inputPath, 'utf8');

// 匹配任意开始标签（含属性）或自闭合/注释等
const TAG_OPEN = /<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?\/?>|<(!--[\s\S]*?--)>/g;
const TAG_CLOSE = /<\/([a-zA-Z][a-zA-Z0-9]*)>/g;

function findDirectChildrenContent(html) {
  // 找到根 div 开始：第一个 <div 且含 id="printBody"
  const rootStart = html.indexOf('id="printBody"');
  if (rootStart === -1) return { beforeRootEnd: html, children: [], afterRootClose: '' };
  const openDiv = html.lastIndexOf('<div', rootStart);
  const rootContentStart = html.indexOf('>', openDiv) + 1;
  let depth = 1;
  let i = rootContentStart;
  const children = [];
  let currentStart = rootContentStart;
  let inTag = false;
  let tagName = '';
  let lastCloseEnd = rootContentStart;

  while (i < html.length && depth > 0) {
    if (depth === 0) break;
    const rest = html.slice(i);
    const openMatch = rest.match(/^<([a-zA-Z][a-zA-Z0-9]*)(\s|>)/);
    const closeMatch = rest.match(/^<\/([a-zA-Z][a-zA-Z0-9]*)>/);
    const commentMatch = rest.match(/^<!--[\s\S]*?-->/);

    if (commentMatch && depth === 1) {
      const full = commentMatch[0];
      children.push({ type: 'comment', raw: full });
      i += full.length;
      currentStart = i;
      continue;
    }
    if (openMatch) {
      const tag = openMatch[1].toLowerCase();
      if (tag !== 'br' && tag !== 'hr' && tag !== 'img' && tag !== 'input' && tag !== 'meta' && tag !== 'link') {
        if (depth === 1) currentStart = i;
        depth++;
      }
      const angle = rest.indexOf('>');
      i += angle + 1;
      continue;
    }
    if (closeMatch && depth > 0) {
      depth--;
      if (depth === 1) {
        const closeLen = closeMatch[0].length;
        const childHtml = html.slice(currentStart, i + closeLen);
        children.push({ type: 'element', raw: childHtml });
        i += closeLen;
        currentStart = i;
        lastCloseEnd = i;
      } else {
        i += closeMatch[0].length;
      }
      continue;
    }
    if (depth === 1 && (rest.startsWith('\n') || rest.startsWith('\r')) && currentStart === i) {
      const lineEnd = rest.search(/[\n\r]/);
      const line = rest.slice(0, lineEnd + 1);
      const trimmed = line.replace(/^\s+|\s+$/g, '');
      if (trimmed) {
        children.push({ type: 'text', raw: line });
      }
      i += line.length;
      currentStart = i;
      continue;
    }
    i++;
  }

  const rootContentEnd = i;
  const afterRootClose = html.slice(rootContentEnd);
  return {
    rootOpening: html.slice(0, rootContentStart),
    children,
    rootClosing: html.slice(rootContentEnd),
    afterRootClose,
  };
}

function wrap(html) {
  const { rootOpening, children, rootClosing } = findDirectChildrenContent(html);
  if (children.length === 0) return html;
  const wrapped = children
    .map((c) => {
      const raw = c.raw.trim();
      if (!raw) return '';
      return `<div data-hg-print-item>\n  ${c.raw.trim().replace(/\n/g, '\n  ')}\n</div>';
    })
    .filter(Boolean)
    .join('\n  ');
  return rootOpening + '\n  ' + wrapped + '\n' + rootClosing;
}

const result = wrap(html);
fs.writeFileSync(outputPath, result, 'utf8');
console.log('Done: wrapped', findDirectChildrenContent(html).children.length, 'direct child(ren) of #printBody with <div data-hg-print-item>.');
