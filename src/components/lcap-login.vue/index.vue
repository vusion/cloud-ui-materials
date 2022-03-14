<template>
<div :class="$style.root">
    <div v-if="getCompType() === 'pass'">
        <div :class="$style.loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            请稍后...
        </div>
    </div>
    <div v-else-if="getCompType() === 'cb'">
        <div :class="$style.loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            登录中
        </div>
    </div>
    <div v-else :class="$style.root">
    <u-linear-layout
        v-if="loading"
        type="flex"
        justify="center"
        alignment="center"
        :class="$style.loading"
    >
        <u-spinner></u-spinner>正在加载中...
        </u-linear-layout>
        <div v-else-if="hasTabLoginTypes" :class="$style.form">
            <u-linear-layout direction="vertical" gap="large">
                <u-tabs v-model="account.LoginType">
                    <u-tab
                        v-for="tab in tabs"
                        :key="tab.value"
                        :title="tab.title"
                        :value="tab.value"
                    ></u-tab>
                </u-tabs>
                <u-linear-layout type="flex" justify="center">
                    <u-validator
                        ref="accValidator"
                        placement="bottom"
                        style="max-width: 100%"
                        :rules="accountRule"
                    >
                        <u-input
                            size="huge"
                            name="account"
                            v-model="account.AccountId"
                            placeholder="请输入账号"
                            maxlength="128"
                            maxlength-message="账号最多输入128个字符"
                            clearable
                            prefix
                            @change="rmErrMsg"
                        >
                            <span name="prefix" :class="$style.prefix">
                                <icon-custom name="user"></icon-custom>
                            </span>
                        </u-input>
                    </u-validator>
                </u-linear-layout>
                <u-linear-layout type="flex" justify="center">
                    <u-validator
                        ref="pwdValidator"
                        placement="bottom"
                        style="max-width: 100%"
                        :rules="pwdRule"
                    >
                        <u-input
                            size="huge"
                            name="password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="account.AccountPassword"
                            @keyup.enter="login"
                            @change="rmErrMsg"
                            placeholder="请输入密码"
                            maxlength="128"
                            maxlength-message="密码最多输入128个字符"
                            clearable
                            prefix
                            suffix
                        >
                            <span name="prefix" :class="$style.prefix">
                                <icon-custom name="lock"></icon-custom>
                            </span>
                            <span
                                name="suffix"
                                :class="$style.suffix"
                                @click="showPassword = !showPassword"
                            >
                                <icon-custom
                                    :name="
                                        showPassword ? 'eye-close' : 'eye'
                                    "
                                ></icon-custom>
                            </span>
                        </u-input>
                    </u-validator>
                </u-linear-layout>
                <u-linear-layout direction="vertical" gap="small">
                    <u-button
                        color="primary"
                        display="block"
                        @click="login"
                        :icon="loading ? 'loading' : undefined"
                        :disabled="loading"
                    >登录</u-button>
                </u-linear-layout>
                <u-linear-layout
                    type="flex"
                    :justify="errMsg ? 'space-between' : 'end'"
                    alignment="center"
                >
                    <span v-if="errMsg" :class="$style.error">{{ errMsg }}</span>
                    <u-link
                        v-for="auth in authTypes"
                        :key="auth.value"
                        @click="jumpAuth(auth.value)"
                        :class="$style.link"
                    >{{ auth.title }}</u-link>
                    <span v-if="showTips" :class="$style.tips">账号认证与权限中心</span>
                </u-linear-layout>
            </u-linear-layout>
        </div>
        <div v-else :class="$style.links">
            <u-link
                v-for="auth in authTypes"
                :key="auth.value"
                @click="jumpAuth(auth.value)"
                :class="$style.link"
            >{{ auth.title }}</u-link>
            <span v-if="showNoneTips" :class="$style.tips">请确认登录配置</span>
        </div>
    </div>
</div>
</template>

