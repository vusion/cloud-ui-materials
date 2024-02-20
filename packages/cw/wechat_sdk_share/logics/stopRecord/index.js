/** 
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default async (options)=>{
    const res = await new Promise(resolve => {
        wx.stopRecord({
            success: function (res) {
                resolve(res.localId)
            }
        });
    })
    return res
}