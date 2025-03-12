/**
 * @param {string} data <true> 需要解密的内容
 * @param {string} key <true> 加密的key
 * @param {string} iv <true> 加密的iv
 * @returns {string} result
 */
import CryptoJS from 'crypto-js';
export default (data, key, iv) => {
    // console.log(CryptoJS);
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(data, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
    // TODO
};
