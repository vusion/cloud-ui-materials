# gantt_library 甘特图

## 依赖库介绍

`gantt_library` 是一款为 Codewave 低代码平台设计的甘特图组件库。本库旨在提供直观的任务进度与项目计划可视化方案，通过高度可配置的甘特图组件，帮助用户在应用中展示任务层级、时间跨度、进度比例以及图例说明等关键信息。

## 包含组件

- **lcap-gantt（甘特图）**：支持数据绑定、层级展示、日期视图切换（日/周/月/年）以及自定义图例样式的核心甘特图组件。

## 包含逻辑

暂无：本依赖库当前版本仅包含 UI 组件，未定义独立的逻辑模块。

## API 说明

### lcap-gantt (甘特图)

#### 属性 (Attributes)

| 名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| ganttTableConfig | 甘特表格配置 | Array<Item> \| Function \| object \| DataSource | - | 配置甘特左侧表格 |
| gridWidth | 甘特表格最大宽度 | number | null | 配置甘特左侧表格最大宽度 |
| data-source | 数据源 | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 甘特的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | 数据类型 | schema | - | 集合类型每一元素的数据类型 |
| text-field | 文本字段 | string | "" | 设置泳道图文本字段，用于显示泳道图上的文本 |
| start-field | 开始日期字段 | string | "" | 设置泳道图开始日期字段 |
| end-field | 结束日期字段 | string | "" | 设置泳道图结束日期字段，和持续时间字段二选一，同时设置以结束日期字段为准 |
| duration-field | 持续时间字段 | string | "" | 设置泳道图持续时间字段，和结束日期字段二选一，同时设置以结束日期字段为准 |
| progress-field | 进度字段 | string | "" | 设置泳道图进度字段，以小数形式计算，如0.5表示50% |
| id-field | 值字段 | string | "" | 设置泳道图值字段，用于设置泳道图的层级关系 |
| parent-field | 父级字段 | string | "" | 设置泳道图父级字段，用于设置泳道图的层级关系 |
| color-field | 数据颜色字段 | string | "" | 设置泳道图数据颜色字段，支持hex、英文名称格式 |
| icon-field | 图标字段 | string | "" | 设置数据列表图标字段，仅会在文本字段上生效，支持配置png,jpg格式的图片链接 |
| showToday | 显示今日标记线 | boolean | true | 设置是否显示今日标记线 |
| jumpWeekend | 跳过周末 | boolean | false | 设置是否跳过周末，仅适用于配置持续时间字段时生效 |
| showFunctionBar | 显示功能栏 | boolean | false | 设置是否显示默认功能栏 |
| showTooltip | 显示Tooltip | boolean | true | 设置是否显示Tooltip |
| taskView | 切换日期视图 | string | day | 切换日期视图（day: 日, week: 周, month: 月, year: 年） |
| dayDateScale | 显示日期格式 | string | "" | 设置展示日期格式，例如 %m月%d日星期%D |
| markers | 图例信息 | Array<Item> | [{}, {}, {}] | 给指定时间范围添加背景色，形如ArrayList<{start, end, color, label}> |
| isShowLegend | 是否展示图例 | boolean | true | 是否展示左上角图例 |
| ganttStartDate | 横道图标尺开始日期 | string | "" | 设置甘特开始显示的日期 |
| ganttEndDate | 横道图标尺结束日期 | string | "" | 设置甘特结束显示的日期 |
| showTooltips | 是否展示tooltips | boolean | true | 鼠标悬浮是否展示tooltips |

#### 方法 (Methods)

| 名称 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| load | 重新加载 | [] | 重新加载甘特 |
| changeToday | 立刻定位到今日标记线 | [] | 立刻定位到今日标记线 |

#### 事件 (Events)

| 名称 | 标题 | 说明 |
| :--- | :--- | :--- |
| click | 点击 | 点击时触发的事件 |