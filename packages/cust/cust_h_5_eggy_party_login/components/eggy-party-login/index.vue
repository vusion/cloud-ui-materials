<template>
  <div :class="$style.root">
    <div id="party-container"></div>
  </div>
</template>

<script>
import login from "./login.js";

export default {
  name: "lcap-h5-eggy-party-login",
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
      logincb: () => this.$emit("success"),
      ...this.config,
    });
  },
};
</script>

<style module>
.root {
  width: auto !important;
}
</style>
