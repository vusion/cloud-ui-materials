<template>
  <div data-hg-print-badge :data-hg-print-badge-at-bottom="atBottom"
    :data-hg-print-badge-inline="inline ? 'true' : undefined" :data-hg-print-badge-x="atBottom ? undefined : x"
    :data-hg-print-badge-y="atBottom ? undefined : y">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'hg-badge-com',
  props: {
    /** 是否占位模式：true 时徽章占用页面底部区域，影响 body 分页；false 时为覆盖模式，不参与分页 */
    inline: {
      type: Boolean,
      default: true,
    },
    atBottom: {
      type: Boolean,
      default: true,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style module>
.root {}
</style>
