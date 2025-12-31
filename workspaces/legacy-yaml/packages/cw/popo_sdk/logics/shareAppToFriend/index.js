/** 
 * @param {string} shmobileurl <false> 
 * @param {string} shtitle <false> 
 * @param {string} shcontent <false> 
 * @param {string} shpcurl <false> 
 * @param {string} shiconurl <false> 
 * @returns {string} return 
 */
import { pp } from "@popo-bridge/web"
export default (...options)=>{
    const [shmobileurl,shtitle,shcontent,shpcurl,shiconurl] =options
    pp.shareAppToFriend({
        shmobileurl,
        shtitle,
        shcontent,
        shpcurl,
        shiconurl,
    });
}