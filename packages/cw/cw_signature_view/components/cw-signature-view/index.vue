<template>
  <div :class="$style.root" ref="canvasRoot">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import SmoothSignature from "smooth-signature";

export default {
  name: 'lcap-signature',
  components: {},
  data() {
    return {
      signature: null,
      showSignatureModal: false,
      signaturePNG: null,
      disabled: true,
    };
  },
  props: {
    bgColor: { type: String, default: '#F8F9FA' },
    penColor: { type: String, default: 'black' },
    penWidth: { type: Number, default: 2 },
    openSmooth: { type: Boolean, default: true },
    reSignName: { type: Boolean, default: false },
  },
  mounted() {
    this.initSignature();
  },
  methods: {
    initSignature() {
      const width = this.$refs.canvasRoot.clientWidth;
      const height = this.$refs.canvasRoot.clientHeight;

      this.$refs.canvas.width = width;
      this.$refs.canvas.height = height;
      if (this.signature) {
        this.signature.init(this.$refs.canvas, {
          bgColor: this.bgColor,
          openSmooth: this.openSmooth,
          penColor: this.penColor,
          minWidth: this.penWidth,
          width,
          height,
        });
      } else {
        this.signature = new SmoothSignature(this.$refs.canvas, {
          bgColor: this.bgColor,
          openSmooth: this.openSmooth,
          penColor: this.penColor,
          minWidth: this.penWidth,
          width,
          height,
        });
      }
    },
    reloadSignature() {
      // 销毁并重新创建
      this.$nextTick(() => {
        this.initSignature();
      });
    },
    clearSignature() {
      console.log('clear');
      this.signature.clear();
    },
    getSignature() {
      console.log('getSignature');
      return this.signature.getPNG();
    },
    // 根据旋转角度，旋转签名图片
    rotateSignature(angle) {
      // 获取当前签名的 base64 图片
      const originalBase64 = this.signature.getPNG();
      if (!originalBase64) return null;
      
      // 创建一个临时图片对象
      const img = new Image();
      
      img.src = originalBase64;
      // 返回 Promise 以便异步处理
      return new Promise((resolve) => {
        img.onload = () => {
          // 创建临时 canvas
          const tempCanvas = document.createElement('canvas');
          const ctx = tempCanvas.getContext('2d');
          
          // 计算旋转后的画布尺寸
          const width = img.width;
          const height = img.height;
          
          // 计算旋转后的矩形尺寸
          const radians = angle * Math.PI / 180;
          const cos = Math.abs(Math.cos(radians));
          const sin = Math.abs(Math.sin(radians));
          const newWidth = Math.ceil(width * cos + height * sin);
          const newHeight = Math.ceil(width * sin + height * cos);
          
          // 设置 canvas 为新的尺寸
          tempCanvas.width = newWidth;
          tempCanvas.height = newHeight;
          
          // 设置背景色与原签名背景一致
          ctx.fillStyle = this.bgColor;
          ctx.fillRect(0, 0, newWidth, newHeight);
          
          // 移动到 canvas 中心点
          ctx.translate(newWidth / 2, newHeight / 2);
          // 旋转指定角度（角度转弧度）
          ctx.rotate(radians);
          // 绘制图片，注意偏移量为图片尺寸的一半（负值）
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          
          // 生成新的 base64 图片
          const rotatedBase64 = tempCanvas.toDataURL('image/png');
          resolve(rotatedBase64);
        };
      });
    },
  },
};

</script>

<style module>
.root {
  display: inline-block;
}

</style>