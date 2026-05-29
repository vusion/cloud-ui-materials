<template>
  <Progress
    :class="$style.root"
    type="circle"
    :percent="percent"
    :width="40"
    stroke-color="#FFF"
    trail-color="rgba(255, 255, 255, 0.3)"
    :stroke-width="8"
    :format="format"
  />
</template>

<script lang="ts">
import { Progress } from 'ant-design-vue';

export default {
  name: 'cw-bubble-progress',
  components: {
    Progress,
  },
  props: {
    percent: {
      type: Number,
      default: 10,
    },
    format: Function,
  },
};
</script>

<style module>
.root :global([class^='ant-progress-text']) {
  color: white;
  font-size: 12px;
}
</style>
