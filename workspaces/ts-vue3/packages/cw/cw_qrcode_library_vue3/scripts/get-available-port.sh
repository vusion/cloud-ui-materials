#!/usr/bin/env bash
# 获取可用端口号（49152-65535 动态端口范围）
# 用法: .specify/scripts/bash/get-available-port.sh

set -e

MIN_PORT=49152
MAX_PORT=65535
RANGE=$((MAX_PORT - MIN_PORT + 1))

# 尝试最多 100 次找到可用端口
for _ in $(seq 1 100); do
  # 生成随机端口
  port=$((MIN_PORT + RANDOM % RANGE))

  # 检查端口是否可用（nc -z 连接成功返回 0，即端口被占用）
  if command -v nc &>/dev/null; then
    if ! nc -z 127.0.0.1 "$port" 2>/dev/null; then
      echo "$port"
      exit 0
    fi
  elif command -v lsof &>/dev/null; then
    if ! lsof -i ":$port" &>/dev/null; then
      echo "$port"
      exit 0
    fi
  else
    # 无 nc/lsof 时直接返回随机端口（可能被占用，调用方需自行处理）
    echo "$port"
    exit 0
  fi
done

echo "错误：无法在 $MIN_PORT-$MAX_PORT 范围内找到可用端口" >&2
exit 1
