# lcap_signature_view 签名板

## 依赖库介绍
lcap_signature_view 是专为 Codewave 低代码平台设计的签名功能组件库。它提供了便捷的电子签名解决方案，支持在移动端或 PC 端进行手写输入，具备笔锋模拟、自定义样式及多语言支持等特性，适用于电子合同签署、表单确认及各类身份验证场景。

## 包含的组件和逻辑列表
### 组件
- **cw_lcap_signature (签名板)**：提供手写签名的交互画布及弹窗功能，支持保存为图片数据。

### 逻辑
- **暂无**：本依赖库目前暂未包含独立的逻辑函数。

## 组件 API 说明

### cw_lcap_signature (签名板)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| language | string | english | 语言版本，可选：英文 (english)、中文 (chinese) |
| buttonText | string | 请在此处签名 | 按钮显示的文本内容 |
| openSmooth | boolean | true | 是否开启笔锋效果，使书写线条更顺滑自然 |
| penColor | string | black | 设置签名画笔的颜色 |
| reSignName | boolean | false | 是否允许用户在已有签名的情况下重新签名 |
| penWidth | number | 2 | 设置签名画笔的宽度 |
| bgColor | string | "#F8F9FA" | 设置签名画布的背景颜色 |

#### 方法 (Methods)
| 名称 | 标题 | 说明 |
| :--- | :--- | :--- |
| openSignatureModal | 打开签名版 | 调用此方法可直接弹出签名板界面 |

#### 事件 (Events)
| 名称 | 标题 | 参数说明 |
| :--- | :--- | :--- |
| openSignatureModal | 打开签名版时 | 打开签名版弹窗时触发 |
| clearSignature | 清空签名版时 | 用户执行清空画布操作时触发 |
| saveSignature | 保存签名时 | 保存成功时触发，返回 `$event.signature` (any)：签名的 Base64 图片数据 |