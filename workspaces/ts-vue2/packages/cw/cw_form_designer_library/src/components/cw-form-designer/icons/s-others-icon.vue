<template>
  <span v-if="!!tooltip">
    <el-tooltip :placement="tooltipPlacement" :show-after="tooltipShowAfter">
      <template #content>
        <template v-if="typeof tooltip === 'string'">{{ tooltip }}</template>
        <slot name="tooltip"></slot>
      </template>
      <span
        class="s-others-icon"
        :spin="spin || null"
        :spin-clock="spinClock || null"
        :button="button || null"
        :primary="primary || null"
        :hover="hover || null"
        :active="active || null"
        :disabled="disabled || null"
        :logic="logic || null"
        :size="size"
        @click="handleClick"
      >
        <svg class="icon" aria-hidden="true" :style="iconStyle">
          <use :xlink:href="href" />
        </svg>
        <slot></slot>
      </span>
    </el-tooltip>
  </span>
  <span
    v-else
    class="s-others-icon"
    :spin="spin || null"
    :spin-clock="spinClock || null"
    :button="button || null"
    :primary="primary || null"
    :hover="hover || null"
    :active="active || null"
    :disabled="disabled || null"
    :logic="logic || null"
    :size="size"
    @click="handleClick"
  >
    <svg class="icon" aria-hidden="true" :style="iconStyle">
      <use :xlink:href="href" />
    </svg>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 's-others-icon',
  props: {
    name: String,
    iconStyle: [String, Object],
    hover: Boolean,
    disabled: Boolean,
    spin: Boolean,
    spinClock: Boolean,
    logic: Boolean,
    active: Boolean,
    select: Boolean,
    size: String,
    button: Boolean,
    primary: Boolean,
    tooltip: [String, Boolean],
    tooltipPlacement: {
      type: String,
      default: 'top',
    },
    tooltipShowAfter: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    href() {
      const basicName = `#others-${this.name}`;
      return this.select ? `${basicName}-select` : basicName;
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) return;
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.s-others-icon[spin] {
  animation: spin infinite linear 1s;
}

@keyframes spinClock {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.s-others-icon[spin-clock] {
  animation: spinClock infinite linear 1s;
}

.s-others-icon[hover] {
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #666666;
  background: transparent;
}

.s-others-icon[hover]:hover {
  color: #111111;
  background: rgba(0, 0, 0, 0.08);
}

.s-others-icon[hover][disabled],
.s-others-icon[hover][disabled]:hover {
  color: #cccccc;
  cursor: not-allowed;
  background: transparent;
}

.s-others-icon[hover][active],
.s-others-icon[hover][active]:hover {
  color: #4c88ff;
  background-color: transparent;
}

.s-others-icon[hover][size='small'] {
  font-size: 14px;
}

.s-others-icon[hover][logic] {
  color: #999;
  font-size: 18px;
}

.s-others-icon[hover][logic]:hover {
  color: #666;
  background: rgba(0, 0, 0, 0.05);
}

.s-others-icon[hover][logic][disabled],
.s-others-icon[hover][logic][disabled]:hover {
  color: #ccc;
  cursor: not-allowed;
  background: none;
}

.s-others-icon[button] > svg {
  vertical-align: bottom;
}
.s-others-icon[button] {
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 6px;
  border-radius: 4px;
  color: #666666;
  background-color: transparent;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.s-others-icon[button][primary] {
  color: #ffffff;
  background-color: #4c88ff;
}
.s-others-icon[button][active='true'] {
  color: #4c88ff;
  background-color: transparent;
}

.s-others-icon[button][disabled] {
  color: #cccccc;
  background-color: transparent;
  cursor: not-allowed;
}
.s-others-icon[button][primary][disabled] {
  color: #ffffff;
  background-color: #adc8ff;
}

.s-others-icon[button]:not([disabled]):hover {
  color: #111111;
  background-color: rgba(0, 0, 0, 0.08);
}
.s-others-icon[button][primary]:not([disabled]):hover {
  color: #ffffff;
  background-color: #6c9dff;
}
.s-others-icon[button][active='true']:not([disabled]):hover {
  color: #4c88ff;
  background-color: rgba(0, 0, 0, 0.08);
}
.icon {
  fill: currentColor;
  height: 1em;
  vertical-align: -0.15em;
  width: 1em;
  overflow: hidden;
}
</style>
