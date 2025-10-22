// import styles from '!!style-loader!css-loader!sass-loader!./party.scss';

const protocol = 'https:';
const name = 'eggy-party-login';

const cdnScripts = [
    'https://dl.reg.163.com/webzj/ngx/message.js',
    'https://webzj.netstatic.net/webzj_cdn101/message4.js',
];

const loadScript = (script) => new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = script;
    element.onload = resolve;
    element.onerror = reject;
    document.body.appendChild(element);
});

const loadScripts = (scripts = []) => scripts.reduce(
    (promise, script) => promise.catch((e) => {
        e && console.error(e);
        return loadScript(script);
    }),
    Promise.reject(),
);

const getCssDomain = () => {
    if (window.location.protocol !== protocol) {
        return '';
    }

    const defaultCssDomain = `${window.location.origin}/`;
    const scriptElement = document.querySelector(`script[src*='${name}']`);

    if (!scriptElement) {
        return defaultCssDomain;
    }

    const { src = '' } = scriptElement;

    const reg = new RegExp(`${name}[^/]*`);
    const matchStringList = src.match(reg) || [];
    const [matchString = ''] = matchStringList;

    if (!matchString) {
        return defaultCssDomain;
    }

    const [prefix] = src.split(matchString);

    return `${prefix}${matchString}/`;
};

// 动态插入 SCSS 内容
const injectStyles = (css) => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
};

// injectStyles(styles.toString());

const login = async (options = {}) => {
    const {
        serviceAgreement,
        privacyAgreement,
        childrenPolicy,
        ...others
    } = options;

    let promise = loadScripts(cdnScripts);
    await promise;
    console.log('getCssDomain()', getCssDomain())
    return new window.URS({
        newCDN: 1,
        version: 4,
        cookieDomain: '163yun.com',
        regCookieDomain: '163yun.com',
        includeBox: 'party-container',
        product: 'h65',
        promark: 'bCmNPXu',
        host: 'lcap.163yun.com',
        getCssFiles() {
            return ['https://static-vusion.nos.lcap.163yun.com/packages/lcap-echarts-basic@0.1.0/dist-theme/index.css']
        },
        page: 'login',
        single: 1,
        needMobileLogin: 1,
        needMobileReg: 1,
        smsLoginFirst: 1,
        mbPwdLoginTxt: '手机密码登录',
        mbSmsLoginTxt: '手机验证码登录',
        gotoRegText: '没有账户？立即注册',
        goEmailLoginTxt: '网易邮箱登录',
        goMbLoginTxt: '手机号登录',
        placeholder: {
            account: '请输入网易邮箱地址',
            pwd: '请输入密码',
        },
        agreeText: '勾选代表同意',
        mailloginclause: {
            list: [
                { url: serviceAgreement, txt: '服务协议' },
                { url: privacyAgreement, txt: '隐私协议' },
                { url: childrenPolicy, txt: '儿童信息保护及监护人须知' },
            ],
            clauseErr: '',
        },
        forgetPwdText: '\n',
        ckboxOk: 0,
        smsBtnTxt: '登 录',
        mbBtnTxt: '登 录',
        
        mbloginclause: {
            list: [
                { url: serviceAgreement, txt: '服务协议' },
                { url: privacyAgreement, txt: '隐私协议' },
                { url: childrenPolicy, txt: '儿童信息保护及监护人须知' },
            ],
            clauseErr: '',
        },
        ...others,
    });
};

export default login;