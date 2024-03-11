const $libraryName = 'cw_office_sdk'

const UtilsLogics = {}
import uploadPdfFirstPage from './uploadPdfFirstPage'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].uploadPdfFirstPage=uploadPdfFirstPage
    // LOGIC USE
}

export default UtilsLogics