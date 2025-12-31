<template>
  <div vusion-slot-name="default">
    <div v-if="!showControls">
      <slot></slot>
    </div>
    <audio
      ref="audio"
      class="audio-player__audio"
      :src="src"
      v-bind="$attrs"
      @ended="onEnded"
      @play="onPlay"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedmetadata"
      :controls="showControls"
    >
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </div>
</template>

<script>
export default {
  name: "cw-audio-view",
  props: {
    src: {
      type: String,
      default: '',
    },
    duration: '', // 音频持续时间
    currentTime: '', // 音频当前播放时间
    currentVolume: 1, // 当前音量
    playbackRate: {
      type: Number,
      default: 1,
    }, // 当前播放速率
    showControls: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onEnded() {
      this.$emit('ended')
    },
    onTimeUpdate(event) {
      // console.log('onTimeUpdate', this.currentTime)
      this.$emit('timeupdate', event)
    },
    onLoadedmetadata(event) {
      this.duration = this.formatTime(this.$refs.audio.duration)
      this.$emit('loadedmetadata',{duration: this.duration, ...event})
    },
    // 暂停播放
    pause() {
      this.$refs.audio.pause()
      this.$emit('stop')
    },
    stop() {
      this.$refs.audio.pause()
      this.$nextTick(() => {
        this.clearTimer()
        this.isPlaying = false
        this.$emit('stop')
      })
    },
    clearTimer() {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
    },
    onPlay() {
      this.$emit('play')
    },
    // 开始播放
    play() {
      this.isLoading = true

      let handlePlay = () => {
        this.$refs.audio
          .play()
          .then(() => {
            this.$nextTick(() => {
              if (this.timer) {
                this.currentTime = this.$refs.audio.currentTime
              } else {
                this.timer = window.setInterval(
                  this.playing,
                  1000,
                )
              }

              this.isPlaying = true
              this.isLoading = false
              this.$refs.audio.playbackRate = this.playbackRate
            })
            this.$emit('play')
          })
          .catch((data) => {
            console.error(data.message)
            this.isLoading = false
            this.$emit('play-error', data)
          })
      }
      handlePlay()
    },
    // 设置播放速率
    handleSetPlaybackRate(rate) {
      this.$refs.audio.playbackRate = rate
    },
    handleSetPlaybackVolume(volume) {
      this.$refs.audio.volume = volume
    },
    // 格式化秒为分
    formatTime(second) {
      // 将秒数除以60，然后下舍入，既得到分钟数
      let hour
      hour = Math.floor(second / 60)
      // 取得秒%60的余数，既得到秒数
      second = Math.ceil(second % 60)
      // 将变量转换为字符串
      hour += ''
      second += ''
      // 如果只有一位数，前面增加一个0
      hour = hour.length === 1 ? '0' + hour : hour
      second = second.length === 1 ? '0' + second : second
      return hour + ':' + second
    },
    playing() {
      this.currentTime = this.$refs.audio.currentTime
      this.$emit('videoProgress', Math.floor(this.currentTime))
    }
  },
}
</script>

<style></style>