# echarts依赖库 (cw_echarts_library_element_ui)

## 简介
本依赖库 `cw_echarts_library_element_ui` 专为 Codewave 低代码平台设计，集成了高性能的 ECharts 图表库。它提供了一系列预设的图表组件，旨在帮助开发者快速在应用中集成直观、交互性强的数据可视化功能。本库涵盖了常用的柱状图、折线图、饼图以及支持高度自定义的通用图表组件。

## 组件列表
- **柱状图 (cw-echart-bar-view)**：用于展示不同分类数据的对比，支持横向和纵向展示。
- **通用图 (cw-echart-basic-view)**：支持直接透传 ECharts 配置项，适用于复杂或特定的图表定制需求。
- **折线图 (cw-echart-line-view)**：用于展示数据随时间或有序类别的变化趋势，支持面积填充及多种线条样式。
- **饼图 (cw-echart-pie-view)**：用于展示数据的各项占比，支持环形图和半环形图样式。

## 逻辑列表
暂无相关逻辑。

## 组件 API 说明

### 柱状图 (cw-echart-bar-view)

#### 属性 (Attrs)
| 名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据集对象或者返回数据集的逻辑 |
| data-schema | 数据类型 | schema | - | 表格每一行的数据类型 |
| undefinedToZero | 空值处理规则 | string | empty | 设置将未定义的值(undefined/null)转换为0或空距(empty/zero) |
| initialLoad | 初始加载 | boolean | true | 是否在初始时立即加载 |
| xAxis | 维度 | string | '' | 设置维度(统计类别) |
| yAxis | 度量 | string | '' | 设置度量（统计值） |
| xAxisType | 轴数据 | string | xBase | xBase: X轴表示分类（柱状图）; yBase: Y轴表示分类（条形图） |
| axisSplitLine | 坐标系网格线 | string | horizontal | 设置网格线(hidden/horizontal/vertical/both) |
| axisSplitLineType | 网格线线型 | string | solid | 设置网格线线型(solid/dotted/dashed) |
| labelPosition | 数据标签位置 | string | inside | top/bottom/left/right/inside/hidden |
| title | 标题 | string | 标题 | 设置主标题 |
| theme | 配色方案 | string | theme1 | 科技(theme1)/清新(theme2)/淡雅(theme3)/经典(theme4) |
| allowShowHint | 显示提示 | boolean | true | 设置是否显示提示 |
| allowShowLegend | 显示图例 | boolean | true | 设置是否显示图例 |
| legendName | 图例别名 | string | '' | 修改后图例名字会从"指标"改为"别名" |
| xAxisTitle | X轴标题 | string | X轴标题 | 设置x轴标题 |
| showXAxisLine | 显示X轴轴线 | boolean | true | 设置是否显示X轴轴线 |
| showXAxisLabel | 显示X轴文字标签 | boolean | true | 设置是否显示X轴文字标签 |
| xAxisLabelRotate | X轴文字标签方向 | string | '0' | 横向(0)/纵向(90)/左倾斜(45)/右倾斜(-45) |
| yAxisTitle | Y轴标题 | string | Y轴标题 | 设置Y轴标题 |
| showYAxisLine | 显示Y轴轴线 | boolean | true | 设置是否显示Y轴轴线 |
| showYAxisLabel | 显示Y轴数值标签 | boolean | true | 设置是否显示Y轴数值标签 |
| titleFontStyle | 标题文字字体风格 | string | normal | 正常(normal)/斜体(italic) |
| allowDownload | 允许下载 | boolean | true | 允许用户设置保存图片 |
| formatter | 标签内容格式器 | string | - | 标签内容格式器, 支持用 
 换行 |

#### 事件 (Events)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| clickItem | 点击节点 | event (string) | 点击节点时触发 |

#### 方法 (Methods)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| reload | 刷新 | [] | 刷新数据 |

---

### 通用图 (cw-echart-basic-view)

#### 属性 (Attrs)
| 名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| options | 配置项 | object \| string | '' | ECharts option 配置项 |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据集对象或者返回数据集的逻辑 |
| formatter | 标签内容格式器 | string | - | 标签内容格式器, 支持用 
 换行 |
| autoplay | 是否自动播放 | string | - | 开启后触发轮播高亮 |
| delay-time | 自动播放延迟时间 | number | - | 仅在自动播放情况下有效 |

#### 事件 (Events)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| clickItem | 点击节点 | event (string) | 点击节点时触发 |
| highlight | 高亮节点 | event (number) | 高亮节点触发，返回当前激活的节点下标 |

#### 方法 (Methods)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| reload | 刷新 | [] | 刷新数据 |

