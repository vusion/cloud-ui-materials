<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UChipInput 条目输入框

**表单验证器**

用于输入一系列条目。

## 示例
### 基本用法

点击输入区域进行输入。在完成一项输入之后，可以通过 <kbd>Tab</kbd>, <kbd>Enter</kbd> 按键或鼠标失焦生成该项条目。

``` html
<u-chip-input></u-chip-input>
```

### 双向绑定

一般使用`v-model`或`:value.sync`双向绑定一个字符串数组。

``` vue
<template>
<u-chip-input v-model="list"></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'aaa',
                'bbb',
                'ccc',
            ],
        };
    },
};
</script>
```

### 表单验证

#### 每项的规则

通过`rules`设置规则，条目输入框可以接入到 [Cloud UI 表单验证体系](https://vusion.github.io/cloud-ui/components/cloud-ui/components/u-validator/examples)中，各类规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)。

比如在下面的例子中，要求用户输入正确的 IP 地址。

``` vue
<template>
<u-form-item label="IP 地址" bubble>
    <u-chip-input v-model="list" placeholder="请输入 IP 地址" rules="ip # 请输入正确的 IP 地址"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '10.0.10.32',
                '192.168.1.1',
            ],
        };
    },
};
</script>
```

#### 列表的规则

通过`list-rules`设置整个数组的验证规则，比如列表项的数量等。规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)中与数组相关的一些规则。

下面的例子中，数组不能为空，最多可以添加 2 个条目，且不能有重复项。

``` vue
<template>
<u-form-item label="数字列表" bubble>
    <u-chip-input v-model="list" rules="numeric" list-rules="notEmpty # 需要至少输入一个数字项 | maxLength(2) # 数字项不得超过 2 个 | noDuplicates"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [],
        };
    },
};
</script>
```

### 分隔符与复制粘贴

默认分隔符为`,`，如果添加或修改条目时出现`,`，会将它前面字符串视为一个完成项进行添加。

另外，本组件支持一次粘贴多个条目的功能。如果复制粘贴的字符串包括多个分隔符，会依次添加。

如果添加时验证到中间有错误的一项，会中止粘贴的操作。

在下面的例子中，可以尝试复制`2020-02-02,2020-02-29,2019-12-18,2019-02-,2019-02-29`，粘贴到输入框中。

``` vue
<template>
<u-form-item label="日期" bubble>
    <u-chip-input v-model="list" separators="," placeholder="请输入多个日期" rules="iso8601(true) # 请输入合法的日期"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '2019-06-25',
            ],
        };
    },
};
</script>
```

#### 修改分隔符

通过修改`separators`属性，设置分隔符。

比如下面的例子中，支持`,; `多种分隔。尝试复制`2020-02-02 2020-02-29 2019-12-18;2008-02-18,2003-05-16`，粘贴到输入框中。

``` vue
<template>
<u-form-item label="日期" bubble>
    <u-chip-input v-model="list" separators=",; " placeholder="请输入多个日期" rules="iso8601(true) # 请输入合法的日期"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '2019-06-25',
            ],
        };
    },
};
</script>
```

单行输入框中会自动把`\n\t`等字符变成空格，如果需要按换行符分隔，可以通过设置空格或者`\\s`来实现。

在下面的例子中，尝试复制下面的代码到输入框中。

```
2020-02-02
2020-02-29
2019-12-18
2019-02-08
2019-02-29
```

``` vue
<template>
<u-form-item label="日期" bubble>
    <u-chip-input v-model="list" separators=" " placeholder="请输入多个日期" rules="iso8601(true) # 请输入合法的日期"></u-chip-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            list: [
                '2019-06-25',
            ],
        };
    },
};
</script>
```

### 禁用状态

``` vue
<template>
<u-chip-input v-model="list" disabled></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'a-value',
                'b-value',
                'c-value',
            ],
        };
    },
};
</script>
```

### 一键清除

添加`clearable`属性，可以开启一键清除按钮。

``` vue
<template>
<u-chip-input v-model="list" clearable></u-chip-input>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'a-value',
                'b-value',
                'c-value',
            ],
        };
    },
};
</script>
```

### 添加图标

