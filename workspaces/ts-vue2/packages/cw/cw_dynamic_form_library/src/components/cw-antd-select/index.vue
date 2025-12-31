<template>
  <a-select
    class="custom-select"
    v-model="currentValue"
    @change="handleChange"
    v-bind="[$attrs, $props]"
    v-on="$listeners"
    style="width: 100%;"
    :getPopupContainer="getPopupContainer"
  >
    <a-select-option v-for="(item, index) in sourceList" :key="index" :value="item.value">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'cw-antd-select',
  props: {
    value: {
      type: String,
    },
    valueField: {
      type: String,
      default: 'value',
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      sourceList: [],
      currentValue: '',
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true,
    },
    dataSource: {
      handler(val) {
        this.sourceList = val;
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(val) {
      this.$emit('update:value', val);
      this.$emit('change', val);
      this.$emit('onChange', val);
    },
    getPopupContainer(trigger) {
      return trigger.parentNode;
    },
  },
};
</script>

<style scoped>
.custom-select {
  line-height: 32px !important;
}
</style>
