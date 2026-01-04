<template>
  <div :class="$style.root" :expanded="expended || null" :indent="indent || null">
    <div :class="$style.title" @click="clickExpended">
      <div :class="$style.titleLeft">
        <s-others-icon :class="[$style.icon, { [$style.expanded]: expended }]" name="down" />
        <span>
          <slot name="title"> {{ title }}</slot>
        </span>
        <span>
          <slot name="extra"></slot>
        </span>
      </div>
      <slot name="action"></slot>
    </div>
    <div :class="$style.content" v-show="expended">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'u-group-attr-panel',
  props: {
    title: String,
    indent: Boolean,
    isExpanded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      expended: this.isExpanded,
    };
  },
  watch: {
    isExpanded(newVal) {
      this.expended = newVal;
    },
  },
  methods: {
    clickExpended() {
      this.expended = !this.expended;
      this.$emit('update:isExpanded', this.expended);
    },
  },
};
</script>
<style lang="scss" module>
.title {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 12px;
  line-height: 28px;
  color: #222;
  user-select: none;
  position: relative;
}

.title:hover {
  background: #f4f4f4;
}

.root[expanded] .title {
  /* margin-bottom: 4px; */
}

.titleLeft {
  font-weight: 500;
}

.root[indent] .titleLeft {
  padding-left: 8px;
}

.icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 10px;
  color: #777777;
  transition: transform 0.3s ease;
  transform: rotate(-90deg);
}

.icon:hover {
  color: #111111;
}

.icon.expanded {
  transform: rotate(0deg);
}

.content {
  padding: 0 16px 8px;
  user-select: none;
}
</style>
