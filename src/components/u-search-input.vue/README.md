<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# USearchInput 联想搜索框

u-input 联想搜索框，自动补全输入内容

## 示例
### 基本形式

``` vue
<template>
<u-linear-layout style="height:100px">
    <u-search-input :loadList="loadList"></u-search-input>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```
### 搜索内容双向绑定

u-search-input与一般的u-input不太相同，u-search-input用户可绑定的数据有两个searchWord与value，其中searchWord是input输入框中的实际值，value为用户选择值的对象，这种设计方式主要是有些业务场景中使用者只关心input中的输入值，而有些场景下使用者需要的是loaderList中的value值而不是text。任选其一作为双向绑定的参数,searchWord实时变化，而value只有选中某一个值是才会出现变动其等于loadlist中的选中项

``` vue
<template>
<div>
    <div>
        <u-search-input v-model="value" :loadList="loadList" size="large" search="left" clearable>
        </u-search-input>
    </div>
    <div style="margin-top:20px;">
        <u-search-input :searchWord.sync="searchWord" :loadList="loadList" size="large" search="left" clearable>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            value: {
                text: 'jiande-private',
                value: '1',
            },
            searchWord: 'yiqiao-public',
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```

### searchWord与value一致性检查

value与searchWord存在偏差，所以在此提供keyWord与value的一致性检查开关，设置为true将在输入框失焦时检查并同步keyWord为value的text

``` vue
<template>
<div>
    <div>
        <u-search-input v-model="value" :valueCheck="true"  :loadList="loadList" size="large" search="left" clearable>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            value: {
                text: 'jiande-private',
                value: '1',
            },
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```

### 下拉框位置偏移
``` vue
<template>
<div>
    <div>
        <u-search-input :offset="20" :loadList="loadList" size="large" search="left" clearable>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```
### 输入框尺寸
搜索输入框尺寸设置方式与u-input相同，通过设置与u-input相同size尺寸可以控制达到所有u-input效果
``` vue
<template>
<div>
<u-linear-layout style="height:100px">
    <u-search-input :loadList="loadList"></u-search-input>
</u-linear-layout>
<u-linear-layout style="height:100px">
    <u-search-input size="large" :loadList="loadList"></u-search-input>
</u-linear-layout>
<u-linear-layout style="height:100px">
    <u-search-input size="huge" :loadList="loadList"></u-search-input>
</u-linear-layout>
</div>
</template>
<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```
### 可清除
搜索输入框尺寸设置方式与u-input相同，通过设置与u-input相同size尺寸可以控制达到所有u-input效果
``` vue
<template>
<u-linear-layout style="height:100px">
    <u-search-input :loadList="loadList" clearable></u-search-input>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```
### 搜索图标
``` vue
<template>
<div>
    <div>
        <u-search-input :loadList="loadList" size="large" search="left" clearable></u-search-input>
    </div>
    <div style="margin-top:20px;">
        <u-search-input :loadList="loadList" size="large" search="right"  clearable></u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```

### 自定义搜索列表项
``` vue
<template>
<div>
    <div>
        <u-search-input :loadList="loadList" size="large" search="left" clearable>
            <div slot-scope="scope">
                <p style="margin: 5px 0px;line-height: 12px;">{{scope.item.text}}</p>
                <p style="margin: 5px 0px;color: #2333;line-height: 12px;">{{scope.item.description}}</p>
            </div>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                description: '建德私有云环境',
                value: '1',
            },{
                text: 'jiande-public',
                description: '建德公有云环境',
                value: '2',
            },{
                text: 'yiqiao-public',
                description: '义桥公有云环境',
                value: '3',
            },{
                text: 'liantong-public',
                description: '联通公有云环境',
                value: '4',
            },{
                text: 'region-1',
                description: 'region云环境',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```

### 自定义搜索列表项
``` vue
<template>
<div>
    <div>
        <u-search-input :loadList="loadList" size="large" search="left" clearable>
            <div slot-scope="scope">
                <p style="margin: 5px 0px;line-height: 12px;">{{scope.item.text}}</p>
                <p style="margin: 5px 0px;color: #2333;line-height: 12px;">{{scope.item.description}}</p>
            </div>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            data: [{
                text: 'jiande-private',
                description: '建德私有云环境',
                value: '1',
            },{
                text: 'jiande-public',
                description: '建德公有云环境',
                value: '2',
            },{
                text: 'yiqiao-public',
                description: '义桥公有云环境',
                value: '3',
            },{
                text: 'liantong-public',
                description: '联通公有云环境',
                value: '4',
            },{
                text: 'region-1',
                description: 'region云环境',
                value: '5',
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            return this.data.filter((item) => {
                return item.text.includes(keyWord);
            });
        },
    }
};
</script>
```

