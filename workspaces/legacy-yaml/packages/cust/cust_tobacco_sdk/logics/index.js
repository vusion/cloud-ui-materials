const $libraryName = 'cust_tobacco_sdk'

const UtilsLogics = {}
import mockAnywareObject from './mockAnywareObject'
import ready from './ready'
import requestAuthCode from './requestAuthCode'
import getAccountInfo from './getAccountInfo'
import addBizAccessLog from './addBizAccessLog'
import addFunAccessLog from './addFunAccessLog'
import locate from './locate'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].mockAnywareObject=mockAnywareObject
    Vue.prototype.$library[`${$libraryName}`].ready=ready
    Vue.prototype.$library[`${$libraryName}`].requestAuthCode=requestAuthCode
    Vue.prototype.$library[`${$libraryName}`].getAccountInfo=getAccountInfo
    Vue.prototype.$library[`${$libraryName}`].addBizAccessLog=addBizAccessLog
    Vue.prototype.$library[`${$libraryName}`].addFunAccessLog=addFunAccessLog
    Vue.prototype.$library[`${$libraryName}`].locate=locate
    // LOGIC USE
}

export default UtilsLogics