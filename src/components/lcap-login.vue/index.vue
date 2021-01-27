<template>
<div>
    <u-linear-layout
        v-if="loading"
        type="flex"
        justify="center"
        alignment="center"
        style="width: 410px; height: 380px"
    >
        <div>
            <u-spinner></u-spinner>正在加载中...
        </div>
    </u-linear-layout>
    <iframe
        v-show="!loading"
        :src="loginSrc"
        :width="width"
        :height="height"
        :name="name"
        :frameborder="frameborder"
        :class="$style.frame"
        id="login"
    ></iframe>
</div>
</template>

<script>
import queryString from 'query-string';

const rmLastSlash = (str) => {
    const cStr = String(str);
    return cStr[cStr.length - 1] === '/'
        ? cStr.substring(0, cStr.length - 1)
        : cStr;
};
const commonType = 'clogin';

export default {
    name: 'lcap-login',
    props: {
        src: {
            type: String,
            default: 'http://nuims.vusion.top/clogin',
        },
        exdays: {
            type: Number,
            default: 1,
        },
        width: {
            type: Number,
            default: 410,
        },
        height: {
            type: Number,
            default: 380,
        },
        frameborder: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            default: 'login',
        },
        // 登录应用信息
        domainName: {
            type: String,
            default: undefined,
        },
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
    },
    data() {
        return {
            loading: true,
        };
    },
    computed: {
        loginSrc() {
            const { src } = this;
            if (src && src.indexOf('clogin') === -1) {
                return `${rmLastSlash(src)}/clogin`;
            }
            return src;
        },
    },
    mounted() {
        const query = queryString.parse(location.href.replace(/(\S*)\?/, ''));
        const { code, userName, userId } = query;
        if (userName && userId && code) {
            this.setCookie({
                authorization: code,
                userName,
                userId,
            });
            this.$emit('success', {
                Authorization: code,
                UserName: userName,
                UserId: userId,
            });
        } else {
            const iFrame = document.getElementById('login');
            const from = location.href;
            const {
                loginSrc,
                domainName,
                useNormal,
                useQZ,
                useLdap,
                useNetease,
                useGithub,
                useWechat,
            } = this;
            iFrame.onload = () => {
                this.loading = false;
                iFrame.contentWindow.postMessage(
                    {
                        useNormal,
                        useQZ,
                        useLdap,
                        useNetease,
                        useGithub,
                        useWechat,
                        domainName,
                        from,
                        type: commonType,
                    },
                    loginSrc,
                );
            };

            window.addEventListener(
                'message',
                (e) => {
                    const { data } = e;
                    const { type, success = false, data: dData = {} } = data;
                    if (type === commonType) {
                        if (success) {
                            const {
                                Authorization,
                                UserName,
                                UserId,
                                LoginType,
                                To,
                            } = dData;
                            if (['CNetease', 'CGithub', 'CWechat'].includes(LoginType)) {
                                location.href = To;
                            } else {
                                this.setCookie({
                                    authorization: Authorization,
                                    userName: UserName,
                                    userId: UserId,
                                });
                                this.$emit('success', dData);
                            }
                        } else {
                            this.$emit('error', dData);
                        }
                    }
                },
                false,
            );
        }
    },
    methods: {
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
.frame {
    box-shadow: 0 0 10px 0 rgba(80, 90, 109, 0.16);
    transition: box-shadow 0.2s;
}
</style>
