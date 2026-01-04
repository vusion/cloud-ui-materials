<template>
  <div>
    <CTreeDrop
      :value="value"
      :data="data"
      titleField="name"
      keyField="id"
      checkable
      clearable
      :drop-placeholder="placeholder"
      :empty-text="emptyText"
      :checked-button-text="checkedButtonText"
      :search-placeholder="searchPlaceholder"
      :show-footer="false"
      placement="bottom-start"
      :dropdown-min-width="300"
      dropdown-width-fixed
      @checked-change="handleCheckedChange"
    />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import { CTreeDrop } from "@wsfe/ctree";
import data from "./data.js";
export default {
  name: "virtual-node-tree-select",
  components: { CTreeDrop },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    checkedButtonText: {
      type: String,
      default: "已选",
    },
    searchPlaceholder: {
      type: String,
      default: "搜索关键字",
    },
  },
  methods: {
    handleCheckedChange(value) {
        this.$emit("change", value);
    },
  },
};
</script>

<style>
@import "@wsfe/ctree/dist/ctree.css";
</style>
