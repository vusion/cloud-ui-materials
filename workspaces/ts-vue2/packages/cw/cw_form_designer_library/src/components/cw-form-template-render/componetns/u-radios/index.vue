<template>
<div 
    :class="$style.root"
    :style="getStyle()"
    :direction="direction"
    :isSetColumn="isSetColumn">
    <u-loading v-if="loading" size="small"></u-loading>
    <template v-else>
        <u-radio
            v-for="(node, index) in currentDataSource.data"
            :key="index"
            :text="$at2(node, textField)"
            :label="$at2(node, valueField)"
            :disabled="node.disabled"
            :readonly="node.readonly"
            :designer="$env.VUE_APP_DESIGNER"
            :node="node"
        >
            <template #item="item">
                <slot name="item" v-bind="item" :index="index">
                    {{ $at2(node, textField) }}
                </slot>
            </template>
        </u-radio>
        <u-preview v-if="isPreview && !selectedVM"></u-preview>
    </template>
    <template v-if="$env.VUE_APP_DESIGNER && !dataSource && !$slots.default">
        <!-- <span :class="$style.loadContent">{{ treeSelectTip }}</span> -->
        <span :class="$style.loadContent">{{ $env.emptyDataSourceTip }}</span>
    </template>
    <slot></slot>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import { MParent } from "@lcap-ui/src/components/m-parent.vue";
import MField from "@lcap-ui/src/components/m-field.vue";
import URadio from './radio.vue';
import SupportDataSource from "@lcap-ui/src/mixins/support.datasource.js";
import MPreview from "@lcap-ui/src/components/u-text.vue/preview";
import UPreview from "@lcap-ui/src/components/u-text.vue/preview.vue";
export default {
  name: 'u-radios',
  inject: ['$env'], // 设计模式下，注入$env
  childName: 'u-radio',
  components: {
    URadio,
    UPreview
  },
  mixins: [MParent, MField, SupportDataSource, MPreview, sync({
    data() {
      return this.currentDataSource ? this.currentDataSource.data : [];
    },
    value() {
      return this.selectedVM && this.selectedVM.label;
    },
    readonly: 'readonly',
    preview: 'isPreview',
    disabled: 'disabled'
  })],
  props: {
    value: null,
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    column: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // inherit: itemVMs: [],
      selectedVM: undefined,
      currentText: null,
      isSetColumn: false
    };
  },
  watch: {
    value(value, oldValue) {
      this.watchValue(value);
    },
    selectedVM(selectedVM, oldVM) {
      this.$emit('change', {
        value: selectedVM ? selectedVM.label : undefined,
        oldValue: oldVM ? oldVM.label : undefined,
        item: selectedVM ? selectedVM.item : undefined,
        itemVM: selectedVM
      }, this);
      this.currentText = selectedVM?.$slots?.item?.[0].componentOptions.propsData.text;
    },
    itemVMs() {
      this.selectedVM = undefined;
      this.watchValue(this.value);
    }
  },
  mounted() {
    this.watchValue(this.value);
  },
  methods: {
    watchValue(value) {
      if (this.selectedVM && this.selectedVM.label === value) return;
      if (value === undefined) this.selectedVM = undefined;else this.selectedVM = this.itemVMs.find(itemVM => itemVM.label === value);
    },
    select(itemVM) {
      if (this.readonly || this.disabled) return;
      const oldValue = this.value;
      let cancel = false;
      this.$emit('before-select', {
        value: itemVM && itemVM.label,
        oldValue,
        itemVM,
        preventDefault: () => cancel = true
      }, this);
      if (cancel) return;
      if (this.cancelable && this.selectedVM === itemVM) this.selectedVM = undefined;else this.selectedVM = itemVM;
      const value = this.selectedVM && this.selectedVM.label;
      this.$emit('input', value, this);
      this.$emit('update:value', value, this);
      this.$emit('select', {
        value,
        oldValue,
        itemVM: this.selectedVM
      }, this);
    },
    getStyle() {
      let styles = {};
      let isSetColumn = false;
      if (this.direction !== 'vertical' && this.column > 0) {
        isSetColumn = true;
        styles = {
          ...styles,
          display: 'grid',
          gridTemplateColumns: `repeat(${this.column}, calc(100% / ${this.column}))`
        };
      }
      this.isSetColumn = isSetColumn;
      return styles;
    }
  }
};
</script>
<style module>
.root {}

.root > *:not(:last-child) {
    margin-right: var(--radio-space-x);
}

.root .loadContent {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.root[direction="vertical"] {
  display: grid;
  grid-template-columns: 1;
}

.root[direction] {
    row-gap: var(--radio-space-y);
}

</style>