/** 
 * @param {string} current <false> 当前显示图片的http链接
 * @param {[string]} urls <false> 需要预览的图片http链接列表
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default (current,urls=[])=>{
    // TODO
    wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
    }); 
}