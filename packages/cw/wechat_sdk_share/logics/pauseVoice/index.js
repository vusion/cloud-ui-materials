/** 
 * @param {string} localId <false> 需要暂停的音频的本地ID
 */
import wx from 'weixin-js-sdk'
export default (localId)=>{
    wx.pauseVoice({
        localId // 需要暂停的音频的本地ID，由stopRecord接口获得
    });  
}