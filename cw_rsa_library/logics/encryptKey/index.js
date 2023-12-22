/** 
 * @param {string} options <false> 这是一个描述
 * @returns {string} result 
 */
import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';
export default (publicKey, password, type = "RSAOAEP") => {
    console.log('公钥：', publicKey);
    const keyObj = KEYUTIL.getKey(publicKey);
    console.log(keyObj,222);
    const encryptPwd = KJUR.crypto.Cipher.encrypt(encodeURI(password), keyObj ,type)
    console.log('密文：', encryptPwd)
    return encryptPwd
}