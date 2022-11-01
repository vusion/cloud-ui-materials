<template>
<div :class="$style.root">
  <div :class="$style.wrapper">
    <div :class="$style.empty" v-if="!signaturePNG" @click="openSignatureModal">
      <div>
        {{ this.language === 'english' ? 'Please click here to sign': '请在此处签名'}}
      </div>
    </div>
    <div v-else :class="$style.signatureWrapper">
      <i-icon name="close" :class="$style.closeIcon" @click="clearSignature"></i-icon>
      <img :class="$style.signaturePNG" :src="this.signaturePNG"/>
    </div>
  </div>
  <u-modal
    :visible.sync="showSignatureModal"
    :class="[$style.modal, $style.rotate]"
    size="auto"
    :mode=false
  >
    <div slot="title">
      {{ this.language === 'english' ? 'Please Sign Below': '请在下方签名'}}
    </div>
    <div slot="foot">
      <u-linear-layout justify="space-between">
        <u-text @click="clearSignature" :class="$style.clearText">
          {{ this.language === 'english' ? 'Clear': '清除'}}
        </u-text>
        <u-button color="primary" @click="handleOk">
          {{ this.language === 'english' ? 'Save': '保存'}}
        </u-button>
      </u-linear-layout>
    </div>
    <canvas id="canvas" width="800" height="300" style="border: 2px solid #CCD3DE"></canvas>
  </u-modal>
</div>
</template>

<script>
import SmoothSignature from "smooth-signature";
export default {
  name: 'lcap-h5-signature',
  components: {
  },
  data() {
    return {
      signature: null,
      showSignatureModal: false,
      signaturePNG: null,
    };
  },
  props: {
    language: {type: String, default: 'english'},
  },
  mounted() {
    this.signature = new SmoothSignature(document.getElementById("canvas"), {bgColor: '#F8F9FA'});
    // document.getElementById("canvas").style.transform = "rotate(180deg)"

  },
  computed: {
    isEmpty() {
      return this.signature.isEmpty();
    },
  },
  methods: {
    openSignatureModal() {
      this.showSignatureModal = true;
      setTimeout(() => {
        this.signature = new SmoothSignature(document.getElementById("canvas"), {bgColor: '#F8F9FA'});
        // document.getElementById("canvas").style.transform = "rotate(180deg)"
      }, 200);
    },
    clear() {
      this.signature.clear();
    },
    save() {
      this.signature.save();
    },
    undo() {
      this.signature.undo();
    },
    redo() {
      this.signature.redo();
    },
    getSignature() {
      return this.signature.getPNG();
    },
    handleOk() {
      this.showSignatureModal = false;
      this.signaturePNG = this.getSignature();
      console.log(this.signaturePNG);

    },
    clearSignature() {
      this.signature.clear();
      this.signaturePNG = null;
    }
  },
};

</script>

<style module>
.root {
  width: 210px;
  height: 48px;
}

.root .wrapper {
  width: 100%;
  height: 100%;
}

.root .empty {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #CCD3DE;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #F8F9FA;
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
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  color: #2574FC;
  padding:3px 0 0 8px;
}

.rotate {
  /*-webkit-transform: rotate(90deg);*/
  /*transform: rotate(90deg);*/

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
