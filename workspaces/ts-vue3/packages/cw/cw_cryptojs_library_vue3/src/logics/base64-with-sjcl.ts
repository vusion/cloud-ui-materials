import '@nasl/types';
import sjcl from 'sjcl';

/**
 * @NaslLogic
 * @type both
 * @title Base64编码
 * @description 使用 sjcl 库完成 utf8 的 base64
 * @param string 原始字符串
 * @returns 加密后结果
 */
export function base64Withsjcl(string: nasl.core.String): nasl.core.String {
  return sjcl.codec.base64url.fromBits(sjcl.codec.utf8String.toBits(string));
}
