<template>
<u-linear-layout type="flex" justify="center" alignment="center" style="background: url('https://static-vusion.163yun.com/assets/login-bg-1.jpg') no-repeat; background-size: cover; height: 100vh;">
    <u-linear-layout direction="vertical" justify="center">
        <h1>登录</h1>
        <lcap-login :src="src" :domain-name="domainName" @success="onSuccess"></lcap-login>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        const { tenant, domainName, env, nuimsDomain = 'user.lcap.163yun.com' } = window.appInfo;
        return {
            // window 等变量暂时不支持变成 ASL
            domainName,
            src: `${window.location.protocol}//${env}.${tenant}.${nuimsDomain}`,
        };
    },
    methods: {
        onSuccess() {
            location.href = '/';
        },
    },
};
</script>
