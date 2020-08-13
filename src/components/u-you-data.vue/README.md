<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UYouData 有数报表

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

有数报表集成组件

## 示例
### 基本用法

``` html
<u-you-data src="https://www.baidu.com/" scale="width"></u-you-data>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| src | string |  | `''` | 报表地址 |
| width | String |  | `'auto'` | 宽度 |
| height | String |  | `'auto'` | 高度 |

### Events

#### @load

加载完成后触发

