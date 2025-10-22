<template>
    <div :class="$style.root" ref="room">
        <div :class="$style.container">
            <echart-basic
                v-if="!loading"
                :sourceData="sourceData"
                :options="options"
                :autoplay="autoplay"
                :delayTime="delayTime"
                @startLoading="startLoading"
                ref="echart"
                @clickItem="$emit('clickItem', $event)"
                @highlight="$emit('highlight', $event)"
                v-bind="$attrs"
            ></echart-basic>
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
import echartBasic from '@/widgets/echartBasic';
import * as echarts from 'echarts';
import { fakeData } from '@/utils/fakeData';
import '@/utils/theme.js';
import Vue from 'vue';
Vue.prototype.$echarts = echarts;

export default {
    name: 'cw-echart-basic-view',
    components: { echartBasic },
    props: {
        dataSource: [Function, Array, Object],
        options: { 
            type: Object, 
            default: () => ({
                xAxis: { 
                    type: 'category', 
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
                }, 
                yAxis: { 
                    type: 'value' 
                }, 
                series: [ 
                    { 
                        data: [150, 230, 224, 218, 135, 147, 260], 
                        type: 'line' 
                    } 
                ]
            }) 
        },
        autoplay: { type: Boolean, default: false },
        delayTime: { type: Number, default: 2000 },
    },
    data() {
        return {
            sourceData: undefined,
            loading: false,
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.resizeObserver = new ResizeObserver(() => {
            this.$refs.echart.resize();
        });
        this.resizeObserver.observe(this.$el);
    },
    beforeDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    },
    watch: {
        changedObj: {
            handler() {
                this.init();
            },
        },
    },
    methods: {
        reload() {
            this.sourceData = 'fakeData';
            this.$nextTick(async () => {
                this.sourceData = await this.handleDataSource(this.dataSource);
                this.loading = false;
                this.$refs.echart && this.$refs.echart.reload();
                console.log('source', this.sourceData);
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
        // 供外部调用使用
        stopAutoplay(dataIndex) {
            this.$refs.echart.stopAutoplay({dataIndex});
        }
    },
};
</script>

<style module>
.root {
    display: inline-block;
    width: var(--echart-width, 340px);
    height: var(--echart-height, 300px);
}

.root[vusion-node-path] {
    border: 1px solid var(--border-color-base);
}

.container {
    width: 100%;
    height: 100%;
}

.container[border] {
    padding: 15px;
}

.emptyImage {
    width: 100%;
    height: 100%;
}
</style>
