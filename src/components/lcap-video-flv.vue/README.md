<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapVideoFlv FLV 视频流播放器

- [示例](#示例)
    - [基本用法](#基本用法)
    - [设置宽高样式](#设置宽高样式)
- [API]()
    - [Props/Attrs](#propsattrs)

**Media**

FLV 视频流播放器

## 示例
### 基本用法

``` html
<lcap-video-flv src="https://docardmedia.iotdataserver.net/upload/media/2020/video/0C64723E852BD5C3CA60BD08C4E2033A.flv" ></lcap-video-flv>
```

### 设置宽高样式

``` html
<lcap-video-flv src="https://docardmedia.iotdataserver.net/upload/media/2020/video/0C64723E852BD5C3CA60BD08C4E2033A.flv" style="width:400px"></lcap-video-flv>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| src | string |  |  | 视频流地址 |
| type | string | `'flv'` ()<br/>`'mp4'` () | `'flv'` | 视频编码格式 |
| autoplay | boolean |  | `false` | 是否自动播放 |
| isLive | boolean |  | `false` | 是否直播流 |
| hasVideo | boolean |  | `true` | 是否有视频 |
| hasAudio | boolean |  | `true` | 是否有音频 |
| cors | boolean |  | `true` | 是否支持第三方视频服务 |
| withCredentials | boolean |  | `false` | 是否向第三方视频服务传递登录凭证 |
| config | object |  |  | flv.js 其他配置 |

