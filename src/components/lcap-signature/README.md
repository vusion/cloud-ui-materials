<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapSignature 签名板

- [示例](#示例)
    - [基本用法](#基本用法)
    - [切换语言版本](#切换语言版本)
    - [关闭笔锋](#关闭笔锋)
    - [是否允许重新签名](#是否允许重新签名)
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
<lcap-signature></lcap-signature>
<u-button ref="button1" color="primary" text="确定"></u-button>
```

### 切换语言版本
``` html
<lcap-signature language="english"></lcap-signature>
<lcap-signature language="chinese"></lcap-signature>
```

### 关闭笔锋
``` html
<lcap-signature :openSmooth=false></lcap-signature>
```

### 是否允许重新签名
``` html
<lcap-signature :openSmooth=false :reSignName=true></lcap-signature>
```

### 改变画笔颜色
``` html
<lcap-signature penColor="red"></lcap-signature>
```

### 改变画笔粗细
``` html
<lcap-signature :penWidth=20></lcap-signature>
```

### 改变背景颜色
``` html
<lcap-signature bgColor="#FFFFFF"></lcap-signature>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| language | string | `[object Object]`<br/>`[object Object]` | `'english'` | 语言版本 |
| openSmooth | boolean |  | `true` | 是否开启笔锋 |
| penColor | string |  | `'black'` | 设置画笔颜色 |
| reSignName | boolean |  | `false` | 是否允许用户重新签名 |
| penWidth | number |  | `2` | 设置画笔宽度 |
| bgColor | string |  | `'#F8F9FA'` | 设置画布背景颜色 |

### Events

#### @openSignatureModal

打开签名版时触发

#### @clearSignature

清空签名版时触发

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

