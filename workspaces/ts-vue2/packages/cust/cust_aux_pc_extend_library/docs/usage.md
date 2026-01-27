# 奥克斯PC端依赖库 (cust_aux_pc_extend_library)

## 依赖库介绍

`cust_aux_pc_extend_library` 是专为奥克斯 PC 端业务场景定制的依赖库。它扩展了标准 UI 组件库的功能，旨在提供更加符合业务逻辑和视觉规范的交互组件，帮助开发者快速构建功能完善的级联选择等复杂交互界面。

## 包含组件列表

### 组件
- **aux-u-cascader (级联选择)**: 用于处理具有层级关系的数据，支持多级选择、搜索筛选、自定义字段映射等高级功能。

## 包含逻辑列表

（无）

## API 说明

### aux-u-cascader (级联选择)

#### 属性 (Attributes)

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| dataSource | 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑 | nasl.collection.List<T> \| { list: nasl.collection.List<T>; total: nasl.core.Integer; } | - |
| dataSchema | 数据源返回的数据结构的类型 | T | - |
| field | 集合的元素类型中，用于显示文本的属性名称 | (item: T) => any | item => item.text |
| valueField | 集合的元素类型中，用于标识选中值的属性 | (item: T) => V | item => item.value |
| childrenField | 树形数据子节点字段名 | (item: T) => nasl.collection.List<any> | item => item.children |
| parentField | 当数据源为平铺数据时自动生成级联数据的节点字段名 | (item: T) => any | - |
| value | 选择器的值 | any | - |
| filterable | 设置是否可以筛选，开启将会显示搜索框 | nasl.core.Boolean | false |
| filterHightlighterColor | 设置筛选文字高亮颜色 | nasl.core.String | - |
| placeholder | 为空时显示的占位符文本 | nasl.core.String | '请选择' |
| showFinalValue | 定义是否显示完整的路径，true 时只显示最后一项 | nasl.core.Boolean | false |
| autofocus | 设置是否自动获取焦点 | nasl.core.Boolean | false |
| trigger | 触发方式，可选：点击 (click)、悬浮 (hover) | 'click' \| 'hover' | 'click' |
| clearable | 设置是否可以清空搜索框 | nasl.core.Boolean | false |
| clearIcon | 设置清空图标 | nasl.core.String | - |
| prefixIcon | 设置前缀图标 | nasl.core.String | - |
| suffixIcon | 设置后缀图标 | nasl.core.String | 'bottom-arrow' |
| menuExpandIcon | 设置菜单展开图标 | nasl.core.String | - |
| loadingIcon | 设置加载图标 | nasl.core.String | 'loading' |
| emptyValueIsNull | 清空值时是否设置为 null | nasl.core.Boolean | true |
| disabled | 置灰显示，且禁止任何交互 | nasl.core.Boolean | false |
| opened | 弹出状态，分为“True(弹出)/False(关闭)” | nasl.core.Boolean | false |
| width | 设置级联框宽度大小 | 'full' \| 'huge' \| 'large' \| 'medium' \| 'normal' \| 'small' \| 'mini' | 'normal' |
| popperWidth | 设置下拉列表宽度 | nasl.core.String | - |
| height | 设置级联框高度大小 | 'full' \| 'huge' \| 'large' \| 'medium' \| 'normal' \| 'small' \| 'mini' | 'normal' |
| preview | 是否显示预览态 | nasl.core.Boolean | false |
| emptyText | 暂无数据状态显示的提示文案 | nasl.core.String | '暂无数据' |

#### 方法 (Methods)

| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| open | 弹出实例。 | - |
| close | 关闭实例。 | - |
| clear | 清空输入框。 | - |
| reload | 重新加载数据。 | - |

#### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| onInput | 选择某一项时触发 | event: V |
| onSelect | 选择某一项时触发 | event: { value: V; values: nasl.collection.List<V>; items: nasl.collection.List<T> } |
| onFocus | 获得焦点时触发 | event: { cancelBubble: nasl.core.Boolean; detail: nasl.core.String; ... } |
| onBlur | 失去焦点时触发 | event: { cancelBubble: nasl.core.Boolean; detail: nasl.core.String; ... } |
| onClear | 清空后触发 | event: any |
| onBeforeLoad | 加载前触发 | event: any |
| onLoad | 加载后触发 | event: any |