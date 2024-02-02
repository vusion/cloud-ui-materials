/** 
 * @param {Long} needResult <false> 默认为1直接返回扫描结果,0则扫描结果由微信处理
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default async (needResult=1)=>{
    // TODO
    const res = await new Promise(resolve => {
        wx.scanQRCode({
            needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                resolve(res.resultStr)
                // var result = ; // 当needResult 为 1 时，扫码返回的结果
            }
        });
    })
    return  res
}