# 股权架构图 (cw_equity_chart)

本依赖库提供与「股权架构图」相关的组件与逻辑，可在 Codewave 低代码平台中引用。主要用于可视化展示企业间的股权穿透关系、持股比例及架构层级，方便用户直观地查看和分析复杂的股权结构。

## 包含的组件和逻辑列表

### 组件
- **cw-equity-chart（股权架构图）**：核心展示组件，用于渲染股权架构树状图或图表，支持节点点击交互、多语言切换及导出权限控制。

### 逻辑
- 暂无：本依赖库目前未包含独立的逻辑函数。

## API 说明

### cw-equity-chart

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| isShowLegend | Boolean | true | 是否展示图例 |
| isOnSearch | Boolean | false | 是否是查询状态 |
| nodeData | Object | {} | 渲染图表的核心数据对象 |
| isExportAuth | Boolean | true | 是否拥有导出图表图片的权限 |
| lang | string | 'zh-cn' | 语言切换，支持中文、英文等设置 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| change | $event.param1 (string), $event.param2 (number) | 组件内容修改时触发 |
| node-click | id (string), name (string) | 点击架构图中的节点时触发，返回公司ID与公司名称 |

#### 方法 (Methods)
暂无：该组件目前未提供可供外部调用的实例方法。