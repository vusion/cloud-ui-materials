<template>
<div :class="{ [$style.root]: true, [$style.border]: !readOnly }">
    <toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :default-config="toolbarConfig"
        :mode="mode"
        v-if="!readOnly"
    ></toolbar>
    <editor
        :style="editorStyle"
        :value="value"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
        @onFocus="onFocus"
        @onBlur="onBlur"
    ></editor>
</div>
</template>

<script>
import { MField } from 'cloud-ui.vusion';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

export default {
    components: { Editor, Toolbar },
    mixins: [MField],
    props: {
        value: String,
        readOnly: Boolean,
        scroll: Boolean,
        placeholder: String,
        editorStyle: String,
    },
    data() {
        const authorization = this.getCookie('authorization');
        const headers = authorization ? { Authorization: authorization } : {};
        return {
            editor: null,
            toolbarConfig: {},
            editorConfig: {
                readOnly: this.readOnly,
                scroll: this.scroll,
                placeholder: this.placeholder,
                MENU_CONF: {
                    uploadImage: {
                        server: '/gateway/lowcode/api/v1/app/upload',
                        fieldName: 'file',
                        maxFileSize: 50 * 1024 * 1024, // 50M
                        // 自定义增加 http  header
                        headers,
                        // 自定义插入图片
                        customInsert(res, insertFn) {
                            const url = res.result;
                            insertFn(url);
                        },
                    },
                },
            },
            mode: 'default', // or 'simple'
        };
    },
    computed: {},
    beforeDestroy() {
        const { editor } = this;
        if (editor === null)
            return;
        // 组件销毁时，及时销毁编辑器
        editor.destroy();
    },
    methods: {
        onCreated(editor) {
            // 一定要用 Object.seal() ，否则会报错
            this.editor = Object.seal(editor);
        },
        onChange(editor) {
            const value = editor.isEmpty() ? '' : editor.getHtml();
            this.$emit('change', { value, editor });
            this.$emit('update:value', value);
            this.$emit('input', value);
        },
        onFocus(editor) {
            this.$emit('focus', { value: this.value, editor });
        },
        onBlur(editor) {
            this.$emit('blur', { value: this.value, editor });
        },
        getCookie(cname) {
            const name = `${cname}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                const c = ca[i].trim();
                if (c.indexOf(name) === 0)
                    return c.substring(name.length, c.length);
            }
            return '';
        },
    },
};
</script>

<style module>
    .root {
    }

    .border {
        border: 1px solid #ccc;
    }
</style>
