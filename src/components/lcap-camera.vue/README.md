<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapCamera 摄像头

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Form**

开启/关闭摄影头，支持截图、上传等功能

## 示例
### 基本用法

``` html
<lcap-camera></lcap-camera>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| width | string |  | `800` | 宽度 |
| height | string |  | `600` | 高度 |
| value.sync, v-model | Array |  | `'\[\]'` | 当前文件列表 |
| url | string |  |  | 上传的地址 |
| converter | string | `'JSON'` () |  | undefined |

### Events

#### @send

刚发送时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 自定义事件对象 |
| $event.data | object | 进度相关信息 |
| $event.preventDefault | Function | 阻止上传流程 |
| senderVM | UUploader | 发送事件对象 |

#### @progress

发送进度改变时触发，在上传进度条时使用

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 自定义事件对象 |
| $event.data | object | 进度相关信息 |
| senderVM | UUploader | 发送事件对象 |

#### @complete

上传完成时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 自定义事件对象 |
| $event.xml | string | 服务器回传信息 |
| senderVM | UUploader | 发送事件对象 |

#### @success

上传成功时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 自定义事件对象 |
| $event.data | object | 服务器回传信息对象 |
| $event.file | object | 上传文件信息，不包含文件主体内容 |
| senderVM | UUploader | 发送事件对象 |

#### @error

上传报错时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 自定义事件对象 |
| $event.name | string | 错误名 |
| $event.message | string | 错误描述 |
| $event.extensions | string | 限制类型 |
| $event.maxSize | number | 限制大小 |
| $event.size | number | 当前大小 |
| senderVM | UUploader | 发送事件对象 |

Methods

#### open()

开启摄像头

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### close()

关闭摄像头

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### snapshot()

截图并且上传

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

