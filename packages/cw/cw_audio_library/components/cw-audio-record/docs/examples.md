### 基本用法

``` vue
<template>
  <div>
    <div style="display: flex; flex-direction: column;">
      <u-button @click="startRecord">开始录音</u-button>
      <u-button @click="pauseRecord">暂停录音</u-button>
      <u-button @click="resumeRecord">恢复录音</u-button>
      <u-button @click="stopRecord">停止录音</u-button>

      <u-button @click="downloadPCM">下载PCM格式录音</u-button>
      <u-button @click="downloadWAV">下载WAV格式录音</u-button>
      <u-button @click="downloadMP3">下载MP3格式录音</u-button>

      <u-button @click="upload">上传录音</u-button>
    </div>
    <cw-audio-record ref='audioRecord'></cw-audio-record>
  </div>
</template>
<script>
export default {
  methods:{
    startRecord() {
      this.$refs.audioRecord.startRecord()
    },
    pauseRecord() {
      this.$refs.audioRecord.pauseRecord()
    },
    resumeRecord() {
      this.$refs.audioRecord.resumeRecord()
    },
    stopRecord() {
      this.$refs.audioRecord.stopRecord()
    },
    downloadPCM() {
      this.$refs.audioRecord.downloadPCM()
    },
    downloadWAV() {
      this.$refs.audioRecord.downloadWAV()
    },
    downloadMP3() {
      this.$refs.audioRecord.downloadMP3()
    },
    upload() {
      this.$refs.audioRecord.uploadRecord()
    }

  }
}
</script>

```
