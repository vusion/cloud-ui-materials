/**
 * @param {string} source <true> 需要加密的字符串
 * @param {number|string} startCount <false> 首部保留的字符数
 * @param {number|string} endCount <false> 尾部保留的字符数
 * @param {string} ch <false> 替换的字符
 * @param {boolean} reverseMode <false> 是否将标记替换和保留集合的互换
 * @returns {string} result
 */
export default (source, startCount = 0, endCount = 0, ch = '*', reverseMode = false) => {
    const len = source.length;
    if (typeof startCount === 'string' && startCount.endsWith('%')) {
        startCount = Math.floor((len * 1 * startCount.slice(0, -1)) / 100);
    } else {
        startCount = 1 * startCount;
    }
    if (typeof endCount === 'string' && endCount.endsWith('%')) {
        endCount = Math.floor((len * 1 * endCount.slice(0, -1)) / 100);
    } else {
        endCount = 1 * endCount;
    }
    return Array.from(source)
        .map((char, idx) => {
            if (idx < startCount) return reverseMode ? ch : char;
            if (len - idx <= endCount) return reverseMode ? ch : char;
            return reverseMode ? char : ch;
        })
        .join('');
};
