# 依赖库介绍

lcap_camera_view 是一个专为 Codewave 低代码平台设计的摄像头组件库。该库提供了核心的摄像头调用能力，支持在网页端进行视频流预览、摄像头开关控制以及实时截图并上传的功能，方便开发者集成音视频采集相关的业务逻辑。

# 组件和逻辑列表

- lcap-camera（摄像头组件）：提供视频预览窗口，支持开启/关闭摄像头及截图上传功能。

# 功能说明

## lcap-camera（摄像头组件）

该组件主要用于实现网页端的摄像头交互。开发者可以通过配置属性来定义预览区域的尺寸和上传接口地址；通过组件提供的方法，可以灵活控制硬件状态（开启/关闭）；此外，其内置的截图上传逻辑能将捕捉到的画面自动发送至服务器，并通过事件回调反馈上传状态。

# API 说明

## lcap-camera 摄像头组件

### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| width | string | 800 | 宽度 |
| height | string | 600 | 高度 |
| value | Array | [] | 当前文件列表 (支持双向绑定/同步) |
| url | string | - | 上传地址 (必填) |

### 事件 (Events)

| 名称 | 标题 | 说明 | 参数 |
| :--- | :--- | :--- | :--- |
| send | 发送前触发 | 刚发送上传请求时触发 | `$event` (包含 data, preventDefault), `senderVM` (UUploader 实例) |
| progress | 进度改变时 | 发送进度改变时触发，常用于进度条展示 | `$event` (包含 data), `senderVM` (UUploader 实例) |
| success | 上传成功时 | 上传成功并接收到回传时触发 | `$event` (包含 data, file), `senderVM` (UUploader 实例) |
| error | 上传错误时 | 上传过程中报错或校验不通过时触发 | `$event` (包含 name, message, extensions, maxSize, size), `senderVM` (UUploader 实例) |

### 方法 (Methods)

| 名称 | 标题 | 说明 |
| :--- | :--- | :--- |
| open | 开启摄像头 | 开启摄像头硬件并开始预览视频流 |
| close | 关闭摄像头 | 关闭摄像头硬件并停止预览 |
| snapshot | 截图 | 捕获当前摄像头画面，并自动执行上传流程 |

## 逻辑说明

暂无。本依赖库目前仅包含 `lcap-camera` UI 组件。