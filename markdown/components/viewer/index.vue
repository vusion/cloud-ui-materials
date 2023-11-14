<template>
  <Viewer :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script>
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue";
const plugins = [
  gfm(),
  // Add more plugins here
];

export default {
  name: "viewer",
  components: { Viewer },
  data() {
    return { value: "", plugins };
  },
  methods: {
    handleChange(v) {
      this.value = v;
    },
  },
};
</script>

<style></style>
