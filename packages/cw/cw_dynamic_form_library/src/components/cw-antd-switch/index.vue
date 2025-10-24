<template>
  <a-switch
    v-model="currentValue"
    @change="handleChange"
    v-bind="[$attrs, $props]"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'cw-antd-switch',
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentValue: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(val) {
      this.$emit('update:value', val);
      this.$emit('onChange', val);
    },
  },
};
</script>

<style scoped></style>
