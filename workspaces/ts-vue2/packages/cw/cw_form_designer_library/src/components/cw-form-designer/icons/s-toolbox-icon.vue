<template>
  <span>
    <svg :class="$style.icon" aria-hidden="true" :style="iconStyle">
      <use :xlink:href="href" />
    </svg>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 's-toolbox-icon',
  props: {
    name: String,
    iconStyle: Object,
    theme: String,
  },
  computed: {
    href() {
      const fnName =
        {
          ServiceTask: 'autotask',
        }[this.name || ''] || this.name;
      const basicName = `#toolbox-${fnName}`;
      return this.theme === 'dark' ? `${basicName}-dark` : basicName;
    },
  },
};
</script>

<style lang="scss" module>
.icon {
  height: 1em;
  vertical-align: -0.15em;
  width: 1em;
  fill: currentColor;
}
</style>
