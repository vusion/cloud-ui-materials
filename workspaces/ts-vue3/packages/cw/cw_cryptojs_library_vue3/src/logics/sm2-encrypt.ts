import '@nasl/types';
import { sm2 } from 'sm-crypto';

/**
 * @NaslLogic
 * @type both
 * @title SM2加密
 * @description sm2 加密
 * @param originalData 内容
 * @param publicKey 公钥
 * @returns 加密结果
 */
export function sm2Encrypt(
  originalData: nasl.core.String,
  publicKey: nasl.core.String,
): nasl.core.String {
  return sm2.doEncrypt(originalData, publicKey, 0);
}
