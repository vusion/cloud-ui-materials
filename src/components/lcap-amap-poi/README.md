<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapAmapPoi 地图选点

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**amap**

地图选点

## 示例
### 基本用法

``` html
<lcap-amap-poi></lcap-amap-poi>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| city | string |  |  | 默认城市 |

### Events

#### @select

点被选中后，可以调用逻辑（如，选择城北体育公园后，自动在详细地址输入框填充详细地址信息）

Methods

#### poiPicked()

POI点被选中后，获取经纬度以及详细地址信息

