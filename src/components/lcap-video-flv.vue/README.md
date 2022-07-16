<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapVideoFlv FLV 视频流播放器

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)

**Media**

FLV 视频流播放器

## 示例
### 基本用法

``` html
<lcap-video-flv 
    src="https://static-vusion.nos-eastchina1.126.net/tutorial/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%E8%A7%86%E9%A2%91/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B%EF%BC%9AAPI%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97.mp4"
    type="mp4" 
></lcap-video-flv>
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

