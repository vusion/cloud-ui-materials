/** 
 * @param {string} localId <false> 需要识别的音频的本地Id
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default async (localId)=>{
    // TODO 
    const res = await new Promise(resolve => {

        wx.translateVoice({
            localId, // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                resolve(res.translateResult); // 语音识别的结果
            }
        })
    })
    return res
}