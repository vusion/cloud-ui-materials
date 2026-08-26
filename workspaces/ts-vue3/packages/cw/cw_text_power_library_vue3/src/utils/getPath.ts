export function getPath<T = unknown>(
  object: Record<string, unknown> | null | undefined,
  path: string[],
  defaultValue?: T,
): T | undefined {
  let result: unknown = object;
  for (const key of path) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }
  return (result === undefined ? defaultValue : result) as T | undefined;
}
