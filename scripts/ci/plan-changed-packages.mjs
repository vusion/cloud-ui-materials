import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const repoRoot = process.cwd();
const packagesRoot = path.join(repoRoot, 'packages');

// 读取改动文件（与主干对比）
function getChangedFiles() {
  // PR 场景：GITHUB_BASE_REF 存在；push 场景：取 origin/main
  const base = process.env.GITHUB_BASE_REF || 'origin/main';
  try {
    const out = execSync(`git diff --name-only ${base}...HEAD`, { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch {
    // 兜底：取最近一次 merge-base
    const baseSha = execSync('git merge-base HEAD origin/main', { encoding: 'utf8' }).trim();
    const out = execSync(`git diff --name-only ${baseSha}...HEAD`, { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  }
}

function withinPackage(pkgPath, file) {
  const rel = path.relative(pkgPath, path.join(repoRoot, file));
  return !rel.startsWith('..') && !path.isAbsolute(rel);
}

async function findPackages() {
  const firstLevel = await fs.readdir(packagesRoot, { withFileTypes: true });
  const pkgs = [];
  for (const d1 of firstLevel) {
    if (!d1.isDirectory()) continue;
    const layer = path.join(packagesRoot, d1.name);
    const secondLevel = await fs.readdir(layer, { withFileTypes: true }).catch(() => []);
    for (const d2 of secondLevel) {
      if (!d2.isDirectory()) continue;
      const pkgDir = path.join(layer, d2.name);
      const pkgJson = path.join(pkgDir, 'package.json');
      try {
        const raw = await fs.readFile(pkgJson, 'utf8');
        const json = JSON.parse(raw);
        pkgs.push({ name: json.name || d2.name, dir: pkgDir, json });
      } catch { /* ignore */ }
    }
  }
  return pkgs;
}

function decideTypeFlags(dir) {
  // 规则：同目录下二选一（互斥）
  const apiYaml = ['api.yaml', 'api.yml'].some(f => {
    try { return fs.stat(path.join(dir, f)); } catch { return false; }
  });
  // 允许在根或 src/ 下
  const apiTsCandidates = ['api.ts', 'src/api.ts'];
  const apiTs = apiTsCandidates.some(p => {
    try { return fs.stat(path.join(dir, p)); } catch { return false; }
  });
  return { hasApiYaml: !!apiYaml, hasApiTs: !!apiTs };
}

function buildPlan(pkg) {
  const { dir, name } = pkg;
  const { hasApiYaml, hasApiTs } = decideTypeFlags(dir);

  if (hasApiYaml && hasApiTs) {
    return {
      name,
      dir,
      node: '18', // 冲突时保守取 18 并直接报错
      build: [],
      error: 'Both api.yaml and api.ts detected (should be mutually exclusive).'
    };
  }

  if (hasApiYaml) {
    return {
      name,
      dir,
      node: '14',
      build: [
        'npm install --legacy-peer-deps',
        'npm run build',
        'npm run usage'
      ],
      artifacts: [
        // 产物：zip + dist-theme 文件夹
        '*@*.*.*.zip',
        'dist-theme'
      ]
    };
  }

  // 默认当成 api.ts（或纯组件）类型，走 Node 18
  return {
    name,
    dir,
    node: '18',
    build: [
      'npm install --legacy-peer-deps',
      'npm run build'
    ],
    artifacts: [
      '*@*.*.*.zip'
    ]
  };
}

(async () => {
  const changed = getChangedFiles();
  const pkgs = await findPackages();
  const changedPkgs = pkgs.filter(p => changed.some(f => withinPackage(p.dir, f)));

  const matrix = changedPkgs.map(buildPlan);

  // 输出给后续 Job 使用
  const out = {
    include: matrix
  };
  // 供 GitHub Actions 读取
  process.stdout.write(JSON.stringify(out));
})();