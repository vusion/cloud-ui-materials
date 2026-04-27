<template>
  <div :class="$style.root" :style="rootStyle" ref="videoContainer">
    <video
      ref="videoPlayer"
      playsinline
      webkit-playsinline
      :disablePictureInPicture="isIOSRef && !draggable"
      class="video-js vjs-big-play-centered vjs-fluid"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useCssModule } from 'vue';
import videojs from 'video.js';
import zhCN from 'video.js/dist/lang/zh-CN.json';
import './index.css';

// 注册中文语言包
videojs.addLanguage('zh-CN', zhCN);

interface Props {
  src?: string | string[];
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  loop?: boolean;
  draggable?: boolean;
  muted?: boolean;
  breakProgress?: string;
  poster?: string;
  options?: any;
  showPlaybackRates?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  loop: false,
  draggable: true,
  muted: false,
  breakProgress: '',
  showPlaybackRates: true,
  options: () => ({}),
});

const emit = defineEmits(['start', 'pause', 'play', 'ended', 'videoProgress']);

const videoContainer = ref<HTMLElement | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const player = ref<any>(null);
const progressTimer = ref<any>(null);
const firstPlay = ref(true);
const isIOSRef = ref(getIsIOS());
const fetchingFirstFrame = ref(false);
const simulatedFullscreen = ref(false);
const originalVideoPaddingTop = ref<string | null>(null);
const flag = ref(false);

const rootStyle = computed(() => {
  const { width, height } = props;
  const style: any = {};
  const widthSize = fixSize(width);
  const heightSize = fixSize(height);
  if (widthSize) style.width = widthSize;
  if (heightSize) style.height = heightSize;
  return style;
});

const fixSize = (size?: string | number) => {
  if (!size) return null;
  if (typeof size === 'string' && (size.includes('px') || size.includes('%'))) return size;
  return `${size}px`;
};

const getSources = (src?: string | string[]) => {
  if (!src) return [];
  return (Array.isArray(src) ? src : [src]).map((ele) => ({
    src: ele,
    type: getType(ele),
  }));
};

