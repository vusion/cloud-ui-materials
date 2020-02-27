<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UPairInput 键值对输入框

用于输入一系列键值对。

## 示例
### 基本用法

点击输入区域进行输入。在完成键或值的输入之后，可以通过 <kbd>Tab</kbd>, <kbd>Enter</kbd> 按键或鼠标失焦切换输入。

``` html
<u-pair-input></u-pair-input>
```

### 双向绑定

使用`v-model`或`:value.sync`双向绑定一个数组。

``` vue
<template>
<u-pair-input v-model="pairs"></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
            ],
        };
    },
};
</script>
```

### 指定键值字段名

可以使用`key-field`和`value-field`指定字段名。

``` vue
<template>
<u-pair-input v-model="pairs" key-field="name" value-field="fingerprinter" key-placeholder="请输入 Name" value-placeholder="请输入指纹"></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { name: 'ssh-name', fingerprinter: '2e:f7:17:a5:c4:41:00:59:dd:46:0d:be:a1:75:a2:86' },
                { name: 'gen-ssh', fingerprinter: '61:36:66:fb:b1:3f:f7:2c:c2:5d:91:45:7a:ed:82:75' },
                { name: 'c163yun', fingerprinter: 'fa:52:8b:7d:34:06:3d:6d:c8:84:ad:4b:a4:b4:dc:c0' },
            ],
        };
    },
};
</script>
```

### 表单验证

#### 键值的规则

通过`key-rules`和`value-rules`设置规则，条目输入框可以接入到 [Cloud UI 表单验证体系](https://vusion.github.io/cloud-ui/components/cloud-ui/components/u-validator/examples)中，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)。

比如在下面的例子中，键只能输入字母、数字，值只能输入数字，不得少于 4 位。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNum" value-rules="numeric | minLength(4) # 值不得少于 4 个数字"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaaa', value: 1234 },
                { key: 'bbbb', value: 5678 },
                { key: 'cccc', value: 9101 },
            ],
        };
    },
};
</script>
```

#### 列表的规则

通过`list-rules`设置键值对数组的规则，规则参见[UValidator](https://vusion.github.io/cloud-ui/components/u-validator/rules)中与数组相关的一些规则。

下面的例子中，数组不能为空，且最多可以添加 2 个键值对。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNum" value-rules="numeric | minLength(4)" list-rules="notEmpty # 需要至少输入一个键值对 | maxLength(2) # 键值对不得超过 2 个"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [],
        };
    },
};
</script>
```

### 分隔符与复制粘贴

键与值之间的分隔符固定为`:`，不能修改。

键值对之间的分隔符为`,`，如果添加或修改时出现`,`，会将它前面的输入视为一个完成项进行添加。

另外，本组件支持一次粘贴多个键值对的功能。如果复制粘贴的键值对包括多个分隔符，会依次添加。

如果添加时验证到中间有错误的一项，会中止粘贴的操作。

