/** 
 * @param {string} action <false> 行为
 * @param {string} key <false> 内容
 * @param {string} value <false> 值
 * @returns {string} result 
 */
export default (action, key, value) => {
    // TODO
    if (window.gio) {
        window.gio(action, key, value);
    } else {
        return 'gio is not defined'
    }
}