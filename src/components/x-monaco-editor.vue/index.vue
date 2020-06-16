<template>
<div :class="$style.root">
    <div ref="editor" :class="$style.editor"></div>
</div>
</template>

<script>
import { MField } from 'cloud-ui.vusion';

export default {
    name: 'x-monaco-editor',
    mixins: [MField],
    props: {
        value: { type: String, default: '' },
        originalValue: { type: String, default: '' },
        theme: { type: String, default: 'vs' },
        lang: String, // alias
        language: String,
        diff: { type: Boolean, default: false },
        amdRequire: Function,
    },
    watch: {
        options: {
            deep: true,
            handler(options) {
                this.editor && this.editor.updateOptions(options);
            },
        },
        value(value) {
            if (value === this.modifiedEditor.getValue())
                return;
            this.modifiedEditor && this.modifiedEditor.setValue(value);
        },
        originalValue(originalValue) {
            this.diff && this.originalEditor && this.originalEditor.setValue(originalValue);
        },
        lang(lang) {
            this.editor && this.monaco.editor.setModelLanguage(this.editor.getModel(), lang);
        },
        language(language) {
            this.editor && this.monaco.editor.setModelLanguage(this.editor.getModel(), language);
        },
        theme(theme) {
            // VSCode Monaco 全局只支持一套
            this.monaco && this.monaco.editor.setTheme(theme);
        },
    },
    mounted() {
        if (this.amdRequire) {
            this.amdRequire(['vs/editor/editor.main'], () => {
                this.monaco = window.monaco;
                this.initMonaco(window.monaco);
            });
        } else {
            // ESM format so it can't be resolved by commonjs `require` in eslint
            // eslint-disable-next-line import/no-unresolved
            const monaco = require('monaco-editor');
            this.monaco = monaco;
            this.initMonaco(monaco);
        }
    },
    beforeDestroy() {
        this.editor && this.editor.dispose();
    },
    methods: {
        initMonaco(monaco) {
            if (this.$emitPrevent('before-init', {
                monaco,
            }, this))
                return;

            const options = Object.assign({
                value: this.value,
                theme: this.theme,
                language: this.language || this.lang,
            }, this.options);

            if (this.diff) {
                this.editor = monaco.editor.createDiffEditor(this.$refs.editor, options);
                const originalModel = monaco.editor.createModel(
                    this.original,
                    this.language || this.lang,
                );
                const modifiedModel = monaco.editor.createModel(
                    this.value,
                    this.language || this.lang,
                );
                this.editor.setModel({
                    original: originalModel,
                    modified: modifiedModel,
                });
                this.modifiedEditor = this.editor.getModifiedEditor();
                this.originalEditor = this.editor.getOriginalEditor();
            } else {
                this.editor = monaco.editor.create(this.$refs.editor, options);
                this.modifiedEditor = this.originalEditor = this.editor;
            }

            this.modifiedEditor.onDidChangeModelContent((event) => {
                const oldValue = this.value;
                const value = this.modifiedEditor.getValue();
                if (oldValue !== value) {
                    this.$emit('input', value);
                    this.$emit('update:value', value);
                    this.$emit('change', {
                        value,
                        oldValue,
                        event,
                    });
                }
            });

            this.$emit('init', {
                monaco,
                editor: this.editor,
            });
        },
        focus() {
            this.editor.focus();
        },
        blur() {
            this.editor.blur();
        },
    },
};
</script>

<style module>
.root {
    min-width: var(--ace-editor-width, 580px);
    min-height: var(--ace-editor-height-small, 200px);
    height: var(--ace-editor-height, 360px);
}

.editor {
    width: 100%;
    height: 100%;
}
</style>
