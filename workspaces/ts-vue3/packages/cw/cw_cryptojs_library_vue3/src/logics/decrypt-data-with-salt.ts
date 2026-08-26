import '@nasl/types';
import forge from 'node-forge';

/**
 * @NaslLogic
 * @type both
 * @title 加盐解密
 * @description 加盐解密算法
 * @param encryptedData 加密数据
 * @param secretKey 密钥
 * @returns 解密结果
 */
export function decryptDataWithSalt(
  encryptedData: nasl.core.String,
  secretKey: nasl.core.String,
): nasl.core.String {
  const decodedData = forge.util.decode64(encryptedData);

  const salt = decodedData.substring(0, 16);
  const iv = decodedData.substring(16, 32);
  const ciphertext = decodedData.substring(32);

  const key = forge.pkcs5.pbkdf2(secretKey, salt, 1000, 16);

  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  decipher.start({ iv: iv });
  decipher.update(forge.util.createBuffer(ciphertext, 'raw'));
  if (!decipher.finish()) {
    throw new Error('Failed to decrypt data');
  }

  return decipher.output.toString('utf8');
}
