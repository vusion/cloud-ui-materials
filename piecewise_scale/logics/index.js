const $libraryName = 'piecewise_scale'

const UtilsLogics = {}
import piecewiseScale from './piecewiseScale'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].piecewiseScale=piecewiseScale
    // LOGIC USE
}

export default UtilsLogics