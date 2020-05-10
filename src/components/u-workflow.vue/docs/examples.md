### 基本用法

使用`<u-workflow>`、`<u-workflow-item>`、`<u-workflow-branch>`三个组件组织图的基本结构。

其中`<u-workflow-item>`包含 Cloud UI 中`<u-button>`的所有属性，这意味着你可以使用`href`和`to`等属性很方便地添加链接。

``` html { width: 600px }
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
```

### 添加左侧标签

在最外面一层的`<u-workflow-item>`上，添加`label`属性，可以显示左侧标签。

``` html { width: 600px }
<u-workflow>
    <u-workflow-item label="步骤1" title="立项" tooltip="提示" status="done" href="https://vusion.github.io" target="_blank"></u-workflow-item>
    <u-workflow-item label="步骤2" title="需求沟通" status="done" href="https://vusion.github.io" target="_blank">
        <div slot="tooltip">
            使用 Slot 的工具提示
        </div>
    </u-workflow-item>
    <u-workflow-item label="步骤3">
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
    <u-workflow-item label="步骤4" title="交付验收" status="todo"></u-workflow-item>
</u-workflow>
```

### 复杂场景

下面是一个结构更加复杂的示例。

``` html
<u-workflow label-size="small">
    <u-workflow-item label="步骤1" title="立项" status="done"></u-workflow-item>
    <u-workflow-item label="步骤2" title="需求A" status="done"></u-workflow-item>
    <u-workflow-item label="步骤3" title="需求B" status="done"></u-workflow-item>
    <u-workflow-item label="步骤4">
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
