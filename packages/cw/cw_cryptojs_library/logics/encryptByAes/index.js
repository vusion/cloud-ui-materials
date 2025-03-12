/** 
 * @param {string} data <true> 需要加密的内容
 * @param {string} key <true> 加密的key
 * @param {string} iv <true> 加密的iv
 * @returns {string} result 
 */
import  CryptoJS  from "crypto-js"
export default (data, key, iv) => {

   
    // console.log(CryptoJS);
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const ivHex = CryptoJS.enc.Utf8.parse(iv)
    const encrypted = CryptoJS.AES.encrypt(data, keyHex, {  
        iv: ivHex,  
        mode: CryptoJS.mode.CBC,  
        padding: CryptoJS.pad.Pkcs7  
    })
    return encrypted.toString()
    // TODO
}