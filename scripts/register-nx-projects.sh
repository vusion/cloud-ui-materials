#!/usr/bin/env bash
set -euo pipefail

for dir in packages/*/*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    parent="$(basename "$(dirname "$dir")")"      # e.g. cw / cust
    base="$(basename "$dir")"                    # e.g. cw_video_library
    proj="${parent}-${base}"                     # e.g. cw-cw_video_library (Nx project name 必须唯一 & 不含 /)
    src="$dir/src"

    # 如果没有 src 目录也无所谓，先填路径；真实 build 仍走 package 的 script
    mkdir -p "$dir"

    cat > "$dir/project.json" <<EOF
{
  "name": "$proj",
  "sourceRoot": "$src",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": { "command": "pnpm -C $dir run build" }
    },
    "lint": {
      "executor": "nx:run-commands",
      "options": { "command": "pnpm -C $dir run lint || echo 'no lint script'" }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": { "command": "pnpm -C $dir run test || echo 'no test script'" }
    }
  }
}
EOF

    echo "✅ Registered $proj  ($dir)"
  fi
done