可以使用`prefix`和`suffix`添加图标。

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-chip-input v-model="list" prefix="search"></u-chip-input>
    <u-chip-input v-model="list" suffix="search"></u-chip-input>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'a-value',
                'b-value',
                'c-value',
            ],
        };
    },
};
</script>
```

### 修改尺寸

支持`normal`、`large`、`huge`、`full`几种级别的宽高组合。

``` vue
<template>
<u-linear-layout direction="vertical">
    <u-chip-input size="normal large" v-model="list"></u-chip-input>
    <u-chip-input size="large" v-model="list"></u-chip-input>
    <u-chip-input size="huge" v-model="list"></u-chip-input>
    <u-chip-input size="full" v-model="list"></u-chip-input>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            list: [
                'aaa',
                'bbb',
                'ccc',
            ],
        };
    },
};
</script>
```

### 综合示例

``` vue
<template>
<u-form ref="form">
    <u-form-item required label="实例名称" rules="required | alphaNum">
        <u-input v-model="model.name" placeholder="请输入实例名称"></u-input>
    </u-form-item>
    <u-form-item required label="端口" rules="required | port">
        <u-input v-model="model.port" placeholder="请输入端口"></u-input>
    </u-form-item>
    <u-form-item required label="白名单" layout="block" :bubble="true">
        <u-chip-input size="huge" v-model="model.whitelist" placeholder="请输入 IP 地址" rules="ip" list-rules="notEmpty # 至少输入一个 IP | maxLength(3) # IP 不得超过 3 个 | noDuplicates"></u-chip-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit">立即创建</u-button>
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            model: {
                name: 'abc',
                port: '8002',
                whitelist: [],
            }
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate()
                .then(() => this.$toast.show('验证通过，提交成功！'))
                .catch(() => this.$toast.show('验证失败！'));
            },
        },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | Array |  | `'\[\]'` | 条目列表 |
| placeholder | string |  | `'请输入内容'` | 输入框的占位符 |
| rules | string, Array\<Rule\> |  |  | 针对每一项的验证规则 |
| list-rules | string, Array\<Rule\> |  |  | 针对整个列表的验证规则 |
| separators | string |  | `','` | 分隔符 |
| clearable | boolean |  |  | 是否显示一键清除按钮 |
| prefix | enum | `'search'` |  | 前缀图标 |
| suffix | enum | `'search'` |  | 后缀图标 |
| size | string |  |  | `normal`、`large`、`huge` 几种级别的组合 |
| disabled | boolean |  |  | 是否禁用 |

### Slots

#### (default)

插入文本或 HTML。

#### prefix

自定义前缀内容

#### suffix

自定义后缀内容

### Events

#### @before-add

添加前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | string | 待添加的项 |
| $event.oldValue | Array | 旧的条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @add

添加后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | string | 添加的项 |
| $event.value | Array | 当前条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @before-edit

编辑前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldText | string | 编辑前的项 |
| $event.text | string | 编辑后的项 |
| $event.index | number | 编辑的索引 |
| $event.value | Array | 条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @edit

编辑后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | string | 编辑后的项 |
| $event.index | number | 编辑的索引 |
| $event.value | Array | 条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @before-remove

删除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | string | 待删除的项 |
| $event.index | number | 删除项的索引 |
| $event.oldValue | Array | 旧的条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @remove

删除后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | string | 待删除的项 |
| $event.index | number | 删除项的索引 |
| $event.value | Array | 当前条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @before-clear

清除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldValue | Array | 旧的条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @clear

清除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Array | 改变后的条目列表 |
| senderVM | UChipInput | 发送事件实例 |

#### @change

条目列表改变后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldValue | Array | 旧的条目列表 |
| $event.value | Array | 改变后的条目列表 |
| senderVM | UChipInput | 发送事件实例 |

### Methods

#### edit(index)

编辑某一项

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| index | number |  | 编辑项的索引 |

#### save(index)

保存正在编辑的项

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| index | number |  | 保存项的索引 |

#### remove(index)

删除某一项

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| index | number |  | 删除项的索引 |

#### focus()

让输入框获取焦点。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### blur()

让输入框失去焦点。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### clear()

清空输入框中所有条目。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

### ARIA and Keyboard

| Key | Description |
| --- | ----------- |
| Enter | 完成当前项的输入 |
| Tab | 完成当前项的输入 |
| Delete | 删除前一项 |
