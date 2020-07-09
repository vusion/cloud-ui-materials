<template>
<div :class="$style.root" :size="size" :disabled="disabled"
    :clearable="clearable && currentValue.length" :prefix="prefix" :suffix="suffix"
    :tabindex="disabled ? '' : 0"
    @click="focus" @focusin="focused = true" :focus="focused" :error="error">
    <span :class="$style.baseline">b</span><!-- 用于基线对齐 -->
    <!-- <span v-show="!currentValue.length" :class="$style.placeholder">{{ placeholder }}</span> -->
    <span v-if="prefix" :class="$style.prefix" :name="prefix"><slot name="prefix"></slot></span>
    <div :class="$style.body">
        <u-chip v-for="(item, index) in currentValue" :key="index"
            :editing="!!editingList[index]"
            :removable="!disabled" @remove="remove(index)" @click.stop
            :rules="editingList[index] && (editingList[index].type === 'key' ? keyRules : valueRules)" @validate="onInputValidate(index, $event)">
            <u-input v-if="editingList[index] && editingList[index].type === 'key'" key="key" :class="$style['chip-input']"
                v-model="editingList[index].key" auto-size="horizontal" autofocus
                @input="onInput(index, 'key', $event)"
                @keydown.enter.stop="$event.target.blur()"
                @keydown.delete = "onInputDelete(index, 'key', $event)"
                @blur="onBlur()"></u-input>
            <span v-else :class="$style['chip-part']" @dblclick="edit(index, 'key')">{{ item[keyField] }}</span>
            <span>: </span>
            <u-input v-if="editingList[index] && editingList[index].type === 'value'" key="value" :class="$style['chip-input']"
                v-model="editingList[index].value" auto-size="horizontal" autofocus
                @input="onInput(index, 'value', $event)"
                @keydown.enter.stop="$event.target.blur()"
                @keydown.delete = "onInputDelete(index, 'value', $event)"
                @blur="onBlur()"></u-input>
            <span v-else :class="$style['chip-part']" @dblclick="edit(index, 'value')">{{ item[valueField] }}</span>
        </u-chip>
        <u-chip ref="addingChip" v-if="adding" :editing="!!adding" @click.stop
            :rules="adding.type === 'key' ? keyRules : valueRules" @validate="onInputValidate(-1, $event)">
            <u-input ref="addingKeyInput" v-if="adding.type === 'key'" key="key" :class="$style['chip-input']"
                v-model="adding.key" auto-size="horizontal" :placeholder="keyPlaceholder" style="min-width: 120px;"
                @input="onInput(-1, 'key', $event)"
                @keydown.tab.stop.prevent="addNext = true, $event.target.blur()" @keydown.enter.stop="addNext = true, $event.target.blur()"
                @keydown.delete = "onInputDelete(-1, 'key', $event)"
                @blur="onBlur()"></u-input>
            <span v-else :class="$style['chip-part']" @dblclick="editAdding('key')">{{ adding.key }}</span>
            <span v-if="adding.type === 'value'">: </span>
            <u-input ref="addingValueInput" v-if="adding.type === 'value'" key="value" :class="$style['chip-input']"
                v-model="adding.value" auto-size="horizontal" :placeholder="valuePlaceholder" style="min-width: 120px;"
                @input="onInput(-1, 'value', $event)"
                @keydown.tab.stop.prevent="addNext = true, $event.target.blur()" @keydown.enter.stop="addNext = true, $event.target.blur()"
                @keydown.delete = "onInputDelete(-1, 'value', $event)"
                @blur="onBlur()"></u-input>
            <span v-else-if="adding.type !== 'key'" :class="$style['chip-part']">{{ adding.value }}</span>
        </u-chip>
    </div>
    <span v-if="suffix" :class="$style.suffix" :name="suffix"><slot name="suffix"></slot></span>
    <span v-if="clearable && currentValue.length" :class="$style.clearable" @click="clear"></span>
    <u-validator ref="keyValidator" v-show="false" :rules="keyRules"></u-validator>
    <u-validator ref="valueValidator" v-show="false" :rules="valueRules"></u-validator>
    <u-validator ref="listValidator" muted="all" :rules="listRules" :validating-value="currentValue" @validate="error = $event.touched && !$event.valid"></u-validator>
    <slot></slot>
</div>
</template>

<script>
// import i18n from './i18n';
import UChip from '@cloud-ui/u-chip.vue';
import { MEmitter } from 'cloud-ui.vusion';

