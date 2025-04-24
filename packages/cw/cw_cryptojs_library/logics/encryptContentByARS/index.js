import JSEncrypt from 'jsencrypt';
/** 
 * @param {string} content <true> 加密内容
 * @param {string} publicKey <true> 公钥
 * @returns {string} result 
 */
export default (content, publicKey)=>{
  if (!content || !publicKey) return '';
  // RSA 加密
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
    ${publicKey}
    -----END PUBLIC KEY-----`);
  // 返回十六进制字符串
  return encrypt.encrypt(content);
}