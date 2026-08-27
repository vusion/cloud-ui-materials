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
  computed: {
    inIDE() {
      return this?.$env?.VUE_APP_DESIGNER || this.dev ||false;
    },
  },
  methods: {
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
        setTimeout(() => {
          this.loading = false;
        }, 100);
       
      } else {
        this.loading = true;
        this.list = this.normalizeData(this.dataSource);
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }
    },
    async reload() {
      return this.loadDataSource();
    },
  },
};
