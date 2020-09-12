<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UYouData 有数报表

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

**chart**, **runtime**

有数报表集成组件

## 示例
### 基本用法

``` html
<u-you-data src="https://www.baidu.com" scale="width" style="width:400px;height:200px"></u-you-data>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| src | string |  | `''` | 报表地址 |
| scale | enum | `[object Object]`, `[object Object]`, `[object Object]` | `'100'` | 有数缩放配置 |
| bottomBarPos | enum | `[object Object]`, `[object Object]` | `'bottom'` | 有数底部栏位置配置 |
| hideProgressBar | boolean |  | `true` | 有数顶部进度条隐藏配置 |
| hidePageBar | boolean |  | `true` | 有数底部工具栏隐藏配置 |
| hideScaleBar | boolean |  | `true` | 有数缩放栏隐藏配置 |
| hideTitle | boolean |  | `true` | 有数顶部标题栏隐藏配置 |
| hidePrivate | boolean |  | `true` | 有数私有文件夹隐藏配置 |
| hidePublic | boolean |  | `true` | 有数公共文件夹隐藏配置 |
| side | boolean |  | `false` | 有数侧边栏配置 |
| toolbar | array | `[object Object]`, `[object Object]`, `[object Object]` | `[export, refresh, print]` | 有数功能键配置 |
| mode | enum | `[object Object]`, `[object Object]` | `'normal'` | 有数底部导航条显示方式配置 |

### Events

#### @load

加载完成后触发