export default {
    components: { UChip },
    name: 'u-pair-input',
    mixins: [MEmitter], // i18n,
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
            adding: { type: 'key', key: undefined, value: undefined },
            editingList: [],
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.currentValue = value; // 当 Placeholder
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
            this.$emit('change', { oldValue, value }, this);
        },
    },
    created() {
        //
    },
    methods: {
        edit(index, type) {
            if (this.disabled) return;
            const item = this.currentValue[index];
            this.$set(this.editingList, index, {
                index,
                type,
                key: item[this.keyField],
                value: item[this.valueField],
            });
        },
        editAdding(type = 'key') {
            if (this.disabled) return;
            this.adding.type = type;
            this.$nextTick(() => {
                if (type === 'key') this.$refs.addingKeyInput.focus();
                else this.$refs.addingValueInput.focus();
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
            const re =
                type === 'key' ? /[:\s]+/ : new RegExp(`[${this.separators}]+`);
            if (!$event.match(re)) return;
            this.reduce($event, type, index);
        },
        reduce(remain, type, index, item) {
            if (!remain) return;
            let part;
            const re =
                type === 'key' ? /[:\s]+/ : new RegExp(`[${this.separators}]+`);
            const cap = remain.match(re);
            if (cap) {
                part = remain.slice(0, cap.index).trim();
                remain = remain.slice(cap.index + cap[0].length).trim(); // 有可能不是匹配单个字符
            } else {
                part = remain;
                remain = '';
            }
            if (!part) return;
            const validator =
                type === 'key'
                    ? this.$refs.keyValidator.validator
                    : this.$refs.valueValidator.validator;
            item = item || { type, key: undefined, value: undefined };
            item.type = type;
            item[type] = part;
            validator
                .validate(part, 'blur')
                .then(() => {
                    if (index === -1) {
                        if (type === 'value') {
                            this.currentValue.push({
                                [this.keyField]: item.key,
                                [this.valueField]: item.value,
                            });
                            if (remain) {
                                this.reduce(remain, 'key', index);
                            } else this.keepAdding();
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
                                item.key = this.currentValue[index][
                                    this.keyField
                                ];
                            this.currentValue.splice(index, 0, {
                                [this.keyField]: item.key,
                                [this.valueField]: item.value,
                            });
                            this.editingList.splice(index, 0, undefined);
                            index++;
                            if (remain) this.reduce(remain, 'key', index);
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
                                    this.currentValue[index][this.keyField] =
                                        editing.key;
                            }
                        }
                    }
                })
                .catch((error) => {
                    if (index === -1) {
                        this.adding = item;
                    } else {
                        const editing = this.editingList[index];
                        Object.assign(editing, item);
                        if (type === 'value' && editing.key)
                            this.currentValue[index][this.keyField] =
                                editing.key;
                    }
                });
        },
        onInputValidate(index, $event) {
            if ($event.trigger !== 'blur' || !$event.valid) return;
            if (index === -1) this.saveAdding();
            else this.save(index);
        },
        save(index) {
            // 先 enter 再 blur 会触发两次
            const editing = this.editingList[index];
            if (!editing) return;
            const item = this.currentValue[index];
            const field = this[editing.type + 'Field'];
            if (!editing[editing.type]) return;
            if (
                this.$emitPrevent(
                    'before-edit',
                    {
                        oldItem: item,
                        item: Object.assign({}, item, {
                            [field]: editing[editing.type],
                        }),
                        index,
                        type: editing.type,
                        field,
                        value: this.currentValue,
                    },
                    this,
                )
            )
                return;
            item[field] = editing[editing.type];
            this.$set(this.editingList, index, undefined);
            this.$emit(
                'edit',
                {
                    item,
                    index,
                    type: editing.type,
                    field,
                    value: this.currentValue,
                },
                this,
            );
        },
        saveAdding() {
            if (this.adding.type === 'key') {
                if (this.adding.key) {
                    this.adding.type = 'value';
                    this.$nextTick(() => this.$refs.addingValueInput.focus());
                } else {
                    if (this.currentValue.length) this.adding = undefined;
                }
            } else if (this.adding.type === 'value' && this.adding.value) {
                const item = {
                    [this.keyField]: this.adding.key,
                    [this.valueField]: this.adding.value,
                };
                if (
                    this.$emitPrevent(
                        'before-add',
                        { item, oldValue: this.currentValue },
                        this,
                    )
                )
                    return;
                this.currentValue.push(item);
                this.adding = undefined;
                this.$emit('add', { item, value: this.currentValue }, this);
                this.$refs.listValidator.validate().catch(() => undefined);
                if (this.addNext) {
                    this.addNext = false;
                    this.keepAdding();
                }
            }
        },
        remove(index) {
            const item = this.currentValue[index];
            if (!item) return;
            if (
                this.$emitPrevent(
                    'before-remove',
                    { item, index, oldValue: this.currentValue },
                    this,
                )
            )
                return;
            this.currentValue.splice(index, 1);
            this.editingList.splice(index, 1);
            this.$refs.listValidator.validate().catch(() => undefined);
            this.$emit(
                'remove',
                { value: this.currentValue, item, index },
                this,
            );
        },
        onFocus() {
            // @disabled
        },
        onBlur() {
            this.focused = false;
            this.$refs.listValidator.validate().catch(() => undefined);
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
                } // 编辑状态下，交互有些矛盾，先不实现
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
            if (
                this.$emitPrevent(
                    'before-clear',
                    { oldValue: this.currentValue },
                    this,
                )
            )
                return;
            this.currentValue.splice(0, this.currentValue.length);
            this.$emit('clear', { value: this.currentValue }, this); // this.focus();
        },
        focus() {
            if (this.disabled) return;
            if (!this.adding) {
                this.adding = { type: 'key', key: undefined, value: undefined };
            }
            this.$nextTick(() => {
                this.$refs.addingKeyInput && this.$refs.addingKeyInput.focus();
                this.$refs.addingValueInput &&
                    this.$refs.addingValueInput.focus();
            });
        },
        blur() {
            //
        },
    },
};
</script>

