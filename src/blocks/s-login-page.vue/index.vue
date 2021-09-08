<template>
<u-linear-layout type="flex" justify="center" alignment="center" style="background: url('https://static-vusion.163yun.com/assets/login-bg-1.jpg') no-repeat; background-size: cover; height: 100vh;">
    <u-linear-layout direction="vertical" justify="center">
        <h1>登录</h1>
        <lcap-login :src="src" :tenant-name="tenantName" :domain-name="domainName" :env="env" @success="onSuccess"></lcap-login>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        const { tenant, domainName, env, nuimsDomain = 'user.lcap.163yun.com' } = window.appInfo;
        const envUri = env === 'dev' ? 'dev.' : '';
        return {
            // window 等变量暂时不支持变成 ASL
            tenantName: tenant,
            domainName,
            env,
            src: `${window.location.protocol}//${envUri}${tenant}.${nuimsDomain}`,
        };
    },
    methods: {
        onSuccess() {
            location.href = '/';
        },
    },
};
</script>
