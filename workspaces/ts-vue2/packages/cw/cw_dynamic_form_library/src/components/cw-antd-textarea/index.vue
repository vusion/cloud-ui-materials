<template>
  <a-textarea v-model="currentValue" v-on="$listeners" allow-clear v-bind="[$attrs, $props]" />
</template>

<script>
export default {
  name: 'cw-antd-textarea',
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      currentValue: '',
      autosize: true,
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
      this.$emit('update:value', e.target.value);
      this.$emit('onChange', e.target.value);
    },
  },
};
</script>

<style></style>
