/** 
 * @param {string} str <false> 解码
 * @returns {string} result 
 */
export default (str)=>{
    const encodedText =window.btoa(str);
    return encodedText;
}