<script>
import queryString from 'query-string';
import iconCustom from './icon-custom.vue';
import cookie from './cookie';
import service from './service';
import './iconfont.js';
import token from './token';
import { NUIMS_DOMAIN_NAME, LOGIN_TYPES_MAP, AUTH_LIST, TAB_MAP, getArr, getTenant, rmLastSlash, getObj } from './util';
import localService from './usercenter/service';

export default {
    name: 'lcap-login',
    components: { iconCustom },
    props: {
        // 账号认证与权限中心域名
        src: {
            type: String,
            default: 'http://nuims.vusion.top',
        },
        // 账号认证与权限中心请求相对路径
        nuimsUrl: {
            type: String,
            default: '/gateway/nuims/nuims',
        },
        // 账号认证与权限中心环境信息
        env: String,
        // 租户名称
        tenantName: String,
        // 登录应用名称
        domainName: String,
        // 开启普通登录，默认开启
        useNormal: {
            type: Boolean,
            default: true,
        },
        // 开启轻舟登录
        useQZ: {
            type: Boolean,
            default: false,
        },
        // 开启 LDAP 登录
        useLdap: {
            type: Boolean,
            default: false,
        },
        // 开启 OpenID 登录
        useNetease: {
            type: Boolean,
            default: false,
        },
        // 开启 Github 登录
        useGithub: {
            type: Boolean,
            default: false,
        },
        // 开启微信登录
        useWechat: {
            type: Boolean,
            default: false,
        },
        // 开启工行登录
        useIcbc: {
            type: Boolean,
            default: false,
        },
        useXuetong: {
            type: Boolean,
            default: false,
        },
        exdays: {
            type: Number,
            default: 1,
        },
        // 开启在制品里面的登录
        hasUserCenter: {
            type: Boolean,
            default: true, 
        }
    },
    data() {
        return {
            loading: true,
            account: {
                LoginType: 'Normal',
                AccountId: '',
                AccountPassword: '',
            },
            AuthConfigMap: {},
            tabs: [],
            authTypes: [],
            hasTabLoginTypes: true,
            showNoneTips: false,
            showPassword: false,
            errMsg: '',
            accountRule: ['required'],
            pwdRule: ['required | minLength(8)'],
            change: false,
            changeConfig: {},
            low: this.hasUserCenter, // 控制下沉模式（制品应用内部登录） 还是 集中模式（nuims集中登录）
        };
    },
    computed: {
        passSrc() {
            return `${rmLastSlash(this.src)}`;
        },
        showTips() {
            return !this.errMsg && this.authTypes.length === 0;
        },
    },
    async mounted() {
        const { search } = location;
        const query = queryString.parse(search);
        const { code, userName, redirect, userId, token } = query;
        const compType = localStorage.getItem('compType');
        
        if (this.useXuetong) {
            this.getConfig();
        }

        if (compType === 'pass') {
            this.jumpAuthPass();
        } else if (compType === 'cb') {
            localStorage.setItem('compType', '');
            await this.codeLogin(query);
        } else {

            if (token) {
                // 对返回结果只包含 token 的解析方式，，目前主要是对接学同的场景
                cookie.set({ authorization: token });
                this.$emit('success', {
                    Authorization: token,
                });
            } else if (userName && userId && code) {
                cookie.set({ authorization: code });
                this.$emit('success', {
                    Authorization: code,
                    UserName: userName,
                    UserId: userId,
                });
            } else {
                this.getTenantConfig();
            }
        }
    },
    methods: {
        // 处理跳转返回的 code
       async codeLogin(query) {
            const { code, userName, redirect, userId, token } = query;
            // 其他应用单点登录跳转
            if (userName && userId && code) {
                token.set(code);
                localStorage.setItem('LoginType', 'Other');
                cookie.set({ LoginType: 'Other' });
                location.href = redirect ? decodeURIComponent(redirect) : `${origin}`;
            } else {
                // Auth 登录中转页
                const LoginType = localStorage.getItem('LoginType') || cookie.get('LoginType');
                const RedirectUri = localStorage.getItem('RedirectUri') || cookie.get('RedirectUri');
                let params = {
                    Code: code,
                    RedirectUri,
                    OAuthLoginType: 'Netease',
                    TenantName: getTenant(),
                    DomainName: NUIMS_DOMAIN_NAME,
                };

                let currentService;
                if (this.low) {
                    currentService = localService;
                } else {
                    currentService = service;
                }
                let oAuthService = currentService.OauthLogin;
                if (LoginType === 'Github' || LoginType === 'CGithub') {
                    params.OAuthLoginType = 'Github';
                } else if (LoginType === 'Wechat' || LoginType === 'CWechat') {
                    params.OAuthLoginType = 'Wechat';
                } else if (LoginType === 'Icbc' || LoginType === 'CIcbc') {
                    // 工行登陆
                    const { SSIAuth, SSISign } = query;
                    if (this.low) {
                        params = {
                            SsiAuth: SSIAuth,
                            SsiSign: SSISign,
                            RedirectUri,
                        };

                    } else {
                        params = {
                            SsiAuth: SSIAuth,
                            SsiSign: SSISign,
                            LoginType: 'ICBC',
                            TenantName: getTenant(),
                            DomainName: NUIMS_DOMAIN_NAME,
                        };
                    }
                    
                    oAuthService = currentService.IcbcLogin;
                }
                try {
                    let res;
                    if (this.low) {
                        // 请求制品的接口
                        res = await oAuthService({
                            body: params,
                        });
                    } else {
                        res = await oAuthService({
                            url: this.nuimsUrl,
                            body: params,
                        });
                    }

                    const { Data } = getObj(res);
                    const { UserName, UserId } = getObj(Data);
                    let href;
                    // 登录组件通过 Auth 登录中转页
                    if (['CNetease', 'CGithub', 'CWechat', 'CIcbc'].includes(LoginType)) {
                        href = decodeURIComponent(
                            redirect || localStorage.getItem('From') || cookie.get('From'),
                        );
                        const Token = token.get();
                        const Back = `${href}${
                            href.includes('?') ? '&' : '?'
                        }userName=${UserName}&userId=${UserId}&code=${Token}`;
                        href = Back;
                    } else {
                        href = redirect ? decodeURIComponent(redirect) : `${origin}`;
                    }
                    // eslint-disable-next-line require-atomic-updates
                    location.href = href;
                } catch (error) {
                    const { message } = error || {};
                    if (message && message.includes('The user is not bound')) {
                        // eslint-disable-next-line require-atomic-updates
                        location.href = '/403';
                    } else {
                        this.$toast.show(message);
                    }
                }
            }   
        },
        getCompType() {
            return localStorage.getItem('compType');
        },
        // 学同的配置获取， 通过参数控制是否
        async getConfig() {
            try {
                const res = await service.getConfig({
                    url: '/config'
                });
                const obj = JSON.parse(res.data.userCenter);
                // updata config
                this.changeConfig = obj;
                this.change = obj.change;
            
                if (this.change) {
                    // 定位到第三方登录
                    if (!window.location.href.includes('token=')) {
                        // redirect back with token
                        window.location.href = `${this.changeConfig.pc?.url}?${queryString.stringify(Object.assign(
                            this.changeConfig.pc?.params || {}, 
                        {
                            redirect_uri: window.location.href
                        }))}`;
                    }
                } 
             } catch {
                 console.info('no config');
             }
        },
        async getTenantConfig() {
            let tabs = [];
            let authTypes = [];
            try {
                let res;
                if (this.low) {
                    res = await localService.getTenantLoginTypes({
                        url: `/system/loginTypes`,
                    });
                } else {
                     res = await service.getTenantLoginTypes({
                        url: this.nuimsUrl,
                        params: { TenantName: this.tenantName || getTenant() },
                    });
                }
                res?.data?.Data.forEach((type) => {
                    const { LoginType } = type;
                    if (Object.keys(TAB_MAP).includes(LoginType) && this[`use${LoginType}`]) {
                        tabs.push({
                            title: TAB_MAP[LoginType],
                            value: LoginType,
                        });
                    } else if (AUTH_LIST.includes(LoginType) && this[`use${LoginType}`]) {
                        authTypes.push({
                            title: LOGIN_TYPES_MAP[LoginType].Full,
                            value: LoginType,
                        });
                    }
                });
            } catch (error) {
                console.info(error);
                tabs = [{
                    title: '普通登录',
                    value: 'Normal',
                }];
                authTypes = [];
            }
            this.tabs = tabs;
            this.authTypes = authTypes;
            if (tabs.length > 0) {
                this.account.LoginType = tabs[0].value;
            } else {
                this.hasTabLoginTypes = false;
                if (authTypes.length === 1) {
                    // 当有且仅有一种 Auth 登录时，直接登录
                    this.jumpAuth(authTypes[0].value);
                } else if (authTypes.length === 0) {
                    this.showNoneTips = true;
                }
            }
            this.loading = false;
        },
        async login() {
            let errMsg;
            try {
                errMsg = '';
                await this.$refs.accValidator.validate();
                await this.$refs.pwdValidator.validate();
                const { AccountId, AccountPassword, LoginType } = this.account;
                let res;
                if (this.low) {
                    res = await localService.login({
                        url: `/system/login`,
                        data: {
                            UserName: AccountId,
                            Password: AccountPassword,
                            LoginType,
                            TenantName: this.tenantName,
                        },
                        headers: {
                            Env: this.env,
                        },
                    });
                    const { authorization } = res.headers;
                    const { userName, userId } = res; // 制品返回的登录信息的结构
                    cookie.set({ authorization });
                    this.$emit('success', { Authorization: authorization, UserName: userName, UserId: userId, LoginType });

                } else {
                    res = await service.login({
                        url: this.nuimsUrl,
                        data: {
                            UserName: AccountId,
                            Password: AccountPassword,
                            LoginType,
                            TenantName: this.tenantName,
                            DomainName: NUIMS_DOMAIN_NAME,
                        },
                        headers: {
                            Env: this.env,
                        },
                    });
                    const { authorization } = res.headers;
                    const { UserName, UserId } = res.data.Data;
                    cookie.set({ authorization });
                    this.$emit('success', { Authorization: authorization, UserName, UserId, LoginType });
                }
   
            } catch (error) {
                errMsg = error && error.message;
                if (
                    errMsg
                    === '参数错误，请检查如下请求参数: UserName or Password'
                ) {
                    errMsg = '请输入正确的账号或密码';
                }
                this.$emit('error', { Message: errMsg || 'login error' });
            }
            this.errMsg = errMsg;
        },
        // Auth 登录
        jumpAuth(type) {
            const { search } = location;
            localStorage.setItem('compType', 'pass');
            const { redirect = encodeURIComponent(location.href) } = queryString.parse(search);
            // 非下沉模式，需要跳转到 nuims 的集中登录
            location.href = `${this.low ? location.href: this.passSrc}/?redirect=${redirect}&loginType=C${type}`;
        },
        rmErrMsg() {
            this.errMsg = '';
        },
        async getTenantConfigForPass() {
            // 跳转回来，页面刷新，这时候需要请求一次配置
            const AuthConfigMap = {};
            let res;
            if (this.low) {
                res = await localService.getTenantLoginTypes({
                    url: `/system/loginTypes`,
                });
            } else {
                res = await service.getTenantLoginTypes({
                    url: this.nuimsUrl,
                    params: { TenantName: this.tenantName || getTenant() },
                });
            }
            
            getArr(getObj(res).data.Data).forEach((d) => {
                const { LoginType, AppKey, IcbcConfig } = getObj(d);
                if (AUTH_LIST.includes(LoginType)) {
                    AuthConfigMap[LoginType] = AppKey || IcbcConfig;
                }
            });
            this.AuthConfigMap = AuthConfigMap;
        },
        async jumpAuthPass() {
            // 因为跳转回来之后，组件会刷新，所以配置信息需要载请求一次
            await this.getTenantConfigForPass()
            const { origin, search } = location;
            const query = queryString.parse(search);
            let { redirect, loginType } = query;

            if (redirect) {
                localStorage.setItem('From', redirect);
                cookie.set({ From: redirect });
            }
            localStorage.setItem('compType', 'cb');
            const redirectUri = `${origin}/login?redirect=${redirect}`;
            localStorage.setItem('LoginType', loginType);
            localStorage.setItem('RedirectUri', redirectUri);
            cookie.set({ RedirectUri: redirectUri, LoginType: loginType });

            let authUrl;
            switch (loginType) {
                case 'Netease':
                case 'CNetease': 
                    authUrl = `https://login.netease.com/connect/authorize?${queryString.stringify({
                        response_type: 'code',
                        scope: 'openid nickname',
                        client_id: this.AuthConfigMap.Netease,
                        redirect_uri: redirectUri,
                    })}`;
                    break;
                case 'Github':
                case 'CGithub':
                    authUrl = `https://github.com/login/oauth/authorize?${queryString.stringify({
                        response_type: 'code',
                        scope: 'user:email',
                        client_id: this.AuthConfigMap.Github,
                        redirect_uri: redirectUri,
                    })}`;
                    break;
                case 'Wechat':
                case 'CWechat':
                    authUrl = `https://open.weixin.qq.com/connect/qrconnect?${queryString.stringify({
                        response_type: 'code',
                        scope: 'snsapi_login',
                        appid: this.AuthConfigMap.Wechat,
                        redirect_uri: redirectUri,
                    })}`;
                    break;
                case 'Icbc':
                case 'CIcbc':
                    // eslint-disable-next-line no-case-declarations
                    const { IcbcAAMUrl, Version, Style, Op, OpMode, Lang } = this.AuthConfigMap.Icbc;
                    authUrl = `${IcbcAAMUrl}?${queryString.stringify({
                        SERVICENAME: NUIMS_DOMAIN_NAME,
                        SERVICEURL: redirectUri,
                        VERSION: Version,
                        STYLE: Style,
                        OP: Op,
                        OPMode: OpMode,
                        lang: Lang,
                    })}`;
                    break;
            }
            location.href = authUrl;
        },
    },
};
</script>

