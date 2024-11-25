<template>
  <div>
    <div class="file-room" vusion-slot-name="default" style="min-height:30px;">
      <input ref="input" v-if="!$env.VUE_APP_DESIGNER" type="file" :accept="accept" :capture="capture"
        @change="handleFileChange" />
      <div v-if="$env.VUE_APP_DESIGNER && !$slots.default">+</div>
      <slot></slot>
    </div>
    <div class="cropper-view" v-if="isShow">
      <vue-cropper :high="false" :centerBox="true" :outputSize="outputSize" :autoCropWidth="computedAutoCropWidth"
        :autoCropHeight="computedAutoCropHeight" :fixedNumber="fixedNumber" outputType="jpeg" :fixedBox="fixedBox"
        :info="info" :canMoveBox="canMoveBox" @realTime="onRealTime" autoCrop ref="cropper" :img="image"></vue-cropper>
      <div class="cropper-view-submit" @click="handleClick">确定</div>
      <div class="cropper-view-reset" @click="handleResetClick">重置</div>
      <div class="cropper-view-back" @click="handleCloseClick"><a-icon style="font-size: 20px;" type="left-circle"
          theme="filled" /></div>
    </div>
  </div>
</template>

<script>
const SIZE_UNITS = {
  kB: 1024,
  KB: 1024, // 兼容KB单位
  MB: Math.pow(1024, 2),
  GB: Math.pow(1024, 3),
  TB: Math.pow(1024, 4),
};

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // 获取 Base64 数据
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function pxToNumber(pxString) {
  // 检查输入是否是字符串并以 'px' 结尾
  if (typeof pxString === 'string' && pxString.endsWith('px')) {
    // 去掉 'px' 后缀并转换为数字
    return parseFloat(pxString.slice(0, -2));
  }
  // 如果输入不合法，则返回 NaN
  return NaN;
}

import VueCropper from "vue-cropper"
import Vue from "vue"
import axios from "axios"
import Icon from "ant-design-vue/es/icon";
Vue.use(VueCropper)
Vue.use(Icon)
export default {
  name: "cw-antd-upload",
  props: {
    base64Format: {
      type: Boolean,
      default: false
    },
    outputSize: {
      type: String,
    },
    autoCropHeight: {
      type: String,
      default: "200"
    },
    autoCropWidth: {
      type: String,
      default: "200"
    },
    fixedNumber: {
      type: Array,
    },
    value: {
      type: String,
    },
    uploadUrl: {
      type: String,
    },
    fixedBox: {
      type: Boolean,
      default: false
    },
    canMoveBox: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/*"
    },
    capture: {
      type: String,
      // default: "camera"
    },
    info: {
      type: Boolean,
      default: true
    },
    zoom: {
      type: String,
      default: "1"
    },
    maxSize: { type: [String, Number], default: Infinity },
  },
  data() {
    return {
      image: '',
      croppedImage: '',
      isShow: false,
      filename: null
    }
  },
  computed: {
    computedAutoCropWidth() {
      return Math.min(this.autoCropWidth, window.innerWidth);
    },
    computedAutoCropHeight() {
      return Math.min(this.autoCropHeight, window.innerHeight);
    },
  },
  methods: {
    async handleFileChange(e) {
      const file = e.target.files[0]
      this.filename = file.name
      this.image = URL.createObjectURL(file)
      this.isShow = true
      await this.$nextTick()
      var viewportHeight = window.innerHeight;
      document.querySelector('.cropper-view').style.width = window.innerWidth + 'px';
      document.querySelector('.cropper-view').style.height = viewportHeight + 'px';
    },
    handleCloseClick() {
      this.isShow = false
    },
    handleResetClick() {
      this.$refs.cropper && this.$refs.cropper.clearCrop()
      this.$refs.cropper && this.$refs.cropper.goAutoCrop()
    },
    onRealTime(options) {
      if (options.w && options.w > window.innerWidth) {
        this.$refs.cropper.autoCropWidth = window.innerWidth
        this.$refs.cropper.cropW = window.innerWidth
        setTimeout(() => this.handleResetClick(), 100)
      }
    },
    checkSize(file) {
      // 可能出现传入为空字符串的情况
      if (this.maxSize === Infinity || this.maxSize === '')
        return true;

      let maxSize;
      if (!isNaN(this.maxSize))
        maxSize = +this.maxSize;
      else {
        const unit = this.maxSize.slice(-2);
        if (!SIZE_UNITS[unit])
          throw new Error(`Unknown unit ${unit} in maxSize ${this.maxSize}!`);

        maxSize = this.maxSize.slice(0, -2) * SIZE_UNITS[unit];
      }

      return (file.size || 0) <= maxSize;
    },
    async loadImg(url) {
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url
      return new Promise((resolve, reject) => {
        image.onload = function () {
          resolve(image)
        }
        image.onerror = function () {
          reject(new Error('Could not load image at ' + url));
        }
      })
    },

    async canvasToFile(canvas) {
      return new Promise((resolve => {
        canvas.toBlob(file => {
          resolve(file)
        })
      }))
    },
    async handleClick(e) {
      this.$refs.cropper.getCropBlob(async data => {
        if (!this.checkSize(data)) {
          const errorMessage = `文件 ${data.size}超出大小${this.maxSize}！`;
          this.$emit('size-exceed', {
            maxSize: this.maxSize,
            size: data.size,
            message: errorMessage,
            file: data,
          });
          return;
        }
        let result = null
        try {
          if (this.zoom !== "1") {
            const url = window.URL.createObjectURL(data)
            const image = await this.loadImg(url)
            const canvas = document.createElement('canvas')
            canvas.width = parseInt(image.width * Number(this.zoom))
            canvas.height = parseInt(image.height * Number(this.zoom))
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            result = await this.canvasToFile(canvas)
            console.log(URL.createObjectURL(result));
          } else {
            result = data
          }
          let payload = null
          if (this.base64Format) {
            result = await blobToBase64(result)
            payload = {
              fileName: this.filename,
              base64String: result
            }
          } else {
            const formData = new FormData()
            formData.append('file', new File([result], this.filename, { type: data.type }))
            payload = formData
          }

          const authorization = this.getCookie('authorization');
          const headers = authorization ? { Authorization: authorization } : {};
          let r = await axios.post(this.uploadUrl ? this.uploadUrl : '/gateway/lowcode/api/v1/app/upload', payload, headers)
          if (this.base64Format) {
            r = r.data.Data
            if (r.code === 200) {
              this.$emit('update:value', r.result)
              this.$emit("onSuccess", r.filePath)
            } else {
              this.$emit("onError", r.message)
            }
          } else {
            if (r.data.code === 200) {
              this.$emit('update:value', r.data.result)
              this.$emit("onSuccess", r.data.filePath)
            } else {
              this.$emit("onError", r.data.message)
            }
          }
        } catch (error) {
        } finally {
          this.$refs.input.value = ''
          this.isShow = false
        }
      })
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

  }
}
</script>

<style scoped>
.cropper-view {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 7999;
}

.cropper-view-back {
  left: 10px;
  top: 10px;
  position: absolute;
  z-index: 9999;
}

.cropper-view-submit {
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  background: #ffffff;
  border: 1px #e5e5e5 solid;
  z-index: 9999;
  color: #333333;
}

.cropper-view-reset {
  bottom: 10px;
  right: 130px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  background: #ffffff;
  border: 1px #e5e5e5 solid;
  z-index: 9999;
  color: #333333;
}

.file-room {
  position: relative;
  width: 100%;
}

.file-room input {
  background: red;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1000;
}
</style>