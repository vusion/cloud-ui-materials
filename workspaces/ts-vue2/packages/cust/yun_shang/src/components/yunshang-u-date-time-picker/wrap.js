import Single from './index.vue';
import Range from './range.vue';
export default {
  name: 'u-date-time-picker-wrap',
  inheritAttrs: false,
  components: {
    Single,
    Range
  },
  props: {
    range: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if (this.$refs.component && typeof this.$refs.component.close === 'function') {
        this.$refs.component.close();
      }
    }
  },
  render(createElement) {
    const component = this.range ? Range : Single;
    const dataAttrs = {};
    for (const k in this.$attrs) {
      if (k.startsWith('data-') || ['vusion-d2c-id'].includes(k)) {
        dataAttrs[k] = this.$attrs[k];
      }
    }
    return createElement(component, {
      props: this.$attrs,
      attrs: {
        'vusion-node-tag': this.$attrs['vusion-node-tag'],
        'vusion-node-path': this.$attrs['vusion-node-path'],
        ...dataAttrs
      },
      on: this.$listeners,
      slots: this.$slots,
      scopedSlots: this.$scopedSlots,
      ref: 'component'
    });
  }
};