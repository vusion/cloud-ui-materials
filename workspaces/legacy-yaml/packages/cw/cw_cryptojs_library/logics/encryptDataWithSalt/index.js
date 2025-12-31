/**
 * @param {string} data <true> 待加密数据
 *  @param {string} secretKey <true> 密钥
 * @returns {string} result
 */

import forge from "node-forge";

export default (data, secretKey) => {
  const salt = forge.random.getBytesSync(16);
  const iv = forge.random.getBytesSync(16);

  const key = forge.pkcs5.pbkdf2(secretKey, salt, 1000, 16);

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data, "utf8"));
  cipher.finish();

  const encoded = forge.util.encode64(salt + iv + cipher.output.getBytes());
  return encoded;
};
