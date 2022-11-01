<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapH5PrintPage 页面打印

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Other**

打印当前页面内容生成PDF文件

## 示例
### 基本用法

``` html
<lcap-h5-printPage></lcap-h5-printPage>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| download | boolean |  | `false` | 是否自动下载打印的文件 |
| fileName | string |  | `'文件导出'` | 设置打印的文件名称 |

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

