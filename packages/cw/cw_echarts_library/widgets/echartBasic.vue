<template>
    <div :class="$style.root">
        <div ref="myChart" :class="$style.canvasWrap"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';

export default {
    name: 'echartBasic',
    props: {
        sourceData: [Array, Object], // 这个属性实际上不起作用
        axisData: [Object],
        options: [Object],
        autoplay: {
            type: Boolean,
            default: false,
        },
        delayTime: {
            type: Number,
            default: 2000,
        }
    },
    data() {
        return {
            barData: {},
            barOption: {},
            color: null,
            currentIndex: 0,
            intervalId: null,
            dataLen: 0,
        };
    },
    async mounted() {
        // await this.initData()
        this.createMyChart();

    },
    computed: {
        changedObj() {
            let { axisData, sourceData, options } = this;
            return { axisData, sourceData, options };
        },
    },
    watch: {
        changedObj: {
            handler() {
                this.reload();
            },
            deep: true,
        },
        options: {
            handler(value) {
                // 仅支持单series 场景
                try {
                    if (Array.isArray(value.series)) {
                        this.dataLen = value.series[0].data.length;
                    } else {
                        this.dataLen = value.series.data.length;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            immediate: true,
        }
    },
    beforeDestroy() {
        if (this.chartInstance) {
            this.chartInstance.dispose();
            this.chartInstance = null;
        }
    },
    methods: {
        // async initData(){
        //     const r =  await  fetch("/api/system/getCustomConfig/APP_COLOR_KEY?group=extensions.cw_echarts_library.custom",{
        //     }).then(r=>r.text())
        //     if(r&&r.length<200){
        //         this.color = r.split(",") 
        //     }else{
        //         this.color = undefined
        //     }
        // },
        reload() {
            if (this.chartInstance) {
                this.chartInstance.setOption({ ...this.options }, { notMerge: true })
                this.$nextTick(() => {
                    this.chartInstance.resize();
                });
            }
        },
        createMyChart() {
            const myChart = this.$refs.myChart;
            this.initChart(myChart, { ...this.options });
        },
        initChart(chart, config) {
            if (chart) {
                if (this.chartInstance) {
                    this.chartInstance.dispose();
                    this.chartInstance = null;
                }
                this.chartInstance = echarts.init(chart);
                this.chartInstance.setOption(config);
                this.chartInstance.on('click', (echartClickEvent) => {
                    this.$emit('clickItem', echartClickEvent);
                });

                this.chartInstance.on('highlight', this.updateCurName);
                // 开启自动播放功能
                if (this.autoplay) {
                    this.triggrPlay();
                }
                this.$nextTick(() => {
                    this.chartInstance.resize();
                });
            }
        },
        triggrPlay() {
            this.chartInstance.on('mouseover', this.stopAutoplay);
            this.chartInstance.on('mouseout', this.startAutoplay);
            this.startAutoplay();
        },
        autoplayHandler() {
            if (!this.chartInstance) return;
            if (this.dataLen <= 1) return;
            this.chartInstance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: (this.currentIndex - 1 + this.dataLen) % this.dataLen
            });

            // 高亮当前项
            this.chartInstance.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: this.currentIndex
            });
            // 更新索引
            this.currentIndex = (this.currentIndex + 1) % this.dataLen;
        },
        startAutoplay() {
            if (!this.intervalId) {
                this.intervalId = setInterval(this.autoplayHandler, this.delayTime);
            }
        },
        stopAutoplay(params) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            // 立即销毁当前激活的
            for (let i = 0; i < this.dataLen; i++) {
                this.chartInstance.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: i,
                });
            }
            this.chartInstance.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
            this.updateCurName(params);
        },
        updateCurName(e) {
            const { dataIndex } = e;
            this.currentIndex = dataIndex;
            this.$emit('highlight', e);
        },
        resize() {
            if (this.chartInstance) {
                this.chartInstance.resize();
            }
        },
    },
};
</script>

<style module>
.root {
    width: 100%;
    height: 100%;
}

.canvasWrap {
    width: 100%;
    height: 100%;
}
</style>
