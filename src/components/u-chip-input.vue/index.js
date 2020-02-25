// import i18n from './i18n';
import UChip from '@cloud-ui/u-chip.vue';
import { MEmitter } from 'cloud-ui.vusion';

export const UChipInput = {
    components: { UChip },
    name: 'u-chip-input',
    mixins: [MEmitter],
    // i18n,
    props: {
        value: { type: Array, default: () => [] },
        placeholder: { type: String, default: '请输入内容' },
        rules: [String, Array, Object],
        listRules: [String, Array, Object],
        clearable: { type: Boolean, default: false },
        size: { type: String, default: 'huge' },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            currentValue: this.value,
            focused: false,
            error: false,
            addNext: false,
            preventBlur: false,
            adding: {
                text: undefined,
            },
            editingList: [],
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.currentValue = value;

                // 当 Placeholder
                this.adding = undefined;
                if (!value.length) {
                    this.adding = {
                        text: undefined,
                    };
                }
            },
        },
        currentValue(value, oldValue) {
            this.$emit('change', {
                oldValue,
                value,
            }, this);
        },
    },
    created() {
        //
    },
    methods: {
        edit(index) {
            if (this.disabled)
                return;
            const text = this.currentValue[index];
            this.$set(this.editingList, index, {
                index,
                text,
            });
        },
        editAdding() {
            if (this.disabled)
                return;
            this.$nextTick(() => {
                this.$refs.addingInput.focus();
            });
        },
        onInputValidate(index, $event) {
            if ($event.trigger !== 'blur' || !$event.valid)
                return;
            if (index === -1)
                this.saveAdding();
            else
                this.save(index);
        },
        save(index) {
            // 先 enter 再 blur 会触发两次

            const editing = this.editingList[index];
            if (!editing)
                return;
            const text = this.currentValue[index];
            if (!editing.text)
                return;

            if (this.$emitPrevent('before-edit', {
                oldText: text,
                text: editing.text,
                value: this.currentValue,
                index,
            }, this))
                return;

            this.$set(this.currentValue, index, editing.text);
            this.$set(this.editingList, index, undefined);

            this.$emit('edit', {
                text: editing.text,
                value: this.currentValue,
                index,
            }, this);
        },
        saveAdding() {
            if (this.adding.text) {
                const text = this.adding.text;
                if (this.$emitPrevent('before-add', {
                    text,
                    oldValue: this.currentValue,
                }, this))
                    return;

                this.currentValue.push(text);
                this.adding = undefined;

                this.$emit('add', {
                    text,
                    value: this.currentValue,
                }, this);

                this.$refs.listValidator.validate()
                    .catch(() => undefined);

                setTimeout(() => {
                    if (this.addNext) {
                        this.addNext = false;
                        this.adding = {
                            value: undefined,
                        };
                        this.editAdding('key');
                    }
                }, 200);
            } else {
                if (this.currentValue.length)
                    this.adding = undefined;
            }
        },
        remove(index) {
            const text = this.currentValue[index];
            if (!text)
                return;

            if (this.$emitPrevent('before-remove', {
                oldValue: this.currentValue,
                text,
                index,
            }, this))
                return;

            this.currentValue.splice(index, 1);
            this.$refs.listValidator.validate()
                .catch(() => undefined);

            this.$emit('remove', {
                value: this.currentValue,
                text,
                index,
            }, this);
        },
        onFocus() {
            // @disabled
        },
        onBlur() {
            this.focused = false;
            this.$refs.listValidator.validate()
                .catch(() => undefined);
        },
        onInputDelete() {
            //
        },
        clear() {
            // this.preventBlur = true;

            const oldValue = this.value;
            const value = [];

            if (this.$emitPrevent('before-clear', { oldValue, value }, this))
                return;

            this.currentValue.splice(0, this.currentValue.length);

            this.$emit('clear', {
                oldValue,
                value,
            }, this);

            // this.focus();
        },
        focus() {
            if (this.disabled)
                return;

            if (!this.adding) {
                this.adding = {
                    text: undefined,
                };
            }
            this.$nextTick(() => {
                this.$refs.addingInput && this.$refs.addingInput.focus();
            });
        },
        blur() {
            //
        },
    },
};

export default UChipInput;
