const $libraryName = 'wechat_sdk_share'

const UtilsLogics = {}
import wx from 'weixin-js-sdk'
import getLocation from './getLocation'
import playVoice from './playVoice'
import startRecord from './startRecord'
import stopRecord from './stopRecord'
import stopVoice from './stopVoice'
import translateVoice from './translateVoice'
import pauseVoice from './pauseVoice'
import scanQrCode from './scanQrCode'
import updateAppMessageShareData from './updateAppMessageShareData'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {}
    Vue.prototype.$library[`${$libraryName}`] = {}
    Vue.prototype.$library[`${$libraryName}`].getLocation = getLocation
    Vue.prototype.$library[`${$libraryName}`].playVoice = playVoice
    Vue.prototype.$library[`${$libraryName}`].startRecord = startRecord
    Vue.prototype.$library[`${$libraryName}`].stopRecord = stopRecord
    Vue.prototype.$library[`${$libraryName}`].stopVoice = stopVoice
    Vue.prototype.$library[`${$libraryName}`].translateVoice = translateVoice
    Vue.prototype.$library[`${$libraryName}`].pauseVoice=pauseVoice
    Vue.prototype.$library[`${$libraryName}`].scanQrCode=scanQrCode
    Vue.prototype.$library[`${$libraryName}`].updateAppMessageShareData=updateAppMessageShareData
    // LOGIC USE
}

async function initData() {     
    try {
        const url = location.origin
        const data = await fetch(`${url}/api/system/wechat/getConfig?url=${encodeURIComponent(location.href)}`, {
            method: 'get',
        }).then(response => response.json())

        wx.config({
            debug: false,
            appId: data.appId,
            nonceStr: data.nonceStr,
            signature: data.signature,
            timestamp: data.timestamp,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData','getLocation','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','translateVoice','scanQRCode']
        })

    } catch (error) { 

    }
}

initData()
export default UtilsLogics