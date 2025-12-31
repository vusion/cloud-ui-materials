const $libraryName = 'cw_oa_sdk'

const UtilsLogics = {}
import init from './init'
import goBack from './goBack'
import goBackHideFlow from './goBackHideFlow'
import getToken from './getToken'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].init=init
    Vue.prototype.$library[`${$libraryName}`].goBack=goBack
    Vue.prototype.$library[`${$libraryName}`].goBackHideFlow=goBackHideFlow
    Vue.prototype.$library[`${$libraryName}`].getToken=getToken
    // LOGIC USE
}

export default UtilsLogics