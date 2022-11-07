<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapPrintPage 页面打印

- [示例](#示例)
    - [基本用法](#基本用法)
    - [开启自动下载](#开启自动下载)
    - [修改生成的文件类型为图片](#修改生成的文件类型为图片)
    - [控制打印的DOM元素](#控制打印的dom元素)
    - [设置生成的文件名称](#设置生成的文件名称)
    - [设置隐藏组件](#设置隐藏组件)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Other**

打印当前页面内容生成PDF文件

## 示例
### 基本用法

``` html
<lcap-printPage></lcap-printPage>
```

### 开启自动下载
``` html
<lcap-printPage :download=true></lcap-printPage>
```

### 修改生成的文件类型为图片
``` html
<lcap-printPage :download=true fileType="png"></lcap-printPage>
```

### 控制打印的DOM元素
``` html
<lcap-printPage :download=true printDOM="body"></lcap-printPage>
```

### 设置生成的文件名称
``` html
<lcap-printPage :download=true fileName="自定义文件名"></lcap-printPage>
```

### 设置隐藏组件
``` html
<lcap-printPage :hidden=true></lcap-printPage>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| hidden | boolean |  | `false` | 是否显示打印按钮 |
| fileName | string |  | `'文件导出'` | 设置打印的文件名称 |
| printDOM | string |  | `'body'` | 设置打印的DOM节点 |
| download | boolean |  | `false` | 是否自动下载打印的文件 |
| fileType | string | `[object Object]`<br/>`[object Object]` | `'pdf'` | 设置打印的文件类型 |

### Events

#### @print

打印时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.file | any | 返还打印的文件流 |

Methods

#### printPage()

打印当前页面

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

