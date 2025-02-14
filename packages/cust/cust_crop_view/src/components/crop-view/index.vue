<template>
    <vue-cropper
      style="width: 100%; height: 100%; min-height: 100px; min-width: 100px"
      ref="cropper"
      :img="option.img"
      :output-type="option.outputType"
      :info="true"
      crossorigin="anonymous"
      :can-scale="option.canScale"
      :auto-crop="option.autoCrop"
      :fixed-box="option.fixedBox"
      :fixed="option.fixed"
      :can-move="option.canMove"
      @realTime="realTime"
      @imgLoad="imgLoad"
      @error="loadError"
    ></vue-cropper>
</template>
<script>
import { VueCropper } from 'vue-cropper';
export default {
  name: 'crop-view',
  components: {
    VueCropper,
  },
  props: {
    img: {
      type: String,
    },
  },
  data() {
    return {
      option: {
        img: 'https://picsum.photos/600/400',
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        fixedBox: false,
        fixed: true,
        canMove:false
      },
      previews: {},
      res: {},
    };
  },
  watch: {
    img: {
      handler(newVal) {
        if (newVal) {
          this.option.img = newVal;
        }
      },
      immediate: true,
    },
  },
  methods: {
    finish() {
      const transform = this.previews.img.transform;
      // console.log(this.previews.img)
      // const [x, y] = transform.match(/translate3d\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px/i).slice(1);
      // this.res =  {x:Number(x),y:Number(y),width:parseInt(this.previews.img.width),height:parseInt(this.previews.img.height),w:this.previews.w,h:this.previews.h}
        console.log(this.previews)
      // this.$emit('finish', this.res);

      // 解析 transform 中的 translate3d 值
      const [x, y] = transform.match(/translate3d\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px/i).slice(1);
      // 获取最终的transform样式
      const finalTransform = this.$refs.cropper.$el.querySelector('.cropper-crop-box').style.transform;
      console.log('最终的transform:', finalTransform);
      // const transform = document.querySelector('.cropper-container').style.transform 
      const [realX, realY] = finalTransform.match(/translate3d\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px/i).slice(1);
      this.res = {
        x: x,
        y: y, // 同样计算真实的 y 坐标
        width: parseInt(this.previews.img.width),
        height: parseInt(this.previews.img.height),
        w: this.previews.w,
        h: this.previews.h,
        realX: Number(realX),
        realY: Number(realY)
      };
      console.log(this.res);
    },
    realTime(data) {
      this.previews = data;
    },
    imgLoad(data) {
      this.$emit('imgLoad', data);
    },
    loadError(data) {
      this.$emit('loadError', data);
    },
  },
};
</script>
<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 600px;
  height: 400px;
  background-color: red;
  color: #fff;
  font-size: 24px;
  border-radius: 12px;
}
</style>
