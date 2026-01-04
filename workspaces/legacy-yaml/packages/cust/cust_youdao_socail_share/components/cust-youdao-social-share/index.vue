<template>
    <social-share :config="config" :key="version"></social-share>
</template>

<script>
import SocialShare from 'vue-social-share';
import '../../node_modules/social-share.js/dist/css/share.min.css';

export default {
    name: 'cust-youdao-social-share',
    components: {
        SocialShare,
    },

    props: {
        /**
         * @title url
         * @default ''
         */
        url: String,
        source: String, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: String, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: String, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: String, // 图片, 默认取网页中第一个img标签
        sites: {
            type: Array,
            default: () => [
                'qzone',
                'qq',
                'weibo',
                'wechat',
                'douban',
                'tencent',
                'linkedin',
                'google',
                'facebook',
                'twitter',
            ],
        },
        // 启用的站点
        wechatQrcodeTitle: {
            type: String,
            default: () => '微信扫一扫：分享',
        }, // 微信二维码提示文字
        wechatQrcodeHelper: {
            type: String,
            default: () =>
                '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
        },
    },
    data() {
        return {
            version: 1,
        };
    },
    computed: {
        config() {
            return {
                url: this.url,
                source: this.source,
                title: this.title,
                description: this.description,
                image: this.image,
                sites: this.sites,
                wechatQrcodeTitle: this.wechatQrcodeTitle,
                wechatQrcodeHelper: this.wechatQrcodeHelper,
            };
        },
    },
    watch: {
        config() {
            this.version = this.version + 1;
        },
    },
};
</script>

<style></style>
