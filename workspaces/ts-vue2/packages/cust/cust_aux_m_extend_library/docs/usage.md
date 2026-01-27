# cust_aux_m_extend_library 依赖库使用文档

## 依赖库介绍

奥克斯H5端依赖库

## 包含的组件和逻辑列表

### 组件

- **aux-van-cascader**：级联选择
- **aux-van-pickerson**：选择器

## 组件与逻辑功能说明

### aux-van-cascader

级联选择。可在页面中通过该组件实现对应展示或交互。

### aux-van-pickerson

选择器。可在页面中通过该组件实现对应展示或交互。

## API 说明

### aux-van-cascader

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | nasl.collection.List | - | 数据 |
| value | AuxVanCascaderOptions | - | 选中值 |
| filterText | nasl.core.String | - | 过滤文本 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| treeDisplay | nasl.core.Boolean | - | 左侧标题 |
| value | V | - | 值 |
| dataSource | total | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| textField | group | - | 文本字段名 |
| valueField | group | - | 值字段名 |
| parentField | group | - | 父级值字段名 |
| childrenField | group | - | 子级值字段名 |
| placeholder | nasl.core.String | - | 占位提示 |
| title | nasl.core.String | - | 顶部栏标题 |
| tabPlaceholder | nasl.core.String | - | 未选中提示文案 |
| inputAlign | group | - | 对齐方式 |
| filterable | nasl.core.Boolean | - | 开启搜索框 |
| closeOnClickOverlay | nasl.core.Boolean | - | 点击遮罩层后关闭 |
| clearable | nasl.core.Boolean | - | 可清除 |
| readonly | nasl.core.Boolean | - | 只读 |
| disabled | nasl.core.Boolean | - | 禁用 |

### aux-van-pickerson

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | AuxVanPickersonOptions | - | 选中值 |
| data | nasl.collection.List | - | 数据 |
| page | nasl.core.Integer | - | 当前页数 |
| size | nasl.core.Integer | - | 当前页数 |
| filterText | nasl.core.String | - | 过滤文本 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| preview | nasl.core.Boolean | - | 预览 |
| isNew | nasl.core.Boolean | - | 左侧标题 |
| value | M | - | 值 |
| dataSource | total | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| textField | group | - | 文本字段 |
| valueField | group | - | 值字段 |
| sorting | field | - | 初始化排序规则 |
| pageable | nasl.core.Boolean | - | 分页加载更多 |
| type | group | - | 列表样式 |
| placeholder | nasl.core.String | - | 占位提示 |
| title | nasl.core.String | - | 工具栏标题 |
| inputAlign | group | - | 对齐方式 |
| showToolbar | nasl.core.Boolean | - | 显示工具栏 |
| converter | group | - | 转换器 |
| filterable | nasl.core.Boolean | - | 支持筛选 |
| multiple | nasl.core.Boolean | - | 可多选 |
| closeOnClickOverlay | nasl.core.Boolean | - | 点击遮罩层后关闭 |
| initialLoad | nasl.core.Boolean | - | 初始加载 |
| readonly | nasl.core.Boolean | - | 只读 |
| disabled | nasl.core.Boolean | - | 禁用 |
| clearable | nasl.core.Boolean | - | 可清除 |
| preview | nasl.core.Boolean | - | 自动清除筛选 |

#### 方法

- **reload**：重新加载数据
- **open**：打开选择器
- **close**：关闭选择器

