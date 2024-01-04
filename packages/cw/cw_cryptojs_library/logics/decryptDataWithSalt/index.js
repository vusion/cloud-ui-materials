/**
 * @param {string} encryptedData <true> 加密数据
 *  @param {string} secretKey <true> 密钥
 * @returns {string} result
 */
import forge from "node-forge";

export default (encryptedData, secretKey) => {
  const decodedData = forge.util.decode64(encryptedData);

  const salt = decodedData.substring(0, 16);
  const iv = decodedData.substring(16, 32);
  const ciphertext = decodedData.substring(32);

  const key = forge.pkcs5.pbkdf2(secretKey, salt, 1000, 16);

  const decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: iv });
  decipher.update(forge.util.createBuffer(ciphertext, "raw"));
  if (!decipher.finish()) {
    throw new Error("Failed to decrypt data");
  }

  return decipher.output.toString("utf8");
};
