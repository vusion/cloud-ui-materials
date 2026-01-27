# PC端自定义setter依赖库 (cust_huadian_setter_pc_library)

## 依赖库介绍

`cust_huadian_setter_pc_library` 是一款专为 PC 端设计的自定义 Setter 扩展库。它通过扩展标准 UI 组件，引入了自定义设置器（Custom Setter）能力，使得图标选择（ExIconSetter）和图片处理（ExImageSetter）能够与特定的业务资源库或自定义配置流程无缝集成。该库提供了增强的图标展示与图片展示组件，在保留标准功能的基础上，增加了更多关于布局、对齐、预览以及交互跳转的配置项。

## 组件列表

- **ex-i-ico (图标-扩展)**: 支持通过自定义 Setter 选择图标，提供多种布局模式（仅图标、上下组合、左右组合）以及丰富的链接跳转配置。
- **ex-u-image (图片展示-扩展)**: 支持通过自定义 Setter 引入图片，提供多种填充模式、对齐方式、圆形遮罩以及加载占位图和全屏预览功能。

## 逻辑列表

- 暂无

## API 说明

### ex-i-ico (图标-扩展)

#### 属性 (Attributes)

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | nasl.core.String | '' | 图标名称，支持通过 `ExIconSetter` 选择图标 |
| icotype | 'only' \| 'top' \| 'left' | 'top' | 图标布局方式：仅图标、组合图标-上下、组合图标-左右 |
| linkType | 'destination' \| 'download' | 'destination' | 交互链接类型：页面跳转、下载链接 |
| hrefAndTo | nasl.core.String | - | 链接的详细地址 |
| target | '_blank' \| '_self' \| '_parent' \| '_top' | '_self' | 链接打开方式，支持新窗口、当前窗口、父级窗口或顶级窗口 |

#### 事件 (Events)

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| onClick | 点击此项时触发 | (event: MouseEvent对象) => any |
| onDblclick | 双击此项时触发 | (event: MouseEvent对象) => any |
| onRightclick | 右键点击此项时触发 | (event: MouseEvent对象) => any |
| onOver | 鼠标移入此项时触发 | (event: MouseEvent对象) => any |
| onOut | 鼠标移出此项时触发 | (event: MouseEvent对象) => any |
| onDown | 鼠标按下此项时触发 | (event: MouseEvent对象) => any |

#### 方法 (Methods) / 插槽 (Slots)

| 名称 | 说明 |
| --- | --- |
| slotDefault | 默认插槽，用于插入文本或 HTML 内容 |

---

### ex-u-image (图片展示-扩展)

#### 属性 (Attributes)

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | nasl.core.String | '' | 图片链接，支持通过 `ExImageSetter` 进行配置 |
| fit | 'contain' \| 'scale-down' \| 'none' \| 'fill' \| 'cover' | 'contain' | 填充方式：适应、适应（小图原尺寸）、原尺寸、拉伸、填充 |
| circle | nasl.core.Boolean | false | 是否使用圆形遮罩展示图片 |
| horizontalCenter | 'left' \| 'center' \| 'right' | 'center' | 水平对齐方式 |
| verticalCenter | 'top' \| 'center' \| 'bottom' | 'center' | 垂直对齐方式 |
| preview | nasl.core.Boolean | false | 是否支持点击全屏放大预览 |
| loadingType | 'loading' \| 'none' \| 'placeholder' | 'loading' | 加载样式：显示 Loading、不显示、自定义默认图 |
| placeholderSrc | nasl.core.String | '...lietu.png' | 当加载样式为“自定义默认图”时的图片地址 |

#### 事件 (Events)

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| onLoad | 网页加载完成时触发 | (event: any) => any |
| onClick | 在元素上按下并释放任意鼠标按钮时触发 | (event: MouseEvent对象) => any |
| onDblclick | 在元素上双击鼠标按钮时触发 | (event: MouseEvent对象) => any |
| onContextmenu | 在右键菜单显示前触发 | (event: MouseEvent对象) => any |
| onMousedown | 在元素上按下任意鼠标按钮时触发 | (event: MouseEvent对象) => any |
| onMouseup | 在元素上释放任意鼠标按钮时触发 | (event: MouseEvent对象) => any |
| onMouseenter | 鼠标移入元素时触发 | (event: MouseEvent对象) => any |
| onMouseleave | 鼠标移出元素时触发 | (event: MouseEvent对象) => any |

#### 方法 (Methods)

- 暂无说明