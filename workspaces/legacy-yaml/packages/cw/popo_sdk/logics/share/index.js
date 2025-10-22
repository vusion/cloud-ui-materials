/** 
 * @param {string} mobileurl <false> 
 * @param {string} title <false> 
 * @param {string} content <false> 
 * @param {string} contentUrl <false> 
 * @returns {string} result 
 */
import { pp } from "@popo-bridge/web"
export default async (options)=>{
    // TODO
    try {
        const [mobileurl,title,content,contentUrl] = options
        const isShared= await pp.share({
                mobileurl,title,content,contentUrl
        });
        return isShared
    } catch (error) {
        return error.message
    }
}