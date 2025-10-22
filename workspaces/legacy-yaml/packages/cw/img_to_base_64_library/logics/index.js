const $libraryName = 'img_to_base_64_library'

const UtilsLogics = {}
import imgToBase64 from './imgToBase64'
import contentToFile from './contentToFile'
import base64ToFile from './base64ToFile'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].imgToBase64 = imgToBase64
    Vue.prototype.$library[`${$libraryName}`].contentToFile=contentToFile
    Vue.prototype.$library[`${$libraryName}`].base64ToFile=base64ToFile
    // LOGIC USE
}
//     ; (async function () { 
//         const a = await imgToBase64("https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF",0.2)
//         console.log(a);
// })()


export default UtilsLogics