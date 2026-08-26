import '@nasl/types';

/**
 * @NaslLogic
 * @type both
 * @title 基于正则表达式脱敏
 * @description 基于正则表达式脱敏
 * @param source 需要加密的字符串
 * @param regex 正则表达式
 * @param ch 替换的字符
 * @param reverseMode 是否将标记替换和保留集合的互换
 * @returns 脱敏结果
 */
export function desensitizationFromRegex(
  source: nasl.core.String,
  regex: nasl.core.String,
  ch?: nasl.core.String,
  reverseMode?: nasl.core.Boolean,
): nasl.core.String {
  const maskChar = ch ?? '*';
  const reverse = reverseMode ?? false;
  let reg: RegExp;
  const regexInput = regex as unknown;

  if (typeof regexInput === 'string') {
    reg = new RegExp(regexInput, 'g');
  } else if (regexInput instanceof RegExp) {
    reg = new RegExp(regexInput.source, 'g');
  } else {
    throw new Error('[regex] params must be string or regex');
  }

  let match: RegExpExecArray | null;
  let startIndex = 0;
  const res: string[] = [];

  while ((match = reg.exec(source)) !== null) {
    const target = match[0];
    const targetIndex = match.index;
    const remainChunk = source.slice(startIndex, targetIndex);
    res.push(
      Array.from(remainChunk)
        .map((v) => (reverse ? maskChar : v))
        .join(''),
    );
    res.push(
      Array.from(target)
        .map((v) => (reverse ? v : maskChar))
        .join(''),
    );
    startIndex = target.length + targetIndex;
  }

  if (startIndex <= source.length) {
    const remainChunk = source.slice(startIndex);
    res.push(
      Array.from(remainChunk)
        .map((v) => (reverse ? maskChar : v))
        .join(''),
    );
  }

  return res.join('');
}
