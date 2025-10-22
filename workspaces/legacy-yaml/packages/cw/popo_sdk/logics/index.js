const $libraryName = 'popo_sdk'

const UtilsLogics = {}
import chooseContactsAndSendMessage from './chooseContactsAndSendMessage'
import chooseContactsAndSendUrl from './chooseContactsAndSendUrl'
import shareAppToFriend from './shareAppToFriend'
import navigateBack from './navigateBack'
import share from './share'
import getPlatformInfo from './getPlatformInfo'
import login from './login'
import startWebView from './startWebView'
import downloadFile from './downloadFile'
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
    Vue.prototype.$library[`${$libraryName}`].startWebView=startWebView
    Vue.prototype.$library[`${$libraryName}`].downloadFile=downloadFile
    // LOGIC USE
}


export default UtilsLogics