<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapEchartsPie 饼图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)

**Chart**

饼图

## 示例
### 基本用法

``` html
<lcap-echarts-pie
    theme=""  
    xAxis="fakeXAxis" 
    yAxis="指标1"
    :titleFontSize=18
    titleFontStyle="normal"
    :allowDownload=true
    :allowShowHint=true
    :allowShowLegend=true
    legendName="数学"
    :showLabelName=true
    :showLabelValue=true
    :showLabelPercent=true
></lcap-echarts-pie>

```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| xAxis | string |  | `''` | 设置维度 |
| yAxis | string |  | `''` | 设置指标 |
| width | string |  | `'400px'` | 设置图宽度 |
| height | string |  | `'300px'` | 设置图高度 |
| title | string |  | `'标题'` | 设置主标题 |
| theme | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'theme1'` | 设置图表配色方案 |
| showLabelName | boolean |  | `true` | 设置是否显示维度标签 |
| showLabelValue | boolean |  | `true` | 设置是否显示数值标签 |
| showLabelPercent | boolean |  | `true` | 设置是否显示占比标签 |
| allowShowHint | boolean |  | `true` | 设置是否显示提示 |
| allowShowLegend | boolean |  | `true` | 设置是否显示图例 |
| titleFontSize | number |  | `18` | 设置标题文字字号 |
| titleFontStyle | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置普通文字字号 |
| allowDownload | boolean |  | `true` | 允许用户设置保存图片 |

