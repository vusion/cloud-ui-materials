### 基本用法

``` html
<lcap-echarts-line 
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
    :areaFilled=true
    lineStyleSymbol="emptyCircle"
    lineStyleSymbolSize="8"
    lineType="dotted"
    lineStyleSmooth='smooth'
    labelPosition="top"
    undefinedToZero='zero'
    style="--labelFontSize:18px;
    --labelFontColor:#de5a5a;width: 500px; height:400px;
    --area-fill-color:#e54949;--area-line-color:#e54949;">
</lcap-echarts-line>

```

