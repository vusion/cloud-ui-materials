const $libraryName = 'cw_cryptojs_library'

const UtilsLogics = {}
import encryptByDes from './encryptByDes'
import encryptSha256 from './encryptSha256'
import encryptDataWithSalt from './encryptDataWithSalt'
import decryptDataWithSalt from './decryptDataWithSalt'
import base64Withsjcl from './base64Withsjcl'
import decryptByDes from './decryptByDes'
// LOGIC IMPORTS
UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].encryptByDes=encryptByDes
    Vue.prototype.$library[`${$libraryName}`].encryptSha256=encryptSha256
    Vue.prototype.$library[`${$libraryName}`].encryptDataWithSalt=encryptDataWithSalt
    Vue.prototype.$library[`${$libraryName}`].decryptDataWithSalt=decryptDataWithSalt
    Vue.prototype.$library[`${$libraryName}`].base64Withsjcl=base64Withsjcl
    Vue.prototype.$library[`${$libraryName}`].decryptByDes=decryptByDes
    // LOGIC USE
    window.__$libraryEncryptSha256 = encryptSha256
}




export default UtilsLogics