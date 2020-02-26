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
        separators: { type: String, default: '\n\t' },
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
            adding: { text: '' },
            editingList: [],
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.currentValue = value;

                // 当 Placeholder
                if (value.length) {
                    if (this.adding && !this.adding.text)
                        this.adding = undefined;
                } else {
                    if (!this.adding) {
                        this.adding = { text: '' };
                    }
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
        keepAdding() {
            this.$nextTick(() => {
                this.adding = { text: '' };
                this.editAdding();
            });
        },
        onInput($event, senderVM) {
            if (!$event.match(new RegExp(`[${this.separators}]+`)))
                return;

            this.reduce($event, senderVM);
        },
        reduce(remain, senderVM) {
            let part;
            const cap = remain.match(new RegExp(`[${this.separators}]+`));
            if (cap) {
                part = remain.slice(0, cap.index).trim();
                remain = remain.slice(cap.index + cap[0].length).trim(); // 有可能不是匹配单个字符
            } else {
                part = remain;
                remain = '';
            }

            const validator = this.$refs.validator.validator;
            validator.validate(part, 'blur').then(() => {
                this.currentValue.push(part);
                if (remain) {
                    this.reduce(remain);
                } else
                    this.keepAdding();
            }).catch((error) => {
                this.adding = { text: part };
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

                if (this.addNext) {
                    this.addNext = false;
                    this.keepAdding();
                }
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
            this.editingList[index] = undefined;

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
        onInputDelete(index, e) {
            const value = e.target.value;
            if (!value) {
                if (index === -1 && this.currentValue.length > 0) {
                    this.remove(this.currentValue.length - 1);
                    this.keepAdding();
                } else if (index > 0)
                    this.remove(index);
            }
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
                this.adding = { text: '' };
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
