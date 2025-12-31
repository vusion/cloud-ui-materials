/** 
 * @param {string} rsa <true> 加密私钥
 * @returns {string} result 
 */
import forge from 'node-forge';

const generateNonce = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);

  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
export default (rsa)=>{
  const privateKey = forge.pki.privateKeyFromPem(`-----BEGIN PRIVATE KEY-----\n${rsa}\n-----END PRIVATE KEY-----`);

  // 生成时间戳和随机数
  const timestamp = Date.now().toString();
  const nonce = generateNonce();
  const dataToSign = timestamp + nonce;

  // 创建签名
  const md = forge.md.sha256.create();
  md.update(dataToSign, 'utf8');
  const signature = privateKey.sign(md);

  const result = {
    timestamp,
    nonce,
    sign: forge.util.encode64(signature),
  };
  return JSON.stringify(result);
}