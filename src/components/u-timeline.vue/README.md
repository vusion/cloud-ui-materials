<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UTimeline 时间线

垂直展示的时间流信息。

## 示例
### 基本用法

``` html
<u-timeline>
    <u-timeline-item>2020-01-20 xxxx</u-timeline-item>
    <u-timeline-item>
        <div>2020-01-20 xxxx</div>
        <div>Some description</div>
    </u-timeline-item>
    <u-timeline-item>2020-01-20 xxxx</u-timeline-item>
    <u-timeline-item>2020-01-20 xxxx</u-timeline-item>
</u-timeline>
```

### 修改颜色

``` html
<u-timeline>
    <u-timeline-item color="primary">2020-01-20 xxxx</u-timeline-item>
    <u-timeline-item color="success">
        <div>2020-01-20 xxxx</div>
        <div>Some description</div>
    </u-timeline-item>
    <u-timeline-item color="warning">
        <div>2020-01-20 xxxx</div>
        <div>Some description</div>
    </u-timeline-item>
    <u-timeline-item color="error">2020-01-20 xxxx</u-timeline-item>
    <u-timeline-item>2020-01-20 xxxx</u-timeline-item>
</u-timeline>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | number |  | `0` | 需要传入的值 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @change

修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.param1 | string | 参数1 |
| $event.param2 | number | 参数2 |
