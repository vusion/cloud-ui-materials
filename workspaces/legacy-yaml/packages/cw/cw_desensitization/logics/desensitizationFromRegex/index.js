/**
 * @param {string} source <true> 需要加密的字符串
 * @param {number} regex <true> 正则表达式
 * @param {string} ch <false> 替换的字符
 * @param {boolean} reverseMode <false> 是否将标记替换和保留集合的互换
 * @returns {string} result
 */
export default (source, regex, ch = '*', reverseMode = false) => {
    let reg = regex;
    if (typeof regex === 'string') {
        reg = new RegExp(regex, 'g');
    } else if (regex instanceof RegExp) {
        reg = new RegExp(regex.source, 'g');
    } else {
        throw new Error('[regex] params must be string or regex');
    }

    let match;
    let startIndex = 0;
    let res = [];
    while ((match = reg.exec(source)) !== null) {
        const target = match[0];
        const targetIndex = match.index;
        const remainChunk = source.slice(startIndex, targetIndex);
        res.push(
            Array.from(remainChunk)
                .map((v) => (reverseMode ? ch : v))
                .join('')
        );
        res.push(
            Array.from(target)
                .map((v) => (reverseMode ? v : ch))
                .join('')
        );
        startIndex = target.length + targetIndex;
    }
    if (startIndex <= source.length) {
        const remainChunk = source.slice(startIndex);
        res.push(
            Array.from(remainChunk)
                .map((v) => (reverseMode ? ch : v))
                .join('')
        );
    }
    return res.join('');
};
