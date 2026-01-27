# cw_echarts_library 依赖库

## 简介
`cw_echarts_library` 是一个基于 ECharts 封装的图表依赖库，专为 Codewave 低代码平台设计。本库提供了一系列开箱即用的可视化组件，包括柱状图、折线图、饼图以及支持高度自定义的通用图表组件。通过简单的属性配置，开发者可以快速实现复杂的数据可视化需求，并支持动态数据绑定与交互。

## 包含的组件与逻辑

### 组件列表
- **cw-echart-bar-view（柱状图）**: 用于展示分类数据的对比，支持横向（条形图）与纵向（柱状图）切换，提供丰富的坐标轴与网格线配置。
- **cw-echart-basic-view（通用图）**: 提供最基础的 ECharts 封装，支持通过原生 Option 配置项实现任何 ECharts 支持的图表类型，并支持自动轮播高亮。
- **cw-echart-line-view（折线图）**: 用于展示数据随时间或有序类别的变化趋势，支持区域填充、平滑曲线、多种标记点样式等。
- **cw-echart-pie-view（饼图）**: 用于展示各项占比情况，支持基础饼图、环形图、半环图，并可灵活配置标签显示内容。

### 逻辑列表
暂无。本库当前版本主要通过组件方式提供功能。

## API 说明

### 柱状图 (cw-echart-bar-view)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 表格的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema | - | 表格每一行的数据类型 |
| undefinedToZero | string | empty | 设置将未定义的值如undefined，null转换为0或空距 (empty/zero) |
| initialLoad | boolean | true | 是否在初始时立即加载 |
| xAxis | string | '' | 设置维度(统计类别) |
| yAxis | string | '' | 设置度量（统计值） |
| xAxisType | string | xBase | 轴数据：xBase(X轴表示分类-柱状图), yBase(Y轴表示分类-条形图) |
| axisSplitLine | string | horizontal | 设置坐标系网格线 (hidden/horizontal/vertical/both) |
| axisSplitLineType | string | solid | 设置网格线线型 (solid/dotted/dashed) |
| labelPosition | string | inside | 设置数据标签位置 (top/bottom/left/right/inside/hidden) |
| title | string | 标题 | 设置主标题 |
| theme | string | theme1 | 设置图表配色方案 (theme1:科技, theme2:清新, theme3:淡雅, theme4:经典) |
| allowShowHint | boolean | true | 设置是否显示提示 |
| allowShowLegend | boolean | true | 设置是否显示图例 |
| legendName | string | '' | 设置图例别名 |
| xAxisTitle | string | X轴标题 | 设置x轴标题 |
| showXAxisLine | boolean | true | 设置是否显示X轴轴线 |
| showXAxisLabel | boolean | true | 设置是否显示X轴文字标签 |
| xAxisLabelRotate | string | '0' | 设置显示X轴文字标签的方向 (0/90/45/-45) |
| yAxisTitle | string | Y轴标题 | 设置Y轴标题 |
| showYAxisLine | boolean | true | 设置是否显示Y轴轴线 |
| showYAxisLabel | boolean | true | 设置是否显示Y轴数值标签 |
| titleFontStyle | string | normal | 设置标题文字字号风格 (normal/italic) |
| allowDownload | boolean | true | 允许用户设置保存图片 |
| formatter | string | - | 标签内容格式器, 支持用 
 换行 |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| clickItem | 点击节点时触发 | event (string) |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| reload | 刷新数据 | [] |

---

### 通用图 (cw-echart-basic-view)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| options | object \| string | '' | ECharts option配置项 |
| data-source | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据源，数据集对象或者返回数据集的逻辑 |
| formatter | string | - | 标签内容格式器 |
| autoplay | string | - | 开启自动播放之后，会触发轮播高亮 |
| delay-time | number | - | 自动播放延迟时间（秒） |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| clickItem | 点击节点时触发 | event (string) |
| highlight | 高亮节点触发 | event (number): 当前激活的节点下标 |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| reload | 刷新数据 | [] |

---

### 折线图 (cw-echart-line-view)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据源配置 |
| data-schema | schema | - | 数据类型定义 |
| undefinedToZero | string | empty | 空值处理规则 |
| initialLoad | boolean | true | 初始加载 |
| xAxis | string | '' | 维度设置 |
| yAxis | string | '' | 度量设置 |
| title | string | 标题 | 图表标题 |
| axisSplitLine | string | horizontal | 坐标系网格线显示模式 |
| axisSplitLineType | string | solid | 网格线线型 |
| theme | string | theme1 | 配色方案 |
| labelPosition | string | top | 数据标签位置 |
| allowShowHint | boolean | true | 显示提示 |
| allowShowLegend | boolean | true | 显示图例 |
| legendName | string | '' | 图例别名 |
| areaFilled | boolean | false | 设置是否填充折线下方区域 |
| lineType | string | solid | 线条类型 (solid/dotted/dashed) |
| lineStyleSmooth | string | normal | 线条样式 (normal:基础, smooth:平滑) |
| lineStyleSymbol | string | emptyCircle | 线条标记形状 (circle/rect/triangle/diamond/pin/arrow/none等) |
| xAxisTitle | string | X轴标题 | X轴标题 |
| showXAxisLine | boolean | true | 显示X轴轴线 |
| showXAxisLabel | boolean | true | 显示X轴文字标签 |
| xAxisLabelRotate | string | '0' | X轴文字标签方向 |
| yAxisTitle | string | Y轴标题 | Y轴标题 |
| showYAxisLine | boolean | true | 显示Y轴轴线 |
| showYAxisLabel | boolean | true | 显示Y轴数值标签 |
| titleFontStyle | string | normal | 标题字体风格 |
| allowDownload | boolean | true | 允许保存图片 |
| formatter | string | - | 标签内容格式器 |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| clickItem | 点击节点时触发 | event (string) |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| reload | 刷新数据 | [] |

---

### 饼图 (cw-echart-pie-view)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| data-source | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据源配置 |
| data-schema | schema | - | 数据类型定义 |
| undefinedToZero | string | empty | 空值处理规则 |
| initialLoad | boolean | true | 初始加载 |
| xAxis | string | '' | 维度设置 |
| yAxis | string | '' | 度量设置 |
| title | string | 标题 | 主标题 |
| theme | string | theme1 | 配色方案 |
| showLabelName | boolean | true | 设置是否显示维度标签 |
| showLabelValue | boolean | true | 设置是否显示数值标签 |
| showLabelPercent | boolean | true | 设置是否显示占比标签 |
| allowShowHint | boolean | true | 设置是否显示提示 |
| allowShowLegend | boolean | true | 设置是否显示图例 |
| legendPosition | string | bottom | 设置图例位置 (top/bottom/left/right) |
| legendScroll | string | normal | 设置图例是否滚动 (normal/scroll) |
| pieType | string | pie | 饼类型 (pie:饼型, circle:环型, semiCircle:半环形) |
| titleFontStyle | string | normal | 标题文字风格 |
| allowDownload | boolean | true | 允许保存图片 |
| formatter | string | - | 标签内容格式器 |

#### 事件 (Events)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| clickItem | 点击节点时触发 | event (string) |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| reload | 刷新数据 | [] |