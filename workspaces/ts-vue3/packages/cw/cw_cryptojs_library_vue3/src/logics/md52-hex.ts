import '@nasl/types';
import CryptoJS from 'crypto-js';

/**
 * @NaslLogic
 * @type both
 * @title MD5转Hex
 * @description md52hex
 * @param str 待计算字符串
 * @returns MD5 十六进制摘要
 */
export function md52Hex(str: nasl.core.String): nasl.core.String {
  return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
}
