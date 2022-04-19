<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapEchartsLine 折线图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)

**Chart**

折线图

## 示例
### 基本用法

``` html
<lcap-echarts-line 
    xAxis="studentName" 
    yAxis="math, english, science" 
    xAxisTitle="姓名" 
    yAxisTitle="年龄/岁" 
    title="成绩统计"
    theme=""
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
    :xAxisLabelRotate=0 >
</lcap-echarts-line>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| xAxis | string |  | `''` | 设置维度(x轴) |
| xAxisTitle | string |  | `''` | 设置维度(x轴)标题 |
| yAxis | string |  | `''` | 设置指标（y轴） |
| yAxisTitle | string |  | `''` | 设置指标(y轴)标题 |
| width | string |  | `'400px'` | 设置图宽度 |
| height | string |  | `'300px'` | 设置图高度 |
| title | string |  | `'默认标题'` | 设置主标题 |
| theme | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'theme1'` | 设置图表配色方案 |
| allowShowLabel | boolean |  | `true` | 设置是否显示标签 |
| allowShowHint | boolean |  | `true` | 设置是否显示提示 |
| allowShowLegend | boolean |  | `true` | 设置是否显示图例 |
| showXAxisLine | boolean |  | `true` | 设置是否显示图例 |
| showXAxisLabel | boolean |  | `true` | 设置是否显示X轴文字标签 |
| showXAxisLabelRotate | number | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `0` | 设置是否显示X轴文字标签方向 |
| showYAxisLine | boolean |  | `true` | 设置是否显示图例 |
| showYAxisLabel | boolean |  | `true` | 设置是否显示Y轴文字标签 |
| titleFontSize | number |  | `18` | 设置标题文字字号 |
| titleFontStyle | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置普通文字字号 |
| allowDownload | boolean |  | `true` | 允许用户设置保存图片 |

