<template>
    <div :class="$style.root" ref="room">
        <div :class="$style.container">
            <echart-bar
                v-if="!loading"
                :axisData="axisData"
                :sourceData="sourceData"
                :customStyle="customStyle"
                :formatter="formatter"
                @startLoading="startLoading"
                ref="echart"
                @clickItem="$emit('clickItem', $event)"
            ></echart-bar>
            <div v-else>
                <img
                    :src="require('../../assets/barEmpty.png')"
                    :class="$style.emptyImage"
                />
            </div>
        </div>
    </div>
</template>

<script>
import echartBar from '@/widgets/echartBar';
import * as echarts from 'echarts';
import { fakeData } from '@/utils/fakeData';
import '@/utils/theme.js';
import Vue from 'vue';

Vue.prototype.$echarts = echarts;
let firstFlag = true;
export default {
    name: 'cw-echart-bar-view',
    components: { echartBar },
    props: {
        dataSource: [Function, Array, Object],
        theme: { type: String, default: 'theme1' },
        xAxis: { type: String, default: '' },
        yAxis: { type: String, default: '' },
        xAxisTitle: { type: String, default: 'X轴标题' },
        yAxisTitle: { type: String, default: 'Y轴标题' },
        title: { type: String, default: '标题' },
        titleFontSize: { type: Number, default: 18 },
        titleFontStyle: { type: String, default: 'normal' },
        allowDownload: { type: Boolean, default: true },
        allowShowLabel: { type: Boolean, default: true },
        allowShowHint: { type: Boolean, default: true },
        allowShowLegend: { type: Boolean, default: true },
        axisSplitLineType: { type: String, default: 'solid' },
        axisSplitLine: { type: String, default: 'horizontal' },
        legendName: { type: String, default: '' },
        labelPosition: { type: String, default: 'inside' },
        undefinedToZero: { type: String, default: 'empty' },
        showXAxisLine: { type: Boolean, default: true },
        showYAxisLine: { type: Boolean, default: true },
        showXAxisLabel: { type: Boolean, default: true },
        showYAxisLabel: { type: Boolean, default: true },
        xAxisLabelRotate: { type: String, default: '0' },
        xAxisType: { type: String, default: 'xBase' },
        initialLoad: { type: Boolean, default: true },
        formatter: String,
    },
    data() {
        return {
            sourceData: undefined,
            loading: false,
            customStyle: {},
        };
    },
    created() {
        if (this.$env.VUE_APP_DESIGNER || !window.appInfo) {
            this.init();
        } else {
            if (firstFlag && !this.initialLoad) {
                this.startLoading();
            } else {
                this.init();
            }
            setTimeout(() => {
                firstFlag = false;
            }, 1000);
        }
    },
    mounted() {
        // 监听style样式变化
        // 监听style样式变化
        this.customStyle = this.parseCustomStyle(this.$el);
        const observer = new MutationObserver(
            function(mutations) {
                mutations.map(
                    function(mutation) {
                        if (mutation.type === 'attributes') {
                            this.customStyle = this.parseCustomStyle(this.$el);
                        }
                    }.bind(this)
                );
            }.bind(this)
        );
        observer.observe(this.$el, { attributes: true });
        this.mutationObserver = observer;
        this.resizeObserver = new ResizeObserver(() => {
            this.$refs.echart.resize();
        });
        this.resizeObserver.observe(this.$el);
    },
    beforeDestroy() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    },
    computed: {
        axisData() {
            return {
                xAxis: this.xAxis,
                yAxis: this.yAxis,
                xAxisTitle: this.xAxisTitle,
                yAxisTitle: this.yAxisTitle,
                theme: this.theme,
                title: this.title,
                legendName: this.legendName,
                titleFontSize: this.titleFontSize,
                titleFontStyle: this.titleFontStyle,
                allowDownload: this.allowDownload,
                allowShowLabel: this.allowShowLabel,
                allowShowHint: this.allowShowHint,
                allowShowLegend: this.allowShowLegend,
                axisSplitLineType: this.axisSplitLineType,
                axisSplitLine: this.axisSplitLine,
                labelPosition: this.labelPosition,
                undefinedToZero: this.undefinedToZero,
                showXAxisLine: this.showXAxisLine,
                showYAxisLine: this.showYAxisLine,
                showXAxisLabel: this.showXAxisLabel,
                showYAxisLabel: this.showYAxisLabel,
                xAxisLabelRotate: this.xAxisLabelRotate,
                xAxisType: this.xAxisType,
                initialLoad: { type: Boolean, default: true },
            };
        },
        changedObj() {
            let { xAxis, yAxis } = this;
            return { xAxis, yAxis };
        },
    },
    watch: {
        changedObj: {
            handler() {
                this.init();
            },
        },
    },
    methods: {
        parseCustomStyle(element) {
            const cssList = element.style.cssText.split(';');
            const cssObj = {};
            cssList.forEach((item) => {
                const [key, value] = item.split(':');
                if (key && value) {
                    cssObj[key.trim()] = value.trim();
                }
            });
            return cssObj;
        },
        reload() {
            this.sourceData = null
            this.$nextTick(async () => {
                this.sourceData = await this.handleDataSource(this.dataSource);
                this.loading = false;
                this.$refs.echart && this.$refs.echart.reload();
                // console.log('source', this.sourceData);
            });
        },
        async init() {
            // 本地启动和开发环境使用假数据，生产环境替换为真数据
            const fnDataSource =
                this.$env.VUE_APP_DESIGNER || !window.appInfo
                    ? fakeData
                    : this.dataSource;
            this.sourceData = await this.handleDataSource(fnDataSource);
        },
        // 删除不必要字段
        processRawData(data) {
            if (data.length === 0) {
                this.loading = true;
                return;
            }
            const content = Array.isArray(data) ? data : data.content;
            const key = Object.keys(content[0])[0];
            // 删除自带的，不必要的属性
            for (let item of content) {
                const tempAttr = item[key];
                delete tempAttr.id &&
                    delete tempAttr.createdTime &&
                    delete tempAttr.updatedTime &&
                    delete tempAttr.createdBy &&
                    delete tempAttr.updatedBy;
            }
            return data;
        },
        async handleDataSource(dataSource) {
            if (!dataSource) {
                return [];
            }
            if (
                dataSource instanceof Promise ||
                typeof dataSource === 'function'
            ) {
                const result = await dataSource();
                return this.getData(result);
            }
            return this.getData(dataSource);
        },
        getData(dataSource) {
            if (typeof dataSource === 'string') {
                dataSource = dataSource.replace(/'/g, '"');
                return JSON.parse(dataSource);
            }
            return dataSource;
        },
        startLoading() {
            this.loading = true;
        },
    },
};
</script>

<style module>
.root {
    display: inline-block;
    width: var(--echart-width, 340px);
    height: var(--echart-height, 300px);
}

.container {
    width: 100%;
    height: 100%;
}

.emptyImage {
    width: 100%;
    height: 100%;
}
</style>
