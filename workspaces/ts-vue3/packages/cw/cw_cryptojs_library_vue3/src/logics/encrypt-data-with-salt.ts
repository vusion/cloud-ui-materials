import '@nasl/types';
import forge from 'node-forge';

/**
 * @NaslLogic
 * @type both
 * @title 加盐加密
 * @description 加盐加密算法
 * @param data 待加密数据
 * @param secretKey 密钥
 * @returns 加密结果
 */
export function encryptDataWithSalt(
  data: nasl.core.String,
  secretKey: nasl.core.String,
): nasl.core.String {
  const salt = forge.random.getBytesSync(16);
  const iv = forge.random.getBytesSync(16);

  const key = forge.pkcs5.pbkdf2(secretKey, salt, 1000, 16);

  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data, 'utf8'));
  cipher.finish();

  const encoded = forge.util.encode64(salt + iv + cipher.output.getBytes());
  return encoded;
}
