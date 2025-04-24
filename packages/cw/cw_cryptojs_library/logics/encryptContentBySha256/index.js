import CryptoJS from 'crypto-js';
/** 
 * @param {string} content <true> 加密内容
 * @returns {string} result 
 */
export default (content)=>{
  if (!content) return '';
  // 使用 SHA256 进行加密
  const hash = CryptoJS.SHA256(content);
  // 返回十六进制字符串
  return hash.toString();
}