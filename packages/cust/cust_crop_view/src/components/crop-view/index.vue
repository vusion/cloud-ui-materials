<template>
  <div>
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
      @realTime="realTime"
      @imgLoad="imgLoad"
      @error="loadError"
    ></vue-cropper>
    <div class="btn-group">
      <button @click="finish">完成</button>
    </div>
  </div>
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
        canScale: true,
        autoCrop: true,
        fixedBox: false,
        fixed: true,
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
      //   console.log(this.res)
      // this.$emit('finish', this.res);

      // const scale = .getScale();
      console.log(transform);

      // 解析 transform 中的 translate3d 值
      const [x, y] = transform.match(/translate3d\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px/i).slice(1);

      // 计算真实的 x 坐标
      const realX = Number(x) ;

      this.res = {
        x: x,
        y: y, // 同样计算真实的 y 坐标
        width: parseInt(this.previews.img.width),
        height: parseInt(this.previews.img.height),
        w: this.previews.w,
        h: this.previews.h,
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
