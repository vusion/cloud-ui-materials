<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapAmapNavPc 地图导航PC

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)

**amap**

地图导航

## 示例
### 基本用法

``` html
<lcap-amap-nav-pc label="钱江新城" lalg="120.213982,30.250397" target="_blank"></lcap-amap-nav-pc>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| canto | boolean |  | `true` | 是否开启导航 |
| lalg | string |  |  | 位置坐标 |
| label | string |  |  | 导航页标题显示的名称 |
| target | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'_self'` | 链接打开方式 |

