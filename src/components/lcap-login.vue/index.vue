<template>
<div :class="$style.root">
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
</template>

<script>
import queryString from 'query-string';
import iconCustom from './icon-custom.vue';
import service from './service';
import './iconfont.js';

const rmLastSlash = (str) => {
    const cStr = String(str);
    return cStr[cStr.length - 1] === '/' ? cStr.substring(0, cStr.length - 1) : cStr;
};

// 登录相关配置
const LOGIN_TYPES_MAP = {
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
const TAB_MAP = {
    Normal: LOGIN_TYPES_MAP.Normal.Full,
    QZ: LOGIN_TYPES_MAP.QZ.Short,
    Ldap: LOGIN_TYPES_MAP.Ldap.Short,
};
// 非 AUTH 登陆，通过账号密码形式登陆
const NO_AUTH_LIST = Object.keys(TAB_MAP);
// AUTH 登陆，通过链接跳转形式登陆
const AUTH_LIST = Object.keys(LOGIN_TYPES_MAP)
    .filter((key) => !NO_AUTH_LIST.includes(key));

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
        exdays: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            loading: true,
            account: {
                LoginType: 'Normal',
                AccountId: '',
                AccountPassword: '',
            },
            tabs: [],
            authTypes: [],
            hasTabLoginTypes: true,
            showNoneTips: false,
            showPassword: false,
            errMsg: '',
            accountRule: ['required'],
            pwdRule: ['required | minLength(8)'],
        };
    },
    computed: {
        passSrc() {
            return `${rmLastSlash(this.src)}/pass`;
        },
        showTips() {
            return !this.errMsg && this.authTypes.length === 0;
        },
    },
    mounted() {
        const { search } = location;
        const query = queryString.parse(search);
        const { code, userName, userId } = query;
        if (userName && userId && code) {
            this.setCookie({ authorization: code });
            this.$emit('success', {
                Authorization: code,
                UserName: userName,
                UserId: userId,
            });
        } else {
            this.getTenantConfig();
        }
    },
    methods: {
        async getTenantConfig() {
            let tabs = [];
            let authTypes = [];
            try {
                const res = await service.getTenantLoginTypes({
                    url: this.nuimsUrl,
                    params: { TenantName: this.tenantName },
                });
                res.data.Data.forEach((type) => {
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
                tabs = [{
                    title: '普通登录',
                    value: 'Normal',
                }];
                authTypes = [];
            }
            this.tabs = tabs;
            this.authTypes = authTypes;
            this.loading = false;
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
        },
        async login() {
            let errMsg;
            try {
                errMsg = '';
                await this.$refs.accValidator.validate();
                await this.$refs.pwdValidator.validate();
                const { AccountId, AccountPassword, LoginType } = this.account;
                const res = await service.login({
                    url: this.nuimsUrl,
                    data: {
                        UserName: AccountId,
                        Password: AccountPassword,
                        LoginType,
                        TenantName: this.tenantName,
                        DomainName: this.domainName,
                    },
                    headers: {
                        Env: this.env,
                    },
                });
                // eslint-disable-next-line camelcase
                const { authorization, qz_t } = res.headers;
                const { UserName, UserId } = res.data.Data;
                this.setCookie({ authorization });
                // eslint-disable-next-line camelcase
                this.$emit('success', { Authorization: authorization, UserName, UserId, LoginType, qz_t });
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
            const { redirect = encodeURIComponent(location.href) } = queryString.parse(search);
            location.href = `${this.passSrc}?redirect=${redirect}&loginType=C${type}`;
        },
        rmErrMsg() {
            this.errMsg = '';
        },
        setCookie(data = {}) {
            const d = new Date();
            d.setTime(d.getTime() + this.exdays * 24 * 60 * 60 * 1000);
            const expires = d.toGMTString();
            Object.keys(data).forEach((key) => {
                const value = data[key];
                if (key && value) {
                    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
                }
            });
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
</style>
