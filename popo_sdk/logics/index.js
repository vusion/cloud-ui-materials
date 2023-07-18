const $libraryName = 'popo_sdk'

const UtilsLogics = {}
import chooseContactsAndSendMessage from './chooseContactsAndSendMessage'
import chooseContactsAndSendUrl from './chooseContactsAndSendUrl'
import shareAppToFriend from './shareAppToFriend'
import navigateBack from './navigateBack'
import share from './share'
import getPlatformInfo from './getPlatformInfo'
import login from './login'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].chooseContactsAndSendMessage = chooseContactsAndSendMessage
    Vue.prototype.$library[`${$libraryName}`].chooseContactsAndSendUrl = chooseContactsAndSendUrl
    Vue.prototype.$library[`${$libraryName}`].shareAppToFriend=shareAppToFriend
    Vue.prototype.$library[`${$libraryName}`].navigateBack=navigateBack
    Vue.prototype.$library[`${$libraryName}`].share=share
    Vue.prototype.$library[`${$libraryName}`].getPlatformInfo=getPlatformInfo
    Vue.prototype.$library[`${$libraryName}`].login=login
    // LOGIC USE
}


export default UtilsLogics