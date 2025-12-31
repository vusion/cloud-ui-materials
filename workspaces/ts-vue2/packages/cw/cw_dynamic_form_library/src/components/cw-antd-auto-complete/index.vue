<template>
  <a-auto-complete
    v-model="currentValue"
    @change="handleChange"
    @select="handleSelect"
    @search="handleSearch"
    v-bind="[$attrs, $props]"
    v-on="$listeners"
    style="width: 100%"
    :placeholder="placeholder"
    option-label-prop="title"
    :getPopupContainer="getPopupContainer"
    allowClear
  >
    <template slot="dataSource">
      <template v-if="valueField">
        <a-select-option v-for="item in listSource" :key="get(item, valueField)" :title="get(item, valueField)">
          {{ get(item, valueField) }}
        </a-select-option>
      </template>
      <template v-else>
        <a-select-option v-for="item in listSource" :key="item" :title="item">
          {{ item }}
        </a-select-option>
      </template>
    </template>
  </a-auto-complete>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'cw-antd-auto-complete',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    valueField: {
      type: String,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listSource: [],
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
        this.listSource = val;
      },
      immediate: true,
    },
  },
  methods: {
    get,
    handleChange(value) {
      this.$emit('update:value', value);
      this.$emit('onChange', value);
    },
    handleSelect(value) {
      this.$emit('update:value', value);
      this.$emit('onChange', value);
    },
    handleSearch(value) {
      this.listSource = [];
      this.listSource = value ? this.searchResult(value) : [];
      this.$emit('update:value', value);
      this.$emit('onChange', value);
    },
    searchResult(query) {
      const result = this.dataSource.filter(item => {
        if (typeof item === 'object') {
          return get(item, this.valueField).toString().indexOf(query) !== -1;
        } else if (typeof item === 'string') {
          return item.indexOf(query) !== -1;
        } else {
          throw new Error('数据源格式不正确,只能是对象或者是字符串');
        }
      });
      return result;
    },
    getPopupContainer(trigger) {
      return trigger.parentNode;
    },
  },
};
</script>

<style scoped>
.ant-select-dropdown {
  z-index: 6000;
}
</style>
