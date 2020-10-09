<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# SKFlv k 项目导航入口

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)

**InfoDisplay**

k 项目的多边形导航，内置图标

## 示例
### 基本用法

``` html
<s-k-link type="notice" to="/dashboard"></s-k-link>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| type | string |  | `'index'` | 图标类型 |
| href | string |  | `'undefined'` | 绝对链接路径，同 Link |
| to | string |  | `'undefined'` | 相对链接路径，同 Link |
| text | string |  | `'undefined'` | 展示文案，默认根据类型匹配 |
| color | string |  | `'undefined'` | 展示图标背景色，默认根据类型匹配 |

