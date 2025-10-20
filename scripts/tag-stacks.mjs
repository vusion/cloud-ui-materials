import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
function readJSON(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function writeJSON(p, obj){ fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n'); }

function detectStack(pkgJson){
  if (pkgJson?.['x-stack']) return String(pkgJson['x-stack']);
  const deps = { ...(pkgJson.dependencies||{}), ...(pkgJson.peerDependencies||{}) };
  if (deps.react) return 'react';
  const vue = deps.vue || '';
  if (/^(\^|~)?2(\.|$)/.test(vue)) return 'vue2';
  if (vue) return 'vue3';
  return 'agnostic'; // 无栈/工具库
}

const pkgsRoot = path.join(ROOT, 'packages');
const domains = fs.existsSync(pkgsRoot) ? fs.readdirSync(pkgsRoot) : [];
let updated = 0;

for (const d of domains) {
  const domainDir = path.join(pkgsRoot, d);
  if (!fs.statSync(domainDir).isDirectory()) continue;
  for (const p of fs.readdirSync(domainDir)) {
    const pkgDir = path.join(domainDir, p);
    if (!fs.existsSync(path.join(pkgDir, 'package.json'))) continue;

    const pkgJsonPath = path.join(pkgDir, 'package.json');
    const projJsonPath = path.join(pkgDir, 'project.json');

    const pkgJson = readJSON(pkgJsonPath);
    const stack = detectStack(pkgJson);
    const tag = `stack:${stack}`;

    // 1) 同步到 project.json.tags
    let projJson = { name: `${d}-${p}`, sourceRoot: `${pkgDir}/src`, targets: {} };
    if (fs.existsSync(projJsonPath)) projJson = readJSON(projJsonPath);
    const tags = new Set([...(projJson.tags||[]), tag]);
    projJson.tags = Array.from(tags);

    // 2) 同步到 package.json.keywords
    const kw = new Set([...(pkgJson.keywords||[])]);
    kw.add(tag);
    pkgJson.keywords = Array.from(kw);

    writeJSON(projJsonPath, projJson);
    writeJSON(pkgJsonPath, pkgJson);

    console.log(`✅ ${d}/${p} -> ${tag}`);
    updated++;
  }
}

console.log(`\nDone. Updated ${updated} projects.`);