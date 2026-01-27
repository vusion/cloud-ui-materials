# 侧边栏弹窗依赖库 (cw_sider_modal_library)

## 依赖库介绍
cw_sider_modal_library 是一个专为 Codewave 低代码平台设计的侧边栏弹窗依赖库。该库提供了一个灵活的侧边栏组件，允许开发者在页面边缘（左侧或右侧）快速集成可收纳的内容容器。它适用于需要展示辅助信息、配置选项或导航菜单等不希望占用主页面空间的交互场景。

## 包含的组件与逻辑
### 组件
- **u-sider-modal (侧边栏弹窗)**: 提供一个可从屏幕侧边滑出的容器组件，支持自定义位置、触发按钮文本及垂直偏移。

### 逻辑
- 本依赖库暂无独立逻辑（Logic）。

## API 说明

### u-sider-modal (侧边栏弹窗)

#### 属性 (Attrs)
| 属性名 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| position | 停靠位置 | string | 'right' | 侧边栏弹窗停靠的位置，可选值为 'left' (左边) 或 'right' (右边)。 |
| toggleShow | 切换显示 | boolean | false | 控制侧边栏弹窗是否显示。 |
| buttonText | 展开/收缩 按钮文本 | string | '侧边栏弹窗' | 弹窗展开/收起按钮上显示的文字内容。 |
| positionY | 垂直方向位置 | string | '0' | 侧边栏弹窗在 Y 轴方向上的垂直偏移位置。 |

#### 事件 (Events)
| 事件名 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| before-open | 打开前 | senderVM: UModal (发送事件实例) | 在弹窗打开动作执行之前触发。 |
| open | 打开后 | senderVM: UModal (发送事件实例) | 在弹窗完全打开后触发。 |
| before-close | 关闭前 | $event.preventDefault: Function (阻止关闭流程), senderVM: UModal (发送事件实例) | 在弹窗关闭动作执行之前触发，可调用 preventDefault 阻止关闭。 |
| close | 关闭后 | senderVM: UModal (发送事件实例) | 在弹窗关闭后触发。 |

#### 方法 (Methods)
- 暂无公开调用方法。

#### 插槽 (Slots)
| 插槽名 | 说明 |
| :--- | :--- |
| default | 弹窗主体内容区域，可插入文本、HTML 或其他组件。 |