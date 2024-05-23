### 基本用法

```vue
<template>
    <div>
        {{ value }}
        <cw-wang-editor
            :value="value"
            @update:value="handleChange"
            showDocxButton
            ref="editor"></cw-wang-editor>
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
import JSZip from 'jszip';

import { parser } from '../docxToSlate';
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
            // this.value =
            //     '<blockquote><br>asdfsafsf</blockquote><table style="width: 100%;"><tbody><tr><th colspan="1" rowspan="1" width="auto" style="text-align: left;">12313</th><th colSpan="1" rowSpan="1" width="auto">12313</th><th colspan="1" rowspan="1" width="auto" style="text-align: right;">12312</th><th colspan="1" rowspan="1" width="auto" style="text-align: center;">12313123</th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th><th colSpan="1" rowSpan="1" width="auto"></th></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr></tbody></table><ul><li>asdfsaf</li><li>asdfasf</li><ul><li>alsdfj</li><ul><li>jaskldfj</li></ul><ol><li>asdfasf</li><li>sagsa</li><li>aa</li><ol><li>ajskdfl</li><ol><li>asdfsf</li></ol></ol></ol><li>asdfasf</li><li></li><li>asdfsaf</li></ul><li>asdfsaf</li></ul><h1></h1><h1>header1</h1><hr/><h2>header2</h2><h3>header3</h3><h4>header4</h4><h5>header5</h5><p><span style="font-size: 32px;">asdf</span><span style="background-color: rgb(54, 88, 226); font-size: 32px;">asfsafaa</span><span style="background-color: rgb(54, 88, 226); font-size: 16px;">sdfasd</span><span style="font-size: 16px;">fasf</span></p><p style="text-align: right;">as<span style="color: rgb(231, 95, 51);">d</span><span style="color: rgb(231, 95, 51);"><em>fa</em></span><span style="color: rgb(231, 95, 51);"><u><em>sfas</em></u></span><span style="color: rgb(231, 95, 51);"><u>dfsaf</u></span><span style="color: rgb(231, 95, 51);"><sup><u>12313</u></sup></span><span style="color: rgb(231, 95, 51);"><sub><u>12313</u></sub></span></p><p style="text-align: center;"><span style="color: rgb(231, 95, 51); font-family: &quot;Times New Roman&quot;;">as</span><span style="color: rgb(231, 95, 51); font-family: &quot;Times New Roman&quot;;"><strong>df</strong></span><span style="font-family: &quot;Times New Roman&quot;;"><strong>adsfa</strong></span><span style="font-family: &quot;Times New Roman&quot;;"><s><strong>sdfas</strong></s></span><span style="font-family: &quot;Times New Roman&quot;;"><s>f</s></span></p><p style="text-align: justify;"><s>adsfaddasdfasfadsfadsfasfsadfasdfasdfasdfsafasfasdfasdfasdfsadfasdfasfasdfdsafsdafasdfadsfasdf </s><a href="https://www.baidu.com" target="_blank">link <span style="color: rgb(212, 177, 6); background-color: rgb(9, 109, 217);"><s>to baidu</s></span></a><span style="color: rgb(212, 177, 6); background-color: rgb(9, 109, 217);"><s> </s></span></p><p style="text-align: justify;"><br></p>';
        }, 2000);
    },
    methods: {
        handleChange() {
            console.log(this.$refs.editor.editor.children);
        },
        handleReadOnly() {
            this.readOnly = !this.readOnly;
        },
        async handleClick() {
            const [fileHandle] = await window.showOpenFilePicker();
            const file = await fileHandle.getFile();
            // const zip = await JSZip.loadAsync(file);
            // const str = await zip.file('word/document.xml').async('string');
            // let domparser = new DOMParser();
            // const xml = domparser.parseFromString(str, 'text/xml');
            // const relsContent = await zip
            //     .file('word/_rels/document.xml.rels')
            //     .async('string');
            // const relsXml = domparser.parseFromString(relsContent, 'text/xml');
            // console.log(
            //     '%c [ relsXml ]-54-「examples」',
            //     'font-size:13px; background:pink; color:#bf2c9f;',
            //     relsXml
            // );

            // window.hsj = relsXml;
            // const serializer = new XMLSerializer();
            // const xmlstr = Array.from(xml.children[0].children[0].children)
            //     .map(serializer.serializeToString.bind(serializer))
            //     .join('');
            const nodes = await this.$refs.editor.docxParse(file);
        },
        async handleClick1() {
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
