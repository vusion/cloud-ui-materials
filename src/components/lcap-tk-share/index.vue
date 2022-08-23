<template>
<div :class="$style.root">
    <div :class="$style.btn" @click="tkShare">分享到朋友圈</div>
</div>
</template>

<script>
export default {
    name: 'lcap-h5-tk-share',
    props: {
        value: {
            type: [String, Object],
        },
        secret: {
            type: String,
            default: '',
        },
        shareUrl: {
            type: String,
            default: '',
        },
        shareTitle: {
            type: String,
            default: '',
        },
        shareBitmap: {
            type: String,
            default: '',
        },
        shareIntroduce: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            msg: '',
        };
    },
    watch: {
        msg(val) {
            this.$emit('update:value', val);
        },
    },
    created() {
        if (!window.ISALES) {
            this.loadScript('https://f.taikang.com/static/assets/js/sdk/isales/2.0.28-beta/isales.min.js');
        }
    },
    methods: {
        loadScript(url) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.body.appendChild(script);
        },
        tkShare() {
            return new Promise(((resolve, reject) => {
                // eslint-disable-next-line consistent-this
                const that = this;
                window.ISALES.sharePannel({
                    baseMenu: ['1'], // ['0', '1', '2', '3', '10', '11'],
                    // otherMenu: ['6', '7', '8', '9'],
                    h5BtnShare: true,
                    moments: { // 分享朋友圈
                        secret: this.secret || '', // 16位以内秘钥 字母或数字,不使用可填空字符串
                        shareUrl: this.shareUrl || window.location.href, // 分享地址
                        shareTitle: this.shareTitle || window.document.title, // 分享标题,
                        shareBitmap: this.shareBitmap || '', // 分享图片的URL，图片过大或者不可访问会导致分享失败
                        shareIntroduce: this.shareIntroduce || '', // 分享简介
                        callback(res) {
                            console.log('分享微信朋友圈——回调：：：', res);
                            that.msg = JSON.stringify(res);
                            resolve(res);
                        },
                    },
                    trackInfo: {},
                });
            }));
        },
        getMsg() {
            return this.msg;
        },
        invoke() {
            this.tkShare();
        },
    },
};
</script>

<style module>
.root {}
.btn {
    line-height: 50px;
    color: #fff;
    background-color: red;
    text-align: center;
}
</style>
