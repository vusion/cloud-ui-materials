# Oauth2认证 (cw_oauth_library)

本依赖库（版本 0.1.13）专门为 Codewave 低代码平台提供与「Oauth2认证」相关的核心组件与业务逻辑，旨在简化开发者对接第三方登录验证的过程。

## 包含组件
- **cw-oauth-page-embed**：oauth内嵌组件，支持在应用页面内嵌入 OAuth 认证相关的交互界面。

## 包含逻辑
- **getOauth2Url**：获得指定类型的第三方登录地址，用于引导用户跳转至第三方授权页。
- **getOauthCodeAndState**：获取授权回调后的 code 和 state 参数，用于后续的身份校验。

## API 说明

### 组件：cw-oauth-page-embed

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | 请在这里编写代码 | 需要传入的值 |

#### 事件 (Events)
暂无内置事件说明。

#### 方法 (Methods)
暂无公开方法说明。

### 逻辑：getOauth2Url
该逻辑用于根据配置生成并返回指定社交平台或认证中心的第三方登录跳转地址。

### 逻辑：getOauthCodeAndState
该逻辑用于从当前页面的 URL 参数中解析并提取 OAuth 授权流程返回的 code（授权码）与 state（状态标识）数据。