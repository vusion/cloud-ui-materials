<template>
<l-page>
    <template #head>
        <u-navbar>
            <template #left>
                <s-logo>演示</s-logo>
            </template>
            <template #default>
                <u-navbar-item>Item 1</u-navbar-item>
                <u-navbar-item>Item 2</u-navbar-item>
            </template>
            <template #right>
                <u-navbar-dropdown style="margin-right: 10px;" v-if="userInfo">
                    <template #title>
                        <u-avatar shape="circle"></u-avatar>
                        <span style="display: inline-block; vertical-align: top; margin-left: 10px; margin-right: 10px; color: white;">{{ userInfo.UserName }}</span>
                    </template>
                    <template #default>
                        <u-navbar-menu>
                            <u-navbar-menu-item to="/account/center">个人中心</u-navbar-menu-item>
                            <u-navbar-menu-item @click="logout">安全退出</u-navbar-menu-item>
                        </u-navbar-menu>
                    </template>
                </u-navbar-dropdown>
                <template v-else>
                    <u-navbar>
                        <u-navbar-item href="/login">登录</u-navbar-item>
                    </u-navbar>
                </template>
            </template>
        </u-navbar>
    </template>
    <template #default>
        <u-linear-layout direction="vertical">
            <slot><router-view></router-view></slot>
            <u-linear-layout direction="vertical"></u-linear-layout>
        </u-linear-layout>
    </template>
</l-page>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {},
            noticeCount: 0,
            noticeActive: false,
        };
    },
    watch: {
        $route: {
            immediate: true,
            handler($route) {
                this.noticeActive = $route.path.startsWith('/notice');
            },
        },
    },
    created() {
        this.$auth && this.$auth.getUserInfo().then((userInfo) => this.userInfo = userInfo);
    },
    methods: {
        logout() {
            this.$confirm('确定退出登录吗？', '提示')
                .then(() => this.$auth && this.$auth.logout())
                .then(() => {
                    this.eraseCookie();
                    location.reload();
                });
        },
        eraseCookie() {
            const cookies = document.cookie.split(';');
            cookies.forEach((cookie) => {
                const eqPos = cookie.indexOf('=');
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                const d = new Date();
                d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=; expires=${d.toGMTString()}; path=/`;
            });
        },
    },
};
</script>
