<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# XEcharts

本组件主要是给 Echarts 添加了主题，以及几个常见的 CSS 功能。

更多示例请查阅[官方示例](https://www.echartsjs.com/examples/zh/index.html)，

更多配置项请查阅[官方配置项](https://www.echartsjs.com/zh/option.html)，

更多详细信息请参考 [Echarts 的 API 文档](https://echarts.apache.org/zh/api.html)。

## 示例
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

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| init-options | object |  |  | 初始化实例 |
| options | object |  |  | ECharts 实例的数据。修改这个 prop 会触发 ECharts 实例的 `setOption` 方法。如果直接修改 `options` 绑定的数据而对象引用保持不变，`setOption` 方法调用时将带有参数 `notMerge: false`。否则，如果为 `options` 绑定一个新的对象，`setOption` 方法调用时则将带有参数 `notMerge: true`。 |
| theme | string |  |  | 设置主题 |
| group | string |  |  | 实例的分组，会自动绑定到 ECharts 组件的同名属性上。 |
| autoresize | boolean |  | `true` | 指定 ECharts 实例在组件根元素尺寸变化时是否需要自动进行重绘。 |
| manual-update | boolean |  | `false` | 在性能敏感（数据量很大）的场景下，我们最好对于 `options` prop 绕过 Vue 的响应式系统。当将 `manual-update` prop 指定为 `true` 且不传入 `options` prop 时，数据将不会被监听。然后，你需要用 `ref` 获取组件实例以后手动调用 `mergeOptions` 方法来更新图表。 |
| border | boolean |  | `false` | 是否添加边框 |

### Computed

| Computed | Type | Description |
| -------- | ---- | ----------- |
| width | number | 用来获取 ECharts 实例的当前宽度。 |
| height | number | 用来获取 ECharts 实例的当前高度。 |
| computedOptions | object | 用来读取 ECharts 更新内部 `options` 后的实际数据。 |

### Events

#### @legendselectchanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @legendselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @legendunselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @legendscroll



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @datazoom



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @datarangeselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @timelinechanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @timelineplaychanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @restore



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @dataviewchanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @magictypechanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @geoselectchanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @geoselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @geounselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @pieselectchanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @pieselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @pieunselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mapselectchanged



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mapselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mapunselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @axisareaselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @focusnodeadjacency



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @unfocusnodeadjacency



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @brush



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @brushselected



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @rendered



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @finished



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @click



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @dblclick



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mouseover



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mouseout



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mousemove



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mousedown



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @mouseup



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @globalout



| Param | Type | Description |
| ----- | ---- | ----------- |

#### @contextmenu



| Param | Type | Description |
| ----- | ---- | ----------- |

### Methods

#### mergeOptions

（底层调用了 ECharts 实例的 `setOption` 方法）提供了一个更贴切的名称来描述 `setOption` 方法的实际行为。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### appendData



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### resize



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### dispatchAction



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### showLoading



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### hideLoading



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### convertToPixel



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### convertFromPixel



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### containPixel



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### getDataURL



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### getConnectedDataURL



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### clear



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### dispose



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### connect



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### disconnect



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### registerMap



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### registerTheme



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### graphic.clipPointsByRect



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### graphic.clipRectByRect



| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
