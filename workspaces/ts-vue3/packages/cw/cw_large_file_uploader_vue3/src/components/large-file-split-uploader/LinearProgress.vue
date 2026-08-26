<template>
  <div :class="$style.root">
    <div :class="$style.track" v-bind="$attrs">
      <div :class="$style.trail" :style="trailStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const props = withDefaults(
  defineProps<{
    percent?: number;
    range?: [number, number];
  }>(),
  {
    percent: 0,
    range: () => [0, 100],
  },
);

const attrs = useAttrs();

const maxLength = computed(() => `${(props.range[1] || 100) - (props.range[0] || 0)}%`);

const trailStyle = computed(() => {
  if (attrs.direction === 'vertical') {
    return {
      maxHeight: maxLength.value,
      height: `${props.percent}%`,
      top: `${props.range[0]}%`,
    };
  }
  return {
    maxWidth: maxLength.value,
    width: `${props.percent}%`,
    left: `${props.range[0]}%`,
  };
});
</script>

<style module>
.root {
}
.root[direction='vertical'] {
  display: inline-block;
  vertical-align: top;
  height: 120px;
}

.track {
  overflow: hidden;
  height: 4px;
  border-radius: 4px;
  background: var(--el-fill-color-lighter);
}
.root[direction='vertical'] .track {
  width: 4px;
  height: 100%;
}

.trail {
  position: relative;
  float: left;
  width: 0;
  height: 100%;
  border-radius: inherit;
  font-size: var(--el-font-size-extra-small);
  background: var(--el-color-primary);
  color: var(--el-color-white);
  transition: width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}
.root[direction='vertical'] .trail {
  float: none;
  width: auto;
  height: 0;
}

.track[size='small'] {
  height: 2px;
  border-radius: 2px;
}
.track[size='large'] {
  height: 6px;
  border-radius: 6px;
}
.track[size='huge'] {
  height: 8px;
  border-radius: 8px;
}
.track[size='small'][direction='vertical'] {
  width: 2px;
}
.track[size='large'][direction='vertical'] {
  width: 6px;
}
.track[size='huge'][direction='vertical'] {
  width: 8px;
}

.track[color='success'] .trail {
  background: var(--el-color-success);
}
.track[color='error'] .trail {
  background: var(--el-color-danger);
}
</style>
