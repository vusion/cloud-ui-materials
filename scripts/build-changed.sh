#!/usr/bin/env bash
set -euo pipefail

STACK_FILTER="${1:-}"   # vue2 | vue3 | react | agnostic | 留空不过滤
git fetch -q origin main || true

# 收集工作树改动（未提交、已暂存、未跟踪）
changed_files=$(
  {
    git diff --name-only || true
    git diff --cached --name-only || true
    git ls-files --others --exclude-standard || true
  } | sort -u | tr '\n' ' '
)

echo "📄 changed_files: ${changed_files:-<none>}"

# 选受影响项目
if [ -n "${changed_files// /}" ]; then
  echo "🔎 Using working tree changes"
  set +e
  AFFECTED=$(npx nx print-affected --select=projects --files $changed_files 2>&1)
  status=$?
  set -e
  if [ $status -ne 0 ]; then
    echo "$AFFECTED"
    echo "❌ print-affected with --files failed. Falling back to origin/main..HEAD"
    AFFECTED=$(npx nx print-affected --select=projects --base=origin/main --head=HEAD)
  fi
else
  echo "🔎 No local changes. Comparing origin/main..HEAD"
  AFFECTED=$(npx nx print-affected --select=projects --base=origin/main --head=HEAD)
fi

AFFECTED=$(echo "$AFFECTED" | tr -d '\r')
if [ -z "$AFFECTED" ]; then
  echo "ℹ️  No affected projects."
  exit 0
fi

# 栈过滤
FILTERED=""
for proj in $AFFECTED; do
  meta=$(npx nx show project "$proj" --json)
  if [ -z "$STACK_FILTER" ]; then
    FILTERED="$FILTERED $proj"
  else
    echo "$meta" | node -e "
      const fs=require('fs'); const m=JSON.parse(fs.readFileSync(0,'utf8'));
      const tags=m.tags||[]; process.exit(tags.includes('stack:${STACK_FILTER}')?0:1);
    " && FILTERED="$FILTERED $proj" || true
  fi
done

FILTERED=$(echo "$FILTERED" | xargs -n1 | sort -u | xargs || true)
if [ -z "$FILTERED" ]; then
  echo "ℹ️  No affected projects match stack filter '${STACK_FILTER:-<none>}'."; exit 0;
fi

echo "🧩 Affected projects: $FILTERED"
for p in $FILTERED; do
  echo "▶️  nx run $p:build"
  npx nx run "$p:build"
done