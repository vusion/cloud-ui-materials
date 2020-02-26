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
                if (value.length) {
                    if (this.adding && !this.adding.key && !this.adding.value)
                        this.adding = undefined;
                } else {
                    if (!this.adding) {
                        this.adding = {
                            type: 'key',
                            key: undefined,
                            value: undefined,
                        };
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
        keepAdding(adding) {
            this.$nextTick(() => {
                this.adding = adding || {
                    type: 'key',
                    key: undefined,
                    value: undefined,
                };
                this.editAdding(this.adding.type);
            });
        },
        onInput(index, type, $event) {
            const re = type === 'key' ? /[:\s]+/ : new RegExp(`[${this.separators}]+`);
            if (!$event.match(re))
                return;

            this.reduce($event, type, index);
        },
        reduce(remain, type, index, item) {
            if (!remain)
                return;
            let part;
            const re = type === 'key' ? /[:\s]+/ : new RegExp(`[${this.separators}]+`);
            const cap = remain.match(re);
            if (cap) {
                part = remain.slice(0, cap.index).trim();
                remain = remain.slice(cap.index + cap[0].length).trim(); // 有可能不是匹配单个字符
            } else {
                part = remain;
                remain = '';
            }
            if (!part)
                return;

            const validator = type === 'key' ? this.$refs.keyValidator.validator : this.$refs.valueValidator.validator;
            item = item || {
                type,
                key: undefined,
                value: undefined,
            };
            item.type = type;
            item[type] = part;

            validator.validate(part, 'blur').then(() => {
                if (index === -1) {
                    if (type === 'value') {
                        this.currentValue.push({ [this.keyField]: item.key, [this.valueField]: item.value });
                        if (remain) {
                            this.reduce(remain, 'key', index);
                        } else
                            this.keepAdding();
                    } else {
                        if (remain) {
                            this.reduce(remain, 'value', index, item);
                        } else {
                            item.type = 'value';
                            this.keepAdding(item);
                        }
                    }
                } else {
                    if (type === 'value') {
                        if (!item.key)
                            item.key = this.currentValue[index][this.keyField];
                        this.currentValue.splice(index, 0, { [this.keyField]: item.key, [this.valueField]: item.value });
                        this.editingList.splice(index, 0, undefined);
                        index++;
                        if (remain)
                            this.reduce(remain, 'key', index);
                        else {
                            const editing = this.editingList[index];
                            editing.type = 'key';
                            editing.key = '';
                            editing.value = '';
                        }
                    } else {
                        if (remain)
                            this.reduce(remain, 'value', index, item);
                        else {
                            const editing = this.editingList[index];
                            editing.type = 'value';
                            editing.key = item.key;
                            editing.value = '';
                            if (editing.key)
                                this.currentValue[index][this.keyField] = editing.key;
                        }
                    }
                }
            }).catch((error) => {
                if (index === -1) {
                    this.adding = item;
                } else {
                    const editing = this.editingList[index];
                    Object.assign(editing, item);
                    if (type === 'value' && editing.key)
                        this.currentValue[index][this.keyField] = editing.key;
                }
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
            const item = this.currentValue[index];
            const field = this[editing.type + 'Field'];
            if (!editing[editing.type])
                return;

            if (this.$emitPrevent('before-edit', {
                oldItem: item,
                item: Object.assign({}, item, {
                    [field]: editing[editing.type],
                }),
                index,
                type: editing.type,
                field,
                value: this.currentValue,
            }, this))
                return;

            item[field] = editing[editing.type];
            this.$set(this.editingList, index, undefined);

            this.$emit('edit', {
                item,
                index,
                type: editing.type,
                field,
                value: this.currentValue,
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

                if (this.addNext) {
                    this.addNext = false;
                    this.keepAdding();
                }
            }
        },
        remove(index) {
            const item = this.currentValue[index];
            if (!item)
                return;

            if (this.$emitPrevent('before-remove', {
                item,
                index,
                oldValue: this.currentValue,
            }, this))
                return;

            this.currentValue.splice(index, 1);
            this.editingList.splice(index, 1);

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
        onInputDelete(index, type, e) {
            const value = e.target.value;
            if (!value) {
                e.preventDefault();
                if (index === -1 && this.currentValue.length > 0) {
                    if (type === 'key') {
                        this.remove(this.currentValue.length - 1);
                        this.keepAdding();
                    } else {
                        this.$el.focus();
                        this.$nextTick(() => {
                            this.editAdding('key');
                        });
                    }
                }
                // 编辑状态下，交互有些矛盾，先不实现
                // else if (index > 0) {
                //     if (type === 'key')
                //         this.remove(index);
                //     else {
                //         this.$el.focus();
                //         this.$nextTick(() => {
                //             this.editingList[index].type = 'key';
                //         });
                //     }
                // }
            }
        },
        clear() {
            if (this.$emitPrevent('before-clear', { oldValue: this.currentValue }, this))
                return;

            this.currentValue.splice(0, this.currentValue.length);

            this.$emit('clear', {
                value: this.currentValue,
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
