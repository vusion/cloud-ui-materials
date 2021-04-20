<template>
<l-dashboard>
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
    <template #side>
        <u-sidebar>
            <u-sidebar-item to="/overview">总览</u-sidebar-item>
            <u-sidebar-item>Item 2</u-sidebar-item>
        </u-sidebar>
    </template>
    <template #default>
        <u-linear-layout direction="vertical">
            <u-crumb auto></u-crumb>
            <router-view></router-view>
        </u-linear-layout>
    </template>
</l-dashboard>
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
            /* eslint-disable new-cap */
            this.$confirm('确定退出登录吗？', '提示')
                .then(() => this.$auth.logout())
                .then(() => location.reload());
        },
    },
};
</script>
