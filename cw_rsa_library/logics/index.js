const $libraryName = 'cw_rsa_library'

const UtilsLogics = {}
import decryptKey from './decryptKey'
import encryptKey from './encryptKey'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].decryptKey=decryptKey
    Vue.prototype.$library[`${$libraryName}`].encryptKey=encryptKey
    // LOGIC USE
}
import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';
var rsaKey = new RSAKey();
rsaKey.generate(2048, '10001');

var publicKey = rsaKey.n.toString(16);

console.log("RSA公钥: " + publicKey);
let pubk = `-----BEGIN RSA PRIVATE KEY-----
${publicKey}
-----END RSA PRIVATE KEY-----`

// let prik = "-----BEGIN PRIVATE KEY-----218ECFCD0B799EF6B98CD6181F4D31E34E69E0FD6F70F7FB3456F2927F0BC379-----END PRIVATE KEY-----"
const pwd = encryptKey(pubk, "123456")
console.log(pwd);
// const key = decryptKey(prik, pwd)
// console.log(key);
export default UtilsLogics