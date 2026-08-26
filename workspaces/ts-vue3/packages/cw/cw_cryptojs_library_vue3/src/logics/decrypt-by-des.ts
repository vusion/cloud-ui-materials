import '@nasl/types';
import CryptoJS from 'crypto-js';
import { hex2str } from './hex2str';

/**
 * @NaslLogic
 * @type both
 * @title DES解密
 * @description Des 解密
 * @param data 需要解密的内容
 * @param key 加密的key
 * @param iv 加密的iv
 * @returns 解密结果
 */
export function decryptByDes(
  data: nasl.core.String,
  key: nasl.core.String,
  iv: nasl.core.String,
): nasl.core.String {
  if (data === undefined) {
    return data;
  }
  const keyHex = CryptoJS.enc.Utf8.parse(hex2str(key));
  const ivHex = CryptoJS.enc.Utf8.parse(hex2str(iv));
  const decrypted = CryptoJS.TripleDES.decrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
