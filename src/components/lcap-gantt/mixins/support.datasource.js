export default {
    props: {
        dataSource: [Array, Function, Object],
        linkSource: [Array, Function, Object],
        dataSchema: { type: String, default: 'entity' },
        textField: { type: String, default: 'text' },
        valueField: { type: String, default: 'value' },
        treeSelectTip: { type: String, default: '请绑定数据源' },
    },
    data() {
        return {
            currentDataSource: undefined,
            currentLinkSource: undefined,
            loading: false,
        };
    },
    watch: {
        dataSource() {
            this.handleData();
        },
        linkSource() {
            this.handleData();
        }
    },
    created() {
        this.handleData();
        if ((this.currentDataSource && this.currentDataSource.load) || (this.currentLinkSource && this.currentLinkSource.load)){
            this.load();
        }
    },
    computed: {
        // 平台上list数据源可能包括在data.list中，也可能直接在data中，所以需要统一处理
        innerDataSource() {
            return this.currentDataSource.data.list || this.currentDataSource.data || this.currentDataSource;
        },
        innerLinkSource() {
            return this.currentLinkSource.data.list || this.currentLinkSource.data || this.currentLinkSource;
        }
    },
    methods: {
        handleData() {
            this.currentDataSource = this.normalizeDataSource(this.dataSource, this.multiple);
            this.currentLinkSource = this.normalizeDataSource(this.linkSource, this.multiple);
        },
        normalizeDataSource(dataSource, multiple) {
            const final = {
                data: [],
                load: undefined,
            };

            function createLoad(rawLoad) {
                return async function (params = {}) {
                    const res = await rawLoad(params);
                    if (multiple) {
                        if (Array.isArray(res)) {
                            final.data = res;
                        } else if (Array.isArray(res.list)) {
                            final.data = res.list;
                        } else {
                            final.data = res.content;
                        }
                    } else {
                        final.data = res;
                    }
                };
            }

            if (Array.isArray(dataSource))
                final.data = dataSource;
            else if (typeof dataSource === 'function')
                final.load = createLoad(dataSource);

            return final;
        },
        load(params) {
            this.loading = true;
            this.currentDataSource.load(params)
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
