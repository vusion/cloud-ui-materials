/** 
 * @param {string} content <false> base64内容
 * @param {string} fileName <false> file名称
 * @returns {string} result 
 */
export default (content,fileName ='example.txt')=>{
    const [fileType,fileContent] =  content.split(',')
    const byteString = atob(fileContent);  
    // 将二进制字符串转换为Uint8Array  
    const ab = new ArrayBuffer(byteString.length);  
    const ia = new Uint8Array(ab);  
    for (let i = 0; i < byteString.length; i++) {  
        ia[i] = byteString.charCodeAt(i);  
    }  
    const blob = new Blob([ab], { type: fileType.slice(5,-6) });  
    // 创建一个下载链接  
    const targetUrl = URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = targetUrl;  
    a.download = fileName; // 设置下载的文件名  
    a.click();  
    a = null
}