
<template>
     <subside-login v-if="hasUserCenter" v-bind="[$attrs, $props]" @success="handleSuccess"></subside-login>
     <nuims-login v-else v-bind="[$attrs, $props]" @success="handleSuccess"></nuims-login>
</template>

<script>
import NuimsLogin from './nuims.vue';
import SubsideLogin from './subside.vue';
export default {
   name: 'lcap-login',
   components: {
       NuimsLogin,
       SubsideLogin
   },
   props: {
        hasUserCenter: {
            type: Boolean,
            default: false,
        },
        // 账号认证与权限中心域名
        src: {
            type: String,
            default: 'http://lcp.localhost.vusion.top:8850/login',
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
    methods: {
       handleSuccess(data) {
         this.$emit('success', data);
       }
    }
}
</script>