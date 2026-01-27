# yun_shang 依赖库使用文档

## 依赖库介绍

云商呼入智能体

## 包含的组件和逻辑列表

### 组件

- **yunshang-u-date-picker**：日期选择
- **yunshang-u-date-time-picker**：日期时间选择
- **yunshang-u-drawer**：抽屉
- **yunshang-u-input**：单行输入
- **yunshang-u-list-components**：组件列表

## 组件与逻辑功能说明

### yunshang-u-date-picker

日期选择。可在页面中通过该组件实现对应展示或交互。

### yunshang-u-date-time-picker

日期时间选择。可在页面中通过该组件实现对应展示或交互。

### yunshang-u-drawer

抽屉。可在页面中通过该组件实现对应展示或交互。

### yunshang-u-input

单行输入。可在页面中通过该组件实现对应展示或交互。

### yunshang-u-list-components

组件列表。可在页面中通过该组件实现对应展示或交互。

## API 说明

### yunshang-u-date-picker

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | YunshangUDatePickerOptions | - | 值 |
| startDate | YunshangUDatePickerOptions | - | 起始值 |
| endDate | YunshangUDatePickerOptions | - | 结束值 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| opened | nasl.core.Boolean | - | 打开 |
| range | nasl.core.Boolean | - | 区间选择 |
| picker | group | - | 日期类型 |
| range | nasl.core.Boolean | - | 区间选择 |
| minDate | nasl.core.String \| nasl.core.Integer \| nasl.core.Date \| nasl.core.DateTime | - | 最小日期值 |
| maxDate | nasl.core.String \| nasl.core.Integer \| nasl.core.Date \| nasl.core.DateTime | - | 最大日期值 |
| yearDiff | nasl.core.Decimal \| nasl.core.Integer | - | 时间格式 |
| advancedFormatEnable | nasl.core.Boolean | - | 高级格式化 |
| autofocus | nasl.core.Boolean | - | 自动获取焦点 |
| placeholder | nasl.core.String | - | 占位符 |
| alignment | group | - | 日历弹窗对齐方式 |
| converter | group | - | 转换器 |
| preIcon | nasl.core.String | - | 前缀图标 |
| suffixIcon | nasl.core.String | - | 后缀图标 |
| appendTo | group | - | 弹出层位置依据 |
| showShortCuts | nasl.core.Boolean | - | 显示快捷选项 |
| clearable | nasl.core.Boolean | - | 可清除 |
| emptyValueIsNull | nasl.core.Boolean | - | 空值为null |
| readonly | nasl.core.Boolean | - | 只读 |
| disabled | nasl.core.Boolean | - | 禁用 |
| preview | nasl.core.Boolean | - | 预览 |
| opened | nasl.core.Boolean | - | 弹出状态 |
| width | group | - | 宽度 |
| height | title | - | 高度 |

#### 方法

- **close**：关闭日期选择器

### yunshang-u-date-time-picker

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.ui.UDatePickerOptions | - | 值 |
| startDate | nasl.ui.UDatePickerOptions | - | 起始值 |
| endDate | nasl.ui.UDatePickerOptions | - | 结束值 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| opened | nasl.core.Boolean | - | 打开 |
| range | nasl.core.Boolean | - | 区间选择 |
| minDate | nasl.core.String \| nasl.core.Decimal \| nasl.core.Date \| nasl.core.DateTime | - | 最小日期时间值 |
| maxDate | nasl.core.String \| nasl.core.Decimal \| nasl.core.Date \| nasl.core.DateTime | - | 最大日期时间值 |
| advancedFormatEnable | nasl.core.Boolean | - | 高级格式化 |
| placeholder | nasl.core.String | - | 占位符 |
| autofocus | nasl.core.Boolean | - | 自动获取焦点 |
| showRightNowButton | nasl.core.Boolean | - | 此刻按钮 |
| showFooterButton | nasl.core.Boolean | - | 取消/确定按钮 |
| converter | group | - | 转换器 |
| preIcon | nasl.core.String | - | 前缀图标 |
| suffixIcon | nasl.core.String | - | 后缀图标 |
| appendTo | group | - | 弹出层位置依据 |
| showShortCuts | nasl.core.Boolean | - | 显示快捷选项 |
| clearable | nasl.core.Boolean | - | 可清除 |
| emptyValueIsNull | nasl.core.Boolean | - | 空值为null |
| opened | nasl.core.Boolean | - | 弹出状态 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| width | group | - | 宽度 |
| height | title | - | 高度 |

#### 方法

- **close**：关闭日期时间选择器

### yunshang-u-drawer

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | nasl.core.Boolean | - | 显示状态 |
| placement | group | - | 抽屉位置 |
| showHead | nasl.core.Boolean | - | 显示顶部栏 |
| showFoot | nasl.core.Boolean | - | 显示底部栏 |
| maskClosable | nasl.core.Boolean | - | 点击遮罩关闭 |
| visible | nasl.core.Boolean | - | 显示状态 |
| size | group | - | 尺寸 |
| drawerWidth | nasl.core.Integer | - | 宽度 |

#### 方法

- **open**：打开抽屉
- **close**：关闭抽屉

### yunshang-u-input

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | YunshangUInputOptions | - | 输入值 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| type | group | - | 最小长度 |
| value | nasl.core.String | - | 值 |
| emptyValueIsNull | nasl.core.Boolean | - | 空值为null |
| placeholder | nasl.core.String | - | 占位符 |
| maxlength | nasl.core.Integer | - | 最大字符数 |
| autofocus | nasl.core.Boolean | - | 自动获取焦点 |
| prefix | nasl.core.String | - | 前缀图标 |
| suffix | nasl.core.String | - | 后缀图标 |
| clearable | nasl.core.Boolean | - | 可清除 |
| password | nasl.core.Boolean | - | 显示状态 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| disabled | nasl.core.Boolean | - | 禁用 |
| width | group | - | 宽度 |
| height | title | - | 高度 |

#### 方法

- **focus**：让输入框获取焦点。
- **blur**：让输入框失去焦点。
- **clear**：清空输入框。

### yunshang-u-list-components

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | nasl.collection.List | - | 数据 |
| dataSource | list | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| idField | group | - | 唯一字段 |
| equalWidth | nasl.core.Boolean | - | 均分宽度 |

#### 方法

- **reload**：清除缓存，重新加载

