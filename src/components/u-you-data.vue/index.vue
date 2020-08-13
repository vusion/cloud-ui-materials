<template>
<div :class="$style.root" :style="rootStyle">
    <u-linear-layout
        :class="$style.loading"
        v-if="loading"
        type="flex"
        justify="center"
        alignment="center">
        <div>
            <u-spinner></u-spinner>正在加载中...
        </div>
    </u-linear-layout>
    <u-linear-layout
        :class="$style.loading"
        v-else-if="!finnalSrc"
        type="flex"
        justify="center"
        alignment="center">
        <div>
            报表地址缺失
        </div>
    </u-linear-layout>
    <div :class="$style.wrapper">
        <template v-if="finnalSrc">
            <iframe
                v-show="!loading"
                ref="iframeRef"
                :class="$style.frame"
                :src="finnalSrc"
                width="100%"
                height="100%"
                :frameborder="frameborder"
                style="border:0px;"
            ></iframe>
        </template>
    </div>
</div>
</template>

<script>
export default {
    name: 'u-you-data',
    props: {
        src: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            default: 'auto',
        },
        height: {
            type: String,
            default: 'auto',
        },
        scale: {
            type: String,
            default: '100',
        },
        bottomBarPos: {
            type: String,
            default: 'bottom',
        },
        hideProgressBar: {
            type: Boolean,
            default: true,
        },
        hidePageBar: {
            type: Boolean,
            default: true,
        },
        hideScaleBar: {
            type: Boolean,
            default: true,
        },
        hideTitle: {
            type: Boolean,
            default: true,
        },
        hidePrivate: {
            type: Boolean,
            default: true,
        },
        hidePublic: {
            type: Boolean,
            default: true,
        },
        side: {
            type: Boolean,
            default: false,
        },
        toolbar: {
            type: String,
            default: JSON.stringify(['export', 'refresh', 'print']),
        },
        mode: {
            type: String,
            default: 'normal',
        },
    },
    data() {
        return {
            loading: true,
            frameborder: 0,
        };
    },
    computed: {
        finnalSrc() {
            const { src } = this;
            if (!src) {
                return '';
            }
            const url = new URL(src);
            [
                'scale',
                'bottomBarPos',
                'hideProgressBar',
                'hidePageBar',
                'hideScaleBar',
                'hideTitle',
                'hidePrivate',
                'hidePublic',
                'side',
                'toolbar',
                'mode',
            ].forEach((key) => {
                if (this[key]) {
                    url.searchParams.append(key, this[key]);
                }
            });

            return url.toString();
        },
        rootStyle() {
            const style = {};
            style.width = this.width;
            style.height = this.height;
            return style;
        },
    },
    mounted() {
        const iFrame = this.$refs.iframeRef;
        if (iFrame) {
            iFrame.onload = () => {
                this.loading = false;
                console.warn('onload...');
                this.autoSize();
                this.$emit('load');
                this.timer = setTimeout(() => {
                    this.autoSize();
                }, 100);
            };
            window.addEventListener('resize', this.autoSize);
        } else {
            this.loading = true;
            this.load().then(() => {
                this.loading = false;
                this.$emit('load');
            });
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        window.removeEventListener('resize', this.autoSize);
    },
    methods: {
        autoSize() {
            const iFrame = this.$refs.iframeRef;
            if (iFrame) {
                const width = this.$el.offsetWidth;
                const height = this.$el.offsetHeight;
                iFrame.style.width = width + 'px';
                iFrame.style.height = height + 'px';
            }
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    width: 100%;
    height: 100%;
    /* overflow: auto; */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    display: flex;
}

.loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.wrapper {
    position: relative;
    flex: 1 1 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.frame {
    padding: 0;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
}
</style>
