/** 
 * @param {string} encryptedData <false> 密文
 * @param {string} privateKey <false> 私钥
 * @returns {string} result 
 */
import { sm2 } from 'sm-crypto'
export default (encryptedData,privateKey)=>{
    if(encryptedData.startsWith("04")){
        encryptedData = encryptedData.slice(2)
    }
    return sm2.doDecrypt(encryptedData, privateKey, 0)
}