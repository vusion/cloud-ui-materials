<template>
  <div>
    <canvas ref="audioCanvas"></canvas>
    <u-button @click="startRecord">开始录音</u-button>

  </div>
  
</template>

<script>
import Recorder from 'js-audio-recorder';

export default {
  name: "cw-audio-record",
  props: {
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
  },
  data() {
    return {
      isRecording: false, // 是否正在录音
      duration: 0, // 录音时长
    };
  },
  methods: {
    startRecord() {
      const config = {
        sampleRate: this.sampleRateOptions,
        sampleBit: this.sampleBitOptions,
        channelCount: this.channelOptions
      };
      if (!this.recorder) {
        this.recorder = new Recorder(config);

        this.recorder.start().then(() => {
          console.log('开始录音');
        }, (error) => {
          console.log(`异常了,${error.name}:${error.message}`);
        });

        this.drawRecord();
      }
    },
    pauseRecord() {
      if (this.recorder) {
        this.recorder.pause();
        console.log('暂停录音');
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
        this.drawRecordId = null;
      }
    },
    resumeRecord() {
      this.recorder && this.recorder.resume();
      console.log('恢复录音');
      this.drawRecord();
    },
    stopRecord() {
      if (this.recorder) {
        this.recorder.stop().then((blob) => {
          console.log('停止录音');
          console.log('录音时长：' + this.recorder.duration + 'ms');
          this.duration = this.recorder.duration;
          this.recorder = null;
          this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
          this.drawRecordId = null;
        });
      }
    },
    drawRecord() {
      const oCanvas = this.$refs.imgCanvas;
      // 获取音频数据
      let dataArr = this.recorder.getRecordAnalyseData();
      let bufferLength = dataArr.length;
      const sliceWidth = oCanvas.width * 1.0 / bufferLength;
      let x = 0;
      // 用requestAnimationFrame稳定60fps绘制
      this.drawRecordId = requestAnimationFrame(this.drawRecord);

      // 填充背景色
      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(0, 0, oCanvas.width, oCanvas.height);

      // 设定波形绘制颜色
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 0, 0)';

      ctx.beginPath();
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * oCanvas.height / 2;

        if (i === 0) {
          // 第一个点
          ctx.moveTo(x, y);
        } else {
          // 剩余的点
          ctx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
      }

      ctx.lineTo(oCanvas.width, oCanvas.height / 2);
      ctx.stroke();
    }
  }
}
</script>

<style></style>