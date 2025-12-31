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

