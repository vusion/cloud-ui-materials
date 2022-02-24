<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# USiderModal 侧边栏弹窗

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

**Container**

侧边栏弹窗组件

## 示例
### 基本用法

设置位置

```vue
<template>
<div>
位置切换<u-switch v-model="switchToggle" style="margin:0 20px 10px 0;">Switch</u-switch>
上下位置设置：<u-input style="margin:0 20px 10px 0;" type="number" v-model="posY"></u-input>
button文本：<u-input style="margin:0 20px 10px 0;" v-model="btnText"></u-input>
<u-button style="margin:0 20px 10px 0;" @click="() => {this.toggle = !this.toggle}">显示/隐藏</u-button>
<u-sider-modal :position="posValue" :toggleShow="toggle" :buttonText="btnText" :positionY="posY">
    <div style="height:40px">content</div>
</u-sider-modal>
</div>
</template>

<script>
    export default {
        data() {
            return {
                posValue: 'left',
                switchToggle: false,
                toggle: false,
                posY: '0',
                btnText: ''
            }
        },
        watch: {
            switchToggle(value) {
                if (value) {
                    this.posValue = 'right';
                } else {
                    this.posValue = 'left';
                }
            }
        }
    }
</script>
```


## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| position | string | `[object Object]`<br/>`[object Object]` | `'right'` | 侧边栏弹窗停靠的位置（目前只支持左边和右边） |
| toggleShow | boolean |  | `false` | 是否显示侧边栏弹窗 |
| buttonText | string |  | `'侧边栏弹窗'` | 弹窗展开/收起按钮的显示文字 |
| positionY | string |  | `'0'` | 侧边栏弹窗Y轴的位置 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @before-open

打开弹窗前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| senderVM | UModal | 发送事件实例 |

#### @open

打开弹窗后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| senderVM | UModal | 发送事件实例 |

#### @before-close

关闭弹窗前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止关闭流程 |
| senderVM | UModal | 发送事件实例 |

#### @close

关闭弹窗时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| senderVM | UModal | 发送事件实例 |

