<template>
  <div :class="$style.root" :style="rootStyle" ref="videoContainer">
    <video
      ref="videoPlayer"
      playsinline
      webkit-playsinline
      :disablePictureInPicture="isIOS && !draggable"
      class="video-js vjs-big-play-centered vjs-fluid"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "./index.css";

window.videojs = videojs;
require("video.js/dist/lang/zh-CN");

export default {
  name: "cw-video-view",
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
      default: "",
    },
    poster: String,
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    showPlaybackRates: {
      type: Boolean,
      default: true, // 默认显示倍速
    },
  },
  data() {
    return {
      player: null,
      progressTimer: undefined,
      firstPlay: true,
      isIOS: isiOS(),
      isAndroid: isAndroid(),
      fetchingFirstFrame: false,
      simulatedFullscreen: false, // NEW: 模拟全屏状态，仅用于 iOS 且 draggable 为 false
      originalVideoPaddingTop: null, // NEW: 缓存 video 元素原始的 padding-top
      flag: false,
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
      if (!this.player) return;
      if (val) {
        this.player.controlBar.progressControl.enable();
      } else {
        this.player.controlBar.progressControl.disable();
      }
    },
    src: {
      handler(val) {
        if (this.player && val) {
          const sources = this.getSources(val);
          this.player.src(sources);
          // this.tryToFetchFirstFrameWithPlayThenPauseDebounce();
        }
        this.player.ready(() => {
          this.$nextTick(() => {
            if (!this.src || this.flag) return;
            this.flag = true;
            const savedTime = sessionStorage.getItem(
              `videoProgress-${this.src}`
            );

            console.log(`videoProgress-${this.src}`, savedTime);
            if (savedTime) {
              const targetTime = parseFloat(savedTime);
              // 新增：排除已结束的无效进度
              if (targetTime) {
                if (this.isIOS) {
                  this.player.load();
                }
                this.player.currentTime(targetTime);
              }
            }
          });
        });

        // 播放器准备好后恢复进度
      },
      immediate: true,
    },
    breakProgress(val) {
      if (!val) return;
      // setTimeout(() => {
      //   if (val.indexOf("%") === -1) {
      //     this.player.currentTime(val);
      //   } else {
      //     const percent = val.replace("%", "") / 100;
      //     this.player.currentTime(this.player.duration() * percent);
      //   }
      // }, 1500);
    },
    showPlaybackRates(val) {
      if (this.player) {
        if (val) {
          this.player.controlBar.playbackRateMenuButton.show();
        } else {
          this.player.controlBar.playbackRateMenuButton.hide();
        }
      }
    },
  },
  created() {
    this.tryToFetchFirstFrameWithPlayThenPauseDebounce = debounce(
      this.tryToFetchFirstFrameWithPlayThenPause.bind(this),
      300
    );
  },
  mounted() {
    this.init();
    clearInterval(this.progressTimer);
    // 每10秒同步视频播放进度
    this.progressTimer = setInterval(() => {
      const videoDuration = this.player && this.player.duration();
      const remainTime = this.player && this.player.remainingTime();
      const videoProgress =
        (((videoDuration - remainTime) / videoDuration) * 100).toFixed(1) + "%";
      this.$emit("videoProgress", videoProgress);
    }, 500);

    // 仅第一次播放时跳转到上次播放位置
    if (this.breakProgress) {
      if (this.breakProgress.indexOf("%") === -1) {
        this.player.on("loadedmetadata", () => {
          this.$refs.videoPlayer.currentTime = this.breakProgress;
        });
        this.player.on("play", () => {
          if (this.firstPlay && !this.fetchingFirstFrame) {
            this.$refs.videoPlayer.currentTime = this.breakProgress;
            this.firstPlay = false;
          }
        });
      } else {
        const percent = this.breakProgress.replace("%", "") / 100;
        this.player.on("loadedmetadata", () => {
          this.$refs.videoPlayer.currentTime = this.player.duration() * percent;
        });
        this.player.on("play", () => {
          if (this.firstPlay && !this.fetchingFirstFrame) {
            this.$refs.videoPlayer.currentTime =
              this.player.duration() * percent;
            this.firstPlay = false;
          }
        });
      }
    }

    // 拖动进度条时记录进度（时间差大于3秒视为拖动进度条）
    let lastDragProgress = 0;
    this.player.on("timeupdate", (e) => {
      const currentTime = this.$refs.videoPlayer.currentTime;
      if (Math.abs(currentTime - lastDragProgress) > 3) {
        const videoDuration = this.player && this.player.duration();
        const remainTime = this.player && this.player.remainingTime();
        const videoProgress =
          (((videoDuration - remainTime) / videoDuration) * 100).toFixed(1) +
          "%";
        this.$emit("videoProgress", videoProgress);
      }
      lastDragProgress = currentTime;
    });

    // NEW/MODIFIED: 模拟全屏逻辑，仅适用于 iOS 且 draggable 为 false
    if (this.isIOS && !this.draggable) {
      this.player.ready(() => {
        // 重写 requestFullscreen 与 exitFullscreen 方法，改为调用模拟全屏切换
        this.player.requestFullscreen = () => {
          this.toggleSimulatedFullscreen();
        };
        this.player.exitFullscreen = () => {
          this.toggleSimulatedFullscreen();
        };
        // 重写 isFullscreen 方法，返回模拟全屏状态，保证控制栏按钮图标正确
        this.player.isFullscreen = () => {
          return this.simulatedFullscreen;
        };
        // 重绑全屏按钮点击事件，调用模拟全屏切换
        const fullscreenButton =
          this.player.controlBar.getChild("fullscreenToggle");
        if (fullscreenButton) {
          fullscreenButton.off("click");
          fullscreenButton.on("click", () => {
            this.toggleSimulatedFullscreen();
          });
        }
      });
    }

    // if (this.isIOS) {
    // 播放过程中保存播放进度到 sessionStorage
    this.player.on("timeupdate", () => {
      // 增加对播放结束状态的判断
      if (this.player.currentTime() < 1) return;
      sessionStorage.setItem(
        `videoProgress-${this.src}`,
        this.player.currentTime()
      );
      console.log("timeupdate", this.player.currentTime());
    });

    // 新增：监听播放结束事件
    this.player.on("ended", () => {
      sessionStorage.setItem(`videoProgress-${this.src}`, 0); // 明确重置进度
      this.player.currentTime(0); // 强制跳转到开始[1](@ref)
      console.log("ended");
    });

    // }
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
      this.player = videojs(
        this.$refs.videoPlayer,
        {
          ...options,
          language: "zh-CN",
          autoplay,
          sources,
          loop,
          crossorigin: "anonymous",
          muted,
          poster: this.poster,
          controls: true,
          responsive: true,
          playbackRates: this.showPlaybackRates
            ? [0.5, 0.75, 1, 1.25, 1.5, 2]
            : [],
          nativeControlsForTouch: false, // 尽可能禁用原生控件
        },
        function onPlayerReady() {
          if (!draggable) {
            this.controlBar.progressControl.disable();
          }
          if (autoplay) {
            this.play();
          }
          // me.tryToFetchFirstFrameWithPlayThenPauseDebounce();
          this.on("play", (e) => {
            if (me.fetchingFirstFrame) return;
            me.$el.classList.remove(me.$style["fetching_first_frame"]);
            const { player } = e.target;
            const currentTime = player.currentTime();
            if (currentTime * 10 < 2) {
              me.$emit("start", e.target.player);
            } else {
              me.$emit("play", player);
            }
          });
          this.on("pause", (e) => {
            if (this.fetchingFirstFrame) return;
            me.$emit("pause", e.target.player);
          });
          this.on("ended", (e) => {
            me.$emit("ended", e.target.player);
          });
        }
      );
    },
    getSources(src) {
      if (!src) {
        return [];
      }
      return (Array.isArray(src) ? src : [src]).map((ele) => ({
        src: ele,
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
        opus: "video/ogg",
        ogv: "video/ogg",
        mp4: "video/mp4",
        mov: "video/mp4",
        m4v: "video/mp4",
        mkv: "video/x-matroska",
        m4a: "audio/mp4",
        mp3: "audio/mpeg",
        aac: "audio/aac",
        caf: "audio/x-caf",
        flac: "audio/flac",
        oga: "audio/ogg",
        wav: "audio/wav",
        m3u8: "application/x-mpegURL",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        png: "image/png",
        svg: "image/svg+xml",
        webp: "image/webp",
      };
      const ext = src.split(".").pop().toLowerCase();
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
      if (!size) return null;
      if (
        typeof size === "string" &&
        (size.includes("px") || size.includes("%"))
      )
        return size;
      return `${size}px`;
    },
    tryToFetchFirstFrameWithPlayThenPause() {
      if (this.poster || (!this.isAndroid && !this.isIOS)) return;
      if (this.isIOS) {
        Promise.resolve()
          .then(async () => {
            this.fetchingFirstFrame = true;
            this.$el.classList.add(this.$style["fetching_first_frame"]);
            this.play();
            await new Promise((res) => setTimeout(res, 500));
          })
          .then(() => {
            this.pause();
            this.fetchingFirstFrame = false;
          });
      } else {
        Promise.resolve()
          .then(async () => {
            this.fetchingFirstFrame = true;
            this.$el.classList.add(this.$style["fetching_first_frame"]);
            this.play();
            await new Promise((res) => setTimeout(res));
          })
          .then(() => {
            this.pause();
            this.fetchingFirstFrame = false;
          });
      }
    },
    // NEW/MODIFIED: 模拟全屏切换，仅用于 iOS 且 draggable 为 false
    // NEW/MODIFIED: 模拟横屏全屏切换（包含缓存和设置视频 padding-top）
    toggleSimulatedFullscreen() {
      this.simulatedFullscreen = !this.simulatedFullscreen;
      const container = this.$refs.videoContainer;
      const video = this.$refs.videoPlayer;
      if (this.simulatedFullscreen) {
        // NEW: 缓存 video 元素原有的 inline padding-top（如果还没有缓存过）
        if (!this.originalVideoPaddingTop && video) {
          this.originalVideoPaddingTop = video.style.paddingTop;
        }
        // NEW: 设置 video 元素的 padding-top 为横屏全屏时需要的 46.666667%
        console.log("video", container);
        container.firstElementChild.style.paddingTop = "46.666667%";

        // NEW: 进入模拟横屏全屏 —— 设置 container 内联样式模拟横屏效果
        container.style.position = "fixed";
        container.style.top = "50%";
        container.style.left = "50%";
        // 设置宽高：宽度使用 100vh，高度使用 100vw
        container.style.width = "100vh";
        container.style.height = "100vw";
        // 旋转 90 度，并平移使容器居中
        container.style.transform = "translate(-50%, -50%) rotate(90deg)";
        container.style.transformOrigin = "center center";
        container.style.zIndex = "9999";
        container.style.background = "black";
        // 禁止页面滚动
        document.documentElement.style.overflow = "hidden";
      } else {
        // 清除 container 内联样式
        container.style.position = "";
        container.style.top = "";
        container.style.left = "";
        container.style.width = "";
        container.style.height = "";
        container.style.transform = "";
        container.style.transformOrigin = "";
        container.style.zIndex = "";
        container.style.background = "";
        // 恢复页面滚动
        document.documentElement.style.overflow = "auto";
      }
    },
  },
};

// 辅助函数
function isiOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

function debounce(func, delay) {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
}
</script>

<style module>
.root {
  overflow: hidden;
  width: 100%;
}

/* 原有：首次尝试获取首帧时显示的样式 */
.fetching_first_frame [class^="vjs-big-play-button"] {
  display: block !important;
}
</style>
