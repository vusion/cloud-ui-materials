/**
 * @param {string} data <true> 需要解密的内容
 * @param {string} key <true> 加密的key
 * @param {string} iv <true> 加密的iv
 * @returns {string} result
 */
import CryptoJS from 'crypto-js';
export default (data, key, iv) => {
    function hex2str(hex) {
        if (!hex) {
            return '';
        }
        let trimedStr = hex.trim();
        let rawStr =
            trimedStr.substr(0, 2).toLowerCase() === '0x'
                ? trimedStr.substr(2)
                : trimedStr;
        let len = rawStr.length;
        if (len % 2 !== 0) {
            alert('非法格式的ASCII代码!');
            return '';
        }
        let curCharCode;
        let resultStr = [];
        for (let i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
        }
        return resultStr.join('');
    }
    if (data === undefined) {
        return data;
    }
    // console.log(CryptoJS);
    const keyHex = CryptoJS.enc.Utf8.parse(hex2str(key));
    const ivHex = CryptoJS.enc.Utf8.parse(hex2str(iv));
    const decrypted = CryptoJS.TripleDES.decrypt(data, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
    // TODO
};
