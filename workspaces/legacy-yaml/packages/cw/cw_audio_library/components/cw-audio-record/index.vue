<template>
  <div :class="$style.rootRecord">
    <div :class="$style.canvasParent" ref="canvasParent" v-if="isShowWave">
      <canvas ref="audioCanvas"></canvas>
    </div>
    <div :class="$style.customToolbar" vusion-slot-name="default">
      <slot></slot>
      <div v-if="!$slots.default && $env.VUE_APP_DESIGNER" style="color:#ccccccd0;padding: 5px;">
        请拖入需要的工具按钮
      </div>
    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder';
import { convertToMp3 } from './utils'
import axios from "axios"
export default {
  name: "cw-audio-record",
  props: {
    isShowWave: {
      type: Boolean,
      default: true
    },
    sampleRateOptions: {
      type: Number,
      default: 16000
    },
    sampleBitOptions: {
      type: Number,
      default: 16
    },
    channelOptions: {
      type: Number,
      default: 1
    },
    maxFileSize: {
      type: Number,
      default: 10
    },
    uploadUrl: {
      type: String,
      default: '/gateway/lowcode/api/v1/app/upload'
    },
    waveColor: {
      type: String,
      default: 'rgb(0, 0, 0)'
    },
    waveBgColor: {
      type: String,
      default: 'rgb(200, 200, 200)'
    }
  },
  data() {
    return {
      canvasCtx: null,
      drawRecordId: null,
      isRecording: false, // 是否正在录音
      duration: 0, // 录音时长
      fileSize: 0, // 文件大小
    };
  },
  mounted() {
    this.isShowWave && this.initCanvas();
  },
  methods: {
    initCanvas() {
      cancelAnimationFrame(this.drawRecordId);
      this.configCanvas();
    },
    configCanvas() {
      const {
        waveBgColor,
        waveColor
      } = this;
      const parentElement = this.$refs.canvasParent;
      const canvas = this.$refs.audioCanvas;
      canvas.width = parentElement.clientWidth;
      canvas.height = parentElement.clientHeight;
      this.canvasCtx = canvas.getContext("2d");
      this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      this.canvasCtx.fillStyle = waveBgColor;
      this.canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = waveColor;
      this.canvasCtx.beginPath();
    },
    async deleteRecord() {
      if (this.recorder) {
        await this.recorder.destroy();
        this.recorder = null;
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      }
    },
    resumeRecord() {
      this.recorder && this.recorder.resumePlay();
      console.log('继续播放录音');
    },
    async startRecord() {
      const config = {
        sampleRate: this.sampleRateOptions,
        sampleBit: this.sampleBitOptions,
        channelCount: this.channelOptions
      };
      if (this.recorder) {
        await this.deleteRecord()
      }
      this.recorder = new Recorder(config);
      this.recorder.start().then(() => {
        this.isRecording = true;
      }, (error) => {
        console.log(`异常了,${error.name}:${error.message}`);
      });

      this.recorder.onprogress = (params) => {
        this.duration = params.duration.toFixed(2);
        this.fileSize = params.fileSize;
        if (this.fileSize >= this.maxFileSize * 1024 * 1024) {
          this.stopRecord();
          console.log('录音文件超过最大限制');
        }
      };

      this.drawRecord();
    },
    async uploadRecord(type = 'wav') {
      if (this.recorder && !this.isRecording && this.uploadUrl) {
        const authorization = this.getCookie('authorization');
        const formData = new FormData();
        const blob = this.getAudioData(type);
        const file = new File([blob], `recordFile_${new Date().getTime()}.${type}`, { type });
        formData.append('file', file);
        const headers = authorization ? { Authorization: authorization, 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` } : {};
        const r = await axios.post(this.uploadUrl ? this.uploadUrl : '/gateway/lowcode/api/v1/app/upload', formData, headers);
        if (r.data.code === 200) {
          this.$emit("onUploadSuccess", r.data.result)
        } else {
          this.$emit("onUploadError", r.data.message)
        }
      }
    },
    getAudioData(type) {
      const map = {
        'wav': this.recorder.getWAVBlob(),
        'pcm': this.recorder.getPCMBlob(),
        'mp3': convertToMp3(this.recorder.getWAV(), this.recorder)
      };
      return map[type];
    },
    pauseRecord() {
      if (this.recorder) {
        this.recorder.pause();
        this.isRecording = false;
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
        this.drawRecordId = null;
      }
    },
    resumeRecord() {
      this.recorder && this.recorder.resume();
      this.isRecording = true;
      this.drawRecord();
    },
    stopRecord() {
      this.recorder && this.recorder.stop();
      this.isRecording = false;
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
    },
    downloadRecord(type = 'wav') {
      if (this.isRecording) {
        return;
      }
      const map = {
        'wav': this.downloadWAV(),
        'pcm': this.downloadPCM(),
        'mp3': this.downloadMP3()
      };

      if (map[type]) {
        map[type]();
      } else {
        console.log('不支持的下载类型');
      }
    },
    downloadWAV() {
      if (this.isRecording) {
        return;
      }
      this.recorder && this.recorder.downloadWAV();
    },
    downloadPCM() {
      if (this.isRecording) {
        return;
      }
      this.recorder && this.recorder.downloadPCM();
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0)
          return c.substring(name.length, c.length);
      }
      return '';
    },
    downloadMP3() {
      if (this.isRecording) {
        return;
      }
      if (this.recorder) {
        const mp3Blob = convertToMp3(this.recorder.getWAV(), this.recorder);
        this.recorder.download(mp3Blob, 'recorder', 'mp3');
      }
    },
    drawRecord() {
      const oCanvas = this.$refs.audioCanvas;
      this.configCanvas();
      let dataArray = this.recorder.getRecordAnalyseData();
      let bufferLength = dataArray.length;
      const sliceWidth = oCanvas.width * 1.0 / bufferLength;
      let x = 0;
      // 用requestAnimationFrame稳定60fps绘制
      this.drawRecordId = requestAnimationFrame(this.drawRecord);

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * oCanvas.height / 2;

        if (i === 0) {
          // 第一个点
          this.canvasCtx.moveTo(x, y);
        } else {
          // 剩余的点
          this.canvasCtx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
      }

      this.canvasCtx.lineTo(oCanvas.width, oCanvas.height / 2);
      this.canvasCtx.stroke();
    }
  },
}
</script>

<style module>
.rootRecord {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.canvasParent {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.customToolbar {
  min-width: 100%;
}

</style>