<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapH5TkShare 泰康sdk分享

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Methods](#methods)

**Runtime**

请在这里添加描述

## 示例
### 基本用法

``` html
<lcap-tk-share></lcap-tk-share>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | number, string, object |  |  | 需要传入的值 |
| secret | string |  |  | 秘钥,字母或数字,不使用可不填 |
| shareUrl | string |  |  | 分享地址(默认为当前页地址) |
| shareTitle | string |  |  | 微信朋友圈标题(默认为当前页标题) |
| shareBitmap | image |  |  | 分享图片的URL(过大或者不可访问会导致失败) |
| shareIntroduce | string |  |  | 朋友圈简介 |

### Slots

#### (default)

插入文本或 HTML。

Methods

#### getMsg()

获取分享后回调信息

#### invoke()

调起分享

