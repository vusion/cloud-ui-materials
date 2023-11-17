<template>
  <div class="qrcode-view" :class="$env.VUE_APP_DESIGNER?'preview':''" >
      <div id="reader" v-if="!$env.VUE_APP_DESIGNER" > {{ message }}</div>
      <div class="qrcode-render" >{{ message }}</div>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode"
let html5QrCode = null
export default {
  name:"cw-qrcode-scan-view",
  props:{},
  data() {
    return {
      message: "",
   } 
  },
  mounted() {
    if(this.$env.VUE_APP_DESIGNER){
        this.message = "二维码扫码组件";
    } 
    !this.$env.VUE_APP_DESIGNER && this.getCameras()
  },
  methods: {
    start() {
      // console.log(html5QrCode);
      html5QrCode.start(
        // environment后置摄像头 user前置摄像头
        { facingMode: "environment" },
        {
          fps: 2, // 可选，每秒帧扫描二维码
          qrbox: { width: 250, height: 250 }, // 可选，如果你想要有界框UI
          aspectRatio: 16/9 // 可选，视频馈送需要的纵横比，(4:3--1.333334, 16:9--1.777778, 1:1--1.0)传递错误的纵横比会导致视频不显示
        },
        (decodedText, decodedResult) => {
          //  alert(JSON.stringify(decodedResult) )
          // do something when code is read
          this.$emit("onScan", decodedText)
          html5QrCode.stop()
          html5QrCode.clear()
          console.log('decodedText', decodedText)
          console.log('decodedResult', decodedResult)
          // this.$emit("goBack", decodedText)
        }
      )
        .catch((err) => {
          alert(err)
          console.log('扫码错误信息', err)
          // 错误信息处理仅供参考，具体情况看输出！！！
          if (typeof err == 'string') {
            // this.$toast(err)
          } else {
            alert(err)
            // if (err.name == 'NotAllowedError') return this.$toast("您需要授予相机访问权限")
            // if (err.name == 'NotFoundError') return this.$toast('这个设备上没有摄像头')
            // if (err.name == 'NotSupportedError') return this.$toast('摄像头访问只支持在安全的上下文中，如https或localhost')
            // if (err.name == 'NotReadableError') return this.$toast('相机被占用')
            // if (err.name == 'OverconstrainedError') return this.$toast('安装摄像头不合适')
            // if (err.name == 'StreamApiNotSupportedError') return this.$toast('此浏览器不支持流API')
          }
        })
    },
    getCameras() {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            html5QrCode = new Html5Qrcode("reader")
            this.start()
          }
        })
        .catch((err) => {
          this.message = err
          // html5QrCode = new Html5Qrcode("reader")
          // this.$toast('您需要授予相机访问权限')
        })
    }
  }
}
</script>

<style>
.qrcode-view{
  width: 100vw;
}
.preview{
  height: 400px;
}

.qrcode-render{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>