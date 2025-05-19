<template>
  <div :class="$style.audioPlayer">
    <div :class="$style.controls">
      <button :class="$style.playButton" @click="togglePlay">
        <i :class="[$style.icon, isPlaying ? $style.pause : $style.play]"></i>
      </button>
      
      <div :class="$style.progress">
        <input 
          type="range" 
          :class="$style.slider"
          :value="progress"
          :style="{ '--progress': `${progress}%` }"
          @input="seek"
          min="0"
          max="100"
          step="0.1"
        >
      </div>

      <div :class="$style.time">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>

      <div :class="$style.volumeControl">
        <button :class="$style.volumeButton" @click="toggleMute">
          <i :class="[$style.icon, isMuted ? $style.mutedIcon : $style.volumeIcon]"></i>
        </button>
        <input 
          type="range" 
          :class="$style.volumeSlider"
          :value="volume * 100"
          :style="{ '--volume': `${volume * 100}%` }"
          @input="setVolume"
          min="0"
          max="100"
        >
      </div>

      <div :class="$style.speed">
        <select v-model="playbackRate">
          <option value="0.5">0.5x</option>
          <option value="1.0">1.0x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';

export default {
  name: 'audio-player',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sound: null,
      isPlaying: false,
      isMuted: false,
      duration: 0,
      currentTime: 0,
      progress: 0,
      volume: 1,
      playbackRate: 1.0
    };
  },
  watch: {
    playbackRate(newRate) {
      if (this.sound) {
        this.sound.rate(parseFloat(newRate));
      }
    }
  },
  mounted() {
    this.initAudio();
  },
  beforeDestroy() {
    if (this.sound) {
      this.sound.unload();
    }
  },
  methods: {
    initAudio() {
      this.sound = new Howl({
        src: [this.src],
        html5: true,
        onload: () => {
          this.duration = this.sound.duration();
        },
        onplay: () => {
          this.isPlaying = true;
          this.updateProgress();
        },
        onpause: () => {
          this.isPlaying = false;
        },
        onstop: () => {
          this.isPlaying = false;
        },
        onend: () => {
          this.isPlaying = false;
        }
      });
    },
    togglePlay() {
      if (!this.sound) return;
      if (this.isPlaying) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    updateProgress() {
      if (this.sound && this.isPlaying) {
        this.currentTime = this.sound.seek();
        this.progress = (this.currentTime / this.duration) * 100;
        requestAnimationFrame(this.updateProgress);
      }
    },
    seek(event) {
      const value = event.target.value;
      const time = (value * this.duration) / 100;
      this.sound.seek(time);
      this.currentTime = time;
      this.progress = (this.currentTime / this.duration) * 100;  // 立即更新进度条显示
    },
    toggleMute() {
      if (!this.sound) return;
      this.isMuted = !this.isMuted;
      this.sound.mute(this.isMuted);
    },
    setVolume(event) {
      const value = event.target.value;
      this.volume = value / 100;
      this.sound.volume(this.volume);
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style module>
.audioPlayer {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.playButton {
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress {
  flex: 1;
  height: 4px;
  background: #e0e0e0; /* 未播放部分的颜色 */
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
}

.slider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: linear-gradient(to right, #4a90e2 var(--progress), #e0e0e0 0); /* 已播放和未播放的颜色渐变 */
  cursor: pointer;
  position: absolute;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
}

.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: transparent;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #4a90e2;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -4px;
}

.volumeControl {  
  display: flex;
  align-items: center;
  gap: 8px;
}

.volumeIcon {  
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>');
}

.mutedIcon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>');
}

.time {
  font-size: 14px;
  color: #666;
  min-width: 100px;
  text-align: center;
}

.volumeControl {  
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
}

.volumeButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.volumeSlider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: linear-gradient(to right, #4a90e2 var(--volume), #e0e0e0 0);
  border-radius: 2px;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.volumeIcon, .mutedIcon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.volumeIcon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/%3E%3C/svg%3E");
}

.mutedIcon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/%3E%3C/svg%3E");
}

.speed select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
}

.play {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
}

.pause {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>');
}
</style>
