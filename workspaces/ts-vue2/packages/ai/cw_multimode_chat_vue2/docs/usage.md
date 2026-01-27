# 多模态对话式AI交互组件 (cw_multimode_chat_vue2)

## 库介绍
`cw_multimode_chat_vue2` 是一款专为 AI 对话场景设计的多模态交互组件库。它适配 Vue 2 环境，旨在简化对话式 AI 应用的开发流程。该组件库提供了从对话流展示到复杂输入交互的全套方案，支持文本、文件上传、打字机效果、头像展示以及多角色适配，能够轻松构建类似 ChatGPT 的多模态对话界面。

## 包含组件
- **cw-bubble-list (对话气泡列表)**: 核心容器组件，用于管理和展示对话记录，支持自动区分 AI 与用户角色。内部包含 **cw-bubble (对话气泡项)** 子组件，负责单个消息的渲染。
- **cw-sender (输入框)**: 集成了文本输入和附件上传的综合输入组件，支持快捷键提交及多种视觉样式配置。
- **cw-attachment (附件组件)**: 用于基础附件的辅助展示。

## API 说明

### 1. cw-bubble-list (对话气泡)

#### 属性 (Attributes)
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dataSource | List<T> | - | 数据源，展示数据的输入源 |
| roleField | Function | item => item.role | 角色字段名，用于区分左右侧展示 |
| leftRoleName | String | - | 左侧展示的角色值 (如 'ai') |
| rightRoleName | String | - | 右侧展示的角色值 (如 'user') |

#### 方法 (Methods)
| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| reload | - | 重新加载数据源 |

#### 插槽 (Slots)
| 插槽名 | 说明 |
| --- | --- |
| slotLeftBubble | 左侧对话气泡内容插槽 |
| slotRightBubble | 右侧对话气泡内容插槽 |

---

### 子组件: cw-bubble (对话气泡项)

#### 属性 (Attributes)
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | String | - | 气泡显示的文本内容 |
| showAvatar | Boolean | true | 是否显示头像 |
| avatar | String | - | 头像图片地址 |
| showUserName | Boolean | true | 是否显示昵称 |
| name | String | - | 昵称字符串 |
| showTime | Boolean | true | 是否展示时间 |
| time | DateTime/Date/Time | - | 时间值 |
| fileList | List<any> | - | 附件文件列表数据 |
| showFooter | Boolean | false | 是否显示底部插槽 |
| loading | Boolean | false | 是否处于加载中状态 |
| typing | Boolean | true | 是否启用打字机动画效果 |
| shape | String | 'normal' | 气泡形状：'normal', 'round', 'corner', 'none' |
| filled | Boolean | true | 是否填充背景色 |
| border | Boolean | false | 是否显示边框 |
| shadow | Boolean | false | 是否展示阴影 |

#### 事件 (Events)
| 事件名 | 说明 |
| --- | --- |
| onTypingComplete | 打字效果完成时触发 |

#### 插槽 (Slots)
| 插槽名 | 说明 |
| --- | --- |
| slotFooter | 气泡底部内容插槽 |

---

### 2. cw-sender (输入框)

#### 属性 (Attributes)
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | String | - | 当前输入框的文本值 |
| supportAttachment | Boolean | true | 是否开启附件上传功能 |
| fileList | List<File> | - | 当前已上传的文件列表 |
| url | String | - | 文件上传接口地址 |
| accept | String | - | 限制上传的文件类型（如 .png,.pdf） |
| urlField | String | 'result' | 请求返回体中 URL 的字段名 |
| name | String | 'file' | 上传至后端的字段名 |
| method | String | 'POST' | 上传接口的 HTTP 请求类型 |
| placeholder | String | '请输入' | 输入框占位提示文字 |
| submitType | String | 'enter' | 提交快捷键：'enter' 或 'shiftEnter' |
| supportExtra | Boolean | false | 是否启用底部自定义插槽 |
| maxlength | Integer | - | 限定输入文本的最大长度 |
| submitBtnShape | String | 'circle' | 发送按钮形状：'circle', 'normal', 'round' |
| submitBtnIcon | String | 'arrowup' | 发送按钮图标：'arrowup', 'plane' |
| loading | Boolean | false | 发送按钮是否处于加载状态 |
| disabled | Boolean | - | 是否禁用输入框 |
| readonly | Boolean | false | 是否为只读模式 |

#### 事件 (Events)
| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| onSubmit | {content, fileList} | 点击发送按钮或触发提交快捷键时触发 |
| onChange | {content, fileList} | 输入框内容或文件列表发生变化时触发 |
| onCancel | - | 点击取消按钮时触发 |

#### 插槽 (Slots)
| 插槽名 | 说明 |
| --- | --- |
| slotDefault | 输入框底部自定义内容插槽 (需开启 supportExtra) |

---

### 3. cw-attachment (附件组件)

#### API 说明
暂无。该组件为内部辅助展示组件，当前版本未暴露可配置的属性、事件或方法。