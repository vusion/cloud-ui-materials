# cw_signature_view 签名板展示组件

本依赖库提供与「签名板展示组件」相关的组件与逻辑，可在 Codewave 低代码平台中引用。主要用于在应用中集成手写签名功能，支持笔锋效果、自定义画笔样式以及对签名结果的处理（如清除、旋转、判断是否为空等）。

## 包含的组件与逻辑

- **cw-signature-view**：核心签名板组件，提供画布交互、笔触配置及签名图片生成功能。

## API 说明

### cw-signature-view（签名板组件）

#### 属性 (Attributes)

| 属性名称 | 标题 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| openSmooth | 是否开启笔锋 | boolean | true | 是否开启笔锋效果 |
| penColor | 画笔颜色 | string | black | 设置画笔的颜色 |
| penWidth | 画笔宽度 | number | 2 | 设置画笔的粗细程度 |
| bgColor | 画布背景颜色 | string | "#F8F9FA" | 设置签名画布的背景底色 |

#### 事件 (Events)

暂无事件说明。

#### 方法 (Methods)

| 方法名称 | 标题 | 参数 | 返回值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| reloadSignature | 重新加载签名板 | - | - | 强制重新加载并初始化签名板 |
| getSignature | 获取签名板生成图片 | - | - | 获取当前签名板生成的图片数据 |
| clearSignature | 清除签名板生成图片 | - | - | 清空当前签名板上的所有笔迹 |
| rotateSignature | 旋转签名板生成图片 | angle: number (旋转角度，默认90) | - | 旋转签名生成的图片 |
| isEmpty | 签名板是否为空 | - | boolean | 判断当前签名板是否没有任何笔迹内容 |