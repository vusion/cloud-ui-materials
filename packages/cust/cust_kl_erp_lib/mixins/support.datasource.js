import { formatColumns } from "../components/cust-row-grouping-grid/utils";
import lodash from "lodash";
export default {
  props: {
    dataSource: [Array, Function, Object],
    dataSchema: { type: String, default: "entity" },
    options: [Array],
  },
  data() {
    return {
      currentDataSource: undefined,
      loading: false,
    };
  },
  watch: {
    dataSource(val) {
      this.handleData();
      if (this.currentDataSource && this.currentDataSource.load) {
        this.load();
      }
    },
    options(val) {
      if (this.$env.VUE_APP_DESIGNER) {
        this.getColumnsByString(val);
      }
    },
  },
  created() {
    if (!this.$env.VUE_APP_DESIGNER && this.options) {
      this.columns = formatColumns(this.options, this.$env.VUE_APP_DESIGNER);
    } else if (this.$env.VUE_APP_DESIGNER && this.options) {
      this.getColumnsByString(this.options);
    }
    this.handleData();
    if (this.currentDataSource && this.currentDataSource.load) {
      this.load();
    }
  },
  methods: {
    handleData() {
      this.currentDataSource = this.normalizeDataSource(this.dataSource);
    },
    generateMockData() {
      return new Array(3).fill(1).map(() => {
        const map = {};
        this.columns.forEach((item) => {
          map[item.field] = `{{ ${item.field} }}`;
        });
        return map;
      })
    },
    getColumnsByString(val) {
      try {
        const data = val.replace(/[\{\}\[\]新建：` ]+/g, '');
        let regex = /propertyPath:\s*([^,]+),\s*title:\s*([^,]+),\s*typeName:\s*([^,]+),\s*decimalPlaces:\s*(\d+),\s*thousandths:\s*(false|true)/g;

        let matches;
        let results = [];

        while ((matches = regex.exec(data)) !== null) {
          results.push({
            propertyPath: matches[1],
            title: matches[2],
            typeName: matches[3],
            decimalPlaces: parseInt(matches[4], 10),
            thousandths: matches[5] === "true",
          });
        }

        if (lodash.isArray(results) && results.length > 0) {
          this.columns = formatColumns(results,  this.$env.VUE_APP_DESIGNER);
          this.dataSource = this.generateMockData();
        }
      } catch (e) {}
    },
    normalizeDataSource(dataSource) {
      let final;
      if (dataSource === undefined) {
        final = {
          data: [],
          load: undefined,
        };
      } else {
        final = this.currentDataSource || {
          data: [],
          load: undefined,
        };
      }

      function createLoad(rawLoad) {
        return async function (params = {}) {
          const res = await rawLoad(params);

          if (Array.isArray(res)) {
            final.data = res;
          } else if (Array.isArray(res.list)) {
            final.data = res.list;
          } else if (res.content) {
            final.data = res.content;
          } else if (res.data) {
            final.data = res.data;
          } else {
            final.data = res;
          }
        };
      }

      if (Array.isArray(dataSource)) final.data = dataSource;
      else if (typeof dataSource === "string") {
        try {
          return this.normalizeDataSource(JSON.parse(dataSource));
        } catch (err) {
          console.error(err);
        }
      } else if (
        dataSource instanceof Object &&
        // eslint-disable-next-line no-prototype-builtins
        dataSource.hasOwnProperty("list") &&
        Array.isArray(dataSource.list)
      ) {
        final.data = dataSource.list;
      } else if (typeof dataSource === "function")
        final.load = createLoad(dataSource);

      return final;
    },
    load(params) {
      this.$emit("before-load", undefined, this);
      this.loading = true;
      this.currentDataSource
        .load(params)
        .then(() => {
          this.$emit("load", undefined, this);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reload() {
      // 数据源不是function的时候，调用reload会报错，进行容错处理
      if (this.currentDataSource.load) this.load();
    },
  },
};
