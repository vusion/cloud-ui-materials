/** 
 * @param {string} options <false> 这是一个描述
 * @returns {string} result 
 */
import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';
export default (privateKey,key,type="RSAOAEP")=>{
    // TODO
    const keyObj = KEYUTIL.getKey(privateKey);
    const str = decodeURI(
      KJUR.crypto.Cipher.decrypt(key, keyObj , type) || '',
    );
    console.log('明文:', str);
    return str
}