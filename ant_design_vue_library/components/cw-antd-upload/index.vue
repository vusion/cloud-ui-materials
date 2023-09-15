<template>
  <div>
    <div class="file-room" vusion-slot-name="default" style="min-height:30px;">
      <input v-if="!$env.VUE_APP_DESIGNER" type="file" :accept="accept" :capture="capture" @change="handleFileChange" />
      <div v-if="$env.VUE_APP_DESIGNER && !$slots.default">+</div>
      <slot></slot>
    </div>
    <div class="cropper-view" v-if="isShow">
      <vue-cropper
      :high="false"
      :centerBox="true"
      :outputSize="outputSize"
      :autoCropWidth="autoCropWidth" 
      :autoCropHeight="autoCropHeight"
      :fixedNumber="fixedNumber"
      outputType="jpeg"
      :fixedBox="fixedBox"
      :info="info"
      :canMoveBox="canMoveBox"
       autoCrop ref="cropper" :img="image" ></vue-cropper>
      <div class="cropper-view-submit" @click="handleClick">确定</div>
      <div class="cropper-view-reset" @click="handleResetClick">重置</div>
      <div class="cropper-view-back" @click="handleCloseClick"><a-icon style="font-size: 20px;" type="left-circle" theme="filled" /></div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropper"
import Vue from "vue"
import axios from "axios"
import Icon from "ant-design-vue/es/icon";
Vue.use(VueCropper)
Vue.use(Icon)
export default {
    name:"cw-antd-upload",
    props:{
      outputSize:{
        type:String,
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
      value:{
        type: String,
      },
      uploadUrl:{
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
        default: "camera"
      },
      info: {
        type: Boolean,
        default: true
      },
      zoom: {
        type: String,
        default: "1"
      },
  },
  data() {
    return {
      image: '',
      croppedImage: '',
      isShow: false,
      filename: null
    }
  },
  mounted() {
   
   
  },
  methods: {
    async handleFileChange(e) {
      console.log(e);
      const file =  e.target.files[0]
      this.filename = file.name
      this.image = URL.createObjectURL(file) 
      this.isShow = true
      await this.$nextTick()
      var viewportHeight = window.innerHeight;
      document.querySelector('.cropper-view').style.height = viewportHeight + 'px';
    },
    handleCloseClick() {
      this.isShow = false
    },
    handleResetClick() {
      this.$refs.cropper.clearCrop()
      this.$refs.cropper.goAutoCrop()
    },
    async loadImg(url) {
        var image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = url
        return  new Promise((resolve,reject) => {
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
        let result = null
        if (this.zoom !== "1") {
          const url = window.URL.createObjectURL(data)
          const image = await this.loadImg(url)
          const canvas = document.createElement('canvas')
          canvas.width = parseInt(image.width *  Number(this.zoom))
          canvas.height = parseInt(image.height * Number(this.zoom))
          var context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          result = await this.canvasToFile(canvas)
          // console.log(result);
          console.log(URL.createObjectURL(result));
        }
        result = data
        const formData = new FormData()
        formData.append('file', new File([result],this.filename, { type: data.type }))
        const authorization = this.getCookie('authorization');
        const headers = authorization ? { Authorization: authorization } : {};
        const r = await axios.post(this.uploadUrl?this.uploadUrl:'/gateway/lowcode/api/v1/app/upload', formData,headers) 
        if (r.data.code === 200) {
          this.$emit('update:value', r.data.result)
          this.$emit("onSuccess",r.data.result)
        }else{
          this.$emit("onError",r.data.message)
        }
        this.isShow = false
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
.cropper-view{
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
.cropper-view-back{
  left: 10px;
  top: 10px;
  position: absolute;
  z-index: 9999;
}

.cropper-view-submit{
  bottom: 10px;
  right: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  background:#ffffff;
  border: 1px #e5e5e5 solid;
  z-index: 9999;
  color: #333333;
}

.cropper-view-reset{
  bottom: 10px;
  right: 130px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  background:#ffffff;
  border: 1px #e5e5e5 solid;
  z-index: 9999;
  color: #333333;
}

.file-room{
  position: relative;
  width: 100%;
}
.file-room input{
  background: red;
  position: absolute;
  top: 0px;
  left:0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index:1000;
}

</style>