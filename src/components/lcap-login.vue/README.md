<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapLogin 登录

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

**runtime**

账号与权限中心的统一认证登录组件

## 示例
### 基本用法

``` html
<lcap-login src="http://nuims.vusion.top"></lcap-login>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| useNormal | boolean |  | `true` | 是否开启普通登录，默认开启 |
| useQZ | boolean |  | `false` | 是否开启轻舟登录，默认关闭 |
| useLdap | boolean |  | `false` | 是否开启LDAP登录，默认关闭 |
| useNetease | boolean |  | `false` | 是否开启OpenID登录，默认关闭 |
| useGithub | boolean |  | `false` | 是否开启Github登录，默认关闭 |
| useWechat | boolean |  | `false` | 是否开启微信登录，默认关闭 |
| useIcbc | boolean |  | `false` | 是否开启工行登录，默认关闭 |
| exdays | number |  | `1` | 设置 Cookie 过期天数 |

### Events

#### @success

登录成功后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.Authorization | string | 登录成功后为用户颁发的 AccessToken |
| $event.UserId | string | 用户 ID |
| $event.UserName | string | 用户名 |
| $event.Message | string | 登录成功的信息 |

#### @error

登录失败后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.Message | string | 登录失败的信息 |

