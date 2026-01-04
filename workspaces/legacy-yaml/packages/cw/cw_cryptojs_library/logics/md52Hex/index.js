import CryptoJs from 'crypto-js';

/**
 * @param {string} str <false> 这是一个描述
 * @returns {string} result
 */
export default (str) => {
    // TODO
    return CryptoJs.MD5(str).toString(CryptoJs.enc.Hex);
};
