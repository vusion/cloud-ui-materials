# h5选择器组件 (cust_mobile_pickerson)

本组件库提供了一个功能丰富的 H5 选择器组件，旨在满足移动端环境下多样化的数据选择需求。支持单列选择、多列级联、列表模式、多选模式、分页加载以及强大的搜索筛选功能。

## 包含组件

- **cust-van-pickerson (选择器)**: 提供多个选项集合供用户选择，支持高度自定义的交互和外观设置。

## API 说明

### cust-van-pickerson (选择器)

#### 属性 (Attrs)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | V / List\<V\> | - | 选中值，支持双向同步。在多选模式下为列表类型 |
| dataSource | List\<T\> / Object | [{}, {}, {}, {}, {}, {}] | 数据源，可设置为数组或包含 list 和 total 的对象 |
| valueField | Function | item => item.value | 选项值的字段名 |
| textField | Function | item => item.text | 选项文本的字段名 |
| labelField | String | - | 左侧标题文本 |
| defaultIndex | Decimal | 0 | 默认选中项的索引 |
| isNew | Boolean | false | 是否使用新版外观 |
| pageable | Boolean | false | 是否开启分页加载更多 |
| pageSize | Decimal | 50 | 分页模式下的每页条数 |
| sorting | Object | { field: '', order: 'desc' } | 初始化排序字段和顺序 |
| filterable | Boolean | false | 是否支持筛选搜索 |
| matchMethod | Enum | 'includes' | 筛选匹配方式：'includes'(包括), 'startsWith'(匹配开头), 'endsWith'(匹配结尾) |
| type | Enum | 'picker' | 展现样式：'picker'(选择器), 'list'(列表) |
| placeholder | String | '请选择' | 占位提示文字 |
| title | String | '标题' | 工具栏标题内容 |
| confirmButtonText | String | '确认' | 确认按钮文字 |
| cancelButtonText | String | '取消' | 取消按钮文字 |
| visibleItemCount | Integer | 6 | 选择器模式下可见的选项个数 |
| inputAlign | Enum | - | 右侧内容对齐方式：'left', 'center', 'right' |
| showToolbar | Boolean | true | 是否显示工具栏 |
| multiple | Boolean | false | 是否支持多选 |
| enableSelectAll | Boolean | false | 多选模式下是否显示全选按钮 |
| enableSelectedCount | Boolean | false | 多选模式下是否显示已选中的项数 |
| closeOnClickOverlay | Boolean | false | 点击遮罩层是否关闭弹窗 |
| initialLoad | Boolean | true | 是否在组件初始化时立即加载数据 |
| readonly | Boolean | false | 是否设置为只读状态 |
| disabled | Boolean | false | 是否禁用组件 |
| preview | Boolean | false | 是否开启预览态 |
| page | Integer | - | 当前页数 |
| size | Integer | - | 当前分页大小 |
| filterText | String | - | 当前过滤搜索的文本 |

#### 事件 (Events)

| 名称 | 说明 |
| :--- | :--- |
| onConfirm | 点击完成按钮时触发，回调参数为当前选中值 |
| onCancel | 点击取消按钮时触发 |
| onChange | 选项发生改变时触发 |

#### 方法 (Methods)

| 名称 | 说明 |
| :--- | :--- |
| reload() | 重新加载数据源 |

#### 插槽 (Slots)

| 名称 | 说明 |
| :--- | :--- |
| slotOption | 自定义每一项选项的渲染内容 |
| slotTitle | 自定义工具栏标题内容 |
| slotPannelTitle | 自定义面板标题内容 |
| slotPickerTop | 自定义选择器顶部的内容区域 |
| slotPickerBottom | 自定义选择器底部的内容区域 |