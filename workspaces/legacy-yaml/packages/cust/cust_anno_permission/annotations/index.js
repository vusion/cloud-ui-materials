const $libraryName = 'lcap-fe-annotation-data-permission'

const UtilsLogics = {}
import feAnnotation from './feAnnotation'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].feAnnotation=feAnnotation
    // LOGIC USE
}

export default UtilsLogics