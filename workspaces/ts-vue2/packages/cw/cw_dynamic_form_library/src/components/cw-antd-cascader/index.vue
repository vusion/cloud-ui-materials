<template>
  <a-cascader
    v-model="currentValue"
    @change="handleChange"
    v-bind="[$attrs, $props]"
    v-on="$listeners"
    :options="sourceList"
    :getPopupContainer="getPopupContainer"
  />
</template>

<script>
export default {
  name: 'cw-antd-cascader',
  props: {
    value: {
      type: Array,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sourceList: [],
      currentValue: [],
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
      this.$emit('onChange', val);
    },
    getPopupContainer(trigger) {
      return trigger.parentNode;
    },
  },
};
</script>

<style scoped></style>
