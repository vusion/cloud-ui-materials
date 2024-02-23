const $libraryName = 'cust_haier_gio'

const UtilsLogics = {}
import gio from './gio'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].gio=gio
    // LOGIC USE
}

export default UtilsLogics