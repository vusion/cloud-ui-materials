<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapEcharts 低代码数据可视化图表

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

**Chart**

本组件根据表格生成的数据，自动转化成可视化图表

## 示例
### 基本用法

``` vue
<template>
<div>
<button @click="onClick">temp
</button>
    <lcap-echarts :chart-type="type"></lcap-echarts>
</div>
</template>

<script>
export default {
    data() {
        return {
            type: 'bar',
    };
    },
    methods: {
        onClick() {
        console.log(this.type);
            return this.type = this.type !== 'line' ? 'line' : 'pie';
        },
    },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| chartType | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'bar'` | 图表类型 |
| width | string |  | `'400px'` | 宽度 |
| height | string |  | `'300px'` | 高度 |
| xAxis | string |  | `''` | x轴(分类轴) |
| yAxis | string |  | `''` | y轴（数值轴） |
| title | string |  | `'默认标题'` | 标题 |
| titleFontSize | number |  | `18` | 标题字体大小 |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema |  |  | 表格每一行的数据类型 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @change

修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.param1 | string | 参数1 |
| $event.param2 | number | 参数2 |

