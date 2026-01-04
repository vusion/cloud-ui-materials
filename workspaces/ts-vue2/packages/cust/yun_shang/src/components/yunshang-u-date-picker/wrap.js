import Single from './index.vue';
import Range from './range.vue';
export default {
  name: 'u-date-picker-wrap',
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
export const formatterOptions = {
  date: ['YYYY年M月D日', 'YYYY-MM-DD', 'M/D/YYYY', 'D/M/YYYY'],
  month: ['YYYY年M月', 'YYYY-MM', 'M/YYYY'],
  quarter: ['YYYY年第Q季度', 'YYYY年QQ', 'YYYY-QQ'],
  year: ['YYYY年', 'YYYY'],
  week: ['GGGG-W周', 'GGGG年第W周', 'GGGG-WWWW']
};