/**
 * @param {string} options <false> 这是一个描述
 * @returns {string} result
 */
import wx from 'weixin-js-sdk'
export default (appId, nonceStr, signature, accessToken, openId, templateId, url, pagepath, value  ) => {
  var timestamp = Math.floor(new Date().getTime() / 1000).toString();

  wx.config({
    debug: false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: ["chooseWXPay", "sendTemplateMessage"], // 需要使用的JS接口列表
  });

  wx.ready(function () {
    // 在这里调用微信JS-SDK的接口
    wx.sendTemplateMessage({
      touser: openId,
      template_id,
      url,
      miniprogram: {
        appid,
        pagepath,
      },
      data: {
        keyword1: {
          value,
        },
      },
      success: function (res) {
        console.log('success', res)
      },
      fail: function (error) {
        console.error('error', error)
      },
    });
  });
};
