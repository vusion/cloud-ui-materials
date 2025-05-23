<template>
  <div
    v-if="!isPreview"
    :class="$style.root"
    :readonly="readonly"
    :disabled="disabled"
    :color="currentColor || (formItemVM && formItemVM.color)"
    :focus="focused"
    :clearable="clearable && currentValue"
    :prefix="prefix"
    :suffix="suffix"
    :show-password="showPassword"
    :password="password"
    @click.self="!focused && focus()"
  >
    <span :class="$style.baseline">b</span
    ><!-- 用于基线对齐 -->
    <span :class="$style.placeholder" v-show="placeholder">{{ valueEmpty ? placeholder : '' }}</span
    ><!-- 兼容 IE9 -->
    <span v-if="prefix || $slots.prefix" :class="$style.prefix" @click="!disabled && $emit('click-prefix', $event, this)" :name="prefix">
      <slot name="prefix">
        <i-ico v-if="prefix !== 'If'" :name="prefix" :class="$style.singleicon" notext></i-ico>
      </slot>
    </span>
    <!-- <i-ico v-else-if="prefix" notext :name="prefix" :class="$style.prefix" @click="$emit('click-prefix', $event, this)"></i-ico> -->
    <input
      ref="input"
      :class="$style.input"
      v-bind="$attrs"
      :type="curType"
      :value="currentValue"
      v-focus="autofocus"
      :readonly="readonly"
      :disabled="disabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keypress="onKeypress"
      @keydown="onKeydown"
      @keyup="onKeyup"
      v-on="listeners"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      @keydown.enter="onEnter"
      :title="!showTitle || (!valueEmpty && !disabled) ? null : $attrs.title || placeholder"
    />
    <slot></slot>
    <span :class="$style.suffix" v-if="password || suffix || clearable">
      <span :class="$style.password" v-if="password" @click.stop="togglePassword"></span>
      <span v-if="suffix" @click="!disabled && $emit('click-suffix', $event, this)">
        <slot name="suffix">
          <i-ico :name="suffix" :class="$style.singleicon" notext></i-ico>
        </slot>
      </span>
      <!-- <i-ico v-else-if="suffix" notext :name="suffix"
            @click="$emit('click-suffix', $event, this)"></i-ico> -->
      <span :class="$style.clearable" v-if="clearable && !valueEmpty && !readonly && !disabled" @click.stop="clear"></span>
    </span>
  </div>
  <u-preview v-else :text="currentValue"></u-preview>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import MField from '@lcap-ui/src/components/m-field.vue';
