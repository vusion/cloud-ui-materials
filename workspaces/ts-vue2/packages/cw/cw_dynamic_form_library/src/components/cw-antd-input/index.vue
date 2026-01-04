<template>
  <a-input v-model="currentValue" @change="handleChange" v-bind="[$attrs, $props]" v-on="$listeners" />
</template>

<script>
export default {
  name: 'cw-antd-input',
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
  watch: {
    value: {
      handler(val) {
        // 将数字转换为字符串
        this.currentValue = val !== null && val !== undefined ? String(val) : '';
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('update:value', e.target.value);
      this.$emit('onChange', e);
    },
  },
};
</script>

<style></style>
