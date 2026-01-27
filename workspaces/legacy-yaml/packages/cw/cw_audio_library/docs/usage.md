# cw_audio_library 音频依赖库

本依赖库提供与「音频依赖库」相关的组件与逻辑，专为 Codewave 低代码平台设计。它集成了音频录制与音频播放的核心能力，旨在帮助开发者快速实现语音交互、音频内容展示及音频文件管理等功能。

## 包含组件

- **cw-audio-record（音频录制组件）**：提供实时音频录制、声波可视化展示、录音暂停/恢复以及音频文件的上传与下载功能。
- **cw-audio-view（音频播放组件）**：提供音频流播放功能，支持播放进度监控、音量与倍速控制，并可自定义播放器交互界面。

## 组件 API 说明

### cw-audio-record（音频录制组件）

#### 属性 (Attributes)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| waveBgColor | color | 'rgb(200, 200, 200)' | 设定声波背景颜色 |
| waveColor | color | 'rgb(0, 0, 0)' | 设定波形绘制颜色 |
| maxFileSize | number | 10 | 上传文件的最大大小（MB） |
| uploadUrl | string | '/gateway/lowcode/api/v1/app/upload' | 上传音频的地址 |
| isShowWave | boolean | true | 是否显示声波可视化 |

#### 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| onUploadSuccess | value (string) | 上传音频成功时触发，返回改变的值 |
| onUploadError | value (string) | 上传失败时触发，返回错误原因 |

#### 方法 (Methods)

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| startRecord | - | 开始录制音频 |
| stopRecord | - | 停止录制音频 |
| pauseRecord | - | 暂停录制音频 |
| resumeRecord | - | 恢复录制音频 |
| uploadRecord | type (string) | 上传录制的音频，可选格式：wav, mp3, pcm |
| downloadRecord | type (string) | 下载录制的音频，可选格式：wav, mp3, pcm |

---

### cw-audio-view（音频播放组件）

#### 属性 (Attributes)

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | - | 音频流地址 |
| showControls | boolean | true | 是否显示播放器面板 |

#### 事件 (Events)

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| start | $event (object) | 播放开始时触发，携带播放器实例对象 |
| pause | $event (object) | 暂停播放时触发，携带播放器实例对象 |
| play | $event (object) | 继续播放时触发，携带播放器实例对象 |
| ended | $event (object) | 播放结束时触发，携带播放器实例对象 |
| videoProgress | $event (string) | 更新播放进度时触发，携带播放进度百分比 |
| onLoadedMetadata | $event (object) | 加载完音频资源后触发，携带播放器实例对象 |

#### 方法 (Methods)

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| play | - | 继续播放 |
| pause | - | 暂停播放 |
| handleSetPlaybackRate | rate (decimal) | 设置播放速率，范围 0.5 - 4 |
| handleSetPlaybackVolume | volume (decimal) | 设置播放音量，范围 0 - 1 |

## 逻辑列表

暂无。本依赖库目前仅包含 UI 组件。