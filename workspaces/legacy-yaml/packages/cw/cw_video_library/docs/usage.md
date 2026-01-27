# cw_video_library 视频播放库

本依赖库（cw_video_library）为 Codewave 低代码平台提供专业的「视频播放」相关能力。通过集成该库，开发者可以轻松地在应用中实现视频内容的播放、控制以及各种基于播放状态的交互逻辑，提升应用的媒体展示效果。

## 包含内容

### 组件
- **cw-video-view（视频）**：核心视频播放组件，支持配置视频源、封面、播放控制及进度监听。

### 逻辑
- 暂无：本依赖库目前暂未包含独立的逻辑列表。

## API 说明

### cw-video-view（视频）

#### 属性 (Attributes)

| 属性名 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| src | 地址 | string | - | 视频流地址 |
| poster | 封面地址 | image | - | 视频默认封面地址 |
| breakProgress | 中断进度 | string | - | 从中断的进度开始播放 |
| autoplay | 自动播放 | boolean | false | 是否自动播放 |
| draggable | 可拖放 | boolean | true | 是否可拖放 |
| loop | 循环播放 | boolean | false | 是否循环播放 |

#### 事件 (Events)

| 事件名 | 标题 | 参数 | 说明 |
| :--- | :--- | :--- | :--- |
| start | 播放开始时 | $event: object | 返回播放器实例对象 |
| pause | 暂停播放时 | $event: object | 返回播放器实例对象 |
| play | 继续播放时 | $event: object | 返回播放器实例对象 |
| ended | 播放结束时 | $event: object | 返回播放器实例对象 |
| videoProgress | 更新播放进度时 | $event: string | 返回播放进度百分比 |

#### 方法 (Methods)

| 方法名 | 说明 | 参数 |
| :--- | :--- | :--- |
| play | 继续播放 | 无 |
| pause | 暂停播放 | 无 |