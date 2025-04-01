const $libraryName = 'cw_cryptojs_library'

const UtilsLogics = {}
import encryptByDes from './encryptByDes'
import encryptSha256 from './encryptSha256'
import encryptDataWithSalt from './encryptDataWithSalt'
import decryptDataWithSalt from './decryptDataWithSalt'
import base64Withsjcl from './base64Withsjcl'
import decryptByDes from './decryptByDes'
import md52Hex from './md52Hex'
import sm2Encrypt from './sm2Encrypt'
import sm2Decrypt from './sm2Decrypt'
import multiMethodEncrypt from './multiMethodEncrypt'
import multiMethodParamsEncrypt from './multiMethodParamsEncrypt'
import encryptByAes from './encryptByAes'
import decryptByAes from './decryptByAes'
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
    Vue.prototype.$library[`${$libraryName}`].md52Hex=md52Hex
    Vue.prototype.$library[`${$libraryName}`].sm2Encrypt=sm2Encrypt
    Vue.prototype.$library[`${$libraryName}`].sm2Decrypt=sm2Decrypt
    Vue.prototype.$library[`${$libraryName}`].encryptByAes=encryptByAes
    Vue.prototype.$library[`${$libraryName}`].decryptByAes=decryptByAes
    // LOGIC USE
    window.__$libraryEncryptSha256 = encryptSha256
    window.__$sm2Encrypt = sm2Encrypt
    window.__$sm2Decrypt = sm2Decrypt
    Vue.prototype.$library[`${$libraryName}`].multiMethodEncrypt=multiMethodEncrypt
    Vue.prototype.$library[`${$libraryName}`].multiMethodParamsEncrypt=multiMethodParamsEncrypt
    Vue.prototype.$library[`${$libraryName}`].encryptByAes=encryptByAes
    Vue.prototype.$library[`${$libraryName}`].decryptByAes=decryptByAes
    // LOGIC USE
    window.__$libraryEncryptSha256 = encryptSha256
    window.__$libraryMultiMethodEncrypt = multiMethodEncrypt

}




export default UtilsLogics