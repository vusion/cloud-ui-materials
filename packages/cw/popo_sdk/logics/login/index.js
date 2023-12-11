/** 
 * @returns {string} result 
 */
import { pp } from "@popo-bridge/web"
export default async () => {
    const code = await pp.login();
    return code
    // TODO
}