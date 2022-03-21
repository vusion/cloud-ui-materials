export const NUIMS_DOMAIN_NAME = 'Nuims';

export function isType(type) {
    return function (obj) {
        return (
            obj !== null
            && (Array.isArray(type) ? type : [type]).some(
                (t) => Object.prototype.toString.call(obj) === `[object ${t}]`,
            )
        );
    };
}

export const isObj = isType('Object');
export const getObj = (obj) => (isObj(obj) ? obj : {});

export const rmLastSlash = (str) => {
    const cStr = String(str);
    return cStr[cStr.length - 1] === '/' ? cStr.substring(0, cStr.length - 1) : cStr;
};

export const getArr = (arr) => (Array.isArray(arr) ? arr : []);


export const isEnv = (env) => ['dev', 'online'].includes(env) || env.includes('test');

export const getTenant = () => {
    const hostArr = location.host.split('.');
    const userIndex = hostArr.indexOf('user');
    if (userIndex > 0)
        return hostArr[userIndex - 1];
    const localIndex = hostArr.findIndex((h) => h.includes('localhost'));
    if (localIndex > 0)
        return hostArr[localIndex - 1];
    if (hostArr.length <= 3)
        return 'defaultTenant';
    return isEnv(hostArr[0]) ? hostArr[1] : hostArr[0];
};

// 登录相关配置
export const LOGIN_TYPES_MAP = {
    Normal: { Short: '普通', Full: '普通登录' },
    QZ: { Short: '轻舟', Full: '轻舟登录' },
    Ldap: { Short: 'LDAP', Full: 'LDAP 登录' },
    Wechat: { Short: '微信', Full: '微信登录' },
    Baidu: { Short: '百度', Full: '百度登录' },
    Github: { Short: 'Github', Full: 'Github 登录' },
    Netease: { Short: 'OpenID', Full: 'OpenID 登录' },
    Urs: { Short: 'Urs', Full: 'Urs 登录' },
    Icbc: { Short: '工行', Full: '工行登录' },
};
export const TAB_MAP = {
    Normal: LOGIN_TYPES_MAP.Normal.Full,
    QZ: LOGIN_TYPES_MAP.QZ.Short,
    Ldap: LOGIN_TYPES_MAP.Ldap.Short,
};
// 非 AUTH 登陆，通过账号密码形式登陆
export const NO_AUTH_LIST = Object.keys(TAB_MAP);
// AUTH 登陆，通过链接跳转形式登陆
export const AUTH_LIST = Object.keys(LOGIN_TYPES_MAP)
    .filter((key) => !NO_AUTH_LIST.includes(key));
