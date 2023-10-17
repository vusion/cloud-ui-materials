/** 
 * @param {string} code <false> 这是一个描述
 * @returns {string} result 
 */
import { codeList ,codeMap} from '@/utils'
export default (code) => {
    if (code) {
        let arr = []
        code.split(",").map(item => {
            if (codeMap[item]) {
                arr.push(codeMap[item].name)
            }
        })
        return arr.join("")
    }else {
        return ''
    }
}