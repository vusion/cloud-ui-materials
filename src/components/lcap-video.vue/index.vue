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
            default: false,
        },
        breakProgress: {
            type: String,
            default: '',
        },
        poster: String,
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
            progressTimer: undefined,
            firstPlay: true,
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
            if (!this.player)
                return;
            if (val) {
                this.player.controlBar.progressControl.enable();
            } else {
                this.player.controlBar.progressControl.disable();
            }
        },
        src(val) {
            if (this.player && val) {
                const sources = this.getSources(val);
                this.player.src(sources);
            }
        },
        breakProgress(val) {
            if (!val)
                return;
            setTimeout(() => {
                const percent = val.replace('%', '') / 100;
                this.$toast.success('已为您跳转到上次观看位置');
                this.$refs.videoPlayer.currentTime = this.player.duration() * percent;
            }, 1500);
        },
    },
    mounted() {
        this.init();
        clearInterval(this.progressTimer);
        // 每10s同步视频播放进度
        this.progressTimer = setInterval(() => {
            const videoDuration = this.player && this.player.duration();
            const remainTime = this.player && this.player.remainingTime();
            const videoProgress = ((videoDuration - remainTime) / videoDuration * 100).toFixed(1) + '%';
            this.$emit('videoProgress', videoProgress);
        }, 10000);
        const percent = this.breakProgress.replace('%', '') / 100;
        // 仅第一次播放跳转到上次播放位置
        if (this.breakProgress) {
            this.player.on('loadedmetadata', () => {
                this.$refs.videoPlayer.currentTime = this.player.duration() * percent;
            });
            this.player.on('play', () => {
                if (this.firstPlay) {
                    // this.$toast.success('已为您跳转到上次观看位置');
                    this.$refs.videoPlayer.currentTime = this.player.duration() * percent;
                    this.firstPlay = false;
                }
            });
        }
        // 拖动进度条时记录进度, 时间差大于3s视为拖动进度条
        let lastDragProgress = 0;
        this.player.on('timeupdate', (e) => {
            const currentTime = this.$refs.videoPlayer.currentTime;
            if (currentTime - lastDragProgress > 3 || lastDragProgress - currentTime > 3) {
                const videoDuration = this.player && this.player.duration();
                const remainTime = this.player && this.player.remainingTime();
                const videoProgress = ((videoDuration - remainTime) / videoDuration * 100).toFixed(1) + '%';
                this.$emit('videoProgress', videoProgress);
            }
            lastDragProgress = currentTime;
        });
    },
    beforeDestroy() {
        clearInterval(this.progressTimer);
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
                poster: this.poster,
                controls: true,
                responsive: true,
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
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
    width: 100%;
}
</style>
