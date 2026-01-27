# 视频播放 (cust_video_library)

## 依赖库介绍
cust_video_library 是一款专为 Codewave 低代码平台设计的视频播放依赖库。它集成了功能丰富的视频播放组件，支持流媒体播放、封面图配置、进度记忆、自动播放及倍速调节等核心功能，方便开发者在低代码应用中快速集成高性能的视频播放能力。

## 包含的组件和逻辑列表
### 组件
- **cw-video-view (视频)**: 提供视频播放的核心视图，支持自定义封面、播放控制及各种状态事件监听。

### 逻辑
- **暂无**: 本库当前版本未包含全局逻辑。

## API 说明

### cw-video-view (视频)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| src (地址) | string | - | 视频流地址 |
| poster (封面地址) | image | - | 视频默认封面地址 |
| breakProgress (中断进度) | string | - | 从中断的进度开始播放 |
| autoplay (自动播放) | boolean | false | 是否自动播放 |
| draggable (可拖放) | boolean | true | 是否可拖放 |
| loop (循环播放) | boolean | false | 是否循环播放 |
| showPlaybackRates (是否开启倍速播放) | boolean | true | 是否开启倍速播放 |

#### 事件 (Events)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| start (播放开始时) | $event: object | 播放器实例对象 |
| pause (暂停播放时) | $event: object | 播放器实例对象 |
| play (继续播放时) | $event: object | 播放器实例对象 |
| ended (播放结束时) | $event: object | 播放器实例对象 |
| videoProgress (更新播放进度时) | $event: string | 播放进度百分比 |

#### 方法 (Methods)
| 名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| play | 继续播放 | - |
| pause | 暂停播放 | - |