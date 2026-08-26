import '@nasl/types';
import JSEncrypt from 'jsencrypt';

/**
 * @NaslLogic
 * @type both
 * @title RSA加密内容
 * @description RSA 加密内容
 * @param content 加密内容
 * @param publicKey 公钥
 * @returns 加密结果
 */
export function encryptContentByARS(
  content: nasl.core.String,
  publicKey: nasl.core.String,
): nasl.core.String {
  if (!content || !publicKey) return '';
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
    ${publicKey}
    -----END PUBLIC KEY-----`);
  return encrypt.encrypt(content) || '';
}
