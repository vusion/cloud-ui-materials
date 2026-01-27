# cw_audio_player 音频播放器

## 介绍

cw_audio_player 是一款专为 Web 应用设计的音频播放器组件库。它提供了直观的音频播放界面，支持音频源加载、多倍速切换、进度拖拽、音量调节以及播放状态监听等功能，能够帮助开发者快速实现音频播放相关的业务场景。

## 组件列表

- **audio-player**（音频播放器）：核心组件，提供完整的音频播放、控制及交互能力。

## 逻辑列表

（暂无相关逻辑）

## API 说明

### audio-player（音频播放器）

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| src | String | '' | 音频源地址 |
| speedList | List<Decimal> | [0.5, 1.0, 1.5, 2.0] | 显示文本，即倍速选择列表内容 |
| appendToBody | Boolean | true | 倍速选择下拉框是否插入 body |

#### 事件

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| onTogglePlay | 点击播放/暂停按钮时触发 | event.isPlay: Boolean（标识点击后的播放状态） |
| onSeek | 拖动音频播放进度条时触发 | event.time: Decimal（返回当前的播放进度时间） |
| onSpeedChange | 点击切换播放速度时触发 | event.speed: Decimal（返回当前的播放速度值） |
| onVolumeChange | 拖动音频音量进度条时触发 | event.volume: Decimal（返回当前的音量值） |

#### 方法

暂无。该组件目前主要通过属性配置和事件回调进行交互。