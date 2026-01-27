# cw_amap_new 依赖库使用文档

## 依赖库介绍

高德地图组件-新版

## 包含的组件和逻辑列表

### 组件

- **cw-amap-new-nav**：地图导航
- **cw-amap-new-poi**：地图选点
- **cw-amap-new-point-maker-less**：少量通用点标记
- **cw-amap-new-point-marker-cluster**：点聚合
- **cw-amap-new-point-marker-label**：海量文字标注
- **cw-amap-new-point-marker-more**：海量点
- **cw-amap-new-point-marker-three-dim**：3d标记点

## 组件与逻辑功能说明

### cw-amap-new-nav

地图导航。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-poi

地图选点。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-point-maker-less

少量通用点标记。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-point-marker-cluster

点聚合。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-point-marker-label

海量文字标注。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-point-marker-more

海量点。可在页面中通过该组件实现对应展示或交互。

### cw-amap-new-point-marker-three-dim

3d标记点。可在页面中通过该组件实现对应展示或交互。

## API 说明

### cw-amap-new-nav

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| canto | nasl.core.Boolean | - | 是否开启导航 |
| lalg | nasl.core.String | - | 位置坐标 |
| label | nasl.core.String | - | 导航名称 |
| target | title | - | 打开方式 |
| callnativet | nasl.core.Boolean | - | 是否调起高德地图APP |

### cw-amap-new-poi

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| city | nasl.core.String | - | 默认城市 |

#### 方法

- **poiPicked**：POI点被选中后，获取经纬度以及详细地址信息

### cw-amap-new-point-maker-less

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| center | nasl.collection.List | - | 地图中心点 |
| needMoveAnimate | nasl.core.Boolean | - | 开启移动动画 |
| moveDuration | nasl.core.Integer | - | 移动动画的时长 |
| hasInfoWindow | nasl.core.Boolean | - | 是否使用点信息插槽 |
| customPointOptions | object \| Function | - | 自定义的点属性 |

#### 方法

- **reload**：清除缓存，重新加载

### cw-amap-new-point-marker-cluster

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| idField | group | - | ID字段 |
| positionField | group | - | 位置字段 |
| textContentField | title | - | 文本字段 |
| center | nasl.collection.List | - | 地图中心点 |
| hasInfoWindow | nasl.core.Boolean | - | 是否使用点信息插槽 |
| customPointOptions | object \| Function | - | 自定义的点属性 |
| gridSize | nasl.core.Integer | - | 聚合距离 |

#### 方法

- **reload**：清除缓存，重新加载

### cw-amap-new-point-marker-label

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| idField | group | - | ID字段 |
| positionField | group | - | 位置字段 |
| textContentField | title | - | 文本字段 |
| center | nasl.collection.List | - | 地图中心点 |
| needMoveAnimate | nasl.core.Boolean | - | 开启移动动画 |
| moveDuration | nasl.core.Integer | - | 移动动画的时长 |
| hasInfoWindow | nasl.core.Boolean | - | 是否使用点信息插槽 |
| customPointOptions | object \| Function | - | 自定义的点属性 |
| collision | nasl.core.Boolean | - | 标注是否避让 |
| allowCollision | nasl.core.Boolean | - | 地图底层是否避让 |

#### 方法

- **reload**：清除缓存，重新加载

### cw-amap-new-point-marker-more

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| idField | group | - | ID字段 |
| positionField | group | - | 位置字段 |
| styleField | title | - | 样式字段 |
| center | nasl.collection.List | - | 地图中心点 |
| customPointOptions | object \| Function | - | 自定义的点属性 |
| hasInfoWindow | nasl.core.Boolean | - | 是否使用点信息插槽 |

#### 方法

- **reload**：清除缓存，重新加载

### cw-amap-new-point-marker-three-dim

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | group | - | 数据源 |
| dataSchema | T | - | 数据类型 |
| idField | group | - | ID字段 |
| positionField | group | - | 位置字段 |
| typeField | group | - | 类型字段 |
| textContentField | title | - | 文本字段 |
| center | nasl.collection.List | - | 地图中心点 |
| needMoveAnimate | nasl.core.Boolean | - | 开启移动动画 |
| moveDuration | nasl.core.Integer | - | 移动动画的时长 |
| hasInfoWindow | nasl.core.Boolean | - | 是否使用点信息插槽 |
| textureMap | any | - | 纹理属性 |
| debounceTime | nasl.core.Integer | - | 点信息插槽更新时间 |
| value | nasl.core.String | - | 值 |
| placement | title | - | 弹出方向 |

#### 方法

- **reload**：清除缓存，重新加载

