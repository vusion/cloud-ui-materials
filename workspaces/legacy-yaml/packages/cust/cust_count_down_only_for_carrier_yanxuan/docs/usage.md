# 依赖库介绍

本依赖库 `cust_count_down_only_for_carrier_yanxuan` 提供与「严选打车表格倒计时组件」相关的组件，可在 Codewave 低代码平台中引用。该库主要用于在严选打车业务场景下，在表格或其他布局中实现基于时间戳的实时倒计时功能。

# 包含的组件和逻辑列表

- **cust-count-down-only-for-carrier-yanxuan**: 倒计时组件。

# 组件和逻辑功能说明

- **cust-count-down-only-for-carrier-yanxuan（倒计时）**: 该组件用于展示从指定起始时间开始的倒计时信息。通过传入起始时间戳，组件内部根据当前时间自动计算并渲染剩余时间，常用于展示询价倒计时或订单状态倒计时等场景。

# API 说明

## cust-count-down-only-for-carrier-yanxuan (倒计时)

### 属性 (attrs)

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| inquiryStartTime | number | - | 开始时间的时间戳，单位为毫秒 (ms) |

### 事件 (events)

暂无。该组件目前未定义对外的事件通知。

### 方法 (methods)

暂无。该组件目前未提供可供外部调用的实例方法。