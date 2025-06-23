/** 
 * @param {string} options <false> 编码
 * @returns {string} result 
 */
export default (str)=>{
    const text = window.atob(str);
    return text;
}