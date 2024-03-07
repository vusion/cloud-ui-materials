import { getConfig } from './getConfig';
/**
 * @param {string} type <false> oauth类型: wechat | wework | feishu | dingtalk
 * @param {boolean} isRedirect <false> 是否跳转
 * @returns {string} result
 */
export default async (type, isRedirect = false, extendConfig = {}) => {
    const config = await getConfig(type);
    if (extendConfig) {
        Object.assign(config, extendConfig);
    }
    let url = '';
    if (type === 'wechat') {
        url = getWechat(config);
    }
    if (type === 'wework') {
        url = getWework(config);
    }
    if (type === 'feishu') {
        url = getFeishu(config);
    }
    if (type === 'dingtalk') {
        url = getDingTalk(config);
    }
    if (isRedirect && url) {
        window.location = url;
    }
    return url;
};

// https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
function getWechat(options) {
    return `https://open.weixin.qq.com/connect/qrconnect?${buildSearch(
        options
    )}&response_type=code&state=wechat#wechat_redirect`;
}

// https://developer.work.weixin.qq.com/document/path/98174
function getWework(options) {
    return `https://login.work.weixin.qq.com/wwlogin/sso/login?${buildSearch(
        Object.assign({}, options)
    )}&state=wework`;
}

function getFeishu(options) {
    return `https://open.feishu.cn/open-apis/authen/v1/authorize?${buildSearch(
        Object.assign({}, options)
    )}&state=feishu`;
}

function getDingTalk(options) {
    return `https://login.dingtalk.com/oauth2/auth?${buildSearch(
        Object.assign({}, options)
    )}&state=dingtalk`;
}

function buildSearch(options) {
    return new URLSearchParams(Object.entries(options)).toString();
}
