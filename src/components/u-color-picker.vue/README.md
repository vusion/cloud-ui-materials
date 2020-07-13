<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UColorPicker 颜色选择器

- [示例](#示例)
    - [基本用法](#基本用法)
    - [直接使用调色板](#直接使用调色板)
- [UColorPicker API](#ucolorpicker-api)
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)
- [UPallette API](#upallette-api)
    - [Props/Attrs](#propsattrs-2)
    - [Slots](#slots-2)
    - [Events](#events-2)

用于选择颜色的组件。

## 示例
### 基本用法

``` vue
<template>
<u-color-picker v-model="color"></u-color-picker>
</template>
<script>
export default {
    data() {
        return {
            color: '#ff5a5a',
        };
    },
};
</script>
```

### 直接使用调色板

``` vue
<template>
<u-pallette v-model="color"></u-pallette>
</template>
<script>
export default {
    data() {
        return {
            color: '#ff5a5a',
        };
    },
};
</script>
```

## UColorPicker API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | string |  | `'#000000'` | 十六进制颜色，或是 rgba() |

### Slots

#### (default)

在调色板中插入文本或 HTML。

### Events

#### @input



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 调整颜色时触发 |

#### @change

修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 当前颜色 |
| $event.oldValue | string | 旧的颜色 |

## UPallette API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | string |  | `'#000000'` | 十六进制颜色，或是 rgba() |

### Slots

#### (default)

在调色板中插入文本或 HTML。

### Events

#### @input



| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 调整颜色时触发 |

#### @change

修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 当前颜色 |
| $event.oldValue | string | 旧的颜色 |

#### @open

弹出时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 弹出时的颜色值 |
| senderVM | UColorPicker | 发送事件实例 |

#### @close

隐藏时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 隐藏时的颜色值 |
| senderVM | UColorPicker | 发送事件实例 |

