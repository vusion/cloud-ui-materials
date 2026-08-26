<template>
  <div :class="$style.root">
    <iframe
      v-if="currentPreviewSrc"
      :src="currentPreviewSrc"
      :class="$style.content"
      frameborder="0"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value?: string;
}>();

const currentPreviewSrc = computed(() => {
  if (!props.value) return;
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(props.value)}`;
});
</script>

<style module>
.root {
  height: 500px;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
