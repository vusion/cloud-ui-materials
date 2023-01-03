### 基本用法

``` html
<lcap-echarts-line 
    xAxis="fakeXAxis" 
    yAxis="指标1，指标2，指标3" 
    xAxisTitle="维度1, 维度2" 
    yAxisTitle="指标" 
    title="标题"
    theme="theme1"
    width="450px"
    height="300px"
    legendName="数学，语文，英语"
    :titleFontSize=16
    titleFontStyle="italic"
    :allowDownload=true
    :allowShowLabel=true
    :allowShowHint=true
    :allowShowLegend=true
    :showXAxisLine=true
    :showYAxisLine=true
    :showXAxisLabel=true
    :showYAxisLabel=true
    >
</lcap-echarts-line>
<lcap-echarts-line 
    xAxis="" 
    legendName=""
    yAxis="property2" 
    xAxisTitle="维度" 
    yAxisTitle="指标" 
    title="标题"
    theme="theme1"
    >
</lcap-echarts-line>

```

