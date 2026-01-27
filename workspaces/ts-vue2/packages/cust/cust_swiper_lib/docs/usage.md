# 轮播图 (cust_swiper_lib)

`cust_swiper_lib` 是一个专为 H5 环境设计的轮播图组件库。它提供了核心的轮播展示功能以及配套的交互控制组件，旨在帮助开发者快速实现内容滚动播放和相关的界面操作控制。

## 组件列表

- **cust-swiper-view**：轮播图核心组件，负责承载和循环展示多个数据项。
- **custom-close**：关闭图标组件，用于在界面中提供关闭或隐藏当前状态的交互能力。

## 逻辑列表

（暂无逻辑组件）

## API 说明

### cust-swiper-view (轮播图)

#### 属性 (attrs)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| list | nasl.collection.List<any> | [] | 数据源，用于渲染轮播图中的各项内容 |

#### 事件 (events)

该组件暂无事件配置。

#### 方法 (methods)

该组件暂无可用方法。

---

### custom-close (关闭图标)

#### 属性 (attrs)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| status | nasl.core.Boolean | false | 显示状态，用于控制关闭图标的激活或显隐状态 |

#### 事件 (events)

| 名称 | 类型 | 说明 |
| :--- | :--- | :--- |
| onClick | (event: { index: nasl.core.Integer }) => void | 点击图标按钮后触发，返回当前索引信息 |

#### 方法 (methods)

该组件暂无可用方法。