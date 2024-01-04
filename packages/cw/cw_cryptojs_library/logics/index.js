const $libraryName = 'cw_cryptojs_library'

const UtilsLogics = {}
import encryptByDes from './encryptByDes'
import encryptSha256 from './encryptSha256'
import encryptDataWithSalt from './encryptDataWithSalt'
import decryptDataWithSalt from './decryptDataWithSalt'
// LOGIC IMPORTS
UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].encryptByDes=encryptByDes
    Vue.prototype.$library[`${$libraryName}`].encryptSha256=encryptSha256
    Vue.prototype.$library[`${$libraryName}`].encryptDataWithSalt=encryptDataWithSalt
    Vue.prototype.$library[`${$libraryName}`].decryptDataWithSalt=decryptDataWithSalt
    // LOGIC USE
    window.__$libraryEncryptSha256 = encryptSha256
}




export default UtilsLogics