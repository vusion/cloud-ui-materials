/** 
 * @param {string} options <false> 这是一个描述
 * @returns {string} result 
 */
import { codeList ,codeMap} from '@/utils'
export default (resource,target,code)=>{
    if (code) {
        let arr = []
        code.split(",").map(item => {
            if (codeMap[item]) {
                arr.push(codeMap[item].code)
            }
        })
        let str = arr.join("").replace(/当前值/g,resource).replace(/目标值/g,target)
        return eval(str)
    }else {
        return ''
    }
}