const $libraryName = 'cust_yixin_live_broadcast_room'

const UtilsLogics = {}
import initRoom from './initRoom'
import sendText from './sendText'
import disconnect from './disconnect'
import connect from './connect'
import destroy from './destroy'
import attachToRoom from './attachToRoom'
import resendMessage from './resendMessage'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].initRoom=initRoom
    Vue.prototype.$library[`${$libraryName}`].sendText=sendText
    Vue.prototype.$library[`${$libraryName}`].disconnect=disconnect
    Vue.prototype.$library[`${$libraryName}`].connect=connect
    Vue.prototype.$library[`${$libraryName}`].destroy=destroy
    Vue.prototype.$library[`${$libraryName}`].attachToRoom=attachToRoom
    Vue.prototype.$library[`${$libraryName}`].resendMessage=resendMessage
    // LOGIC USE
}

export default UtilsLogics