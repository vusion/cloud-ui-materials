<template>
<div :class="$style.root" :style="rootStyle">
    <video ref="videoPlayer" playsinline class="video-js vjs-big-play-centered vjs-fluid"></video>
</div>
</template>

<script>
import videojs from 'video.js';
import './index.css';

window.videojs = videojs;
require('video.js/dist/lang/zh-CN');

export default {
    name: 'lcap-video',
    props: {
        src: [String, Array],
        width: [String, Number],
        height: [String, Number],
        autoplay: {
            type: Boolean,
            default: false,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        draggable: {
            type: Boolean,
            default: true,
        },
        muted: {
            type: Boolean,
            default: true,
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            player: null,
        };
    },
    computed: {
        rootStyle() {
            const { width, height } = this;
            const rootStyle = {};
            const widthSize = this.fixSize(width);
            const heightSize = this.fixSize(height);
            if (widthSize) {
                rootStyle.width = widthSize;
            }
            if (heightSize) {
                rootStyle.height = heightSize;
            }
            return rootStyle;
        },
    },
    watch: {
        draggable(val) {
            if (val) {
                this.controlBar.progressControl.enable();
            } else {
                this.controlBar.progressControl.disable();
            }
        },
        src(val) {
            if (this.player && val) {
                const sources = this.getSources(val);
                this.player.src(sources);
            }
        },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.dispose();
    },
    methods: {
        init() {
            const { src, autoplay, loop, draggable, muted, options } = this;
            const sources = this.getSources(src);
            const me = this;
            this.player = videojs(this.$refs.videoPlayer, {
                ...options,
                language: 'zh-CN',
                autoplay,
                sources,
                loop,
                muted,
                controls: true,
                responsive: true,
            }, function onPlayerReady() {
                if (!draggable) {
                    this.controlBar.progressControl.disable();
                }
                if (autoplay) {
                    this.play();
                }
                this.on('play', (e) => {
                    const { player } = e.target;
                    const currentTime = player.currentTime();
                    // 初始播放时间 < 0.2s 认为是开始播放
                    if (currentTime * 10 < 2) {
                        me.$emit('start', e.target.player);
                    } else {
                        me.$emit('play', player);
                    }
                });
                this.on('pause', (e) => {
                    me.$emit('pause', e.target.player);
                });
                this.on('ended', (e) => {
                    me.$emit('ended', e.target.player);
                });
            });
        },
        getSources(src) {
            if (!src) {
                return [];
            }
            return (Array.isArray(src) ? src : [src]).map((ele) => ({
                src,
                type: this.getType(ele),
            }));
        },
        dispose() {
            if (this.player) {
                this.player.dispose();
            }
        },
        getType(src) {
            const MimetypesKind = {
                opus: 'video/ogg',
                ogv: 'video/ogg',
                mp4: 'video/mp4',
                mov: 'video/mp4',
                m4v: 'video/mp4',
                mkv: 'video/x-matroska',
                m4a: 'audio/mp4',
                mp3: 'audio/mpeg',
                aac: 'audio/aac',
                caf: 'audio/x-caf',
                flac: 'audio/flac',
                oga: 'audio/ogg',
                wav: 'audio/wav',
                m3u8: 'application/x-mpegURL',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                gif: 'image/gif',
                png: 'image/png',
                svg: 'image/svg+xml',
                webp: 'image/webp',
            };
            const ext = src.split('.').pop().toLowerCase();
            return MimetypesKind[ext];
        },
        play() {
            if (this.player) {
                this.player.play();
            }
        },
        pause() {
            if (this.player) {
                this.player.pause();
            }
        },
        fixSize(size) {
            if (!size)
                return null;
            if (size.includes('px') || size.includes('%'))
                return size;
            return `${size}px`;
        },
    },
};
</script>

<style module>
.root {
    overflow: hidden;
}
</style>
