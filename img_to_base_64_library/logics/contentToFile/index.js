/** 
 * @param {string} content <false> 文件内容
 * @param {string} type <false> 文件后缀
 * @param {string} filename <false> 文件
 * @returns {string} return 
 */
import mime from  "mime-types"
export default (content, fileType,filename="example") => {
    const type = mime.lookup(fileType)
    if (type.startsWith('image')) { 
        const byteCharacters = atob(content.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        content = new Uint8Array(byteNumbers);
    }
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob)
    let link = document.createElement('a');
    link.href = url
    link.download = filename+'.'+fileType;
    link.click();
    link = null
    // console.log(link);
    return url
}