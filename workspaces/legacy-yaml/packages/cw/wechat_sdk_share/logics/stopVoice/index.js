/** 
 * @param {string} localId <false> 需要停止的音频的本地ID
 */
import wx from 'weixin-js-sdk'
export default (localId)=>{
    wx.stopVoice({
        localId // 需要停止的音频的本地ID，由stopRecord接口获得
    });
}