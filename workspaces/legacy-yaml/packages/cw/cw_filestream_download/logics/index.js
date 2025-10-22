const $libraryName = 'cw_filestream_download'

const UtilsLogics = {}
import filestreamDownloadFromUrl from './filestreamDownloadFromUrl'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].filestreamDownloadFromUrl=filestreamDownloadFromUrl
    // LOGIC USE
}

export default UtilsLogics