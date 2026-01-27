# cw_calendar_library

## 依赖库介绍

cw_calendar_library 是一款专注于日历展示与数据管理的依赖库。它旨在解决复杂的日历排期需求，提供灵活的数据绑定机制（支持主子数据源关联）以及丰富的样式配置选项。该库特别适用于需要展示多维度日期信息（如人员排班、设备占用情况等）的业务场景，并支持自定义单元格内容的样式扩展。

## 包含组件

- **cw-calendar-table（日历表格）**: 提供了一个多功能的日历展示网格，支持跨年份/月份的数据加载、主子数据关联展示、分页以及自定义单元格模板。

## 包含逻辑

- 暂无逻辑列表。

## API 说明

### cw-calendar-table (日历表格)

#### 属性 (Attributes)

| 属性名 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| data-source-parent | 主数据源 | Array<Item> \| Function \| object | [{}, {}, {}] | 日历表格主数据源，数组方式表示直接的数据，函数需要返回一个 Promise |
| data-source | 子数据源 | Array<Item> \| Function \| object | [{}, {}, {}] | 日历表格子数据源，数组方式表示直接的数据，函数需要返回一个 Promise |
| first-title | 表格首项标题 | string | 姓名 | 表格第一项内容的标题 |
| first-field | 表格首项字段 | string | parent.name | 表格第一项内容的在 data-source 中的标识 |
| parent-key | 主关键字段 | String | parent.name | 主数据源中的关键字段，用来将主/子数据源的数据关联 |
| child-key | 子关键字段 | String | child.name | 子数据源中的关键字段，用来将主/子数据源的数据关联 |
| page-size | 每页条数 | string \| number | 20 | 每页条数 |
| data-schema | 数据类型 | schema | - | 日历表格中每项的数据类型 |
| start-key | 数据内表示开始时间的字段 | string | child.startTime | 数据内表示开始时间的字段 |
| end-key | 数据内表示结束时间的字段 | string | child.endTime | 数据内表示结束时间的字段 |
| min-date | 最小日期 | Date \| string \| number | null | 最小日期，默认 5 年前 |
| max-date | 最大日期 | Date \| string \| number | null | 最大日期，默认 4 年后 |
| width | 表格项宽度 | string \| number | 48 | 表格每一项内容的宽度，默认 48 表示 '48px' |
| first-width | 表格首项宽度 | string \| number | 64 | 表格首项宽度，默认 64 表示 '64px' |

#### 事件 (Events)

| 事件名 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| change | 年份日期改变时 | $event: string | 年份或日期发生变化时触发的事件 |

#### 方法 (Methods)

| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| load | 带缓存地加载数据 | - |
| reload | 清除缓存并重新加载数据 | - |
| getSelectYear | 获取当前选择的年份 | - |
| getSelectMonth | 获取当前选择的月份 | - |

#### 插槽 (Slots)

| 插槽名 | 说明 |
| :--- | :--- |
| default | 自定义选项的结构和样式。提供 `current` 作用域参数，包含当前项的数据信息。 |