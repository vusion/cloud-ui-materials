import { getConfig } from './getConfig';
/**
 * @param {string} type <false> oauth类型: wechat | wework | feishu | dingtalk
 * @param {boolean} isRedirect <false> 是否跳转
 * @param {object} data <false> 配置的参数
 * @returns {string} result
 */
export default async (
    type,
    isRedirect = false,
    data = null,
    extendConfig = {}
) => {
    const config = await getConfig(type, data);
    if (extendConfig) {
        Object.assign(config, extendConfig);
    }
    const origin = location.origin;
    const isHashRoute = location.href.startsWith(`${origin}/#/`);
    const isMobile = isHashRoute
        ? location.href.startsWith(`${origin}/#/m/`)
        : location.href.startsWith(`${origin}/m/`);
    Object.assign(config, { isHashRoute, isMobile });
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
        Object.assign(
            {
                state: 'wechat',
            },
            options
        )
    )}&response_type=code#wechat_redirect`;
}

// https://developer.work.weixin.qq.com/document/path/98174
function getWework(options) {
    return `https://login.work.weixin.qq.com/wwlogin/sso/login?${buildSearch(
        Object.assign(
            {},
            {
                state: 'wework',
                login_type: 'CorpApp',
            },
            options
        )
    )}`;
}

function getFeishu(options) {
    return `https://open.feishu.cn/open-apis/authen/v1/authorize?${buildSearch(
        Object.assign(
            {},
            {
                state: 'feishu',
            },
            options
        )
    )}`;
}

function getDingTalk(options) {
    return `https://login.dingtalk.com/oauth2/auth?${buildSearch(
        Object.assign(
            {},
            {
                scope: options.scope || 'openid',
                state: 'dingtalk',
            },
            options
        )
    )}&response_type=code`;
}

function buildSearch({ isHashRoute, isMobile, redirect_uri, ...options }) {
    if (isHashRoute) {
        options.state = `${state}#${isMobile ? '/m' : ''}${
            options.redirect_uri
        }`;
        options.redirect_uri = `${location.origin}`;
    } else if (isMobile) {
        options.redirect_uri = `${location.origin}/m${redirect_uri}`;
    } else {
        options.redirect_uri = `${location.origin}${redirect_uri}`;
    }
    return new URLSearchParams(Object.entries(options)).toString();
}
