<template>
  <a-progress
      :class="$style.root"
      type="circle"
      :percent="percent"
      :width="40"
      strokeColor="#FFF"
      trailColor="rgba(255, 255, 255, 0.3)"
      :strokeWidth="8"
      :format="format"
    />
</template>

<script>
import { Progress } from 'ant-design-vue';
export default {
  name: 'cw-progress',
  components: {
    'a-progress': Progress,
  },
  props: {
      percent: {
          type: Number,
          default: 10
      },
      format: Function
  },
  computed: {
    size() {
      return 2;
    }
  }
};
</script>

<style module>
.root [class^="ant-progress-text"] {
  color: white;
  font-size: 12px;
}
</style>

