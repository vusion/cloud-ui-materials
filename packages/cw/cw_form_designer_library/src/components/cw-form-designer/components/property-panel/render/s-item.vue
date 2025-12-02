<template>
  <component v-if="componentName && showItem" :is="componentName" v-bind="componentProps" v-on="componentListeners" :selected-node="selectedNode">
    <template v-if="hasInnerText">
      {{ schema.innerText }}
    </template>
    <template v-if="hasChildren">
      <s-item
        v-for="(it, index) in schema.children"
        :key="it.id"
        :schema="it"
        :data="data"
        :handle-field-change="handleFieldChange"
        :selected-node="selectedNode"
      ></s-item>
    </template>
  </component>
</template>

<script>
import components from './register';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'SItem',
  props: {
    schema: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    selectedNode: {
      type: Object,
      default: null,
    },
    handleFieldChange: {
      type: Function,
      default: null,
    },
  },
  mounted() {
    // if (['el-switch'].includes(this.schema?.tag)) {
    //   console.log('s-item', this.schema.tag, this, this.schema, this.selectedNode);
    //   //
    // }
    // console.log('s-item', this.schema.tag);
  },
  computed: {
    componentName() {
      return components?.[this.schema?.tag] || this.schema?.tag;
    },
    showItem() {
      const expression = this.schema?.reactions?.fulfill?.show;
      if (!expression) return true;
      const depsFields = this.schema?.reactions?.dependencies || [];
      if (!depsFields.length) return true;
      const $deps = depsFields.map((it) => this.data?.[it]);
      try {
        return eval(expression);
      } catch (error) {
        console.warn(error);
        return true;
      }
    },
    hasInnerText() {
      return typeof this.schema?.innerText !== 'undefined' && this.schema?.innerText !== null;
    },
    hasChildren() {
      return Array.isArray(this.schema?.children) && this.schema.children.length > 0;
    },
    hasField() {
      return typeof this.schema?.field === 'string' && this.schema.field !== '';
    },
    componentProps() {
      const props = { ...(this.schema?.props || {}) };
      if (this.hasField) {
        props.value = this.data?.[this.schema.field];
      }
      return props;
    },
    componentListeners() {
      const listeners = { ...(this.schema?.listeners || this.schema?.on || {}) };
      if (!this.hasField) {
        return listeners;
      }

      const originalInput = listeners.input;
      const originalChange = listeners.change;

      listeners.input = (payload, ...args) => {
        const value = this.normalizeValue(payload);
        this.updateValue(value);
        if (typeof originalInput === 'function') {
          originalInput(value, ...args);
        }
      };

      listeners.change = (payload, ...args) => {
        const value = this.normalizeValue(payload);
        // 在更新值之前先保存旧值
        const oldValue = this.hasField ? this.data?.[this.schema.field] : undefined;
        this.updateValue(value);
        this.emitFieldChange(value, oldValue);
        if (typeof originalChange === 'function') {
          originalChange(value, ...args);
        }
      };

      return listeners;
    },
  },
  methods: {
    getKey(it, index) {
      return it?.props?.key || `${it.uuid}`; // 根据配置生成唯一key，优先使用显式key
    },
    normalizeValue(payload) {
      if (payload && payload.target) {
        return payload.target?.value;
      }
      return payload;
    },
    updateValue(value) {
      if (!this.hasField) return;
      this.$set(this.data, this.schema.field, value);
    },
    emitFieldChange(value, oldValue) {
      if (this.hasField && typeof this.handleFieldChange === 'function') {
        this.handleFieldChange(this.schema.field, value, oldValue);
      }
    },
  },
};
</script>
