const $libraryName = 'cust_multi_download'

const UtilsLogics = {}
import uploadMultiDownload from './uploadMultiDownload'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].uploadMultiDownload=uploadMultiDownload
    // LOGIC USE
}

export default UtilsLogics