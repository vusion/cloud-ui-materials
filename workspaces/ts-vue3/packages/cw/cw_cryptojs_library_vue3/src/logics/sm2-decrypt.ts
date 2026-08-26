import '@nasl/types';
import { sm2 } from 'sm-crypto';

/**
 * @NaslLogic
 * @type both
 * @title SM2解密
 * @description sm2 解密
 * @param encryptedData 密文
 * @param privateKey 私钥
 * @returns 解密结果
 */
export function sm2Decrypt(
  encryptedData: nasl.core.String,
  privateKey: nasl.core.String,
): nasl.core.String {
  let data = encryptedData;
  if (data.startsWith('04')) {
    data = data.slice(2);
  }
  return sm2.doDecrypt(data, privateKey, 0);
}
