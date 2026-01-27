# cw_dynamic_form_library 依赖库使用文档

## 依赖库介绍

动态表单

## 包含的组件和逻辑列表

### 组件

- **cw-antd-auto-complete**：自动完成
- **cw-antd-cascader**：联级选择
- **cw-antd-checkbox**：多选框
- **cw-antd-checkbox-img**：图片多选框
- **cw-antd-checkbox-with-input**：带输入框的多选框
- **cw-antd-custom-render-view**：自定义渲染视图
- **cw-antd-custom-table**：自定义表格
- **cw-antd-custom-view**：设计器
- **cw-antd-date-picker**：日期选择器
- **cw-antd-grid**：栅格布局
- **cw-antd-image**：图片
- **cw-antd-input**：输入框
- **cw-antd-input-number**：数字输入框
- **cw-antd-radio**：单选框
- **cw-antd-radio-img**：图片单选框
- **cw-antd-range-picker**：日期范围选择器
- **cw-antd-select**：下拉框
- **cw-antd-switch**：开关
- **cw-antd-text**：文本
- **cw-antd-textarea**：多行输入
- **cw-antd-time-picker**：时间选择器
- **cw-antd-upload**：文件上传
- **cw-gx-input-view**：GX输入视图
- **dragable-designer**：可拖拽设计器

## 组件与逻辑功能说明

### cw-antd-auto-complete

自动完成。可在页面中通过该组件实现对应展示或交互。

### cw-antd-cascader

联级选择。可在页面中通过该组件实现对应展示或交互。

### cw-antd-checkbox

多选框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-checkbox-img

图片多选框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-checkbox-with-input

带输入框的多选框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-custom-render-view

自定义渲染视图。可在页面中通过该组件实现对应展示或交互。

### cw-antd-custom-table

自定义表格。可在页面中通过该组件实现对应展示或交互。

### cw-antd-custom-view

设计器。可在页面中通过该组件实现对应展示或交互。

### cw-antd-date-picker

日期选择器。可在页面中通过该组件实现对应展示或交互。

### cw-antd-grid

栅格布局。可在页面中通过该组件实现对应展示或交互。

### cw-antd-image

图片。可在页面中通过该组件实现对应展示或交互。

### cw-antd-input

输入框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-input-number

数字输入框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-radio

单选框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-radio-img

图片单选框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-range-picker

日期范围选择器。可在页面中通过该组件实现对应展示或交互。

### cw-antd-select

下拉框。可在页面中通过该组件实现对应展示或交互。

### cw-antd-switch

开关。可在页面中通过该组件实现对应展示或交互。

### cw-antd-text

文本。可在页面中通过该组件实现对应展示或交互。

### cw-antd-textarea

多行输入。可在页面中通过该组件实现对应展示或交互。

### cw-antd-time-picker

时间选择器。可在页面中通过该组件实现对应展示或交互。

### cw-antd-upload

文件上传。可在页面中通过该组件实现对应展示或交互。

### cw-gx-input-view

GX输入视图。可在页面中通过该组件实现对应展示或交互。

### dragable-designer

可拖拽设计器。可在页面中通过该组件实现对应展示或交互。

## API 说明

### cw-antd-auto-complete

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 选中值 |
| placeholder | nasl.core.String | - | 输入框提示 |

### cw-antd-cascader

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |

### cw-antd-checkbox

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |

### cw-antd-checkbox-img

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |

### cw-antd-checkbox-with-input

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |

### cw-antd-custom-render-view

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-custom-table

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-custom-view

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 动态内容 |
| customComponentList | nasl.core.String | - | 自定义表单信息 |

#### 方法

- **handleFormSubmit**：提交表单
- **handleShowFormSetting**：显示表单设置

### cw-antd-date-picker

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |
| format | nasl.core.String | - | 格式 |

### cw-antd-grid

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rows | nasl.core.Integer | - | 行数 |
| columns | nasl.core.Integer | - | 列数 |

### cw-antd-image

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-input

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-input-number

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-radio

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |
| viewType | title | - | 视图类型 |
| direction | title | - | 方向 |
| otherData | nasl.core.String | - | 其他选项 |
| disabled | nasl.core.Boolean | - | 禁用 |
| linkage | nasl.core.Boolean | - | 联动 |

### cw-antd-radio-img

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |

### cw-antd-range-picker

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-select

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| value | nasl.core.String | - | 值 |
| placeholder | nasl.core.String | - | 占位符 |

### cw-antd-switch

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.Boolean | - | 值 |

### cw-antd-text

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |
| cwStyle | nasl.core.String | - | 样式 |

### cw-antd-textarea

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-time-picker

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-antd-upload

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |

### cw-gx-input-view

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | nasl.core.String | - | 值 |
| custom | nasl.core.String | - | 自定义 |

### dragable-designer

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | nasl.core.String | - | 内容 |
| type | - | - | 类型 |

