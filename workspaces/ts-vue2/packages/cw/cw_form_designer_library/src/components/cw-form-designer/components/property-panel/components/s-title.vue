<template>
  <div :class="$style.root">
    <el-form-item label="标题" style="margin-bottom: 0" />
    <el-input v-model="currentValue" placeholder="请输入标题" clearable @change="handleChange"></el-input>
  </div>
</template>

<script>
export default {
  name: 's-title',
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    handleChange(value) {
      // this.currentValue = value;
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  margin-bottom: 15px;
}
</style>
