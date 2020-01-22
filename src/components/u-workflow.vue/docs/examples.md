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
