import lodashGet from 'lodash/get';

export default {
  props: {
    dataSource: {
      type: [Array, Object, Function],
    },
    textField: {
      type: String,
      default: 'text',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  watch: {
    dataSource: {
      handler() {
        this.$nextTick(() => {
          this.loadDataSource();
        });
      },
      immediate: true,
    },
  },
  methods: {
    lodashGet,
    normalizeData(data) {
      if (Array.isArray(data)) {
        return data;
      }

      if (typeof data === 'object' && Array.isArray(data.list)) {
        return data.list;
      }

      return [];
    },

    async loadDataSource() {
      if (typeof this.dataSource === 'function') {
        this.loading = true;
        const data = await this.dataSource({});
        this.list = this.normalizeData(data);
        this.loading = false;
      } else {
        this.list = this.normalizeData(this.dataSource);
      }
    },
    async reload() {
      return this.loadDataSource();
    },
  },
};
