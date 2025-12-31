/** 
 * @returns {string} result 
 */
import wx from 'weixin-js-sdk'
export default async (options)=>{
    // TODO
    const res = await new Promise(resolve => {
        wx.getNetworkType({
            success: function (res) {
                var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                resolve(networkType)
            }
        });
    })
    return  res
}