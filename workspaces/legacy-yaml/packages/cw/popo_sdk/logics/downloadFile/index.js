/** 
 * @param {string} url <false> 这是一个描述
 * @param {string} path <false> 这是一个描述
 * @returns {string} return 
 */
import { pp } from "@popo-bridge/web"
export default async (url,path)=>{
    // TODO
    try {
       const result  = await pp.downloadFile({
            url,
            headers: {},
            path,
            onprogress: (progress) => {
                console.log('progress:', progress)
              },
       });
        if (!result.success) {
            throw new Error(result.message || '文件下载失败')
        } else {
            const isDone = await pp.previewFile({ path: result.uri });
            return result.uri
        }
    } catch (err) {
        alert(JSON.stringify(err.message))
        // catch or throw, this is a question
        }
}