import { focus } from '@lcap-ui/src/directives';
import { isIE } from '@lcap-ui/src/utils/dom';
// import IIco from '../i-ico.vue';
import UPreview from '@lcap-ui/src/components/u-text.vue';
import MPreview from '@lcap-ui/src/components/u-text.vue/preview';
export default {
  name: 'u-input',
  component: {
    // IIco,
    UPreview,
  },
  directives: {
    focus,
  },
  mixins: [
    MField,
    MPreview,
    sync({
      value: 'currentValue',
      readonly: 'readonly',
      preview: 'isPreview',
      disabled: 'disabled',
    }),
  ],
  props: {
    value: [String, Number],
    color: String,
    placeholder: String,
    emptyValueIsNull: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: [Boolean, String],
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    password: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    maxlengthMessage: String,
    prefix: {
      type: [String, Boolean],
    },
    suffix: {
      type: [String, Boolean],
    },
    autoSize: {
      type: String,
      validator: (value) => ['horizontal', 'vertical', 'both'].includes(value),
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    autoselect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focused: false,
      currentValue: this.value,
      currentColor: this.color,
      compositionInputing: false,
      showPassword: false,
      curType: this.type,
    };
  },
  computed: {
    listeners() {
      const listeners = Object.assign({}, this.$listeners);
      ['input', 'change', 'focus', 'blur', 'update:value', 'keyup', 'keydown'].forEach((prop) => {
        delete listeners[prop];
      });
      return listeners;
    },
    valueEmpty() {
      const { currentValue } = this;
      if (this.compositionInputing) {
        return false;
      }
      return currentValue === undefined || currentValue === '' || currentValue === null;
    },
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    currentValue(value, oldValue) {
      // 如果输入法还在输入中，不向外部输出变更
      if (!this.compositionInputing) {
        this.autoSize && this.autoResize();
        this.$emit('update', this.handleEmptyValue(value), this);
        this.$emit(
          'change',
          {
            value,
            oldValue,
          },
          this
        );
      }
    },
    color(color) {
      this.currentColor = color;
    },
    type(type) {
      this.curType = type;
    },
  },
  mounted() {
    this.$emit('update', this.value, this);
    this.autoSize && this.autoResize();
    this.autoselect && this.select();
    // 在ie11，刷新页面会保留输入框输入的值，这里强制同步
    if (isIE()) {
      clearInterval(this.inputTimer);
      this.inputTimer = setTimeout(() => {
        if (this.$refs.input && this.$refs.input.value !== this.currentValue) {
          this.$refs.input.value = this.valueEmpty ? '' : this.currentValue;
        }
      });
    }
  },
  methods: {
    onKeypress(e) {
      const inputEl = e.target;
      if (this.formItemVM && this.maxlengthMessage && inputEl.value.length === inputEl.maxLength) {
        this.formItemVM.color = 'error';
        this.formItemVM.currentMessage = this.maxlengthMessage;
      }
    },
    onKeydown(e) {
      this.$emit('keydown', e, this);
    },
    onKeyup(e) {
      this.$emit('keyup', e, this);
    },
    onInput(e) {
      if (this.autoSize) this.autoResize();
      if (!this.compositionInputing) {
        const $event = {
          oldValue: this.currentValue,
          value: this.handleEmptyValue(e.target.value),
        };
        if (this.$emitPrevent('before-input', $event, this)) return;
        if (this.formItemVM && this.maxlengthMessage) {
          this.formItemVM.color = '';
          this.formItemVM.currentMessage = '';
        }
        this.currentValue = $event.value;
        this.$emit('input', $event.value, this);
        this.$emit('update:value', $event.value, this);
      } else {
        this.currentValue = e.target.value;
      }
    },
    onFocus(e) {
      this.focused = true;
      this.$emit('focus', e, this);
      e.target.addEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown(e) {
      // 判断回车键
      if (e.key === 'Enter' || e.keyCode === 13) {
        console.log('enter', e);
        this.$emit('enter', e, this);
      }
    },
    onBlur(e) {
      this.focused = false;
      this.$emit('blur', e, this);
      this.$emit('blur:value', this.handleEmptyValue(this.currentValue));
      // 移除 keydown 事件监听
      e.target.removeEventListener('keydown', this.handleKeyDown);
    },
    onCompositionStart(e) {
      this.compositionInputing = true;
      this.$emit('compositionstart', e);
    },
    onCompositionEnd(e) {
      // 中文输入的时候，会先触发 onInput 事件，再触发此事件，导致不能捕捉到中文输入
      // 因此需要特殊处理，此时 compositionInputing 值为 true
      this.compositionInputing = false;
      const $event = {
        oldValue: this.currentValue,
        value: this.handleEmptyValue(e.target.value),
      };
      if (this.$emitPrevent('before-input', $event, this)) return;
      this.currentValue = $event.value;
      this.$emit('input', $event.value, this);
      this.$emit('update:value', $event.value, this);
      // 由于 先出onInput currentValue 已经更新过了，这时候再赋值不会触发 watch ，导致change 事件无法触发，所以这里加上触发 change 逻辑
      this.$emit('change', $event, this);
      this.$emit('compositionend', e);
    },
    focus() {
      this.$refs.input && this.$refs.input.focus();
    },
    blur() {
      this.$refs.input && this.$refs.input.blur();
    },
    clear() {
      if (this.readonly || this.disabled) return;
      const $event = {
        oldValue: this.currentValue,
        value: this.handleEmptyValue(''),
      };
      if (this.$emitPrevent('before-clear', $event, this)) return;
      if (this.$emitPrevent('before-input', $event, this)) return;
      this.currentValue = $event.value;
      this.$emit('input', $event.value, this);
      this.$emit('update:value', $event.value, this);
      this.focus();
      this.$emit('clear', $event, this);
    },
    togglePassword() {
      if (this.readonly || this.disabled) return;
      const showPassword = this.curType === 'text';
      this.showPassword = !showPassword;
      this.curType = showPassword ? 'password' : 'text';
    },
    autoResize() {
      const inputEl = this.$refs.input;
      if (this.autoSize === 'both' || this.autoSize === 'horizontal') {
        inputEl.style.width = '3px';
        this.$el.style.width = inputEl.scrollWidth + (this.$el.offsetWidth - this.$el.clientWidth) + 'px';
        inputEl.style.width = '';
      }
      if (this.autoSize === 'both' || this.autoSize === 'vertical') {
        inputEl.style.height = '3px';
        this.$el.style.height = inputEl.scrollHeight + (this.$el.offsetHeight - this.$el.clientHeight) + 'px';
        inputEl.style.height = '';
      }
    },
    updateCurrentValue(value) {
      this.currentValue = value;
    },
    onEnter(e) {
      if (this.compositionInputing) {
        this.compositionInputing = false;
        this.onInput(e);
      }
    },
    select() {
      this.$nextTick(() => {
        this.$refs.input && this.$refs.input.select();
      });
    },
    handleEmptyValue(value) {
      if (!this.emptyValueIsNull) {
        return value;
      } else {
        return value ? value : null;
      }
    },
  },
};
</script>
<style module src="./index.css"></style>
