<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapH5Signature 签名板

- [示例](#示例)
    - [基本用法](#基本用法)
    - [切换语言版本](#切换语言版本)
    - [关闭笔锋](#关闭笔锋)
    - [改变画笔颜色](#改变画笔颜色)
    - [改变画笔粗细](#改变画笔粗细)
    - [改变背景颜色](#改变背景颜色)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Form**

用于获取电子签名

## 示例
### 基本用法

``` html
<lcap-h5-signature></lcap-h5-signature>
```

### 切换语言版本
``` html
<lcap-h5-signature language="english"></lcap-h5-signature>
<lcap-h5-signature language="chinese"></lcap-h5-signature>
```

### 关闭笔锋
``` html
<lcap-h5-signature :openSmooth=false></lcap-h5-signature>
```

### 改变画笔颜色
``` html
<lcap-h5-signature penColor="red"></lcap-h5-signature>
```

### 改变画笔粗细
``` html
<lcap-h5-signature penWidth=20></lcap-h5-signature>
```

### 改变背景颜色
``` html
<lcap-h5-signature bgColor="#FFFFFF"></lcap-h5-signature>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| language | string | `[object Object]`<br/>`[object Object]` | `'english'` | 语言版本 |
| openSmooth | boolean |  | `true` | 是否开启笔锋 |
| penColor | string |  | `'black'` | 设置画笔颜色 |
| penWidth | number |  | `2` | 设置画笔宽度 |
| bgColor | string |  |  | 设置画布背景颜色 |

### Events

#### @openSignatureModal

打开签名版时触发

#### @saveSignature

保存签名时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.signature | any | 返还签名的base64 |

Methods

#### openSignatureModal()

打开签名版

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

