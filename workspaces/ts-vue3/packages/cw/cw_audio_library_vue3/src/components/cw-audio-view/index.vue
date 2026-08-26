<template>
  <div vusion-slot-name="default">
    <div v-if="!showControls">
      <slot></slot>
    </div>
    <audio
      ref="audioRef"
      class="audio-player__audio"
      :src="src"
      v-bind="$attrs"
      :controls="showControls"
      @ended="onEnded"
      @play="onPlay"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
    >
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref } from 'vue';

export interface CwAudioViewProps {
  src?: string;
  duration?: string;
  currentTime?: string | number;
  currentVolume?: number;
  playbackRate?: number;
  showControls?: boolean;
}

const props = withDefaults(defineProps<CwAudioViewProps>(), {
  src: '',
  playbackRate: 1,
  showControls: true,
  currentVolume: 1,
});

const emit = defineEmits<{
  ended: [];
  timeupdate: [event: Event];
  loadedmetadata: [payload: { duration: string } & Event];
  stop: [];
  play: [];
  'play-error': [data: Error];
  videoProgress: [currentTime: number];
}>();

const audioRef = ref<HTMLAudioElement | null>(null);
const timer = ref<ReturnType<typeof setInterval> | null>(null);
const isPlaying = ref(false);
const isLoading = ref(false);
const duration = ref(props.duration ?? '');
const currentTime = ref<string | number>(props.currentTime ?? '');

function formatTime(second: number) {
  let hour = Math.floor(second / 60);
  let sec = Math.ceil(second % 60);
  let hourStr = `${hour}`;
  let secStr = `${sec}`;
  hourStr = hourStr.length === 1 ? `0${hourStr}` : hourStr;
  secStr = secStr.length === 1 ? `0${secStr}` : secStr;
  return `${hourStr}:${secStr}`;
}

function clearTimer() {
  if (timer.value) {
    window.clearInterval(timer.value);
    timer.value = null;
  }
}

function playing() {
  if (!audioRef.value) return;
  currentTime.value = audioRef.value.currentTime;
  emit('videoProgress', Math.floor(audioRef.value.currentTime));
}

function onEnded() {
  emit('ended');
}

function onTimeUpdate(event: Event) {
  emit('timeupdate', event);
}

function onLoadedmetadata(event: Event) {
  if (audioRef.value) {
    duration.value = formatTime(audioRef.value.duration);
    emit('loadedmetadata', { duration: duration.value, ...(event as Event) });
  }
}

function onPlay() {
  emit('play');
}

function pause() {
  audioRef.value?.pause();
  emit('stop');
}

function stop() {
  audioRef.value?.pause();
  nextTick(() => {
    clearTimer();
    isPlaying.value = false;
    emit('stop');
  });
}

function play() {
  if (!audioRef.value) return;
  isLoading.value = true;

  audioRef.value
    .play()
    .then(() => {
      nextTick(() => {
        if (timer.value) {
          currentTime.value = audioRef.value!.currentTime;
        } else {
          timer.value = window.setInterval(playing, 1000);
        }
        isPlaying.value = true;
        isLoading.value = false;
        audioRef.value!.playbackRate = props.playbackRate;
      });
      emit('play');
    })
    .catch((data: Error) => {
      console.error(data.message);
      isLoading.value = false;
      emit('play-error', data);
    });
}

function handleSetPlaybackRate(rate: number) {
  if (audioRef.value) {
    audioRef.value.playbackRate = rate;
  }
}

function handleSetPlaybackVolume(volume: number) {
  if (audioRef.value) {
    audioRef.value.volume = volume;
  }
}

onUnmounted(() => {
  clearTimer();
});

defineExpose({
  play,
  pause,
  stop,
  handleSetPlaybackRate,
  handleSetPlaybackVolume,
});
</script>

<style></style>
