# 艾大力依赖库 (adl)

## 依赖库介绍
艾大力依赖库（adl）是一套为业务场景定制的组件库，旨在提供高效、易用的排班管理工具。该库主要解决排班场景下的数据展示、编辑以及节假日可视化需求，通过预设的逻辑处理，简化开发者在复杂表格交互中的实现成本。

## 组件列表
- **schedule-table (排班表格)**: 核心组件，支持按月度展示人员排班，提供便捷的排班选择器，并支持节假日高亮。 

## 逻辑列表
暂无逻辑列表。

## 组件 API 说明

### schedule-table (排班表格)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| year | nasl.core.Integer | 2025 | 年份信息 |
| month | nasl.core.Integer | 1 | 月份信息 |
| names | nasl.collection.List<nasl.core.String> | [] | 姓名列表，例如：["阿狸","提莫","盖伦"] |
| value | nasl.collection.List<any> | [] | 排班表格数据，形如二级嵌套数组 |
| options | nasl.collection.List<any> | [] | 排班选择器参数。支持配置 label（标签）、value（值）和 highlight（高亮颜色） |
| nightShiftValue | nasl.core.String | '夜班' | 指定夜班对应的文本内容 |
| restAfterNightShiftValue | nasl.core.String | '休息' | 指定休息对应的文本内容 |
| holidays | nasl.collection.Map<nasl.core.String, nasl.core.String> | {} | 节假日提示映射，格式为 { "2025-05-01": "劳动节" } |
| holidayColor | nasl.core.String | '' | 节假日表头的背景高亮颜色，支持 CSS 颜色值 |

#### 事件 (Events)
| 名称 | 类型 | 说明 |
| :--- | :--- | :--- |
| onInput | (event: nasl.collection.List<nasl.collection.List<nasl.core.String>>) => void | 当排班表格中的值发生变化时触发 |

#### 方法 (Methods)
暂无公开调用方法。