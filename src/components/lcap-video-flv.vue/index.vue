<template>
<div :class="$style.root">
    <template v-if="status === 'noSource'">
        设置正确的视频源
    </template>
    <template v-else-if="status === 'noSupport'">
        当前浏览器不支持该视频源
    </template>
    <template v-else>
        <video :class="$style.video" ref="video" @play="$emit('play', $event)"
            @pause="$emit('pause', $event)"
            controls :autoplay="autoplay"></video>
    </template>
</div>
</template>

<script>
import flvjs from 'flv.js';
export default {
    name: 'lcap-video-flv',
    props: {
        src: {
            type: String,
        },
        type: {
            type: String,
            default: 'flv',
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        isLive: {
            type: Boolean,
            default: false,
        },
        cors: {
            type: Boolean,
            default: true,
        },
        withCredentials: {
            type: Boolean,
            default: false,
        },
        hasAudio: {
            type: Boolean,
            default: true,
        },
        hasVideo: {
            type: Boolean,
            default: true,
        },
        config: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSupported: true,
            player: undefined,
            ready: false,
        };
    },
    computed: {
        status() {
            const { src, isSupported } = this;
            if (!src) {
                return 'noSource';
            } else if (!isSupported) {
                return 'noSupport';
            }
            return 'ready';
        },
    },
    watch: {
        src: {
            handler(src) {
                if (this.player) {
                    this.playerDestory();
                }
                if (src) {
                    this.player = this.getPlayer();
                }
            },
            immediate: true,
        },
    },

    mounted() {
        this.ready = true;
        if (this.player) {
            this.$nextTick(() => {
                this.player.attachMediaElement(this.$refs.video);
                this.player.load();
            });
        }
    },
    created() {
        this.isSupported = flvjs.isSupported();
    },
    beforeDestroy() {
        this.playerDestory();
    },
    methods: {
        getPlayer() {
            const player = flvjs.createPlayer({
                type: this.type,
                url: this.src,
                isLive: this.isLive,
                cors: this.cors,
                withCredentials: this.withCredentials,
                hasAudio: this.hasAudio,
                hasVideo: this.hasVideo,
            }, this.config);
            if (this.ready) {
                player.attachMediaElement(this.$refs.video);
            }
            return player;
        },
        playerDestory() {
            this.$emit('destroy');
            this.player.pause();
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = null;
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    text-align: center;
}
.root video {
    max-width: 100%;
    max-height: 100%;
}
</style>
