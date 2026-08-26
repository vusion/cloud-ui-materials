import '@nasl/types';

/**
 * @NaslLogic
 * @type both
 * @title 基于首尾长度脱敏
 * @description 基于首尾长度脱敏
 * @param source 需要加密的字符串
 * @param startCount 首部保留的字符数
 * @param endCount 尾部保留的字符数
 * @param ch 替换的字符
 * @param reverseMode 是否将标记替换和保留集合的互换
 * @returns 脱敏结果
 */
export function desensitizationFromLength(
  source: nasl.core.String,
  startCount?: nasl.core.String | nasl.core.Integer,
  endCount?: nasl.core.String | nasl.core.Integer,
  ch?: nasl.core.String,
  reverseMode?: nasl.core.Boolean,
): nasl.core.String {
  const len = source.length;
  let start: string | number = startCount ?? 0;
  let end: string | number = endCount ?? 0;
  const maskChar = ch ?? '*';
  const reverse = reverseMode ?? false;

  if (typeof start === 'string' && start.endsWith('%')) {
    start = Math.floor((len * 1 * Number(start.slice(0, -1))) / 100);
  } else {
    start = 1 * (start as number);
  }
  if (typeof end === 'string' && end.endsWith('%')) {
    end = Math.floor((len * 1 * Number(end.slice(0, -1))) / 100);
  } else {
    end = 1 * (end as number);
  }

  return Array.from(source)
    .map((char, idx) => {
      if (idx < start) return reverse ? maskChar : char;
      if (len - idx <= end) return reverse ? maskChar : char;
      return reverse ? char : maskChar;
    })
    .join('');
}
