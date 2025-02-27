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
        authPlay: {
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
                this.listenHighLight();
                // 开启自动播放功能
                if (this.authPlay) {
                    this.authPlay(this.chartInstance);
                    this.startAutoPlay();
                    this.triggrPlay(this.chartInstance);
                } else {
                    this.stopAutoPlay();
                }
                this.$nextTick(() => {
                    this.chartInstance.resize();
                });
            }
        },
        triggrPlay(chartInstance) {
            chartInstance.on('mouseover', function () {
                stopAutoPlay();
            });

            chartInstance.on('mouseout', function () {
                startAutoPlay();
            });
        },
        authPlay(chartInstance) {
            if (!chartInstance) return;
            // 仅支持单series 场景
            chartInstance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: (currentIndex - 1 + dataLen) % dataLen
            });

            // 高亮当前项
            chartInstance.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: currentIndex
            });

            // 显示 tooltip
            chartInstance.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
        },
        startAutoPlay() {
            if (!this.intervalId) {
                this.intervalId = setInterval(this.authPlay, this.delayTime);
            }
        },
        stopAutoPlay() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },
        listenHighLight(chartInstance) {
            chartInstance.on('highlight', this.updateCurIndex);
        },
        updateCurIndex({dataIndex}) {
            this.currentIndex = dataIndex;
            this.$emit('highlight', dataIndex);
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
