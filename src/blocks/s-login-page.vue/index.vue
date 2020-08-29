<template>
<u-linear-layout :class="$style.root" type="flex" justify="center" alignment="center">
    <u-linear-layout direction="vertical" justify="center">
        <h1>登录</h1>
        <s-login :src="`http://${tenant}.user.lcap.163yun.com`" @success="onSuccess"></s-login>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
import SLogin from 's-login.vue';

export default {
    components: { SLogin },
    data() {
        return {
            tenant: window.appInfo.tenant,
        };
    },
    methods: {
        onSuccess() {
            location.href = '/dashboard';
        },
    },
};
</script>

<style module>
.root {
    background: url('https://static-vusion.163yun.com/assets/login-bg-1.jpg') no-repeat;
    background-size: cover;
    height: 100vh;
}
</style>
