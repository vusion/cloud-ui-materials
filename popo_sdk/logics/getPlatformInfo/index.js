/** 
 * @returns {PlatformInfo} result 
 */
import { pp } from "@popo-bridge/web"
export default async ()=>{
    // TODO
    const platformInfo = await pp.getPlatformInfo()
    return platformInfo
}