<template>
<div :class="$style.root">
    <div :class="$style.btn" @click="tkUser">点击获取用户信息</div>
</div>
</template>

<script>
require('./isales.min.js');
export default {
    name: 'lcap-h5-tk-getuserinfo',
    props: {
        value: {
            type: [String, Object],
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
        tkUser() {
            return new Promise(((resolve, reject) => {
                // eslint-disable-next-line consistent-this
                const that = this;
                window.ISALES.callApp('userInfo', {
                    callback(info) {
                        console.log(info);
                        // eslint-disable-next-line eqeqeq
                        if (info.code == 0) {
                            that.msg = JSON.stringify(info.msg);
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
            this.tkUser();
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
