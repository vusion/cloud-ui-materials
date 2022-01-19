<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapVideo 视频组件

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Methods](#methods)

**Media**

基于 video.js 的视频播放组件

## 示例
### 基本用法

``` html
<lcap-video src="https://vjs.zencdn.net/v/oceans.mp4" autoplay width="500"></lcap-video>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| src | string |  |  | 视频流地址 |
| autoplay | boolean |  | `false` | 是否自动播放 |
| draggable | boolean |  | `true` | 是否可拖放 |
| loop | boolean |  | `false` | 是否循环播放 |

Methods

#### start($event)

播放开始时

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| $event | object |  | 播放器实例对象 |

#### pause($event)

暂停播放时

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| $event | object |  | 播放器实例对象 |

#### play($event)

继续播放时

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| $event | object |  | 播放器实例对象 |

#### ended($event)

播放结束时

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| $event | object |  | 播放器实例对象 |

