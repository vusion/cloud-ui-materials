# lcap-markdown-doc-search 文档搜索器

## 依赖库介绍
`lcap-markdown-doc-search` 是一个专为 Codewave 低代码平台定制的组件库。该库主要提供文档搜索相关的组件，旨在帮助开发者快速在应用中集成搜索功能，并支持对搜索结果进行灵活的展示与交互配置。

## 包含的组件与逻辑

### 组件列表
- **lcap-markdown-doc-search（文档搜索框）**: 提供一个带有搜索建议/结果列表的输入框，支持配置数据源、自定义标题/描述字段以及丰富的样式和交互逻辑。

### 逻辑列表
- 暂无：本依赖库目前未包含独立逻辑资产。

## API 说明

### lcap-markdown-doc-search (文档搜索框)

#### 属性 (Attrs)
| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | String | - | 输入的值，支持双向绑定 |
| data-source | Array<Item> | - | 搜索结果列表数据 |
| data-schema | schema | - | 选择器每一行的数据类型 |
| text-field | string | text | 显示结果项标题字段的属性 |
| description-field | string | - | 用于显示结果项描述字段的属性 |
| loading | boolean | false | 用于显示加载状态 |
| align | string | left | 结果列表对齐方式，可选值：left, right |
| clearable | boolean | - | 开启并在输入框有内容时会显示清除按钮 |
| placeholder | string | - | 为空时的提示文本 |
| maxlength | number | - | 最大输入长度 |
| autofocus | boolean | false | 是否自动获取焦点 |
| readonly | boolean | false | 是否为只读状态 |
| disabled | boolean | false | 是否禁用输入框 |
| width | string | normal | 宽度大小，可选值：full, huge, large, medium, normal, small, mini |
| height | string | normal | 高度大小，可选值：full, huge, large, medium, normal, small, mini |
| prefix | icon | - | 前缀图标 |
| suffix | icon | - | 后缀图标 |
| border-radius | string | 0px | 圆角设置 |

#### 事件 (Events)
| 事件名 | 说明 | 参数 |
| :--- | :--- | :--- |
| select | 选择结果时触发 | $event.item (object): 选择项相关对象 |
| before-input | 输入前触发。可以在这个阶段阻止输入，或者修改输入的值 | $event (object): 自定义事件对象，包含 oldValue, value, preventDefault |
| input | 输入时触发 | $event (string): 输入框的值 |
| change | 值变化时触发（与原生事件不同） | $event (object): 自定义事件对象，包含 value, oldValue |
| focus | 获得焦点时触发 | $event (FocusEvent): 原生焦点事件对象 |
| blur | 失去焦点时触发 | $event (FocusEvent): 原生失去焦点事件对象 |
| before-clear | 清空前触发 | $event (object): 自定义事件对象，包含 value, oldValue, preventDefault |
| clear | 清空后触发 | $event (object): 自定义事件对象，包含 value, oldValue |
| click-prefix | 点击前缀图标后触发 | $event (object): 鼠标事件对象 |
| click-suffix | 点击后缀图标后触发 | $event (object): 鼠标事件对象 |

#### 方法 (Methods)
| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| focus | 让输入框获取焦点 | - |
| blur | 让输入框失去焦点 | - |
| clear | 清空输入框内容 | - |