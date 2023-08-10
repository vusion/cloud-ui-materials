const $libraryName = 'cw_notification_sdk'

const UtilsLogics = {}
import notification from './notification'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].notification=notification
    // LOGIC USE
}

export default UtilsLogics