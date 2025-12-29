<template>
  <div :class="$style.root">
    <el-radio-group :value="currentValue" @input="handleChange" size="small">
      <el-radio-button v-for="item in dataSource" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 's-group-btn',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Boolean],
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
      this.currentValue = value;
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;

  [class^='el-radio-group'] {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f2f3f5;
    border-radius: 4px;
    padding: 0 3px;
    gap: 4px;
  }

  [class^='el-radio-button'] {
    flex: 1;
    box-shadow: none !important;
    &:checked + [class^='el-radio-button__inner'] {
      color: #111;
      background-color: #fff;
      border: 1px solid #dadee8 !important;
      border-radius: 4px;
      box-shadow: 0 1px 2px 0 rgba(7, 35, 53, 0.12) !important;
      height: 26px;
    }
  }
  [class^='el-radio-button__inner'] {
    border: none !important;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #555;
    transition: none !important;
  }
}
</style>
