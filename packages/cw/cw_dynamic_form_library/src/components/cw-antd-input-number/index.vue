<template>
  <a-input-number
    style="width:100%"
    v-model="currentValue"
    @change="handleChange"
    v-bind="[$attrs, $props]"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'cw-antd-input-number',
  props: {
    value: {
      type: [Number, String],
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
        this.currentValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('update:value', e);
      this.$emit('onChange', e);
      this.$emit('onInput', e);
    },
  },
};
</script>

<style scoped></style>
