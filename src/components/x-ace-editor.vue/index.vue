<template>
<div :class="$style.root" :theme="theme" :disabled="disabled" :style="{ width, height }">
    <div ref="editor" :class="$style.editor"></div>
    <f-dragger @dragstart="onDragStart" @drag="onDrag">
        <div ref="handle" :class="$style.handle" v-show="resize !== 'none'"></div>
    </f-dragger>
</div>
</template>

<script>
import { MField, utils } from 'cloud-ui.vusion';
import * as ace from 'brace';

export default {
    name: 'x-ace-editor',
    mixins: [MField],
    props: {
        value: { type: String, default: '' },
        lang: { type: String, default: 'text' },
        theme: { type: String },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        options: {
            type: Object,
            default() {
                return { showPrintMargin: false };
            },
        },
        autofocus: { type: Boolean, default: false },
        resize: {
            type: String,
            default: 'none',
            validator: (value) =>
                ['none', 'horizontal', 'vertical', 'both'].includes(value),
        },
    },
    data() {
        // 就不监听了
        this.editor = undefined;
        return {
            currentValue: '',
            startWidth: 0,
            startHeight: 0,
            width: '',
            height: '',
        };
    },
    watch: {
        lang(lang) {
            this.watchLang(lang);
        },
        theme(theme) {
            this.watchTheme(theme);
        },
        value(value) {
            this.watchValue(value);
        },
        readonly(readonly) {
            this.watchReadonly(readonly);
        },
        disabled(disabled) {
            this.watchDisabled(disabled);
        },
        options(options) {
            this.editor && this.editor.setOptions(options);
        },
    },
    mounted() {
        this.editor = ace.edit(this.$refs.editor);
        const options = this.options;
        if (options) this.editor.setOptions(options);
        if (this.autofocus) this.focusLastLine();
        this.watchLang(this.lang);
        this.watchTheme(this.theme);
        this.watchValue(this.value);
        this.watchDisabled(this.disabled);
        this.watchReadonly(
            this.disabled || (options && options.readOnly) || this.readonly,
        ); // @question
        this.editor.$blockScrolling = Infinity;
        this.editor.on('change', (e) => {
            const value = this.editor.getValue();
            this.$emit('input', value);
            this.$emit('update:value', value);
            const oldValue = this.currentValue;
            this.currentValue = value;
            let valid = true;
            if (this.lang === 'json') valid = this.validateJSON(value);
            this.$emit('validate', { valid });
            this.$emit('change', { value, oldValue });
        }); // 其他事件直接透传
        [
            'blur',
            'changeSelectionStyle',
            'changeSession',
            'copy',
            'focus',
            'paste',
        ].forEach((event) => {
            this.editor.on(event, (e) => this.$emit(event, e));
        }); // @TODO: 方法要不要透传
        this.$emit('init', { editor: this.editor });
    },
    methods: {
        watchValue(value) {
            if (this.currentValue === value) return;
            this.editor.setValue(value, 1);
            this.currentValue = value;
        },
        watchLang(lang) {
            this.editor.getSession().setMode(`ace/mode/${lang}`);
        },
        watchTheme(theme) {
            if (theme) this.editor.setTheme(`ace/theme/${theme}`);
        },
        watchReadonly(readonly) {
            this.editor.setOptions({ readOnly: readonly });
        },
        watchDisabled(disabled) {
            if (disabled) {
                this.editor.setOptions({
                    readOnly: true,
                    highlightActiveLine: false,
                    highlightGutterLine: false,
                });
                this.editor.renderer.$cursorLayer.element.style.opacity = 0;
            } else {
                this.editor.setOptions({
                    readOnly: false,
                    highlightActiveLine: true,
                    highlightGutterLine: true,
                });
                this.editor.renderer.$cursorLayer.element.style.opacity = '';
            }
        },
        validateJSON(json) {
            if (!json) return true;
            try {
                JSON.parse(json);
            } catch (error) {
                return false;
            }
            return true;
        },
        focusLastLine() {
            this.editor.focus();
            const session = this.editor.getSession();
            const count = session.getLength();
            this.editor.gotoLine(count, session.getLine(count - 1).length);
        },
        onDragStart() {
            const size = utils.getSize(this.$el);
            this.startWidth = size.width;
            this.startHeight = size.height;
        },
        onDrag($event) {
            if (this.resize === 'horizontal' || this.resize === 'both')
                this.width = this.startWidth + $event.dragX + 'px';
            if (this.resize === 'vertical' || this.resize === 'both')
                this.height = this.startHeight + $event.dragY + 'px';
            this.$refs.handle.style.left = 'auto';
            this.$refs.handle.style.top = 'auto';
            this.$nextTick(() => this.editor.resize());
        },
    },
    destroyed() {
        this.editor.destroy();
    },
};
</script>

<style module>
.root[class] {
    position: relative;
    min-width: var(--ace-editor-width, 580px);
    min-height: var(--ace-editor-height-small, 200px);
    height: var(--ace-editor-height, 360px);
}

.editor {
    width: 100%;
    height: 100%;
}

.root[disabled] .editor {
    cursor: not-allowed;
}

.root:not([theme])[class] .editor {
    border-color: var(--ace-editor-border-color, var(--background-color-light, #f2f3f8));
    background-color: var(--ace-editor-background, var(--background-color-light, #f2f3f8));
    /* padding-top: var(--ace-editor-padding-top, 16px); */
    font-size: var(--ace-editor-font-size, 12px);
}

.root:not([theme]) :global(.ace_gutter) {
    background-color: var(--ace-editor-gutter-background, var(--background-color-light, #f2f3f8));
    /* top: var(--ace-editor-padding-top, 16px); */
}

.root:not([theme]) :global(.ace_scroller) {
    /* top: var(--ace-editor-padding-top, 16px); */
}

.root:not([theme]) :global(.ace_variable) {
    color: #c27919;
}

.root:not([theme]) :global(.ace_marker-layer) :global(.ace_active-line),
.root:not([theme]) :global(.ace_gutter-active-line) {
    background: var(--ace-editor-active-line-background, #ecf1f6);
}

.root[size$="small"] { width: var(--ace-editor-width-small, 440px); }
.root[size^="small"] { height: var(--ace-editor-height-small, 200px); }

.root[size$="normal"] { width: var(--ace-editor-width, 580px); }
.root[size^="normal"] { height: var(--ace-editor-height, 360px); }

.root[size$="large"] { width: var(--ace-editor-width-large, 760px); }
.root[size^="large"] { height: var(--ace-editor-height-large, 420px); }

.root[size$="full"] { width: 100%; }
.root[size^="full"] { height: 100%; }

.handle {
    position: absolute;
    right: 1px;
    bottom: 1px;
    display: block;
    width: 8px;
    height: 8px;
    overflow: hidden;
    cursor: default;
    z-index: 10;
}

.handle::before {
    content: '';
    display: block;
    height: 4px;
    width: 12px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    transform: rotate(-45deg) translate(-2px, 2px);
}
</style>
