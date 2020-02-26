// import i18n from './i18n';
import UChip from '@cloud-ui/u-chip.vue';
import { MEmitter } from 'cloud-ui.vusion';

export const UPairInput = {
    components: { UChip },
    name: 'u-pair-input',
    mixins: [MEmitter],
    // i18n,
    props: {
        value: { type: Array, default: () => [] },
        keyField: { type: String, default: 'key' },
        valueField: { type: String, default: 'value' },
        keyPlaceholder: { type: String, default: '请输入 Key 值' },
        valuePlaceholder: { type: String, default: '请输入 Value 值' },
        keyRules: [String, Array, Object],
        valueRules: [String, Array, Object],
        listRules: [String, Array, Object],
        separators: { type: String, default: ',' },
        clearable: { type: Boolean, default: false },
        prefix: String,
        suffix: String,
        size: { type: String, default: 'normal huge' },
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
                type: 'key',
                key: undefined,
                value: undefined,
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
                        type: 'key',
                        key: undefined,
                        value: undefined,
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
        edit(index, type) {
            if (this.disabled)
                return;
            const item = this.currentValue[index];
            this.$set(this.editingList, index, {
                index,
                type,
                key: item[this.keyField],
                value: item[this.valueField],
            });
        },
        editAdding(type = 'key') {
            if (this.disabled)
                return;
            this.adding.type = type;
            this.$nextTick(() => {
                if (type === 'key')
                    this.$refs.addingKeyInput.focus();
                else
                    this.$refs.addingValueInput.focus();
            });
        },
        onBeforeInput($event) {
            // const value = $event.value.trim();
            // const index = value.search(new RegExp(`[${this.separators}]`));
            // if (~index) {
            //     $event.value = value.slice(0, index);
            //     const remain = value.slice(index + 1);
            // }
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
            const item = this.currentValue[index];
            const field = this[editing.type + 'Field'];
            if (!editing[editing.type])
                return;

            if (this.$emitPrevent('before-edit', {
                oldItem: item,
                item: Object.assign({}, item, {
                    [field]: editing[editing.type],
                }),
                value: this.currentValue,
                index,
                type: editing.type,
                field,
            }, this))
                return;

            item[field] = editing[editing.type];
            this.$set(this.editingList, index, undefined);

            this.$emit('edit', {
                item,
                value: this.currentValue,
                index,
                type: editing.type,
                field,
            }, this);
        },
        saveAdding() {
            if (this.adding.type === 'key') {
                if (this.adding.key) {
                    this.adding.type = 'value';
                    this.$nextTick(() => this.$refs.addingValueInput.focus());
                } else {
                    if (this.currentValue.length)
                        this.adding = undefined;
                }
            } else if (this.adding.type === 'value' && this.adding.value) {
                const item = { [this.keyField]: this.adding.key, [this.valueField]: this.adding.value };
                if (this.$emitPrevent('before-add', {
                    item,
                    oldValue: this.currentValue,
                }, this))
                    return;

                this.currentValue.push(item);
                this.adding = undefined;

                this.$emit('add', {
                    item,
                    value: this.currentValue,
                }, this);

                this.$refs.listValidator.validate()
                    .catch(() => undefined);

                setTimeout(() => {
                    if (this.addNext) {
                        this.addNext = false;
                        this.adding = {
                            type: 'key',
                            key: undefined,
                            value: undefined,
                        };
                        this.editAdding('key');
                    }
                }, 200);
            }
        },
        remove(index) {
            const item = this.currentValue[index];
            if (!item)
                return;

            if (this.$emitPrevent('before-remove', {
                oldValue: this.currentValue,
                item,
                index,
            }, this))
                return;

            this.currentValue.splice(index, 1);
            this.$refs.listValidator.validate()
                .catch(() => undefined);

            this.$emit('remove', {
                value: this.currentValue,
                item,
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
                    type: 'key',
                    key: undefined,
                    value: undefined,
                };
            }
            this.$nextTick(() => {
                this.$refs.addingKeyInput && this.$refs.addingKeyInput.focus();
                this.$refs.addingValueInput && this.$refs.addingValueInput.focus();
            });
        },
        blur() {
            //
        },
    },
};

export default UPairInput;
