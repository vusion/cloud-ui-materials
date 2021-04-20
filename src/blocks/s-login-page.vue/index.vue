<template>
<u-linear-layout type="flex" justify="center" alignment="center" style="background: url('https://static-vusion.163yun.com/assets/login-bg-1.jpg') no-repeat; background-size: cover; height: 100vh;">
    <u-linear-layout direction="vertical" justify="center">
        <h1>登录</h1>
        <lcap-login :src="`http://${tenant}.${nuimsDomain}`" :domain-name="domainName" @success="onSuccess"></lcap-login>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            // window 等变量暂时不支持变成 ASL
            tenant: window.appInfo.tenant,
            domainName: window.appInfo.domainName,
            nuimsDomain: window.appInfo.tenant === 'lcp' ? 'user.vusion.top' : window.appInfo.nuimsDomain || 'user.lcap.163yun.com',
        };
    },
    methods: {
        onSuccess() {
            location.href = '/dashboard';
        },
    },
};
</script>
