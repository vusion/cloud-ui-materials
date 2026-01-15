<template>
  <div>
    <div @click="hanldeClick">123</div>
    <cw-pdf-select-view ref="a" value="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"></cw-pdf-select-view>
  </div>
</template>
<script>
export default {
  methods: {
    hanldeClick() {
      this.$refs['a'].uploadFile();
    },
  },
};
</script>
