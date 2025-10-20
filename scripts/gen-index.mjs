import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const pkgsRoot = path.join(ROOT, 'packages');
let rows = [];

for (const domain of fs.readdirSync(pkgsRoot)) {
  const domainDir = path.join(pkgsRoot, domain);
  if (!fs.statSync(domainDir).isDirectory()) continue;

  for (const p of fs.readdirSync(domainDir)) {
    const pkgDir = path.join(domainDir, p);
    const pkgJsonPath = path.join(pkgDir, 'package.json');
    const projJsonPath = path.join(pkgDir, 'project.json');
    if (!fs.existsSync(pkgJsonPath) || !fs.existsSync(projJsonPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath,'utf8'));
    const proj = JSON.parse(fs.readFileSync(projJsonPath,'utf8'));
    const name = pkg.name || `${domain}-${p}`;
    const desc = pkg.description || '';
    const tags = (proj.tags || []).filter(t => t.startsWith('stack:'));
    const stack = tags[0]?.replace('stack:','') || 'agnostic';
    const readme = fs.existsSync(path.join(pkgDir,'README.md')) ? `packages/${domain}/${p}/README.md` : '';
    rows.push({ name, stack, path: `packages/${domain}/${p}`, desc, readme });
  }
}

rows.sort((a,b)=> a.stack.localeCompare(b.stack) || a.name.localeCompare(b.name));

const md = `# 组件索引 / Component Index

> 按技术栈筛选： [All](#list) | [Vue2](#vue2) | [Vue3](#vue3) | [React](#react) | [Agnostic](#agnostic)

## <a id="list"></a>All
| Package | Stack | Path | Description |
|---|---|---|---|
${rows.map(r=>`| \`${r.name}\` | ${r.stack} | \`${r.path}\` | ${r.desc.replace(/\|/g,'\\|')} |`).join('\n')}

## <a id="vue2"></a>Vue2
${table(rows.filter(r=>r.stack==='vue2'))}

## <a id="vue3"></a>Vue3
${table(rows.filter(r=>r.stack==='vue3'))}

## <a id="react"></a>React
${table(rows.filter(r=>r.stack==='react'))}

## <a id="agnostic"></a>Agnostic
${table(rows.filter(r=>r.stack==='agnostic'))}

`;

function table(list){
  if(!list.length) return '_No items_';
  return `| Package | Path | Description |
|---|---|---|
${list.map(r=>`| \`${r.name}\` | \`${r.path}\` | ${r.desc.replace(/\|/g,'\\|')} |`).join('\n')}`;
}

fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/INDEX.md', md);
console.log('✅ docs/INDEX.md generated. Items:', rows.length);
