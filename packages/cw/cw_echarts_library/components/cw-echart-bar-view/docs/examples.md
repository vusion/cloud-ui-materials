```vue
<template>
    <div>
        <u-button @click="download">下载</u-button>
        <cw-echart-bar-view
        ref="echarts"
        xAxis=""
        legendName=""
        yAxis="property2"
        xAxisTitle="维度"
        yAxisTitle="指标"
        title="标题"
        theme="theme1"
        formatter="{c}%"
        style="--labelFontSize:18px;width: 500px; height:400px; 
        --label-font-size: 12; --grid-line-color: blue; --axis-line-color: green; --bar-item-border-color: red; --bar-item-backgroundColor: green; --bar-item-color: red;
        "></cw-echart-bar-view>
    </div>
    
</template>
<script>
export default {
    methods: {
        download() {
            return this.$refs.echarts.getDataUrl()
        },
    },
};
</script>
```
