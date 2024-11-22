<template>
  <div class="qrcode-view" :class="$env.VUE_APP_DESIGNER ? 'preview' : ''">
    <div id="reader" v-if="!$env.VUE_APP_DESIGNER">{{ message }}</div>
    <div class="qrcode-render">{{ message }}</div>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";
let html5QrCode = null;
export default {
  name: "cw-qrcode-scan-view",
  props: {},
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    if (this.$env.VUE_APP_DESIGNER) {
      this.message = "二维码扫码组件";
    }
    !this.$env.VUE_APP_DESIGNER && this.getCameras();
  },
  methods: {
    start() {
      html5QrCode
        .start(
          { facingMode: "environment" }, // 使用后置摄像头
          {
            fps: 10, // 提升帧率，增强扫码流畅性
            qrbox: { width: 250, height: 250 }, // 保持原有扫描框大小
            aspectRatio: 16 / 9, // 视频纵横比
            videoConstraints: {
              width: { ideal: 1920 }, // 理想分辨率
              height: { ideal: 1080 },
              advanced: [
                { focusMode: "continuous" }, // 自动连续对焦
                { focusMode: "single-shot" }, // 快速聚焦（备用模式）
              ],
            },
          },
          (decodedText, decodedResult) => {
            // 触发扫码事件
            this.$emit("onScan", decodedText);
            html5QrCode.stop();
            html5QrCode.clear();
            console.log("decodedText", decodedText);
            console.log("decodedResult", decodedResult);
          }
        )
        .catch((err) => {
          console.error("扫码错误信息", err);
        });
    },
    getCameras() {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            html5QrCode = new Html5Qrcode("reader");
            this.start();
          }
        })
        .catch((err) => {
          this.message = err;
          // html5QrCode = new Html5Qrcode("reader")
          // this.$toast('您需要授予相机访问权限')
        });
    },
  },
};
</script>

<style>
.qrcode-view {
  width: 100vw;
}
.preview {
  height: 400px;
}

.qrcode-render {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
