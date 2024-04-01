### 基本用法

```vue
<template>
    <div>
        {{ value }}
        <cw-wang-editor :value.sync="value" ref="editor"></cw-wang-editor>
        <u-button
            @click="handleClick"
            :style="{
                backgroundImage: `url(${base64})`,
                backgroundSize: 'cover',
            }">
            hhh
        </u-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            readOnly: true,
            value: '',
            base64: undefined,
        };
    },
    mounted() {
        setTimeout(() => {
            this.value = '123';
        }, 2000);
    },
    methods: {
        handleReadOnly() {
            this.readOnly = !this.readOnly;
        },
        async handleClick() {
            const [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            const dataURL = await new Promise((res) => {
                const reader = new FileReader();
                reader.onload = (e) => res(e.target.result);
                reader.readAsDataURL(file);
            });
            this.base64 = dataURL;
            navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob(
                        [
                            `<img src="${dataURL}"></img><div style="background-image: url(${dataURL}); background-size:cover">hhh</div>`,
                        ],
                        {
                            type: 'text/html',
                        }
                    ),
                    'text/plain': new Blob([dataURL], {
                        type: 'text/plain',
                    }),
                }),
            ]);
        },
        async handleClick1() {
            const src = this.$refs.editor.getMockData();
            navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([src], {
                        type: 'text/html',
                    }),
                    'text/plain': new Blob([src], {
                        type: 'text/plain',
                    }),
                }),
            ]);
            this.$refs.editor.exportToDocx();
        },
    },
};
</script>
```

### 自定义上传地址

```html
<cw-wang-editor
    value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'"
    uploadImgServer="/upload/test"></cw-wang-editor>
```

### 只读模式

只读模式可以作为富文本编辑器的内容展示区，默认隐藏工具栏，通过`readOnly`设置

```vue
<template>
    <div>
        <cw-wang-editor
            :readOnly="readOnly"
            value="<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>"></cw-wang-editor>
        <u-button @click="handleReadOnly">切换</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            readOnly: true,
        };
    },
    methods: {
        handleReadOnly() {
            this.readOnly = !this.readOnly;
        },
    },
};
</script>
```

### 表单验证

```vue
<template>
    <u-form ref="form" gap="large">
        <u-form-item
            :required="true"
            layout="block"
            rules="required"
            label="业务口径">
            <cw-wang-editor
                :value.sync="value"
                :editorStyle="editorStyle"></cw-wang-editor>
        </u-form-item>
        <u-form-item layout="block">
            <u-button @click="onClick">验证</u-button>
        </u-form-item>
    </u-form>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            editorStyle: 'height: 300px',
        };
    },
    mounted() {
        setTimeout(() => {
            this.value = '我有内容了';
        }, 1000);
    },
    methods: {
        async onClick() {
            const valid = await this.$refs.form.validate();
        },
    },
};
</script>
```