<style module>
.root {
    display: inline-block;
    position: relative;
    cursor: text;
    user-select: none;
    max-width: 100%;
    width: var(--select-width);
    height: var(--select-height);
    line-height: calc(var(--select-height) - var(--select-border-width) * 2);
    padding: var(--select-padding);
    background: var(--select-background);
    border: var(--select-border-width) solid var(--select-border-color);
    color: #555;
    border-radius: var(--border-radius-base);

    height: auto;
    padding: 2px 4px;
    line-height: 32px;
    transition: border-color var(--transition-duration-base, 0.2s);
}

.root[focus] {
    outline: var(--focus-outline);
    border-color: var(--input-border-color-focus);
}

.root[error] {
    border-color: var(--brand-error);
}

.baseline {
    visibility: hidden;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
}

.placeholder {
    color: var(--select-placeholder-color);
    position: absolute;
    left: 0;
    top: 0;
    padding: inherit;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.clearable::before {
    display: block;
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;
    z-index: 1;
    line-height: 1;
    height: 1em;
    margin: auto;
    icon-font: url('cloud-ui.vusion/src/components/i-icon.vue/assets/close-solid.svg');
    cursor: var(--cursor-pointer);
    color: #a7afbb;
}

.root[clearable]::after {
    display: none;
}

.prefix, .suffix {
    display: block;
    position: absolute;
    top: 2px;
    z-index: 1;
}

.prefix {
    left: 6px;
}

.suffix {
    right: 6px;
}

.root[prefix] .body {
    padding-left: 24px;
}

.root[clearable] .body, .root[suffix] .body {
    padding-right: 24px;
}

.prefix[name="search"]::before, .suffix[name="search"]::before {
    icon-font: url("cloud-ui.vusion/src/components/i-icon.vue/icons/search.svg");
    font-size: 16px;
    color: #a7afbb;
}

.root[disabled] {
    cursor: var(--cursor-not-allowed);
    background: var(--select-background-disabled);
    border: 1px solid var(--brand-disabled);
    color: #999;
}

.body {
    float: left;
    width: 100%;
    vertical-align: top;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
    line-height: inherit;
}

.chip-part {
    padding: 2px;
    background: var(--chip-background-color, #eef2f7);
}

.chip-part:hover {
    background: #d0dbe7;
}

.root[disabled] .chip-part {
    background: var(--chip-background-color, #eef2f7);
}

.chip-input {
    padding: 0 2px;
    border: 0;
    border-radius: 0;
    line-height: inherit;
    height: 20px;
    vertical-align: -2px;
}

.root[size$="normal"] { width: 160px; }
.root[size^="normal"] { min-height: 40px; }

.root[size$="medium"] { width: 280px; }
.root[size^="medium"] { min-height: 70px; }

.root[size$="large"] { width: 440px; }
.root[size^="large"] { min-height: 102px; }

.root[size$="huge"] { width: 580px; }
.root[size^="huge"] { min-height: 134px; }

.root[size$="full"] { width: 100%; }
.root[size^="full"] { min-height: 100%; }
</style>
