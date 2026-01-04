/** 
 * @param {string} originalData <false> 内容
 * @param {string} publicKey <false> 公钥
 * @returns {string} result 
 */
import { sm2 } from 'sm-crypto'
export default (originalData,publicKey)=>{
    return  sm2.doEncrypt(originalData, publicKey,0 );
}