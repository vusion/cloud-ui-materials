# uniSDK登录组件 (cw_uni_sdk)

本依赖库提供了一套完整的 uniSDK 登录解决方案，主要用于在移动应用中集成标准的登录界面与交互逻辑。通过该库，开发者可以快速实现符合合规要求的登录功能，包括服务协议、隐私政策、儿童信息保护政策的展示以及 URS 相关配置的下发。

## 包含组件

- **uni-sdk-login**: uniSDK登录组件，负责展示登录界面及处理登录协议跳转与成功回调。

## 包含逻辑

暂无相关逻辑。

## API 说明

### uni-sdk-login (uniSDK登录组件)

#### 属性 (Attrs)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| serviceAgreement | String | 'https://protocol.unisdk.netease.com/release/latest_v5.html' | 服务协议链接 |
| privacyAgreement | String | 'https://unisdk.update.netease.com/html/latest_v90.html' | 隐私协议链接 |
| childrenPolicy | String | 'https://protocol.unisdk.netease.com/release/latest_v106.html' | 儿童信息保护及监护人须知链接 |
| URSConfig | String | '{}' | URS 配置数据，支持同步双向绑定 |

#### 事件 (Events)

| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| onSuccess | event: { value: V, item: T } | 登录成功时触发，返回登录相关数据 |

#### 方法 (Methods)

暂无该组件的公开调用方法。