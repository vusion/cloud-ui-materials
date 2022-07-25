<template>
<div :class="$style.root">
    <div @click="tkUser"><slot></slot></div>
</div>
</template>

<script>
require('./isales.min.js');
export default {
    name: 'lcap-h5-tk-close',
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
    created() {
        // if (!window.ISALES) {
        //     this.loadScript('https://f.taikang.com/static/assets/js/sdk/isales/2.0.26-beta/isales.min.js');
        // }
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
                window.ISALES.callApp('closeByNative', {
                    callback(info) {
                        // eslint-disable-next-line eqeqeq
                        if (info.code == 0) {
                            that.msg = info;
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
