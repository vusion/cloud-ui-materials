<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapVideo 视频

- [示例](#示例)
    - [基本用法](#基本用法)
    - [断点播放](#断点播放)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Media**

基于 video.js 的视频播放组件

## 示例
### 基本用法

``` vue
<template>
  <lcap-video :src="src" poster="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fd7cf4b85-be50-4ab8-b21e-4d4bb5f78460%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1690422928&t=815c2bd1e4445a1fd1904242842dc062" width="1200" @start="onStart" @play="onPlay"></lcap-video>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://static-vusion.nos-eastchina1.126.net/tutorial/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%E8%A7%86%E9%A2%91/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B%EF%BC%9AAPI%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97.mp4',
        }
    },
    methods: {
        onStart() {
            console.log('播放开始时');
        },
        onPlay() {
            console.log('继续播放时');
        },
    },
}
</script>
```
### 断点播放

```vue
<template>
  <lcap-video :src="src" width="1200" @start="onStart" @play="onPlay" :breakProgress="progress"></lcap-video>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://static-vusion.nos-eastchina1.126.net/tutorial/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%E8%A7%86%E9%A2%91/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B%EF%BC%9AAPI%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97.mp4',
            progress: '',
        }
    },
    mounted(){
      setTimeout(()=>{this.progress = '50%'}, 2000)
    },
    methods: {
        onStart() {
            console.log('播放开始时');
        },
        onPlay() {
            console.log('继续播放时');
        },
    },
}
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| src | string |  |  | 视频流地址 |
| poster | image |  |  | 视频默认封面地址 |
| breakProgress | string |  |  | 从中断的进度开始播放 |
| autoplay | boolean |  | `false` | 是否自动播放 |
| draggable | boolean |  | `true` | 是否可拖放 |
| loop | boolean |  | `false` | 是否循环播放 |

### Events

#### @start



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 播放器实例对象 |

#### @pause



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 播放器实例对象 |

#### @play



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 播放器实例对象 |

#### @ended



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 播放器实例对象 |

#### @videoProgress



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 播放进度百分比 |

Methods

#### play()

继续播放

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### pause()

暂停播放

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

