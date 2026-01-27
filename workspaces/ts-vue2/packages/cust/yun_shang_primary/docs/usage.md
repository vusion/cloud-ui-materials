# 云商用通用组件 (yun_shang_primary)

## 依赖库介绍
`yun_shang_primary` 是一套专为云商用业务场景设计的通用组件库，提供了业务开发中常用的功能组件。本版本聚焦于文件上传能力的标准化，通过高度可配置的 UI 组件，帮助开发者快速实现符合业务规范的上传功能。

## 包含组件
- **yun-shang-uploader (云商上传组件)**：功能强大的上传组件，支持文件类型限制、自定义图标展示、多文件列表管理以及完善的上传状态反馈。

## 逻辑列表
（暂无逻辑列表）

## API 说明

### yun-shang-uploader (云商上传组件)

#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | nasl.collection.List<any> | [] | 上传组件值，用于存储和展示已上传的文件列表。 |
| allowedExtensions | nasl.collection.List<any> | ['wav'] | 可接受的文件扩展名数组，例如 ["wav", "mp3"]。 |
| showFileList | nasl.core.Boolean | true | 是否在上传多个文件时显示文件列表。 |
| acceptMime | nasl.core.String | 'pc-file-jpg' | 限制上传文件类型，格式为“.后缀名”，多个以逗号隔开，如“.jpeg,.png”。 |
| prefixIcon | nasl.core.String | 'pc-close' | 上传列表中文件名前显示的图标地址或标识。 |
| removeIcon | nasl.core.String | - | 上传列表中删除按钮的图标地址或标识。 |

#### 事件 (Events)
| 名称 | 参数说明 | 说明 |
| --- | --- | --- |
| onSuccess | event: { url: String; sourceUrl: String; name: String; size: Integer; type: String; uploadType: String; width: Integer; height: Integer; nosFileName: String; duration: Integer } | 文件上传成功时触发，返回文件详细元数据信息。 |
| onError | event: { error: String } | 文件上传过程中发生错误时触发。 |
| onRemove | event: { name: String; status: String; type: String } | 点击文件列表中的删除按钮时触发。 |

#### 方法 (Methods)
本组件暂无对外暴露的公开方法。

#### 插槽 (Slots)
| 名称 | 说明 |
| --- | --- |
| slotDefault | 自定义上传区域的内容。 |
| slotError | 自定义上传错误时的提示内容。 |