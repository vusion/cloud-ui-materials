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

```html
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
    :allowShowHint=true
    :allowShowLegend=true
    axisSplitLine="both"
    axisSplitLineType="solid"
    labelPosition="inside"
    undefinedToZero='empty'
    :showXAxisLine=true
    :showYAxisLine=true
    :showXAxisLabel=true
    :showYAxisLabel=true
    xAxisType="xBase"
    xAxisLabelRotate="0">
</lcap-echarts-bar>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema |  |  | 表格每一行的数据类型 |
| undefinedToZero | string | `[object Object]`<br/>`[object Object]` | `'empty'` | 设置将未定义的值如undefined，null转换为0或空距 |
| initialLoad | boolean |  | `true` | 是否在初始时立即加载 |
| xAxis | string |  | `''` | 设置维度(统计类别) |
| yAxis | string |  | `''` | 设置度量（统计值） |
| xAxisType | string | `[object Object]`<br/>`[object Object]` | `'xBase'` | undefined |
| axisSplitLine | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'horizontal'` | 设置坐标系网格线 |
| axisSplitLineType | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'solid'` | 设置网格线线型 |
| labelPosition | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'inside'` | 设置数据标签位置 |
| title | string |  | `'标题'` | 设置主标题 |
| theme | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'theme1'` | 设置图表配色方案 |
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
| titleFontStyle | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置普通文字字号 |
| allowDownload | boolean |  | `true` | 允许用户设置保存图片 |

Methods

#### reload()

刷新数据

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

