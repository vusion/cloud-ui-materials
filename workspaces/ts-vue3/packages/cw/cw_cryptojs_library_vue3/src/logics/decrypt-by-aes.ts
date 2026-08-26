import '@nasl/types';
import CryptoJS from 'crypto-js';

/**
 * @NaslLogic
 * @type both
 * @title AES解密
 * @description 执行 AES 解密逻辑
 * @param data 需要解密的内容
 * @param key 加密的key
 * @param iv 加密的iv
 * @returns 解密结果
 */
export function decryptByAes(
  data: nasl.core.String,
  key: nasl.core.String,
  iv: nasl.core.String,
): nasl.core.String {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  const decrypted = CryptoJS.AES.decrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
