const $libraryName = 'cust_fetch_event_source'

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