<template>
  <div :class="$style.root">
    <video
      ref="videoRef"
      :class="$style.video"
      :controls="controls"
      :muted="muted"
      :poster="poster || undefined"
      :loop="loop"
      webkit-playsinline
      playsinline
    />
    <div v-if="loading" :class="$style.tip">加载中...</div>
    <div v-if="errorMessage" :class="$style.error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import flvjs from 'flv.js';

const ERROR_MESSAGES = {
  NetworkError: '网络错误，请检查视频地址是否可访问',
  MediaError: '媒体解码失败，flv.js 仅支持 H.264 编码的 FLV 流',
  OtherError: '播放出错，请检查视频格式与参数配置',
};

async function detectFlvMediaTypes(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    });

    if (!response.ok && response.status !== 206) {
      return null;
    }

    const reader = response.body && response.body.getReader
      ? response.body.getReader()
      : null;

    if (!reader) {
      return null;
    }

    const { value } = await reader.read();
    reader.cancel().catch(() => {});

    if (!value || value.length < 5) {
      return null;
    }

    if (value[0] === 0x46 && value[1] === 0x4c && value[2] === 0x56) {
      const flags = value[4];
      return {
        hasVideo: !!(flags & 0x01),
        hasAudio: !!(flags & 0x04),
      };
    }
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }

  return null;
}

export default {
  name: 'cust-flv-video',
  props: {
    src: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    isLive: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    poster: {
      type: String,
      default: '',
    },
    loop: {
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
    autoDetectMedia: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flvPlayer: null,
      errorMessage: '',
      loading: false,
      initToken: 0,
    };
  },
  watch: {
    src() {
      this.reload();
    },
    isLive() {
      this.reload();
    },
    hasAudio() {
      if (!this.autoDetectMedia) {
        this.reload();
      }
    },
    hasVideo() {
      if (!this.autoDetectMedia) {
        this.reload();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initPlayer();
    });
  },
  beforeDestroy() {
    this.destroyPlayer();
  },
  methods: {
    async initPlayer() {
      if (!this.src) {
        return;
      }

      if (!flvjs.isSupported()) {
        this.errorMessage = '当前浏览器不支持 FLV 播放';
        this.$emit('error', { message: this.errorMessage });
        return;
      }

      const token = ++this.initToken;
      this.destroyPlayer();
      this.errorMessage = '';
      this.loading = true;

      let hasAudio = this.hasAudio;
      let hasVideo = this.hasVideo;

      if (this.autoDetectMedia) {
        const detected = await detectFlvMediaTypes(this.src);
        if (token !== this.initToken) {
          return;
        }
        if (detected) {
          hasAudio = detected.hasAudio;
          hasVideo = detected.hasVideo;
        }
      }

      if (!hasAudio && !hasVideo) {
        this.loading = false;
        this.errorMessage = '无法识别 FLV 流中的音视频轨道';
        this.$emit('error', { message: this.errorMessage });
        return;
      }

      const videoElement = this.$refs.videoRef;
      if (!videoElement || token !== this.initToken) {
        this.loading = false;
        return;
      }

      const mediaDataSource = {
        type: 'flv',
        url: this.src,
        isLive: this.isLive,
        hasAudio,
        hasVideo,
        cors: true,
        withCredentials: false,
      };

      const config = this.isLive
        ? {
            enableWorker: false,
            enableStashBuffer: false,
            lazyLoad: false,
            lazyLoadMaxDuration: 0,
            autoCleanupSourceBuffer: true,
            fixAudioTimestampGap: false,
          }
        : {
            enableWorker: false,
            enableStashBuffer: true,
            stashInitialSize: 128,
          };

      this.flvPlayer = flvjs.createPlayer(mediaDataSource, config);
      this.flvPlayer.attachMediaElement(videoElement);
      this.bindPlayerEvents(videoElement);

      try {
        this.flvPlayer.load();
      } catch (e) {
        this.loading = false;
        this.errorMessage = ERROR_MESSAGES.OtherError;
        this.$emit('error', { message: this.errorMessage, errorInfo: String(e) });
        return;
      }

      if (this.autoplay) {
        this.play();
      }
    },
    bindPlayerEvents(videoElement) {
      if (!this.flvPlayer) {
        return;
      }

      this.flvPlayer.on(flvjs.Events.ERROR, this.onFlvError);
      this.flvPlayer.on(flvjs.Events.MEDIA_INFO, this.onMediaInfoLoaded);
      this.flvPlayer.on(flvjs.Events.LOADING_COMPLETE, this.onLoadingComplete);

      videoElement.addEventListener('play', this.onVideoPlay);
      videoElement.addEventListener('pause', this.onVideoPause);
      videoElement.addEventListener('loadedmetadata', this.onVideoLoaded);
    },
    unbindPlayerEvents(videoElement) {
      if (this.flvPlayer) {
        this.flvPlayer.off(flvjs.Events.ERROR, this.onFlvError);
        this.flvPlayer.off(flvjs.Events.MEDIA_INFO, this.onMediaInfoLoaded);
        this.flvPlayer.off(flvjs.Events.LOADING_COMPLETE, this.onLoadingComplete);
      }

      if (!videoElement) {
        return;
      }

      videoElement.removeEventListener('play', this.onVideoPlay);
      videoElement.removeEventListener('pause', this.onVideoPause);
      videoElement.removeEventListener('loadedmetadata', this.onVideoLoaded);
    },
    onFlvError(errorType, errorDetail, errorInfo) {
      const message = ERROR_MESSAGES[errorType] || `${ERROR_MESSAGES.OtherError}（${errorType}）`;
      this.loading = false;
      this.errorMessage = message;
      this.$emit('error', { message, errorType, errorDetail, errorInfo });
    },
    onMediaInfoLoaded() {
      this.loading = false;
      if (this.autoplay) {
        this.play();
      }
    },
    onLoadingComplete() {
      this.loading = false;
    },
    onVideoPlay() {
      this.loading = false;
      this.$emit('play');
    },
    onVideoPause() {
      this.$emit('pause');
    },
    onVideoLoaded() {
      this.loading = false;
      this.$emit('loaded');
    },
    play() {
      const videoElement = this.$refs.videoRef;
      if (!videoElement) {
        return;
      }
      const promise = videoElement.play();
      if (promise && promise.catch) {
        promise.catch(() => {});
      }
    },
    pause() {
      const videoElement = this.$refs.videoRef;
      if (videoElement) {
        videoElement.pause();
      }
    },
    reload() {
      this.errorMessage = '';
      this.initPlayer();
    },
    destroyPlayer() {
      const videoElement = this.$refs.videoRef;
      this.unbindPlayerEvents(videoElement);

      if (this.flvPlayer) {
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
      }

      this.loading = false;
    },
  },
};
</script>

<style module>
.root {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 180px;
  background-color: #000;
}

.video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #000;
}

.tip,
.error {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
}

.error {
  color: #ffb4b4;
}
</style>
