<template>
<div :class="$style.root" :size="size" :disabled="disabled"
    :clearable="clearable && currentValue.length" :prefix="prefix" :suffix="suffix"
    :tabindex="disabled ? '' : 0"
    @click="focus" @focusin="focused = true" :focus="focused" :error="error">
    <span :class="$style.baseline">b</span><!-- 用于基线对齐 -->
    <!-- <span v-show="!currentValue.length" :class="$style.placeholder">{{ placeholder }}</span> -->
    <span v-if="prefix" :class="$style.prefix" :name="prefix"><slot name="prefix"></slot></span>
    <div :class="$style.body">
        <u-chip :class="$style.chip" v-for="(text, index) in currentValue" :key="index"
            :editing="!!editingList[index]"
            :removable="!disabled" @remove="remove(index)" @click.stop
            :rules="editingList[index] && rules" @validate="onInputValidate(index, $event)">
            <u-input v-if="editingList[index]" :class="$style['chip-input']"
                v-model="editingList[index].text" auto-size="horizontal" autofocus
                @input="onInput(index, $event)"
                @keydown.enter.stop="$event.target.blur()"
                @keydown.delete = "onInputDelete(index, $event)"
                @blur="onBlur()"></u-input>
            <span v-else :class="$style['chip-part']" @dblclick="edit(index)">{{ text }}</span>
        </u-chip>
        <u-chip ref="addingChip" v-if="adding" key="adding" :editing="!!adding" @click.stop
            :rules="rules" @validate="onInputValidate(-1, $event)">
            <u-input ref="addingInput" :class="$style['chip-input']"
                v-model="adding.text" auto-size="horizontal" :placeholder="placeholder" style="min-width: 120px;"
                @input="onInput(-1, $event)"
                @keydown.tab.stop.prevent="addNext = true, $event.target.blur()" @keydown.enter.stop="addNext = true, $event.target.blur()"
                @keydown.delete = "onInputDelete(-1, $event)"
                @blur="onBlur()"></u-input>
        </u-chip>
    </div>
    <span v-if="suffix" :class="$style.suffix" :name="suffix"><slot name="suffix"></slot></span>
    <span v-if="clearable && currentValue.length" :class="$style.clearable" @click="clear"></span>
    <u-validator ref="validator" v-show="false" :rules="rules"></u-validator>
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
    name: 'u-chip-input',
    mixins: [MEmitter], // i18n,
    props: {
        value: { type: Array, default: () => [] },
        placeholder: { type: String, default: '请输入内容' },
        rules: [String, Array, Object],
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
            adding: { text: '' },
            editingList: [],
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.currentValue = value; // 当 Placeholder
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
            this.$emit('change', { oldValue, value }, this);
        },
    },
    created() {
        //
    },
    methods: {
        edit(index) {
            if (this.disabled) return;
            const text = this.currentValue[index];
            this.$set(this.editingList, index, { index, text });
        },
        editAdding() {
            if (this.disabled) return;
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
        onInput(index, $event) {
            const re = new RegExp(`[${this.separators}]+`);
            if (!$event.match(re)) return;
            this.reduce($event, index);
        },
        reduce(remain, index) {
            if (!remain) return;
            let part;
            const re = new RegExp(`[${this.separators}]+`);
            const cap = remain.match(re);
            if (cap) {
                part = remain.slice(0, cap.index).trim();
                remain = remain.slice(cap.index + cap[0].length).trim(); // 有可能不是匹配单个字符
            } else {
                part = remain;
                remain = '';
            }
            if (!part) return this.reduce(remain, index);
            const validator = this.$refs.validator.validator;
            validator
                .validate(part, 'blur')
                .then(() => {
                    if (index === -1) {
                        this.currentValue.push(part);
                        if (remain) {
                            this.reduce(remain, index);
                        } else this.keepAdding();
                    } else {
                        this.currentValue.splice(index, 0, part);
                        this.editingList.splice(index, 0, undefined);
                        index++;
                        if (remain) this.reduce(remain, index);
                        else this.editingList[index].text = '';
                    }
                })
                .catch((error) => {
                    if (index === -1) this.adding = { text: part };
                    else this.editingList[index].text = part;
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
            const text = this.currentValue[index];
            if (!editing.text) return;
            if (
                this.$emitPrevent(
                    'before-edit',
                    {
                        oldText: text,
                        text: editing.text,
                        index,
                        value: this.currentValue,
                    },
                    this,
                )
            )
                return;
            this.$set(this.currentValue, index, editing.text);
            this.$set(this.editingList, index, undefined);
            this.$emit(
                'edit',
                { text: editing.text, index, value: this.currentValue },
                this,
            );
        },
        saveAdding() {
            if (this.adding.text) {
                const text = this.adding.text;
                if (
                    this.$emitPrevent(
                        'before-add',
                        { text, oldValue: this.currentValue },
                        this,
                    )
                )
                    return;
                this.currentValue.push(text);
                this.adding = undefined;
                this.$emit('add', { text, value: this.currentValue }, this);
                this.$refs.listValidator.validate().catch(() => undefined);
                if (this.addNext) {
                    this.addNext = false;
                    this.keepAdding();
                }
            } else {
                if (this.currentValue.length) this.adding = undefined;
            }
        },
        remove(index) {
            const text = this.currentValue[index];
            if (
                this.$emitPrevent(
                    'before-remove',
                    { text, index, oldValue: this.currentValue },
                    this,
                )
            )
                return;
            this.currentValue.splice(index, 1);
            this.editingList.splice(index, 1);
            this.$refs.listValidator.validate().catch(() => undefined);
            this.$emit(
                'remove',
                { text, index, value: this.currentValue },
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
        onInputDelete(index, e) {
            const value = e.target.value;
            if (!value) {
                if (index === -1 && this.currentValue.length > 0) {
                    this.remove(this.currentValue.length - 1);
                    this.keepAdding();
                } else if (index > 0) this.remove(index);
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
    background: var(--select-background);
    border: var(--select-border-width) solid var(--select-border-color);
    color: var(--color-base, #555);
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

.chip {
    transition: all var(--transition-duration-fast);
}

.chip:hover {
    background: var(--chip-background-color-hover, #d0dbe7);
    border-color: var(--chip-background-color-hover, #d0dbe7);
}

.chip[editing] {
    background: white;
}

.root[disabled] .chip {
    background: var(--chip-background-color, #eef2f7);
    border-color: var(--chip-background-color, #eef2f7);
}

.chip-part {
    padding: 2px;
    /* background: var(--chip-background-color, #eef2f7); */
}

.chip-part:hover {
    /* background: var(--chip-background-color-hover, #d0dbe7; *)/
}

.root[disabled] .chip-part {
    /* background: var(--chip-background-color, #eef2f7); */
}

.chip-input {
    padding: 0 2px;
    border: 0;
    border-radius: 0;
    line-height: inherit;
    height: 20px;
    vertical-align: -2px;
    background: transparent;
}

.root[size$="normal"] { width: var(--wdith-base, 160px); }
.root[size^="normal"] { min-height: 40px; }

.root[size$="medium"] { width: var(--width-medium, 280px); }
.root[size^="medium"] { min-height: 70px; }

.root[size$="large"] { width: var(--width-large, 440px); }
.root[size^="large"] { min-height: 102px; }

.root[size$="huge"] { width: var(--width-huge, 580px); }
.root[size^="huge"] { min-height: 134px; }

.root[size$="full"] { width: 100%; }
.root[size^="full"] { min-height: 100%; }
</style>
