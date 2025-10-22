/** 
 * @param {string} type <false> 默认为wgs84的gps坐标
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default async (type="wgs84")=>{
    // TODO
   const res =   await new Promise(resolve => {
        wx.ready(() => {
            wx.getLocation({
                type,
                success: function (res) {
                    resolve(res)
                }
            })
        })
    
    })
    return res.latitude + ',' + res.longitude
}