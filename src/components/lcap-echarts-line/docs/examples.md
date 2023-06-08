### 基本用法

```vue
<template>
  <div>
    <lcap-echarts-line
      ref="line"
      xAxis="fakeXAxis"
      yAxis="指标1，指标"
      xAxisTitle="维度1111"
      yAxisTitle="指标1222"
      title="标题111"
      theme="theme1"
      legendName="数学"
      :titleFontSize=16
      titleFontStyle="italic"
      :allowDownload=true
      :allowShowHint=true
      :allowShowLegend=true
      :showXAxisLine=true
      :showYAxisLine=true
      :showXAxisLabel=true
      :showYAxisLabel=true
      axisSplitLine="horizontal"
      axisSplitLineType="dashed"
      :areaFilled=false
      lineStyleSymbol="emptyCircle"
      lineStyleSymbolSize="8"
      lineType="dotted"
      lineStyleSmooth='smooth'
      labelPosition="top"
      :initialLoad=false
      undefinedToZero='zero'
      style="--labelFontSize:18px;width: 500px; height:400px; --line-item-color: blue; 
    --label-font-size: 14;
    ">
    </lcap-echarts-line>
    <u-button @click="reload">reload</u-button>
  </div>
</template>
<script>
export default {
  methods: {
    reload() {
    console.log('reload');
      this.$refs.line.reload();
    }
  }
}
</script>

```


