<template>
  <div :class="$style.root">
    <div id="party-container"></div>
  </div>
</template>

<script>
import login from "./login.js";
import './party.scss'

export default {
  name: "eggy-party-login",
  props: {
    serviceAgreement: {
      type: String,
      default: "https://protocol.unisdk.netease.com/release/latest_v5.html",
    },
    privacyAgreement: {
      type: String,
      default: "https://unisdk.update.netease.com/html/latest_v90.html",
    },
    childrenPolicy: {
      type: String,
      default: "https://protocol.unisdk.netease.com/release/latest_v106.html",
    },
    URSConfig: {
      type: String,
      default: "{}",
    },
  },
  computed: {
    config() {
      try {
        return new new Function(`return ${this.URSConfig}`)();
      } catch (e) {
        console.error(e);
        return {};
      }
    },
  },
  mounted() {
    login({
      serviceAgreement: this.serviceAgreement,
      privacyAgreement: this.privacyAgreement,
      childrenPolicy: this.childrenPolicy,
      logincb: () => {
        this.$emit("success");
      },
      ...this.config,
    });
    setTimeout(() => {
      const iframe = document.querySelector("iframe");
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // 创建一个新的样式元素
      const style = document.createElement("style");
      style.innerHTML = `
        body {
          background-color: red;
        }
      `;

      // 将样式元素添加到 iframe 的 head
      iframeDoc.head.appendChild(style);
      console.log("iframeDoc", iframeDoc);
    }, 3000);
  },
};
</script>

<style module>
.root {
  width: auto !important;
}
</style>
