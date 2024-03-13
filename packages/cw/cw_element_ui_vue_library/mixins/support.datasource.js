export default {
    props: {
        dataSource: [Array, Function, Object],
        dataSchema: { type: String, default: 'entity' },
        idField: {
            type: String,
            default: () => 'id',
        },
        typeField: {
            type: String,
            default: () => 'type',
        },
        positionField: {
            type: String,
            default: () => 'position',
        },
        textContentField: {
            type: String,
            default: () => 'textContent',
        },
        styleField: {
            type: String,
            default: () => 'style',
        },
    },
    data() {
        return {
            currentDataSource: undefined,
            loading: false,
        };
    },
    watch: {
        dataSource() {
            this.handleData();
            if (this.currentDataSource && this.currentDataSource.load) {
                this.load();
            }
        },
    },
    created() {
        this.handleData();
        if (this.currentDataSource && this.currentDataSource.load) {
            this.load();
        }
    },
    methods: {
        handleData() {
            this.currentDataSource = this.normalizeDataSource(this.dataSource);
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
                    } else {
                        final.data = res;
                    }
                };
            }

            if (Array.isArray(dataSource)) final.data = dataSource;
            else if (typeof dataSource === 'string') {
                try {
                    return this.normalizeDataSource(JSON.parse(dataSource));
                } catch (err) {
                    console.error(err);
                }
            } else if (
                dataSource instanceof Object &&
                // eslint-disable-next-line no-prototype-builtins
                dataSource.hasOwnProperty('list') &&
                Array.isArray(dataSource.list)
            ) {
                final.data = dataSource.list;
            } else if (typeof dataSource === 'function')
                final.load = createLoad(dataSource);

            return final;
        },
        load(params) {
            this.$emit('before-load', undefined, this);
            this.loading = true;
            this.currentDataSource
                .load(params)
                .then(() => {
                    this.$emit('load', undefined, this);
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
