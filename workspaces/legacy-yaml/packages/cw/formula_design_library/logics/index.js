const $libraryName = 'formula_design_library'

const UtilsLogics = {}
import formulaToString from './formulaToString'
import formulaToResult from './formulaToResult'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].formulaToString=formulaToString
    Vue.prototype.$library[`${$libraryName}`].formulaToResult=formulaToResult
    // LOGIC USE
}
// formulaToString("1,2")
// console.log("formulaToString", formulaToString("1,+,2,+,b"))
// console.log("formulaToResult", formulaToResult(undefined,"2","1,+,2,当前值,目标值,+,abs,(,2,),+,c"))

export default UtilsLogics