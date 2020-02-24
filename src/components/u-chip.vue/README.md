<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UChip 薯条

**行内展示**, **表单验证器**

类似于标签组件，用于条目的增删改查。

## 示例
### 基本用法

``` html
<u-chip>Chip</u-chip>
<u-chip editing>Chip</u-chip>
<u-chip editing error>Chip</u-chip>
```

### 可删除的

删除逻辑需要利用`v-if`和`@remove`事件自己实现。

``` html
<u-chip removable>Chip</u-chip>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| removable | boolean |  | `false` | 是否可以删除 |
| editing | boolean |  | `false` | 是否正在编辑 |
| error | boolean |  | `false` | 是否显示红框错误提示 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @before-remove

删除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | null | 无参数 |
| senderVM | UChip | 发送事件实例 |