const getType = (src: string) => {
  const MimetypesKind: Record<string, string> = {
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
  const ext = src.split('.').pop()?.toLowerCase() || '';
  return MimetypesKind[ext];
};

const init = () => {
  if (!videoPlayer.value) return;
  const { src, autoplay, loop, draggable, muted, options, poster, showPlaybackRates } = props;
  const sources = getSources(src);

  player.value = videojs(
    videoPlayer.value,
    {
      ...options,
      language: 'zh-CN',
      autoplay,
      sources,
      loop,
      crossorigin: 'anonymous',
      muted,
      poster,
      controls: true,
      responsive: true,
      playbackRates: showPlaybackRates ? [0.5, 0.75, 1, 1.25, 1.5, 2] : [],
      nativeControlsForTouch: false,
    },
    function onPlayerReady(this: any) {
      if (!draggable) {
        this.controlBar.progressControl.disable();
      }
      if (autoplay) {
        this.play();
      }
      this.on('play', (e: any) => {
        if (fetchingFirstFrame.value) return;
        if (videoContainer.value) {
          videoContainer.value.classList.remove($style.fetching_first_frame);
        }
        const p = e.target.player;
        const currentTime = p.currentTime();
        if (currentTime * 10 < 2) {
          emit('start', p);
        } else {
          emit('play', p);
        }
      });
      this.on('pause', (e: any) => {
        if (fetchingFirstFrame.value) return;
        emit('pause', e.target.player);
      });
      this.on('ended', (e: any) => {
        emit('ended', e.target.player);
      });
    }
  );
};

const toggleSimulatedFullscreen = () => {
  simulatedFullscreen.value = !simulatedFullscreen.value;
  const container = videoContainer.value;
  const video = videoPlayer.value;
  if (!container || !video) return;

  if (simulatedFullscreen.value) {
    if (!originalVideoPaddingTop.value) {
      originalVideoPaddingTop.value = video.style.paddingTop;
    }
    const firstChild = container.firstElementChild as HTMLElement;
    if (firstChild) {
      firstChild.style.paddingTop = '46.666667%';
    }

    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.width = '100vh';
    container.style.height = '100vw';
    container.style.transform = 'translate(-50%, -50%) rotate(90deg)';
    container.style.transformOrigin = 'center center';
    container.style.zIndex = '9999';
    container.style.background = 'black';
    document.documentElement.style.overflow = 'hidden';
  } else {
    container.style.position = '';
    container.style.top = '';
    container.style.left = '';
    container.style.width = '';
    container.style.height = '';
    container.style.transform = '';
    container.style.transformOrigin = '';
    container.style.zIndex = '';
    container.style.background = '';
    document.documentElement.style.overflow = 'auto';
  }
};

const play = () => player.value?.play();
const pause = () => player.value?.pause();

defineExpose({ play, pause });

watch(() => props.draggable, (val) => {
  if (!player.value) return;
  if (val) {
    player.value.controlBar.progressControl.enable();
  } else {
    player.value.controlBar.progressControl.disable();
  }
});

watch(() => props.src, (val) => {
  if (player.value && val) {
    const sources = getSources(val);
    player.value.src(sources);
  }
  player.value?.ready(() => {
    nextTick(() => {
      if (!props.src || flag.value) return;
      flag.value = true;
      const savedTime = sessionStorage.getItem(`videoProgress-${props.src}`);
      if (savedTime) {
        const targetTime = parseFloat(savedTime);
        if (targetTime) {
          if (isIOSRef.value) {
            player.value.load();
          }
          player.value.currentTime(targetTime);
        }
      }
    });
  });
}, { immediate: true });

watch(() => props.showPlaybackRates, (val) => {
  if (player.value) {
    if (val) {
      player.value.controlBar.playbackRateMenuButton.show();
    } else {
      player.value.controlBar.playbackRateMenuButton.hide();
    }
  }
});

onMounted(() => {
  init();
  clearInterval(progressTimer.value);
  progressTimer.value = setInterval(() => {
    const videoDuration = player.value?.duration();
    const remainTime = player.value?.remainingTime();
    if (videoDuration && remainTime !== undefined) {
      const videoProgress = (((videoDuration - remainTime) / videoDuration) * 100).toFixed(1) + '%';
      emit('videoProgress', videoProgress);
    }
  }, 500);

  if (props.breakProgress && player.value) {
    const isPercent = props.breakProgress.indexOf('%') !== -1;
    const progressVal = parseFloat(props.breakProgress.replace('%', ''));

    player.value.on('loadedmetadata', () => {
      if (isPercent) {
        player.value.currentTime(player.value.duration() * (progressVal / 100));
      } else {
        player.value.currentTime(progressVal);
      }
    });

    player.value.on('play', () => {
      if (firstPlay.value && !fetchingFirstFrame.value) {
        if (isPercent) {
          player.value.currentTime(player.value.duration() * (progressVal / 100));
        } else {
          player.value.currentTime(progressVal);
        }
        firstPlay.value = false;
      }
    });
  }

  let lastDragProgress = 0;
  player.value?.on('timeupdate', () => {
    const currentTime = player.value?.currentTime();
    if (currentTime !== undefined && Math.abs(currentTime - lastDragProgress) > 3) {
      const videoDuration = player.value?.duration();
      const remainTime = player.value?.remainingTime();
      if (videoDuration) {
        const videoProgress = (((videoDuration - remainTime) / videoDuration) * 100).toFixed(1) + '%';
        emit('videoProgress', videoProgress);
      }
    }
    lastDragProgress = currentTime || 0;
  });

  if (isIOSRef.value && !props.draggable && player.value) {
    player.value.ready(() => {
      player.value.requestFullscreen = () => toggleSimulatedFullscreen();
      player.value.exitFullscreen = () => toggleSimulatedFullscreen();
      player.value.isFullscreen = () => simulatedFullscreen.value;
      const fullscreenButton = player.value.controlBar.getChild('fullscreenToggle');
      if (fullscreenButton) {
        fullscreenButton.off('click');
        fullscreenButton.on('click', () => toggleSimulatedFullscreen());
      }
    });
  }

  player.value?.on('timeupdate', () => {
    if (player.value.currentTime() < 1) return;
    sessionStorage.setItem(`videoProgress-${props.src}`, player.value.currentTime().toString());
  });

  player.value?.on('ended', () => {
    sessionStorage.setItem(`videoProgress-${props.src}`, '0');
    player.value.currentTime(0);
  });
});

onBeforeUnmount(() => {
  clearInterval(progressTimer.value);
  if (player.value) {
    player.value.dispose();
  }
});

function getIsIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

// @ts-ignore
const $style = useCssModule();

</script>

<style module>
.root {
  overflow: hidden;
  width: 100%;
}

.fetching_first_frame :global(.vjs-big-play-button) {
  display: block !important;
}
</style>
