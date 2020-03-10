import { MField } from 'cloud-ui.vusion';
import * as ace from 'brace';

export const XAceEditor = {
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
                return {
                    showPrintMargin: false,
                };
            },
        },
        autofocus: { type: Boolean, default: false },
    },
    data() {
        // 就不监听了
        this.editor = undefined;

        return {
            currentValue: '',
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
        this.editor = ace.edit(this.$el);
        const options = this.options;
        if (options)
            this.editor.setOptions(options);

        if (this.autofocus)
            this.focusLastLine();

        this.watchLang(this.lang);
        this.watchTheme(this.theme);
        this.watchValue(this.value);
        this.watchDisabled(this.disabled);
        this.watchReadonly(this.disabled || (options && options.readOnly) || this.readonly);

        // @question
        this.editor.$blockScrolling = Infinity;

        this.editor.on('change', (e) => {
            const value = this.editor.getValue();
            this.$emit('input', value);
            this.$emit('update:value', value);
            const oldValue = this.currentValue;
            this.currentValue = value;

            let valid = true;
            if (this.lang === 'json')
                valid = this.validateJSON(value);
            this.$emit('validate', {
                valid,
            });

            this.$emit('change', {
                value,
                oldValue,
            });
        });

        // 其他事件直接透传
        ['blur', 'changeSelectionStyle', 'changeSession', 'copy', 'focus', 'paste'].forEach((event) => {
            this.editor.on(event, (e) => this.$emit(event, e));
        });

        // @TODO: 方法要不要透传

        this.$emit('init', {
            editor: this.editor,
        });
    },
    methods: {
        watchValue(value) {
            if (this.currentValue === value)
                return;

            this.editor.setValue(value, 1);
            this.currentValue = value;
        },
        watchLang(lang) {
            this.editor.getSession().setMode(`ace/mode/${lang}`);
        },
        watchTheme(theme) {
            if (theme)
                this.editor.setTheme(`ace/theme/${theme}`);
        },
        watchReadonly(readonly) {
            this.editor.setOptions({
                readOnly: readonly,
            });
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
            if (!json)
                return true;

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
    },
    destroyed() {
        this.editor.destroy();
    },
};

export default XAceEditor;
