<template>
    <div :class="$style.root">
        <iframe
            v-if="iframeSrc"
            :src="iframeSrc"
            :class="$style.content"
            referrerpolicy="origin"
            frameborder="0"
            allowtransparency="true"></iframe>
        <div v-else :class="$style.content">正在获取配置参数</div>
    </div>
</template>

<script>
import getOauth2Url from '../../logics/getOauth2Url';
import getOauthCodeAndState from '../../logics/getOauthCodeAndState';

export default {
    name: 'cw-oauth-page-embed',
    props: {
        currentSrc: {
            type: String,
            default: '请在这里编写代码',
        },
    },
    data() {
        return {
            iframeSrc: null,
        };
    },
    created() {
        getOauth2Url('feishu').then((v) => {
            console.log('🚀 ~ file: index.vue:33 ~ getOauth2Url ~ v:', v);
            this.iframeSrc = v;
        });
        // const a = getOauthCodeAndState();
        // console.log('🚀 ~ file: index.vue:37 ~ created ~ a:', a);
    },
};
</script>

<style module>
.root {
    height: 416px;
    width: 480px;
}

.content {
    width: 100%;
    height: 100%;
}
</style>
