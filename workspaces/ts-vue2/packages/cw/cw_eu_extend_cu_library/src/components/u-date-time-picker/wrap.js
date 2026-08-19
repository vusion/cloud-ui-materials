import Single from './index.vue';
import Range from './range.vue';
export default {
  name: 'u-date-time-picker-wrap',
  inheritAttrs: false,
  inject: {
    formVM: {
      default: null
    }
  },
  components: {
    Single,
    Range
  },
  props: {
    range: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render(createElement) {
    const component = this.range ? Range : Single;
    const disabled = this.disabled || this.formVM && this.formVM.disabled;
    const dataAttrs = {};
    for (const k in this.$attrs) {
      if (k.startsWith('data-') || ['vusion-d2c-id'].includes(k)) {
        dataAttrs[k] = this.$attrs[k];
      }
    }
    return createElement(component, {
      props: {
        ...this.$attrs,
        disabled
      },
      attrs: {
        'vusion-node-tag': this.$attrs['vusion-node-tag'],
        'vusion-node-path': this.$attrs['vusion-node-path'],
        ...dataAttrs
      },
      on: this.$listeners,
      slots: this.$slots,
      scopedSlots: this.$scopedSlots
    });
  }
};