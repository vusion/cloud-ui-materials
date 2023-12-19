const $libraryName = 'library_tutorial'

const UtilsLogics = {}
import advancedLogicTutorial from './advancedLogicTutorial'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].advancedLogicTutorial=advancedLogicTutorial
    // LOGIC USE
}

export default UtilsLogics