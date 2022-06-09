<template>
<div :class="$style.root">
    <div :class="$style.btn" @click="tkScan">点我扫码</div>
</div>
</template>

<script>

export default {
    name: 'lcap-tk-scan',
    props: {
        value: {
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
            this.loadScript('https://f.taikang.com/static/assets/js/sdk/isales/2.0.26-beta/isales.min.js');
        }
    },
    methods: {
        loadScript(url) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            document.body.appendChild(script);
        },
        tkScan() {
            // eslint-disable-next-line consistent-this
            const that = this;
            return new Promise(((resolve, reject) => {
                window.ISALES.callApp('scanByNative', {
                    callback(info) {
                        console.log(info);
                        // eslint-disable-next-line eqeqeq
                        if (info.code == 0) {
                            that.msg = info.msg;
                            resolve(info.msg);
                        } else {
                            this.msg = '';
                            reject(info);
                        }
                    },
                });
            }));
        },
        getMsg() {
            return this.msg;
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
