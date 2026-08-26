import '@nasl/types';
import CryptoJS from 'crypto-js';

/**
 * @NaslLogic
 * @type both
 * @title AES加密
 * @description AES加密
 * @param data 需要加密的内容
 * @param key 加密的key
 * @param iv 加密的iv
 * @returns 加密结果
 */
export function encryptByAes(
  data: nasl.core.String,
  key: nasl.core.String,
  iv: nasl.core.String,
): nasl.core.String {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
