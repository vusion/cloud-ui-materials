# export_excel 依赖库使用文档

## 依赖库介绍

导出excel

## 包含的组件和逻辑列表

### 组件

- **ex-u-table-view**：数据表格

## 组件与逻辑功能说明

### ex-u-table-view

数据表格。可在页面中通过该组件实现对应展示或交互。

## API 说明

### ex-u-table-view

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | nasl.collection.List | - | 数据 |
| total | nasl.core.Integer | - | 数据总数 |
| size | ExUTableViewOptions | - | 分页大小 |
| page | ExUTableViewOptions | - | 当前页数 |
| sort | ExUTableViewOptions | - | 排序属性 |
| order | ExUTableViewOptions | - | 排序方式 |
| value | V | - | 单选值 |
| values | nasl.collection.List | - | 多选值 |
| disabled | nasl.core.Boolean | - | 禁用 |
| readonly | nasl.core.Boolean | - | 只读 |
| dataSource | list | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| pagination | nasl.core.Boolean | - | 数据源参数 |
| sorting | field | - | 初始化排序规则 |
| valueField | group | - | 排序 |
| value | V | - | 单选值 |
| values | nasl.collection.List | - | 多选值 |
| treeDisplay | nasl.core.Boolean | - | 树形模式 |
| title | nasl.core.String | - | 表格标题 |
| showHead | nasl.core.Boolean | - | 显示表格头部 |
| stickHead | nasl.core.Boolean | - | 表格头部吸顶 |
| thEllipsis | nasl.core.Boolean | - | 表头文本过长省略 |
| ellipsis | nasl.core.Boolean | - | 内容区文本过长省略 |
| footerCalcShow | nasl.core.Boolean | - | 显示表尾计算行 |
| footerCalcText | nasl.core.String | - | 表尾计算行第一列文本 |
| footerCalcType | group | - | 表尾计算行功能选项 |
| footerCalcDeDuplicate | nasl.core.Boolean | - | 是否去重 |
| footerCalcFormater | group | - | 表尾计算行格式设置 |
| selectable | nasl.core.Boolean | - | 悬浮高亮行 |
| cancelable | nasl.core.Boolean | - | 可取消 |
| draggable | nasl.core.Boolean | - | 表格内可拖拽 |
| acrossTableDrag | nasl.core.Boolean | - | 表格间可拖拽 |
| accordion | nasl.core.Boolean | - | 手风琴模式 |
| resizable | nasl.core.Boolean | - | 可调整列宽 |
| resizeRemaining | group | - | 调整列宽效果 |
| configurable | nasl.core.Boolean | - | 配置展示列 |
| nativeScroll | nasl.core.Boolean | - | 使用原生滚动条 |
| sortTrigger | group | - | 排序触发方式 |
| initialLoad | nasl.core.Boolean | - | 初始即加载 |
| designerMode | group | - | 加载状态设置 |
| readonly | nasl.core.Boolean | - | 只读 |
| disabled | nasl.core.Boolean | - | 禁用 |
| titleAlignment | group | - | 标题对齐方式 |
| boldHeader | nasl.core.Boolean | - | 表头加粗 |
| line | nasl.core.Boolean | - | 显示边框 |
| striped | nasl.core.Boolean | - | 斑马条纹 |
| defaultColumnWidth | nasl.core.String \| nasl.core.Decimal | - | 默认列宽度 |
| rowStyle | backgroundColor | - | 表格行动态样式 |
| field | group | - | 格式器 |
| sortable | nasl.core.Boolean | - | 排序 |
| fixed | nasl.core.Boolean | - | 双击处理函数 |
| thEllipsis | nasl.core.Boolean | - | 表头文本过长省略 |
| ellipsis | nasl.core.Boolean | - | 内容区文本过长省略 |
| hidden | nasl.core.Boolean | - | 隐藏列 |
| width | nasl.core.String \| nasl.core.Decimal \| nasl.core.Integer | - | 列宽度 |
| colSpan | nasl.core.Integer | - | 合并列数 |
| autoRowSpan | nasl.core.Boolean | - | 自动合并相同数据 |
| dataSource | list | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| value | nasl.collection.List | - | 值 |
| showFooter | nasl.core.Boolean | - | 确定/取消按钮 |
| data | ExUTableViewColumnDynamicOptions | - | 数据 |
| dataSource | list | - | 数据源 |
| dataSchema | T1 | - | 数据类型 |
| sortable | nasl.core.Boolean | - | 排序 |
| fixed | nasl.core.Boolean | - | 固定列 |
| thEllipsis | nasl.core.Boolean | - | 表头文本过长省略 |
| ellipsis | nasl.core.Boolean | - | 内容区文本过长省略 |
| hidden | nasl.core.Boolean | - | 隐藏列 |
| width | nasl.core.String \| nasl.core.Decimal \| nasl.core.Integer | - | 列宽度 |
| slotDefault | title | - | 表格标题 |
| expandIcon | nasl.core.String | - | 展开时图标 |
| collapseIcon | nasl.core.String | - | 关闭时图标 |

#### 方法

- **reload**：清除缓存，重新加载
- **loadTo**：保持页码，重新加载
- **getFields**：获取所有表格列的 field
- **setAllTreeNodeExpanded**：树形表格展开/折叠所有节点
- **setTreeNodeExpanded**：树形表格展开
- **exportExcel**：添加一行数据
- **resetEdit**：重制编辑列的编辑状态为非编辑态