---

### 折线图 (cw-echart-line-view)

#### 属性 (Attrs)
| 名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据集对象或者返回数据集的逻辑 |
| data-schema | 数据类型 | schema | - | 数据类型配置 |
| undefinedToZero | 空值处理规则 | string | empty | 转换 undefined/null 为0(zero)或空距(empty) |
| initialLoad | 初始加载 | boolean | true | 是否在初始时立即加载 |
| xAxis | 维度 | string | '' | 设置统计类别 |
| yAxis | 度量 | string | '' | 设置统计值 |
| title | 图表标题 | string | 标题 | 设置图表标题 |
| axisSplitLine | 坐标系网格线 | string | horizontal | 无/水平/垂直/全部 |
| axisSplitLineType | 网格线线型 | string | solid | 实线/虚线/点线 |
| theme | 配色方案 | string | theme1 | 科技/清新/淡雅/经典 |
| labelPosition | 数据标签位置 | string | top | 上/下/左/右/居中/无 |
| allowShowHint | 显示提示 | boolean | true | 是否显示提示 |
| allowShowLegend | 显示图例 | boolean | true | 是否显示图例 |
| legendName | 图例别名 | string | '' | 修改图例显示名称 |
| areaFilled | 区域填充 | boolean | false | 是否填充折线下方区域 |
| lineType | 线条类型 | string | solid | 线条类型(solid/dotted/dashed) |
| lineStyleSmooth | 线条样式 | string | normal | 基础(normal)/平滑(smooth) |
| lineStyleSymbol | 线条标记 | string | emptyCircle | 空心圆/圆形/矩形/三角形/菱形/水滴/箭头/无 |
| xAxisTitle | X轴标题 | string | X轴标题 | 设置X轴标题 |
| showXAxisLine | 显示X轴轴线 | boolean | true | 是否显示X轴轴线 |
| showXAxisLabel | 显示X轴文字标签 | boolean | true | 是否显示X轴文字标签 |
| xAxisLabelRotate | X轴标签方向 | string | '0' | 横向/纵向/左倾斜/右倾斜 |
| yAxisTitle | Y轴标题 | string | Y轴标题 | 设置Y轴标题 |
| showYAxisLine | 显示Y轴轴线 | boolean | true | 是否显示Y轴轴线 |
| showYAxisLabel | 显示Y轴数值标签 | boolean | true | 是否显示Y轴数值标签 |
| titleFontStyle | 标题文字风格 | string | normal | 正常/斜体 |
| allowDownload | 允许下载 | boolean | true | 是否允许保存图片 |
| formatter | 标签内容格式器 | string | - | 支持 
 换行 |

#### 事件 (Events)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| clickItem | 点击节点 | event (string) | 点击节点时触发 |

#### 方法 (Methods)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| reload | 刷新 | [] | 刷新数据 |

---

### 饼图 (cw-echart-pie-view)

#### 属性 (Attrs)
| 名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据集对象或者返回数据集的逻辑 |
| data-schema | 数据类型 | schema | - | 数据类型配置 |
| undefinedToZero | 空值处理规则 | string | empty | 转换 undefined/null 为0或空距 |
| initialLoad | 初始加载 | boolean | true | 是否立即加载 |
| xAxis | 维度 | string | '' | 设置维度(统计类别) |
| yAxis | 度量 | string | '' | 设置度量（统计值） |
| title | 标题 | string | 标题 | 设置主标题 |
| theme | 配色方案 | string | theme1 | 配色方案选择 |
| showLabelName | 显示维度标签 | boolean | true | 是否显示维度名称 |
| showLabelValue | 显示数值标签 | boolean | true | 是否显示数值 |
| showLabelPercent | 显示占比标签 | boolean | true | 是否显示占比 |
| allowShowHint | 显示提示 | boolean | true | 是否显示提示 |
| allowShowLegend | 显示图例 | boolean | true | 是否显示图例 |
| legendPosition | 图例位置 | string | bottom | 上/下/左/右 |
| legendScroll | 图例类型 | string | normal | 普通(normal)/滚动(scroll) |
| pieType | 饼类型 | string | pie | 饼型(pie)/环型(circle)/半环形(semiCircle) |
| titleFontStyle | 标题文字风格 | string | normal | 正常/斜体 |
| allowDownload | 允许下载 | boolean | true | 是否允许保存图片 |
| formatter | 标签内容格式器 | string | - | 支持 
 换行 |

#### 事件 (Events)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| clickItem | 点击节点 | event (string) | 点击节点时触发 |

#### 方法 (Methods)
| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| reload | 刷新 | [] | 刷新数据 |