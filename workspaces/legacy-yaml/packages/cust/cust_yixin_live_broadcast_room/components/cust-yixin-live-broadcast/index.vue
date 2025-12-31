<template>
    <div :class="$style.root">
        <canvas :id="canvasId" :class="$style.yxVideoCanvas"></canvas>
        <video
            :id="videoId"
            :class="[
                'video-js vjs-big-play-centered',
                !autoResize && 'vjs-fluid',
                $style.yxVideo,
            ]"
            x-webkit-airplay="allow"
            webkit-playsinline
            controls
            preload="auto"
            muted
        ></video>
    </div>
</template>

<script>
import './sdk/neplayer_v2.8.5.css';
import neplayer from './sdk/neplayer_v2.8.5.js';
import debounce from 'lodash.debounce';

let globalVideoId = 1;
let hasInteracted = false;

if (window && window.document) {
    const fn = () => {
        hasInteracted = true;
        document.removeEventListener('click', fn);
        document.removeEventListener('keydown', fn);
    };
    document.addEventListener('click', fn);
    document.addEventListener('keydown', fn);
}

export default {
    name: 'cust-yixin-live-broadcast',
    props: {
        src: {
            type: [String, Array],
            default: () =>
                'https://vodmjy1tuni.vod.126.net/vodmjy1tuni/EL71SeTF_3382273760_shd.mp4',
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        isLive: {
            type: Boolean,
            default: false,
        },
        muted: {
            type: Boolean,
            default: false,
        },
        autoResize: { type: Boolean, default: false },
        poster: String,
        options: {
            type: Object,
            default() {
                return null;
            },
        },
        decryptInfo: {
            type: Object,
            default() {
                return null;
            },
        },
    },
    data() {
        this.videoInstance = null;
        return {
            videoId: `yixin-video-${globalVideoId++}`,
        };
    },
    created() {
        this.resizeFn = debounce(this.resize.bind(this));
        this.setSrcDe = debounce(async () => {
            await new Promise((res) => setTimeout(res, 1000));
            this.setSrc();
        }, 1000);
    },

    watch: {
        src() {
            this.setSrcDe();
        },
    },

    computed: {
        canvasId() {
            return `${this.videoId}-canvas`;
        },
    },
    destroyed() {
        console.log('🚀 ~ file: index.vue:99 ~ destroyed ~ destroyed:');
        if (this.videoInstance) {
            this.videoInstance.release();
            this.videoInstance = null;
        }
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.$el);
            this.resizeObserver = null;
        }
    },
    async mounted() {
        const options = {
            canvasId: this.canvasId,
            decoderPath:
                'https://yx-web-nosdn.netease.im/sdk-release/webplayer/',
            controls: true, //是否显示控制条
            autoplay: this.autoplay, //是否自动播放(ios不支持自动播放)
            /*预加载选项*/
            preload: 'auto', //'auto'预加载视频（需要浏览器允许）、'metadata'仅预加载视频meta信息、'none'不预加载;
            poster: this.poster, //视频播放前显示的图片
            loop: true, //是否循环播放
            // width: 640, //设置播放器宽度
            // height: 480, //设置播放器高度
            // aspectRatio: '16:9', //将播放器置于流体模式下，计算播放器动态大小时使用该值,该值应该是比用冒号隔开的两个数字（如“16:9”或“4:3”）
            fluid: true, //自适应宽高,播放器将会有流体体积,换句话说，它将缩放以适应容器,如果<video>标签有“vjs-fluid”样式时，这个选项会自动设置为true。
            language: 'zh-CN', // 设置语言，可选 en | zh-cn | zh-tw
            muted: this.muted, // 是否静音
            nativeControlsForTouch: false, //是否使用浏览器原生的控件
            autoSetup: false, //阻止播放器为具有data-setup属性的媒体元素运行autoSetup，注意：必须在与videojs.options.autoSetup = falsevideojs源加载生效的同一时刻全局设置。
            playbackRates: [0.5, 1, 1.25, 1.5, 2], //设置变速播放倍率选项，仅 HTML5 播放模式有效。严格大于0的数字数组，其中1表示常速（100％），0.5表示半速（50％），2表示双速（200％）等。如果指定，播放器显示控件允许用户从选择数组中选择播放速度。选项以从下到上的指定顺序显示
            bigPlayButton: true, //是否显示居中的播放按钮（浏览器劫持嵌入的播放按钮无法去除）。
            //'children': []|Object, 此选项继承自基Component类。
            techOrder: ['html5', 'flvjs'], //优先使用的播放模式（2.3.0版本开始支持flvjs）
            streamTimeoutTime: 30 * 1000, //拉流超时时间，默认30s
            errMsg7: '拉流超时请重新请求', //sdk拉流超时后，页面的UI提示
            controlBar: {
                //设置播放器控件
                playToggle: true, //播放/暂停按钮
                volumePanel: {
                    //音量控制控件，音量条竖直
                    inline: false,
                    CurrentTimeDisplay: true,
                },
                currentTimeDisplay: true, //当前播放时间
                timeDivider: false, // '/' 分隔符
                durationDisplay: true, //总时间
                progressControl: {
                    //点播模式时，播放进度条，seek控制
                    seekBar: {
                        loadProgressBar: true, //是否显示资源加载的进度条
                        mouseTimeDisplay: true, //鼠标点击是否显示时间
                        playProgressBar: true, //是否显示已经播放的进度条
                    },
                },
                liveDisplay: false, //直播流时，显示LIVE
                remainingTimeDisplay: false, //当前播放时间
                playbackRateMenuButton: true, //是否显示播放速率选择按钮
                chaptersButton: false, //
                descriptionsButton: false, //用于切换和选择描述的按钮组件，需要使用相关能力
                fullscreenToggle: true, //全屏控制
            },
            ...this.options,
        };
        this.videoInstance = await new Promise((res) => {
            const videoInstance = neplayer(this.videoId, options, () => {
                res(videoInstance);
            });
        });

        if (
            this.src !==
            'https://vodmjy1tuni.vod.126.net/vodmjy1tuni/EL71SeTF_3382273760_shd.mp4'
        ) {
            this.setSrc();
        }
        this.videoInstance.on('canplay', () => {
            if (this.autoplay) {
                if (!hasInteracted && this.autoplay && !this.muted) {
                    this.videoInstance.setMute(true);
                }
                setTimeout(() => {
                    this.videoInstance.play();
                }, []);
            }
        });

        if (this.autoResize) {
            this.resizeObserver = new ResizeObserver((entries) => {
                const entry = entries[0];

                // entry.contentRect 包含了目标元素的新尺寸信息
                const { width, height } = entry.contentRect;
                // 在这里可以对尺寸变化做出响应
                this.resizeFn(width, height);
            });
            this.resizeObserver.observe(this.$el);
            this.$nextTick(() => {
                this.resizeFn(this.$el.clientWidth, this.$el.clientHeight);
            });
        }
    },

    methods: {
        resize(width, height) {
            if (this.videoInstance) {
                this.videoInstance.resize(width, height);
            }
        },
        getInstance() {
            return this.videoInstance;
        },

        play() {
            if (this.videoInstance) {
                this.videoInstance.play();
            }
        },
        pause() {
            if (this.videoInstance) {
                this.videoInstance.pause();
            }
        },

        setSrc() {
            if (this.videoInstance) {
                // this.videoInstance.reset();
                // if (this.videoInstance.rts) this.videoInstance.rts.destroy();
                this.videoInstance.setDataSource(
                    [].concat(this.src).map((v) => this.getRealSource(v))
                );
            }
        },

        getRealSource(src) {
            if (typeof src !== 'string' && typeof src === 'object')
                return Object.assign(
                    {},
                    this.decryptInfo && { decryptInfo: this.decryptInfo },
                    src
                );
            const url = new URL(src);
            const pathname = url.pathname;
            if (pathname.endsWith('.mp4')) {
                return {
                    type: 'video/mp4', //表示hls，'video/x-flv'表示flv，'video/mp4'表示mp4，'nertc'表示低延迟直播
                    src, //拉流地址
                    isLive: this.isLive, //是否是直播拉流
                };
            }
            if (pathname.endsWith('.flv')) {
                return Object.assign(
                    {
                        type: 'video/x-flv', //表示hls，'video/x-flv'表示flv，'video/mp4'表示mp4，'nertc'表示低延迟直播
                        src, //拉流地址
                        isLive: this.isLive, //是否是直播拉流
                    },
                    this.decryptInfo && {
                        decryptInfo: this.decryptInfo,
                    }
                );
            }
            if (pathname.endsWith('.m3u8')) {
                return Object.assign(
                    {
                        type: 'application/x-mpegURL', //表示hls，'video/x-flv'表示flv，'video/mp4'表示mp4，'nertc'表示低延迟直播
                        src, //拉流地址
                        isLive: true, //是否是直播拉流
                    },
                    this.decryptInfo && {
                        decryptInfo: this.decryptInfo,
                    }
                );
            }
            return {
                type: 'rtmp/flv',
                src, //拉流地址
                isLive: true, //是否是直播拉流
            };
        },
    },
};
</script>

<style module>
.root {
    width: var(--yx-video-width, 100%);
    height: var(--yx-video-width, 100%);
    position: relative;
}

.yxVideo {
}

.yxVideoCanvas {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