### 搜索内容分组
``` vue
<template>
<div>
    <div>
        <u-search-input :loadList="loadList" size="large" search="left" clearable>
            <div slot-scope="scope">
                <p style="margin: 5px 0px;line-height: 12px;">{{scope.item.text}}</p>
                <p style="margin: 5px 0px;color: #2333;line-height: 12px;">{{scope.item.description}}</p>
            </div>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```
### 自定义搜索内容分组
``` vue
<template>
<div>
    <div>
        <u-search-input :loadList="loadList" size="large" search="left" clearable>
            <u-linear-layout justify="space-between" style="padding:5px 10px;border-bottom:1px solid #dfe4ec;border-top:1px solid #dfe4ec;" slot="header" slot-scope="scope">
                <span>{{scope.group.title}}</span>
                <u-link>查看更多</u-link>
            </u-linear-layout>
            <div slot-scope="scope">
                <p style="margin: 5px 0px;line-height: 12px;">{{scope.item.text}}</p>
                <p style="margin: 5px 0px;color: #2333;line-height: 12px;">{{scope.item.description}}</p>
            </div>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```

### 默认占位提示

``` vue
<template>
<div>
    <div>
        <u-search-input placeholder="请输入环境名称" :valueCheck="true"  :loadList="loadList" size="large" search="left" clearable>
        </u-search-input>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                text: '建德',
                value: 'jiande',
                children: [{
                    text: 'jiande-private',
                    description: '建德私有云环境',
                    value: '1',
                },{
                    text: 'jiande-public',
                    description: '建德公有云环境',
                    value: '2',
                }]
            }, {
                text: '义桥',
                value: 'yiqiao',
                children: [{
                    text: 'yiqiao-public',
                    description: '义桥公有云环境',
                    value: '3',
                }],
            }, {
                text: '联通',
                value: 'liantong',
                children: [{
                    text: 'liantong-public',
                    description: '联通公有云环境',
                    value: '4',
                }],
            }, {
                text: 'region',
                value: 'region',
                children: [{
                    text: 'region-1',
                    description: 'region云环境',
                    value: '5',
                }],
            }],
        };
    },
    methods: {
        loadList(keyWord) {
            const result = {};
            for (const item of this.list) {
                for (const region of item.children) {
                    if (region.text.includes(keyWord)) {
                        const group = item.value;
                        if(!result[group]) {
                            result[group] = {
                                title: item.text,
                                children: [],
                            }
                        }
                        result[group].children.push(region);
                    }
                }
            }
            return Object.keys(result).map((name) => {
                return result[name];
            });
        },
    }
};
</script>
```
## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | object |  |  | 选中对象 |
| search-word | string |  |  | 输入框内容 |
| offset | number |  | `0` | 输入框x轴方向偏移量 |
| load-list | Function |  |  | 搜索列表返回函数，接受搜索关键字作为参数，以promise或者array返回值 |
| value-check | boolean |  | `false` | 失焦时search与value值同步, 仅在value值绑定时生效 |
| type | string |  | `'text'` | 输入框的类型，目前支持两种：`'text'`和`'password'` |
| clearable | boolean |  |  | 是否可清空。开启并在输入框有内容时会显示清空按钮。 |
| placeholder | string |  |  | 原生属性。对 IE9 做了兼容。 |
| minlength | number |  |  | 原生属性 |
| maxlength | number |  |  | 原生属性 |
| spellcheck | boolean |  |  | 原生属性 |
| autofocus | boolean |  |  | 是否自动获取焦点 |
| readonly | boolean |  | `false` | 是否只读 |
| disabled | boolean |  | `false` | 是否禁用 |
| size | string |  | `'normal'` | 大小扩展，支持一个值：`'mini'`, `'small'`, `'normal'`, `'large'`, `'huge'`, `'full'`，或两个值的组合，前者表示高度，后者表示宽度，类似CSS的padding书写格式 |
| search | string |  |  | 搜索标志，支持位置自定义，默认搜索标志在最右边，值为`left`即表示搜索标志在左边 |
| maxlength-message | string |  |  | 输入内容达到上限时的错误提示，且被 [FormItem](#/components/u-form) 包裹时生效 |

### Slots

#### (default)

插入  HTML或 `Component`, 下来框单项展示。

#### header

分组数据，组标题

### Events

#### @input

value值更改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | object | 选中下拉框中的值 |

#### @change

value值更改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | object | 改变后的值 |
| $event.oldValue | object | 旧的值 |

#### @blur

输入框失焦事件透传

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | vue失焦事件对象 |

#### @focus

输入框聚焦焦事件透传

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | vue聚焦事件对象 |

#### @keyenter

enter输入事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | vue keydown.enter事件对象 |

#### @keydown

down输入事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | vue keydown.down事件对象 |

#### @keyup

up输入事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | vue keydown.up事件对象 |

#### @keychange

searchWord更改事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | string | 改变后的值 |
| $event.oldValue | string | 旧的值 |
