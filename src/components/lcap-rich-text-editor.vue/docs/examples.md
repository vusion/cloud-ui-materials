### 基本用法

通过双向绑定输入内容

``` vue
<template>
<div>
<lcap-rich-text-editor :value.sync="tip" :formula="true" style="margin-bottom: 10px;"></lcap-rich-text-editor>
<lcap-rich-text-editor :value.sync="tip" :readOnly="bool"></lcap-rich-text-editor>
</div>
</template>

<script>
export default {
    data() {
        return {
            tip: "测试内容",
            bool: true
        }
    }
}
</script>
```

输入提示

``` vue
<template>
<div>
<u-input v-model="tip" placeholder="请输入" style="margin-bottom: 10px;"></u-input>
<lcap-rich-text-editor :placeholder="tip"></lcap-rich-text-editor>
</div>
</template>

<script>
export default {
    data() {
        return {
            tip: ""
        }
    }
}
</script>
```

### 只读模式

只读模式可以作为富文本编辑器的内容展示区，默认隐藏工具栏，通过`readOnly`设置

``` vue
<template>
<div>
    <u-switch v-model="switchToggle" style="margin-bottom: 10px;">Switch</u-switch>
    <lcap-rich-text-editor :readOnly="switchToggle"></lcap-rich-text-editor>
</div>
</template>

<script>
export default {
    data() {
        return {
            switchToggle: false
        }
    }
}
</script>
```

### 可选功能

给`formula`设置`true`可以开启公式输入功能, 给`textSub`设置`true`可以开启文本下标功能, 给`textSuper`设置`true`可以开启文本上标功能

``` vue
<template>
<div>
    <div style="margin-bottom: 10px;">
        <u-switch v-model="showFormula">Switch</u-switch>
        <u-switch v-model="showTextSub">Switch</u-switch>
        <u-switch v-model="showTextSuper">Switch</u-switch>
    </div>
    <lcap-rich-text-editor :formula="showFormula" :textSub="showTextSub" :textSuper="showTextSuper"></lcap-rich-text-editor>
</div>
</template>

<script>
export default {
    data() {
        return {
            showFormula: true,
            showTextSub: true,
            showTextSuper: true
        }
    }
}
</script>
```