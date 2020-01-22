<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UWorkflow 工作流程

请在这里添加描述

## 示例
### 基本用法

``` html
<div style="width: 600px">
    <u-workflow>
        <u-workflow-item title="立项" tooltip="提示" status="done" href="https://vusion.github.io" target="_blank"></u-workflow-item>
        <u-workflow-item title="需求沟通" status="done" href="https://vusion.github.io" target="_blank">
            <div slot="tooltip">
                使用 Slot 的工具提示
            </div>
        </u-workflow-item>
        <u-workflow-item>
            <u-workflow-branch>
                <u-workflow-item title="机器上架" status="done"></u-workflow-item>
            </u-workflow-branch>
            <u-workflow-branch>
                <u-workflow-item title="网络打通" status="done"></u-workflow-item>
            </u-workflow-branch>
            <u-workflow-branch>
                <u-workflow-item title="服务版本适配" status="doing"></u-workflow-item>
            </u-workflow-branch>
        </u-workflow-item>
        <u-workflow-item title="交付验收" status="todo"></u-workflow-item>
    </u-workflow>
</div>
```

### 复杂场景

``` html
<u-workflow>
    <u-workflow-item title="立项" status="done"></u-workflow-item>
    <u-workflow-item title="需求A" status="done"></u-workflow-item>
    <u-workflow-item title="需求B" status="done"></u-workflow-item>
    <u-workflow-item>
        <u-workflow-branch>
            <u-workflow-item title="分支1-A" status="doing"></u-workflow-item>
            <u-workflow-item title="分支1-未完成" status="todo"></u-workflow-item>
        </u-workflow-branch>
        <u-workflow-branch>
            <u-workflow-item title="分支2" status="done"></u-workflow-item>
            <u-workflow-item title="分支2" status="doing"></u-workflow-item>
            <u-workflow-item title="分支2" status="todo"></u-workflow-item>
        </u-workflow-branch>
        <u-workflow-branch>
            <u-workflow-item title="分支3" status="done"></u-workflow-item>
            <u-workflow-item>
                <u-workflow-branch>
                    <u-workflow-item title="分支3-1" status="done"></u-workflow-item>
                    <u-workflow-item title="分支3-1" status="doing"></u-workflow-item>
                    <u-workflow-item title="分支3-1" status="todo"></u-workflow-item>
                </u-workflow-branch>
                <u-workflow-branch>
                    <u-workflow-item title="分支3-2" status="done"></u-workflow-item>
                    <u-workflow-item title="分支3-2" status="doing"></u-workflow-item>
                </u-workflow-branch>
            </u-workflow-item>
            <u-workflow-item title="分支3-3" status="todo"></u-workflow-item>
        </u-workflow-branch>
    </u-workflow-item>
    <u-workflow-item title="交付验收"></u-workflow-item>
</u-workflow>
```

## UWorkflow API
### Slots

#### (default)

插入 `<u-workflow-item>`。

## UWorkflowItem API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| title | string |  |  | 步骤标题 |
| href | string |  |  | 链接地址 |
| target | string |  |  | （原生属性）。比如设置`_blank`，会打开新的空白页。 |
| to | string, Location |  |  | 需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。 |
| replace | boolean |  | `false` | 需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。 |
| append | boolean |  | `false` | 需要 vue-router，与`<router-link>`的`append`属性相同。如果为`true`，则在当前路径后追加`to`的路径。 |
