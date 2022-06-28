<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapEchartsBar 柱状图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Methods](#methods)

**Chart**

柱状图

## 示例
### 基本用法

``` html
<lcap-echarts-bar 
    xAxis="fakeXAxis" 
    yAxis="指标1，指标2，指标3"
    xAxisTitle="维度" 
    yAxisTitle="指标" 
    title="标题"
    theme="theme3"
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
    xAxisLabelRotate="0">
</lcap-echarts-bar>
<lcap-echarts-bar 
    xAxis="" 
    legendName=""
    yAxis="property2" 
    xAxisTitle="维度" 
    yAxisTitle="指标" 
    title="标题"
    theme="theme1"
    >
</lcap-echarts-bar>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| xAxis | string |  | `''` | 设置维度(x轴) |
| yAxis | string |  | `''` | 设置指标（y轴），多个指标以逗号分隔 |
| width | string |  | `'380px'` | 设置图宽度 |
| height | string |  | `'300px'` | 设置图高度 |
| title | string |  | `'标题'` | 设置主标题 |
| theme | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'theme1'` | 设置图表配色方案 |
| allowShowLabel | boolean |  | `true` | 设置是否显示标签 |
| allowShowHint | boolean |  | `true` | 设置是否显示提示 |
| allowShowLegend | boolean |  | `true` | 设置是否显示图例 |
| legendName | string |  | `''` | 设置图例别名；修改成功后，图例名字会从"指标"改为"别名" |
| xAxisTitle | string |  | `'X轴标题'` | 设置x轴标题 |
| showXAxisLine | boolean |  | `true` | 设置是否显示X轴轴线 |
| showXAxisLabel | boolean |  | `true` | 设置是否显示X轴文字标签 |
| xAxisLabelRotate | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'0'` | 设置显示X轴文字标签的方向 |
| yAxisTitle | string |  | `'Y轴标题'` | 设置Y轴标题 |
| showYAxisLine | boolean |  | `true` | 设置是否显示Y轴轴线 |
| showYAxisLabel | boolean |  | `true` | 设置是否显示Y轴数值标签 |
| titleFontSize | number |  | `18` | 设置标题文字字号 |
| titleFontStyle | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置普通文字字号 |
| allowDownload | boolean |  | `true` | 允许用户设置保存图片 |

Methods

#### reload()

刷新数据

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

