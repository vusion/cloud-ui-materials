<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# ERipple 波纹

**特效组件**

波纹，插入到需要添加波纹的元素或组件内部

## 示例
### 基本用法

``` html
<u-linear-layout>
    <u-button>
        按钮
        <e-ripple></e-ripple>
    </u-button>
    <u-button color="primary">
        按钮
        <e-ripple color="light"></e-ripple>
    </u-button>
</u-linear-layout>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| color | enum | `'light'`, `'dark'` | `'light'` | 波纹颜色 |
