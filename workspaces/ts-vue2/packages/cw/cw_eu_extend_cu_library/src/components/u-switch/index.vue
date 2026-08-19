<template>
<label v-if="!isPreview" :class="$style.root" :with-text="withText" :checked="currentValue" :readonly="readonly" :disabled="computedDisabled" @click="toggle()"
    tabindex="0" @keydown.space.prevent @keyup.space.prevent="toggle()"
    @focus="onFocus" @blur="onBlur" v-on="listeners">
    <span :class="$style.button"></span>
    <span :class="$style.text" vusion-slot-name="default">
        <slot>
            <template v-if="withText">
                {{(currentValue ? checkedChildren :unCheckedChildren) }}
            </template>
        </slot>
    </span>
</label>
<u-preview v-else :text="$tt(currentValue ? 'on' : 'off')"></u-preview>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import MField from "@lcap-ui/src/components/m-field.vue";
import UPreview from "@lcap-ui/src/components/u-text.vue";
import MPreview from "@lcap-ui/src/components/u-text.vue/preview";
import i18nMixin from "@lcap-ui/src/mixins/i18n";
export default {
  name: 'u-switch',
  inject: {
    formVM: {
      default: null
    }
  },
  mixins: [MField, MPreview, i18nMixin('u-switch'), sync({
    value: 'currentValue',
    readonly: 'readonly',
    preview: 'isPreview',
    disabled: 'computedDisabled'
  })],
  components: {
    UPreview
  },
  props: {
    withText: {
      type: Boolean,
      default: false
    },
    checkedChildren: {
      type: String,
      default: "ON"
    },
    unCheckedChildren: {
      type: String,
      default: "OFF"
    },
    value: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  computed: {
    computedDisabled() {
      return this.disabled || this.formVM && this.formVM.disabled;
    },
    listeners() {
      const listeners = Object.assign({}, this.$listeners);
      ['focus', 'blur', 'update:value'].forEach(prop => {
        delete listeners[prop];
      });
      return listeners;
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    },
    currentValue(value, oldValue) {
      this.$emit('change', {
        value,
        oldValue
      }, this);
    }
  },
  methods: {
    onFocus(e) {
      this.$emit('focus', e, this);
    },
    onBlur(e) {
      this.$emit('blur', e, this);
    },
    toggle(value) {
      // Check if enabled
      if (this.readonly || this.computedDisabled) return; // Method overloading
      if (value === undefined) value = !this.currentValue; // Prevent replication
      const oldValue = this.currentValue;
      if (value === oldValue) return; // Emit a `before-` event with preventDefault()
      if (this.$emitPrevent('before-toggle', {
        value,
        oldValue
      }, this)) return; // Assign and sync `value`
      this.currentValue = value;
      this.$emit('input', value, this);
      this.$emit('update:value', value, this); // Emit `after-` events
      if (value) this.$emit('on', undefined, this);else this.$emit('off', undefined, this);
      this.$emit('toggle', {
        value,
        oldValue
      }, this);
    }
  }
};
</script>
<style module>
.root {
    display: inline-block;
    position: relative;
    line-height: var(--switch-height);
    height: var(--switch-height);
    vertical-align: middle;
    user-select: none;
    cursor: var(--cursor-pointer);
    width: var(--switch-width);
    border-radius: 100px;
    background: var(--switch-background);
    color: var(--switch-color);
    transition: var(--switch-transition);
}

.root:focus {
    outline: var(--focus-outline);
}

.button {
    position: absolute;
    left: var(--switch-button-space);
    top: calc((var(--switch-height) - var(--switch-button-size)) / 2);
    border-radius: var(--switch-button-radius);
    width: var(--switch-button-size);
    height: var(--switch-button-size);
    background: var(--switch-button-background);
    transition: var(--switch-button-transition);
}

.text {
    display: block;
    text-align: center;
    font-size: var(--switch-font-size);
    /* text-align: right; */
    /* margin: var(--switch-text-margin); */
}

.root[checked] {
    background: var(--switch-background-checked);
}

.root[checked] .button {
    left: calc(100% - var(--switch-button-size) - var(--switch-button-space));
    background: var(--switch-button-background-checked);
}

.root[width="wide"] {
    width: var(--switch-width-wide);
}

.root[disabled] {
    cursor: var(--cursor-not-allowed);
    background: var(--switch-background-disabled);
}
.root[disabled][checked]{
    background: var(--switch-background-disabled-checked);
}

.root[readonly]{
    cursor: default;
}

.root[with-text] {
    width: auto;
    min-width: var(--switch-width-wide);
    padding-left: 8px;
    padding-right: 8px;

}

.root[with-text][checked] .button {
}



.root[size="small"] {
    line-height: var(--switch-height-small);
    height: var(--switch-height-small);
    width: var(--switch-width-small);
}

.root[size="small"] .button {
    top: calc((var(--switch-height-small) - var(--switch-button-size-small)) / 2);
    width: var(--switch-button-size-small);
    height: var(--switch-button-size-small);
}

.root[size="small"][checked] .button {
    left: calc(100% - var(--switch-button-size-small) - var(--switch-button-space));
}

.root .text {
    margin-left: var(--switch-button-size);
}
.root[checked] .text {
    margin-left: 0;
    margin-right: var(--switch-button-size);
}
.root[size="small"][checked] .text {
    margin-right: var(--switch-button-size-small);
}

</style>