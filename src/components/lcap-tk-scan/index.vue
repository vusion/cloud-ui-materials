<template>
<div :class="$style.root">
    <div :class="$style.btn" @click="tkScan">点我扫码</div>
</div>
</template>

<script>
require('./isales.min.js');
export default {
    name: 'lcap-h5-tk-scan',
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
        invoke() {
            this.tkScan();
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
