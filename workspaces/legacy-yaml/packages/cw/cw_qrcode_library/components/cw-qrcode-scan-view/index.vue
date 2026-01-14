<template>
    <div class="qrcode-view" :class="$env.VUE_APP_DESIGNER ? 'preview' : ''">
        <div id="reader" v-if="!$env.VUE_APP_DESIGNER">{{ message }}</div>
        <div class="qrcode-render">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import { Html5Qrcode } from 'html5-qrcode';
  // let html5QrCode = null;
  export default {
    name: 'cw-qrcode-scan-view',
    props: {},
    data() {
        return {
            message: '',
            html5QrCode: null,
            loading: false,
        };
    },
    mounted() {
        if (this.$env.VUE_APP_DESIGNER) {
            this.message = '二维码扫码组件';
        }
        if(this.html5QrCode){
            this.html5QrCode.stop();
            setTimeout(() => {
                this.html5QrCode.clear();
                this.html5QrCode = null;
  
                !this.$env.VUE_APP_DESIGNER && this.getCameras();
            }, 500);
        } else {
            !this.$env.VUE_APP_DESIGNER && this.getCameras();
        }
    },
    beforeDestroy() {
        this.html5QrCode.stop();
        setTimeout(() => {
            this.html5QrCode.clear();
            this.html5QrCode = null;
        }, 500);
    },
    methods: {
        start() {
            const config = {
                fps: 30, // 提升到 30fps
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.777778, // 16:9
                // 开启实验性功能：优先使用原生 BarcodeDetector (性能提升巨大)
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true
                },
                videoConstraints: {
                    facingMode: "environment",
                    // 尝试强制开启连续自动对焦
                    focusMode: "continuous",
                    // 优先请求高清分辨率，利于识别
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 480, ideal: 720, max: 1080 },
                }
            };

            this.html5QrCode
                .start(
                    { facingMode: 'environment' },
                    config,
                    (decodedText, decodedResult) => {
                        this.$emit('onScan', decodedText);
                        this.html5QrCode.stop().then(() => {
                             this.html5QrCode.clear();
                        }).catch(err => {
                            console.log("Failed to stop/clear", err);
                        });
                        console.log('decodedText', decodedText);
                        console.log('decodedResult', decodedResult);
                    }
                )
                .catch((err) => {
                    alert(err);
                    console.log('扫码错误信息', err);
                    // 错误信息处理仅供参考，具体情况看输出！！！
                    if (typeof err == 'string') {
                        // this.$toast(err)
                    } else {
                        alert(err);
                        // if (err.name == 'NotAllowedError') return this.$toast("您需要授予相机访问权限")
                        // if (err.name == 'NotFoundError') return this.$toast('这个设备上没有摄像头')
                        // if (err.name == 'NotSupportedError') return this.$toast('摄像头访问只支持在安全的上下文中，如https或localhost')
                        // if (err.name == 'NotReadableError') return this.$toast('相机被占用')
                        // if (err.name == 'OverconstrainedError') return this.$toast('安装摄像头不合适')
                        // if (err.name == 'StreamApiNotSupportedError') return this.$toast('此浏览器不支持流API')
                    }
                });
        },
        getCameras() {
            this.loading = true;
            Html5Qrcode.getCameras()
                .then((devices) => {
                    if (devices && devices.length) {
                        this.html5QrCode = new Html5Qrcode('reader');
                        this.start();
                    }
                })
                .catch((err) => {
                    this.message = err;
                    this.loading = false;
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
    height: 100vh; /* 使扫码区域在 H5 页面中充满屏幕高度 */
    overflow: hidden;
  }
  .preview {
    height: 100vh;
  }
  
  .qrcode-render {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  
  /* 让 html5-qrcode 渲染出来的视频区域充满容器 */
  #reader {
    width: 100%;
    height: 100%;
  }
  
  .qrcode-view video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 避免拉伸，按比例裁剪铺满 */
  }
  </style>
  