/**
 * @param {string} appId <false> appId
 * @returns {string} result
 */
export default (res, rej, appId) => {
    console.log('开始免密登录');
    tt.requestAuthCode({
        appId: appId,
        success: (info) => {
            console.log('获取code🚀 ~ file: index.js:10 ~ info:', info);
            res(info.code);
        },
        fail: (error) => {
            console.error('🚀 ~ file: index.js:14 ~ error:', error);
            rej(error);
        },
    });
};
