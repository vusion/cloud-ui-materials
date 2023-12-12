/** 
 * @param {string} resource <false> 当前值
 * @param {string} target <false> 目标值
 * @param {string} code <true> 公式
 * @param {[FormulaInfo]} customMapList <false> 自定义属性
 * @returns {string} result 
 */
import { codeList } from '@/utils'
export default (resource=0,target=0,code,customMapList)=>{
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
                arr.push(codeMap[item].code||'0')
            } else {
                arr.push('0')
            }
        })
        let str = arr.join("").replace(/当前值/g, resource).replace(/目标值/g, target) 
        console.log(str);
        let result= ""
        try {
            result = eval(str)
        } catch (error) {
            result=  '公式错误'
        }
        return result
    }else {
        return ''
    }
}