<style module>
.root {
    width: 410px;
    height: 380px;
    margin: auto;
    padding-top: 30px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(80, 90, 109, 0.16);
    transition: box-shadow 0.2s;
}

.loading {
    width: 100%;
    height: 100%;
}

.form {
    width: 325px;
    margin: 0 auto;
    padding: 0;
    text-align: left;
}

.prefix {
    color: #ccc;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    left: 5px;
}

.suffix {
    color: #ccc;
    font-size: 18px;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: 25px;
}

.error {
    color: var(--brand-error);
    display: inline-block;
    max-width: 85px;
}

.link {
    display: inline-block;
    min-width: 60px;
}

.tips {
    font-size: var(--font-size-small);
    color: var(--color-lighter);
}

.links {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.loading {
    width: 80px;
    height: 20px;
    position: fixed;
    left: 50%;
    top: 20%;
    margin-left: -40px;
    text-align: center;
}
.loading span {
    display: inline-block;
    width: 8px;
    margin-right: 8px;
    height: 100%;
    border-radius: 4px;
    background: var(--brand-primary);
    animation: load 1.04s ease infinite;
}
@keyframes load {
    0%,
    100% {
        height: 20px;
        background: var(--brand-primary-light);
    }
    50% {
        height: 30px;
        margin-top: -10px;
        background: var(--brand-primary-lightest);
    }
}
.loading span:nth-child(2) {
    animation-delay: 0.13s;
}
.loading span:nth-child(3) {
    animation-delay: 0.26s;
}
.loading span:nth-child(4) {
    animation-delay: 0.39s;
}
.loading span:nth-child(5) {
    animation-delay: 0.52s;
}
</style>
