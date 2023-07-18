<template>
  <div :class="$style.room">
    <img :class="$style.qr" :src="qrimg" alt="">
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    name:"cw-qrcode-view",
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      },
      src: {
        type:String,
        // default:"https://img1.baidu.com/it/u=1919509102,1927615551&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1687366800&t=18a6b2674b479851b37c3c4bcd8db378"
      }
  },
  data() {
    return {
      qrimg:""
    }
  },
  mounted() {
    this.run()
  },
  watch: {
    value() {
      if (this.value.length > 0) {
        this.run()
      }
    },
    src() {
      if (this.src.length > 0) {
        this.run()
      }
    }
  },
  methods: {
    async loadImg() {
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = this.src;
      return  new Promise(resolve => {
          image.onload = function () {
            resolve(image)
          }
        })
    },
    async run() {
      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, this.value, {
        margin: 1, errorCorrectionLevel: 'H',
        width: 199,
      })
      var context = canvas.getContext('2d');
      if (this.src) {
        const image = await this.loadImg()
        context.drawImage(image, 66.6 ,66.6, 66.6, 66.6); 
        context.strokeStyle = "white";
        context.lineWidth = 3;
        context.strokeRect( 66.6 ,66.6, 66.6, 66.6)    
      }
      var base64Data = canvas.toDataURL("image/jpeg", 1)
      this.qrimg = base64Data
    },
    getImg() {
      return this.qrimg
    }
  }
}
</script>

<style module>
.qr{
  width: 100%;
  height: 100%; 
}
.room{
  width: 200px;
  height: 200px;
  min-width: 100px;
  min-height: 100px;
  display: inline-block;
}

</style>