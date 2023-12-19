<template>
  <div :class="$style.root">
    <canvas id="canvas" :width="width" :height="height"></canvas>
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
    width: { type: [Number, String], default: 600 },
    height: { type: [Number, String], default: 300 },
    bgColor: { type: String, default: '#F8F9FA' },
    penColor: { type: String, default: 'black' },
    penWidth: { type: Number, default: 2 },
    openSmooth: { type: Boolean, default: true },
    reSignName: { type: Boolean, default: false },
  },
  mounted() {
    this.signature = new SmoothSignature(document.getElementById("canvas"), {
      bgColor: this.bgColor,
      openSmooth: this.openSmooth,
      penColor: this.penColor,
      minWidth: this.penWidth,
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