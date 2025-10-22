/** 
 * @param {string} title <false> 分享标题
 * @param {string} link <false> 分享链接，
 * @param {string} imgUrl <false> 分享图标
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default (title,link,imgUrl)=>{
    // TODO
    wx.onMenuShareTimeline({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
}