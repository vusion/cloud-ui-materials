/** 
 * @param {string} title <false> 分享标题
 * @param {string} desc <false> 分享描述
 * @param {string} link <false> 分享链接，
 * @param {string} imgUrl <false> 分享图标
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default (title,desc,link,imgUrl)=>{
    // TODO
    wx.updateAppMessageShareData({ 
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
}