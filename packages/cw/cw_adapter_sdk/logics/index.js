const $libraryName = 'cw_adapter_sdk'

const UtilsLogics = {}
import init from './init'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].init=init
    // LOGIC USE
}

export default UtilsLogics