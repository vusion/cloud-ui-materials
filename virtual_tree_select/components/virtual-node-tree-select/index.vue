<template>
  <div>
    <CTreeDrop
      v-model="value"
      :data="data"
      titleField="name"
      keyField="id"
      checkable
      clearable
      drop-placeholder="请选择"
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
  props: {},
  components: { CTreeDrop },
  data() {
    return {
      value: [],
      data,
    };
  },
  methods: {
    handleCheckedChange() {
      this.$emit("change", this.value);
    },
  },
};
</script>

<style>
@import "@wsfe/ctree/dist/ctree.css";
</style>
