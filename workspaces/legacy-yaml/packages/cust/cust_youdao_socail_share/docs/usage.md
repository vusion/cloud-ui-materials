# 依赖库介绍
`cust_youdao_socail_share` 是一款专为 Codewave 低代码平台设计的「分享按钮」依赖库。它提供了集成多种主流社交平台的分享功能，方便用户在网页中快速分享内容至微博、微信、QQ、QQ空间等社交媒体。

# 包含的组件与逻辑
## 组件列表
- **cust-youdao-social-share（分享组件）**：一个高度可配置的社交分享按钮组件，支持定义分享的链接、标题、描述、图片以及启用的社交平台。

## 逻辑列表
- 暂无：本依赖库目前不包含独立的全局逻辑。

# 组件 API 说明
## cust-youdao-social-share（分享组件）
### 属性 (Attrs)
| 属性名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| url | 网址 | string | window.location.href | 需分享的网址，默认使用当前页面地址 |
| source | 来源 | string | - | 来源（QQ空间会用到）, 默认读取 head 标签中 site 相关的 meta 内容 |
| title | 标题 | string | document.title | 分享的标题，默认读取文档标题或 meta 标题 |
| description | 描述 | string | - | 分享的描述文字，默认读取 head 标签中的描述 meta 标签 |
| image | 图片 | string | - | 分享显示的图片链接，默认取网页中第一个 img 标签的地址 |
| sites | 启用的站点 | Array<string> | - | 启用的社交平台列表。合法值为：qzone, qq, weibo, douban, tencent, linkedin, google, facebook, twitter |
| wechatQrcodeTitle | 微信二维码提示标题 | string | 微信扫一扫：分享 | 微信分享二维码弹出框的标题 |
| wechatQrcodeHelper | 微信二维码提示文字 | string | <p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p> | 微信分享二维码弹出框的辅助说明文字（支持 HTML） |

### 事件 (Events)
暂无。本组件目前未定义相关的自定义事件。

### 方法 (Methods)
暂无。本组件目前未提供可供外部调用的实例方法。