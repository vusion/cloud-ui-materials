<template>
  <div :class="$style.root">
    <div :class="$style.itemCol">
      <span :class="{ [$style.underline]: showUnderline }">显示分页器</span>
      <el-switch v-model="values.showPagination" size="small" @change="setTableAttrValue('pagination', $event)" />
    </div>
    <div v-if="values.showPagination" :class="$style.itemCol">
      <span :class="{ [$style.underline]: showUnderline }">默认每页条数</span>
      <el-input-number
        v-model="values.pageSize"
        controls-position="right"
        :min="0"
        :step="1"
        style="width: 152px"
        @change="setTableAttrValue('pageSize', $event)"
      />
    </div>
    <div v-if="values.showPagination" :class="$style.itemCol">
      <span :class="{ [$style.underline]: showUnderline }">显示每页条数</span>
      <el-switch v-model="values.showPageSize" size="small" @change="setTableAttrValue('showSizer', $event)" />
    </div>
    <div v-if="values.showPagination" :class="$style.itemCol">
      <span :class="{ [$style.underline]: showUnderline }">显示总条数</span>
      <el-switch v-model="values.showTotal" size="small" @change="setTableAttrValue('showTotal', $event)" />
    </div>
  </div>
</template>

<script>
import { getAttrValue, setAttrValue } from '../../fields';
export default {
  name: 'STablePagination',
  props: {
    subForm: {
      type: Object,
      default: () => ({}),
    },
    showUnderline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      values: {
        showPagination: undefined,
        showPageSize: undefined,
        pageSize: undefined,
        showTotal: undefined,
      },
    };
  },
  created() {
    if (!this.subForm) return;
    Object.assign(this.values, {
      showPagination: getAttrValue({ node: this.subForm, key: 'pagination' }) ?? false,
      showPageSize: getAttrValue({ node: this.subForm, key: 'showSizer' }) ?? true,
      pageSize: getAttrValue({ node: this.subForm, key: 'pageSize' }) ?? 20,
      showTotal: getAttrValue({ node: this.subForm, key: 'showTotal' }) ?? false,
    });
  },
  methods: {
    setTableAttrValue(name, value) {
      setAttrValue({ node: this.subForm, key: name, value, type: 'static' });
    },
  },
};
</script>

<style module>
.root {
}
.itemCol {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
  color: var(--text-color-regular);
}

.underline {
  border-width: 0px 0px 1px 0px;
  border-style: dashed;
  border-color: #c9cdd4;
}
</style>