在下面的例子中，可以尝试复制`www: 4444, xxx: 5555, yyy: 666, zzz: 7777`，粘贴到输入框中。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" key-rules="alphaNum" value-rules="numeric | minLength(4) # 值不得少于 4 个数字"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaaa', value: 1234 },
                { key: 'bbbb', value: 5678 },
                { key: 'cccc', value: 9101 },
            ],
        };
    },
};
</script>
```

#### 修改分隔符

通过修改`separators`属性，设置分隔符。

比如下面的例子中，需要用`;`分隔。尝试复制`www: 4444; xxx: 5555; yyy: 666; zzz: 7777`，粘贴到输入框中。

``` vue
<template>
<u-form-item label="键值对" bubble>
    <u-pair-input v-model="pairs" separators=";" key-rules="alphaNum" value-rules="numeric | minLength(4) # 值不得少于 4 个数字"></u-pair-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaaa', value: 1234 },
                { key: 'bbbb', value: 5678 },
                { key: 'cccc', value: 9101 },
            ],
        };
    },
};
</script>
```

### 禁用状态

``` vue
<template>
<u-pair-input v-model="pairs" disabled></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
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
<u-pair-input v-model="pairs" clearable></u-pair-input>
</template>
<script>
export default {
    data() {
        return {
            pairs: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
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
    <u-pair-input v-model="list" prefix="search"></u-pair-input>
    <u-pair-input v-model="list" suffix="search"></u-pair-input>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
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
    <u-pair-input size="normal large" v-model="list"></u-pair-input>
    <u-pair-input size="large" v-model="list"></u-pair-input>
    <u-pair-input size="huge" v-model="list"></u-pair-input>
    <u-pair-input size="full" v-model="list"></u-pair-input>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { key: 'aaa', value: 'a-value' },
                { key: 'bbb', value: 'b-value' },
                { key: 'ccc', value: 'c-value' },
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
    <u-form-item required label="环境变量" layout="block" :bubble="true">
        <u-pair-input size="huge" v-model="model.whitelist" key-placeholder="请输入环境变量名称" value-placeholder="请输入环境变量的值" key-rules="required | alphaNumDash" value-rules="required | alphaNumDash" list-rules="notEmpty # 至少输入一个环境变量 | maxLength(3) # 环境变量不得超过 3 个"></u-pair-input>
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
| value.sync, v-model | Array |  | `'\[\]'` | 键值对列表 |
| key-field | string |  | `'key'` | 键字段 |
| value-field | string |  | `'value'` | 值字段 |
| key-placeholder | string |  | `'请输入 Key 值'` | 键输入框的占位符 |
| value-placeholder | string |  | `'请输入 Value 值'` | 值输入框的占位符 |
| key-rules | string, Array\<Rule\> |  |  | 针对键的验证规则 |
| value-rules | string, Array\<Rule\> |  |  | 针对值的验证规则 |
| list-rules | string, Array\<Rule\> |  |  | 针对整个键值对列表的验证规则 |
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
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 待添加的项 |
| $event.oldValue | Array | 旧的键值对数组 |
| senderVM | UPairInput | 发送事件实例 |

#### @add

添加后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 添加的项 |
| $event.value | Array | 当前键值对数组 |
| senderVM | UPairInput | 发送事件实例 |

#### @before-edit

编辑前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldItem | { \[keyField\]: string, \[valueField\]: string } | 编辑前的项 |
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 编辑后的项 |
| $event.value | Array | 键值对数组 |
| $event.index | number | 编辑的索引 |
| $event.type | 'key' \| 'value' | 编辑的类型，为键还是为值 |
| $event.field | string | 编辑的字段 |
| senderVM | UPairInput | 发送事件实例 |

#### @edit

编辑后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 编辑后的项 |
| $event.value | Array | 键值对数组 |
| $event.index | number | 编辑的索引 |
| $event.type | 'key' \| 'value' | 编辑的类型，为键还是为值 |
| $event.field | string | 编辑的字段 |
| senderVM | UPairInput | 发送事件实例 |

#### @before-remove

删除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 待删除的项 |
| $event.oldValue | Array | 旧的键值对数组 |
| $event.index | number | 删除项的索引 |
| senderVM | UPairInput | 发送事件实例 |

#### @remove

删除后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Array | 当前键值对数组 |
| $event.item | { \[keyField\]: string, \[valueField\]: string } | 待删除的项 |
| $event.index | number | 删除项的索引 |
| senderVM | UPairInput | 发送事件实例 |

#### @before-clear

清除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldValue | Array | 旧的键值对数组 |
| $event.value | Array | 改变后的键值对数组 |
| senderVM | UPairInput | 发送事件实例 |

#### @before-clear

清除前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldValue | Array | 旧的键值对数组 |
| $event.value | Array | 改变后的键值对数组 |
| senderVM | UPairInput | 发送事件实例 |

#### @change

键值对数组改变后触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.oldValue | Array | 旧的键值对数组 |
| $event.value | Array | 改变后的键值对数组 |
| senderVM | UPairInput | 发送事件实例 |

### Methods

#### edit(index, type)

编辑某一项

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| index | number |  | 编辑项的索引 |
| type | enum |  | 编辑键还是值 |

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

让键值对输入框获取焦点。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### blur()

让键值对输入框失去焦点。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### clear()

清空输入框中所有键值对。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

### ARIA and Keyboard

| Key | Description |
| --- | ----------- |
| Enter | 完成当前项的输入 |
| Tab | 完成当前项的输入 |
| Delete | 删除前一项 |
