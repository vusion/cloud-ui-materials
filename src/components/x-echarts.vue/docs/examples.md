### 基本用法

``` vue
<template>
<x-echarts :options="options"></x-echarts>
</template>
<script>
export default {
	data() {
		return {
			options: (() => {
                function randomize() {
                    return [0, 0, 0].map((v) => Math.round(300 + Math.random() * 700) / 10);
                }

                return {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        // Provide data.
                        source: [
                            ['Product', '2015', '2016', '2017'],
                            ['Matcha Latte', ...randomize()],
                            ['Milk Tea', ...randomize()],
                            ['Cheese Cocoa', ...randomize()],
                            ['Walnut Brownie', ...randomize()],
                        ],
                    },
                    // Declare X axis, which is a category axis, mapping
                    // to the first column by default.
                    xAxis: { type: 'category' },
                    // Declare Y axis, which is a value axis.
                    yAxis: {},
                    // Declare several series, each of them mapped to a
                    // column of the dataset by default.
                    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
                };
            })(),
		}
	}
};
</script>
```

``` vue
<template>
<x-echarts :options="options"></x-echarts>
</template>
<script>
export default {
	data() {
		return {
			options: {
                title: {
                    text: '饼图示例',
                    x: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' },
                        ],
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'white',
                        },
                    },
                ],
            },
		}
	}
};
</script>
```

### 添加边框

默认的 ECharts 没有边框，为了方便，实现在了组件中。

只需开启`border`属性即可。

``` vue
<template>
<x-echarts border :options="options"></x-echarts>
</template>
<script>
export default {
	data() {
		return {
			options: {
                title: {
                    text: '甜圈图示例',
                    x: 'left',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['45%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '24',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'white',
                        },
                        data:[
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' },
                        ],
                    },
                ],
            },
        };
	},
};
</script>
```

### 设置宽高

直接添加`style`属性。

``` vue
<template>
<x-echarts border :options="options" style="width: 420px; height: 240px;"></x-echarts>
</template>
<script>
export default {
	data() {
		return {
			options: {
                title: {
                    text: '甜圈图示例',
                    x: 'left',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['60%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '24',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'white',
                        },
                        data:[
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' },
                        ],
                    },
                ],
            },
        };
	},
};
</script>
```
