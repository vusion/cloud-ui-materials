import sjcl from 'sjcl';

// doc: https://github.com/bitwiseshiftleft/sjcl
/**
 * @param {string} string <true> 原始字符串
 * @returns {string} 加密后结果
 */
export default (string) => {
    return sjcl.codec.base64url.fromBits(sjcl.codec.utf8String.toBits(string));
};
