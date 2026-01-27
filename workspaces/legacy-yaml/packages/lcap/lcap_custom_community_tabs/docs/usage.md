# 社区定制选项卡 (lcap_custom_community_tabs)

## 依赖库介绍
`lcap_custom_community_tabs` 是一个专门为 Codewave 低代码平台设计的依赖库，主要提供「社区定制选项卡」相关的组件。该库旨在帮助开发者快速在应用中集成具有定制化样式的选项卡功能，支持灵活的数据传入和内容扩展。

## 包含的组件与逻辑

### 组件
- **lcap-community-tabs (社区定制选项卡)**：用于实现社区风格的选项卡切换功能，支持自定义数值状态和内容插槽。

### 逻辑
- 暂无公开逻辑。

## API 说明

### lcap-community-tabs (社区定制选项卡)

#### 属性 (Attrs)
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | 0 | 需要传入的值 |

#### 插槽 (Slots)
| 名称 | 说明 |
| :--- | :--- |
| default | 插入文本或 HTML。 |

#### 事件 (Events)
| 事件名称 | 说明 | 参数 |
| :--- | :--- | :--- |
| change | 修改时触发 | **$event.param1**: string (参数1)<br>**$event.param2**: number (参数2) |

#### 方法 (Methods)
暂无公开方法。