<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapH5TkScan 泰康sdk扫码

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
<lcap-tk-scan></lcap-tk-scan>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | string |  |  | 需要传入的值 |

### Slots

#### (default)

插入文本或 HTML。

Methods

#### getMsg()

获取扫码后信息

#### invoke()

调起扫码

