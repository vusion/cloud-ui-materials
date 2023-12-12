/** 
 * @param {string} code <true> 公式
 * @param {[FormulaInfo]} customMapList <false> 自定义属性
 * @returns {string} result 
 */
import { codeList } from '@/utils'
export default (code,customMapList) => {
    if (code) {
        let arr = []
        let resultCode =[]
        if (customMapList) {
            resultCode = [...codeList,...customMapList]
        } else {
            resultCode = codeList
        }
        const codeMap = resultCode.reduce((pre,item)=>{
            pre[item.name] = item
            return pre
          }, {})
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