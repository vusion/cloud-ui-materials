<template>
  <div :class="$style.root">
    <div :class="$style.wrapper">
      <div
        :class="$style.empty"
        v-if="!signaturePNG"
        @click="openSignatureModal"
      >
        <div>
          {{
            buttonText ||
            (this.language === "english"
              ? "Please click here to sign"
              : "请在此处签名")
          }}
        </div>
      </div>
      <div v-else :class="$style.signatureWrapper">
        <i-icon
          name="close"
          v-show="reSignName"
          :class="$style.closeIcon"
          @click="clearSignature"
        ></i-icon>
        <img
          :class="$style.signaturePNG"
          :src="this.signaturePNG"
          @click="handleReopenModal"
        />
      </div>
    </div>
    <u-modal
      :visible.sync="showSignatureModal"
      :class="[$style.modal]"
      size="auto"
      :mode="false"
      @close="closeSignatureModal"
    >
      <div slot="title">
        {{ this.language === "english" ? "Please Sign Below" : "请在下方签名" }}
      </div>
      <div slot="foot">
        <u-linear-layout justify="space-between">
          <u-text @click="clearSignature" :class="$style.clearText">
            {{ this.language === "english" ? "Clear" : "清除" }}
          </u-text>
          <u-button color="primary" :disabled="disabled" @click="handleOk">
            {{ this.language === "english" ? "Save" : "保存" }}
          </u-button>
        </u-linear-layout>
      </div>
      <canvas
        id="canvas"
        width="800"
        height="300"
        style="border: 2px solid #ccd3de"
        @mouseup="checkIsEmpty"
      ></canvas>
    </u-modal>
  </div>
</template>

<script>
import SmoothSignature from "smooth-signature";

export default {
  name: "lcap-signature",
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
    buttonText: { type: String, default: "请在此处签名" },
    language: { type: String, default: "english" },
    bgColor: { type: String, default: "#F8F9FA" },
    penColor: { type: String, default: "black" },
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
  computed: {
    isEmpty() {
      return this.signature.isEmpty();
    },
  },
  watch: {
    buttonText() {
      if (this.$env && this.$env.VUE_APP_DESIGNER) {
        console.log("执行了");
        this.$forceUpdate();
      }
    },
  },
  methods: {
    openSignatureModal() {
      this.$emit("openSignatureModal");
      this.showSignatureModal = true;
      setTimeout(() => {
        this.signature = new SmoothSignature(
          document.getElementById("canvas"),
          {
            bgColor: this.bgColor,
            openSmooth: this.openSmooth,
            color: this.penColor,
            minWidth: this.penWidth,
          }
        );
      }, 200);
    },
    clear() {
      this.signature.clear();
      this.$emit("clearSignature");
    },
    getSignature() {
      return this.signature.getPNG();
    },
    handleOk() {
      this.showSignatureModal = false;
      this.signaturePNG = this.getSignature();
      this.$emit("saveSignature", this.signaturePNG);
    },
    initSignature() {
      this.signature.clear();
      this.signaturePNG = null;
      this.disabled = true;
    },
    clearSignature() {
      this.initSignature();
      this.$emit("clearSignature");
    },
    checkIsEmpty() {
      this.disabled = this.signature.isEmpty();
    },
    closeSignatureModal() {
      this.initSignature();
    },
    handleReopenModal() {
      this.clearSignature();
      this.openSignatureModal();
    },
  },
};
</script>

<style module>
.root {
  display: inline-block;
}

.root .wrapper {
  width: 210px;
  height: 48px;
}

.root .empty {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #ccd3de;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #f8f9fa;
  border-radius: 4px;
}

.root .signatureWrapper {
  position: relative;
}

.root .closeIcon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.clearText {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  color: #2574fc;
  padding: 3px 0 0 8px;
}

.root .signaturePNG {
  width: 100%;
  height: 100%;
}

.root .modal {
  width: 800px;
  height: 300px;
  padding: 0;
}
</style>
