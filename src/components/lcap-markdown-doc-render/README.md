<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapMarkdownDocRender 文档渲染组件

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

**Other**

渲染Markdown文档的组件

## 示例
### 基本用法

``` vue
<template>
  <lcap-markdown-doc-render :text="text"></lcap-markdown-doc-render>
</template>

<script>
export default {
  data() {
    return {
      text: undefined
    }
  },
  created() {
    setTimeout(() => {
      this.text = '# 选择框\n\n下拉选择框，支持单选、多选、搜索等功能\n\n## 概念说明\n\n### 属性\n\n>  组件通用属性请参见[组件通用说明](99.参考/40.页面IDE/30.页面组件/05.PC页面基础组件/000.组件通用说明.md)。\n\n#### 选择框\n- 值：当前选择的值。\n- 数据源：支持动态绑定集合类型变量（List\\<T>）或输出参数为集合类型的逻辑。\n\n  > 树选择器支持静态添加固定子项使用，该情况下，无需绑定数据源。\n\n- 数据类型：该属性为只读状态，当数据源动态绑定集合List\\<T>后，会自动识别T的类型并进行展示。\n\n- 文本字段：集合的元素类型中，用于显示文本的属性名称，支持自定义变更。\n\n- 值字段：集合的元素类型中，用于标识选中值的属性，支持自定义变更。\n\n- 文本描述字段：集合的元素类型中，用于显示文本下方辅助描述的属性名称。\n- 多选：是否可以多选。\n- 转换器：将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。\n- 占位符：选择框无内容时的提示信息，支持自定义编辑，默认为请选择。\n- 展示暂无数据提示：是否在数据为空时展示暂无数据的文字提示。\n- 暂无数据文字：暂无数据时的文字。\n- 为空自动禁用：没有数据时，自动禁用。\n- 初始时加载：是否在初始时立即加载。\n- 分页加载更多：是否使用分页功能加载更多。\n- 后端分页：控制是否使用后端分页，不支持自定义分页条数，默认为50条。\n- 清除按钮：控制是否显示清除按钮，支持一键清除所选内容。\n- 可筛选：开启后选择框可输入文本进行筛选。\n- 后端筛选：是否使用后端筛选。\n- 匹配方法：支持配置过滤时的匹配模式，共有包括、匹配开头或匹配结尾3种模式。\n- 选中值的完整数据：当下拉列表是分页或加载更多时，需要使用该字段回显选择框内数据。格式为[{text:\'text\',value:\'value\'}]。\n\n- 只读：只读开关，开启后无法选择对应组件。\n- 禁用：禁用开关，开启后鼠标移入组件区域内无法点击，且会显示禁用标记。\n- 宽度：设置选择框宽度大小，支持占满、巨大、大、中型、正常、小共6种模式。\n- 高度：设置选择框高度大小，支持占满、巨大、大、中型、正常、小共6种模式。\n- 弹出状态：开启时加载下拉框时，下拉框自动弹出，默认关闭。\n- 自动获取焦点：控制是否在进入页面时聚焦到该组件。\n- 前缀图标：支持添加前缀图标，如搜索图标。\n- 后缀图标：支持添加后缀图标，如搜索图标。\n- 弹出层展示位置：设置添加到哪个元素。\n### 选择项\n- 选项值：此项的值。\n- 选项文本：此项的显示值。\n- 选项文本描述：选项文本的辅助描述，展示在选项文本下方。\n- 禁用此项：该项不可选，默认关闭。\n- 相关对象：相关对象。当选择此项时，抛出的事件会传递该对象，便于开发。\n### 选择分组\n- 标题：选择分组的标题，标题只有在没有文本插槽的时候生效\n\n### 分割线\n分割线没有属性，通常用来分割选择项，仅展示使用\n\n\n\n\n\n\n\n### 事件\n\n- 选择框选项支持鼠标事件和组件事件。\n  - 鼠标事件：失去焦点。\n  - 组件事件：选择前、选择时、选择后、改变后、弹出前、弹出后、关闭前、关闭后、加载前、加载后、点击前缀图标、点击后缀图标、 搜索前 \n\n### 样式\n\n样式说明请参见[组件通用说明](99.参考/40.页面IDE/30.页面组件/05.PC页面基础组件/000.组件通用说明.md)。\n\n#### 主题样式\n- 下拉框背景色\n  - popper-item-background：选择框下拉项背景色，如 #223325。默认值inherit。\n  - popper-item-background-hover：选择框下拉项背景色（hover状态），如 #223325。默认值#ededed。\n  - popper-item-background-selected：选择框下拉项背景色（禁用状态），如 #223325。默认值#5c98ff。\n- 下拉框字体颜色\n  - popper-item-color：选择框下拉项字体颜色，如 #223325。默认值inherit。\n  - popper-item-color-hover：选择框下拉项字体颜色（hover状态），如 #223325。默认值inherit。\n  - popper-item-color-selected：选择框下拉项字体颜色（选中状态），如 #223325。默认值white。\n- 宽度\n  - width：选择框的宽度，如 1px。默认值240px。\n- 高度\n  - height：选择框的高度，如 1px。默认值32px。\n- 水平方向内边距\n  - padding-x： 选择框框水平方向内边距，如 1px。这里只设置左右两边的边距。可填写1个值或者2个值。默认值10px。\n- 背景色\n  - background：选择框背景色，如 #223325。默认值#fff。\n- 边框\n  - border-width：选择框的边框宽度，如 1px。默认值1px。\n  - border-color：选择框的边框颜色,如 #223325。默认值#e5e5e5。\n- 字体\n  - color：选择框的字体颜色，如 #223325。默认值#333。\n- 弹出层\n  - popper-max-height：选择框的弹出层最大高度，如 1px。默认值194px。\n  - popper-box-shadow：选择框的弹出层阴影效果，如 1px。默认值0 0 4px rgba(3, 3, 3, .1)。\n  - popper-background：选择框的弹出层背景色，如 #223325。默认值white。\n  - popper-border-color：选择框的弹出层边框颜色，如 #223325。默认值#e5e5e5。\n  - popper-border-color-inverse：Inverse选择框的弹出层边框颜色,如 #223325。默认值#212123。\n  - box-shadow-focus：选择框的弹出层边框阴影效果，如 2px 2px 2px 1px rgba(0, 0, 0, 0.2)。默认值0 0 0 2px rgba(77, 136, 255, 0.2)。\n- 占位符\n  - placeholder-color：选择框的占位符文字颜色，如 #223325。默认值#ccc。\n- 下拉箭头\n  - arrow-color：选择框的下拉箭头颜色，如 #223325。默认值#999。\n  - arrow-size：选择框的下拉箭头大小，如 1px。默认值18px。\n  - arrow-right-ratio：选择框的下拉箭头右边距计算倍数，如 1。默认值0.6。\n- 状态颜色\n  - status-color：选择框状态颜色，如 #223325。默认值#999。\n- 只读状态\n  - popper-item-color-readonly：选择框下拉项的字体颜色（只读状态下），如 #223325。默认值inherit。\n  - popper-item-background-readonly：选择框下拉项的背景颜色（只读状态下），如 #223325。默认值none。\n- 禁用状态\n  - popper-item-color-selected-disabled：选择框下拉项的字体颜色（禁用状态下），如 #223325。默认值inherit。\n  - popper-item-background-selected-disabled：选择框下拉项的背景颜色（禁用状态下），如 #223325。默认值#ededed。\n- 多选状态\n  - popper-item-color-duplicated：选择框下拉项的字体颜色（多选状态下），如 #223325。默认值inherit。\n  - popper-item-background-duplicated：选择框下拉项的背景颜色（多选状态下），如 #223325。默认值none。\n  - popper-item-color-duplicated-hover：选择框下拉项的字体颜色（多选hover状态下），如 #223325。默认值inherit。\n  - popper-item-background-duplicated-hover：选择框下拉项的背景颜色（多选hover状态下），如 #223325。默认值#ededed。\n\n\n## 案例\n\n### 一个带清空按钮选择框\n设置一个数据源\n```\nthis.variable3=[{name:"john",value:"john"},{name:"jom",value:"jom"}]\n```\n\n选中选择器节点\n\n![image-202303037](http://dev.cydoccenter01.defaulttenant.lcap.hatest.163yun.com/libraryUpload/app/image-202303037_20230515215020142.png)\n\n效果图\n\n![image-202303038](http://dev.cydoccenter01.defaulttenant.lcap.hatest.163yun.com/libraryUpload/app/image-202303038_20230515215047501.png)\n';
    }, 2000)
  }
}
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| text | string |  | `''` | 需要传入的文本 |
| scrollContainer | string | `[object Object]`<br/>`[object Object]` | `'window'` | 监听文档滚动的容器 |
| outline-position-top | number |  | `200` | 当滚动容器为窗口时生效 |
| outline-position-right | number |  | `100` | 当滚动容器为窗口时生效 |

### Events

#### @link

点击链接时触发的事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 链接地址 |

