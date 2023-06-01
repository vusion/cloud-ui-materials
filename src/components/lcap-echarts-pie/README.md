<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapEchartsPie 饼图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Methods](#methods)

**Chart**

饼图

## 示例
### 基本用法

```html
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
    legendScroll="scroll"
    legendPosition="top"
    undefinedToZero="empty"
    pieType="semiCircle"
    style="--pie-sectors-border-color: red; --label-font-color: blue;"
></lcap-echarts-pie>

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
| title | string |  | `'标题'` | 设置主标题 |
| theme | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'theme1'` | 设置图表配色方案 |
| showLabelName | boolean |  | `true` | 设置是否显示维度标签 |
| showLabelValue | boolean |  | `true` | 设置是否显示数值标签 |
| showLabelPercent | boolean |  | `true` | 设置是否显示占比标签 |
| allowShowHint | boolean |  | `true` | 设置是否显示提示 |
| allowShowLegend | boolean |  | `true` | 设置是否显示图例 |
| legendPosition | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'bottom'` | 设置图例位置 |
| legendScroll | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置图例是否滚动 |
| pieType | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'pie'` | undefined |
| titleFontStyle | string | `[object Object]`<br/>`[object Object]` | `'normal'` | 设置普通文字字号 |
| allowDownload | boolean |  | `true` | 允许用户设置保存图片 |

Methods

#### reload()

刷新数据

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

