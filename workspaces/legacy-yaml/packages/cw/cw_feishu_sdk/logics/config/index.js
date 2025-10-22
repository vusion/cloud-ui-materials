/**
 * @param {object} data <false> 鉴权参数 这是一个描述
 * @param {string[]} jsApiList <false> 这是一个描述
 * @returns {string} result
 */
export default async function config(
    res,
    rej,
    data,
    jsApiList = ['chooseContact']
) {
    try {
        // const data = await fetch(
        //     `/api/system/feishu/getConfig?url=${encodeURIComponent(
        //         location.href
        //     )}`,
        //     {
        //         method: 'get',
        //     }
        // ).then((response) => response.json());

        window.h5sdk.config({
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList,
            //成功回调
            onSuccess: (v) => {
                res(v);
            },
            //失败回调
            onFail: (err) => {
                rej(err);
            },
        });
    } catch (error) {
        rej(error);
    }
}
