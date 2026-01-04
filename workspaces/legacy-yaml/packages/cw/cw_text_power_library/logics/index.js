const $libraryName = 'cw_text_power_library'

const UtilsLogics = {}
import emptyTextFilling from './emptyTextFilling'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].emptyTextFilling=emptyTextFilling
    // LOGIC USE
}

export default UtilsLogics