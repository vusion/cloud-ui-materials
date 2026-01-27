## 依赖库介绍
`cust_yixin_live_broadcast_room` 是专为 Codewave 低代码平台设计的「易信直播间sdk」集成库。它提供了核心的视频播放组件以及一系列配套的业务逻辑，旨在帮助开发者快速集成易信直播功能，包括视频流展示及直播间聊天室的消息交互管理。

## 包含的组件和逻辑

### 组件列表
- **cust-yixin-live-broadcast（易信直播组件）**：用于展示直播视频流，支持多种播放配置和基础播放控制。

### 逻辑列表
- **attachToRoom**：将指定的数据源绑定到聊天室实例。
- **connect**：建立与直播间的网络连接。
- **destroy**：销毁实例并释放相关资源。
- **disconnect**：断开当前直播间的网络链接。
- **initRoom**：执行直播聊天室的初始化操作。
- **resendMessage**：对发送失败的错误信息进行重新发送。
- **sendText**：在直播间内发送文本消息。

## API 说明

### 组件：cust-yixin-live-broadcast

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| src | string | - | 视频流地址 |
| poster | image | - | 视频默认封面地址 |
| autoplay | boolean | false | 是否自动播放 |
| loop | boolean | false | 是否循环播放 |
| autoResize | boolean | true | 是否自动 resize |
| options | object | - | 额外配置 |
| decryptInfo | object | - | flv 加密配置 |

#### 事件 (Events)
该组件暂无公开触发的事件。

#### 方法 (Methods)
| 名称 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| play | 继续播放视频 | - | - |
| pause | 暂停播放视频 | - | - |
| getInstance | 获取视频组件的原始实例 | - | result (object): video 实例 |

### 逻辑功能说明

- **attachToRoom**：用于将前端数据源与聊天室逻辑层进行关联，确保消息流转正常。
- **connect**：触发连接指令，使客户端接入直播间服务。
- **destroy**：在页面销毁或业务结束时调用，用于彻底清理直播间相关的内存和网络占用。
- **disconnect**：执行断开操作，停止当前的实时通信。
- **initRoom**：根据配置参数准备直播间环境，是进入直播间的首要步骤。
- **resendMessage**：增强消息可靠性，在检测到发送异常时手动或自动触发重试。
- **sendText**：基础交互功能，支持向直播间全体或特定目标发送文字内容。