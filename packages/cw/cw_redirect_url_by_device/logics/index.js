const $libraryName = 'cw_redirect_url_by_device'

const UtilsLogics = {}
import redirectToUrl from './redirectToUrl'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].redirectToUrl=redirectToUrl
    // LOGIC USE
}

export default UtilsLogics