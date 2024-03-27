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
    const width = this.$refs.canvasRoot.clientWidth;
    const height = this.$refs.canvasRoot.clientHeight;

    this.$refs.canvas.width = width;
    this.$refs.canvas.height = height;
    this.signature = new SmoothSignature(this.$refs.canvas, {
      bgColor: this.bgColor,
      openSmooth: this.openSmooth,
      penColor: this.penColor,
      minWidth: this.penWidth,
      width,
      height,
    });
  },
  methods: {
    clearSignature() {
      console.log('clear');
      this.signature.clear();
    },
    getSignature() {
      console.log('getSignature');
      return this.signature.getPNG();
    },
  },
};

</script>

<style module>
.root {
  display: inline-block;
}

</style>