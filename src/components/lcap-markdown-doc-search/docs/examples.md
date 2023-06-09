### 基本用法

``` vue
<template>
  <lcap-markdown-doc-search
    :value.sync="value"
    :data-source="suggestions"
    text-field="highlightedTitle"
    description-field="highlightedContent"
    prefix="folder-add"
    suffix="folder-add"
    @input="onInput"
  ></lcap-markdown-doc-search>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      suggestions: []
    }
  },

  methods: {
    fetchData(keywords) {
      setTimeout(() => {
        if (!keywords) {
          this.suggestions = [];
        } else {
        this.suggestions = [
        {
          "esId": "2614959179281664",
          "highlightedContent": "<mark>组件</mark>列表  该<mark>组件</mark>可将其他<mark>组件</mark>根据动态数据源进行动态展示，如根据列表数据循环展示 N 个文本/标签等。  <mark>组件</mark>说明  属性  «<mark>组件</mark>通用属性请参见<mark>组件</mark>通用说明。»  数据属性  «<mark>组件</mark>数据源、数据类型、初始加载属性请参见<mark>组件</mark>数据源说明。»  样式属性  - 每行排列项数：支持定义每一行排列的项数，为空时会自适应宽度并自动换行。",
          "highlightedTitle": "组件列表"
        },
          
          {"esId":"2614959176684800","highlightedContent":"<mark>组件</mark>通用说明  每个<mark>组件</mark>都包含属性、事件和样式。其中大部分功能以及设置方式相同，本节对<mark>组件</mark>的通用属性做详细说明。  属性  基础信息  - <mark>组件</mark>名称：由字母、数字和下划线组成，用于在表达式中引用、权限上报等场景。  - 是否控制权限：可根据角色设置权限，对无权限的角色的用户隐藏该<mark>组件</mark>，设置权限前，必须先设置<mark>组件</mark>名称。","highlightedTitle":"组件通用说明"},{"esId":"2614959180682496","highlightedContent":"案例  使用<mark>组件</mark>列表实现一个每行展示6个标签的效果  1、页面拖入<mark>组件</mark>列表  2、绑定数据源、设置每行排列项数  3、拖入标签<mark>组件</mark>  4、标签<mark>组件</mark>设值  5、效果展示","highlightedTitle":"组件列表"},{"esId":"2614959180272896","highlightedContent":"- 只读：设置多行输入<mark>组件</mark>只读。  - 禁用：设置多行输入<mark>组件</mark>禁用变灰不可编辑。  <mark>组件</mark>事件  - 支持基本的手势事件：获得焦点和失去焦点。","highlightedTitle":"多行输入"},{"esId":"2614959178183936","highlightedContent":"- 禁用：禁用开关，开启后鼠标移入<mark>组件</mark>区域内无法点击，且会显示禁用标记。  - 标签：顶部自定义提示文本。  - flag标志：是否右上角有flag标志。  事件  - 面包屑<mark>组件</mark>支持<mark>组件</mark>事件。     - <mark>组件</mark>事件：选择前、输入时、选择后、改变后。  - 面包屑选项支持鼠标事件和<mark>组件</mark>事件。     - 鼠标事件：点击。     - <mark>组件</mark>事件：选择前。  样式  样式说明请参见<mark>组件</mark>通用说明。","highlightedTitle":"胶囊"},{"esId":"2614959177823488","highlightedContent":"<mark>组件</mark>说明  属性  «<mark>组件</mark>通用属性请参见<mark>组件</mark>通用说明。»  - 标识：锚点的唯一标识，用于跳转链接。  事件  锚点<mark>组件</mark>不支持设置事件。  样式  样式说明请参见<mark>组件</mark>通用说明。  注意事项  - 锚点<mark>组件</mark>默认为空容器，支持拖入其他<mark>组件</mark>，不影响锚点正常跳转功能。  - 锚点<mark>组件</mark>发布后不直接显示。  案例  功能需求  搭配目录<mark>组件</mark>实现锚点指定位置的跳转。  操作步骤  1.","highlightedTitle":"锚点"},{"esId":"2614959180559616","highlightedContent":"| 事件名   | 触发条件                 |  | -------- | ------------------------ |  | 获得焦点 | 多行<mark>组件</mark>输入框聚焦时触发 |  | 失去焦点 | 多行<mark>组件</mark>输入框失焦时触发 |  - 支持输入<mark>组件</mark>常见的<mark>组件</mark>事件：输入前，改变后，清空后。","highlightedTitle":"单行输入"},{"esId":"2614959179961600","highlightedContent":"<mark>组件</mark>通用说明  每个<mark>组件</mark>都包含属性、事件和样式。其中大部分功能以及设置方式相同，本节对<mark>组件</mark>的通用属性做详细说明。  属性  基础信息  - <mark>组件</mark>名称：由字母、数字和下划线组成，用于在表达式中引用、权限上报等场景。  - 是否控制权限：可根据角色设置权限，对无权限的角色的用户隐藏该<mark>组件</mark>，设置权限前，必须先设置<mark>组件</mark>名称。","highlightedTitle":"组件通用说明"},{"esId":"2614959177340160","highlightedContent":"徽章中可自定义添加<mark>组件</mark>。  <mark>组件</mark>说明  属性  «<mark>组件</mark>通用属性请参见<mark>组件</mark>通用说明。»  - 值：当前提醒消息条数，支持动态绑定。  - 最大值：提醒消息的最大值，超过最大值将不再显示准确的数字，用最大值+代替，如99+。  - 插入右上角：开启时提醒角标位置显示在右上角，关闭时提醒角标显示在<mark>组件</mark>右侧。  事件  徽章<mark>组件</mark>不支持设置事件。  样式  样式说明请参见<mark>组件</mark>通用说明。","highlightedTitle":"徽章"},{"esId":"2614959178069248","highlightedContent":"目录  支持通过目录<mark>组件</mark>来标识长页面中当前所处的位置，以及页面跳转等功能。  <mark>组件</mark>说明  属性  «<mark>组件</mark>通用属性请参见<mark>组件</mark>通用说明。»  目录<mark>组件</mark>  - 选中值：通过<mark>组件</mark>进行选择后，最终选中的值，支持双向绑定到变量。  目录节点  - 选项值：集合的元素类型中，用于标识选中值的属性。  - 链接类型：支持页面跳转、普通链接、下载链接。  - 链接地址：链接的详细地址。","highlightedTitle":"目录"}];
        }
      }, 1000)
    },
    onInput(e) {
      console.log(e)
      this.fetchData(e)
    },
  }
}
</script>
```

