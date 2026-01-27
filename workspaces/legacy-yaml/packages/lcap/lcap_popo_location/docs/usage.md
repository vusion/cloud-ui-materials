# 依赖库介绍

lcap_popo_location 是一个专为 Codewave 低代码平台设计的 H5 依赖库，旨在提供与「popo定位」相关的功能。该库集成了地理位置获取和设备标识识别能力，方便开发者在移动端应用中快速集成定位服务。

# 包含组件与逻辑列表

## 组件列表
- lcap-h5-popo-location：popo定位组件，用于处理地理位置获取及设备 ID 识别的 H5 组件。

## 逻辑列表
（无）

# API 说明

## lcap-h5-popo-location (popo定位)

### 属性 (Attributes)

| 名称 | 标题 | 类型 | 双向绑定 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| value | 值 | string | 是 | 当前组件关联的定位值信息 |
| deviceid | 设备id | string | 是 | 当前设备的唯一标识符 |

### 插槽 (Slots)

| 名称 | 说明 |
| :--- | :--- |
| default | 默认插槽，用于插入文本或 HTML 内容 |

### 事件 (Events)

暂无事件说明。

### 方法 (Methods)

| 名称 | 标题 | 说明 |
| :--- | :--- | :--- |
| getLocation | 获取地理位置 | 触发定位功能，获取当前设备的地理位置信息 |
| getDeviceID | 获取设备id | 触发获取当前设备唯一标识符的操作 |