const $libraryName = 'cw_cryptojs_library'

const UtilsLogics = {}
import encryptByDes from './encryptByDes'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].encryptByDes=encryptByDes
    // LOGIC USE
}




export default UtilsLogics