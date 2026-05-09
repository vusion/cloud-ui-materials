<template>
  <j-frame-group v-if="node && node.frame" :source="node" v-on="$listeners" :configs="configs"></j-frame-group>
</template>

<script>
export default {
  props: {
    node: Object,
    isHover: Boolean,
  },
  computed: {
    configs() {
      const frame = this.node?.frame;
      if (!frame) return {};
      return {
        width: frame.width,
        height: frame.height,
        topRectHeight: frame.topRectHeight,
        strokeStyle: frame.strokeStyle,
        lineWidth: frame.lineWidth,
        bgColor: frame.bgColor,
        textColor: frame.textColor,
        textFont: frame.textFont,
        verticalLines: frame.verticalLines,
        titles: frame.titles,
      };
    },
  },
};
</script>
