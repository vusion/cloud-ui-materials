<template>
  <div>
    <a-transfer
      class="tree-transfer"
      :locale="locale"
      :data-source="transferDataSource"
      :target-keys="targetKeys"
      :render="(item) => item[textField]"
      :show-select-all="showSelectAll"
      :show-search="showSearch"
      :operations="operations"
      :titles="titles"
      :disabled="disabled"
      :listStyle="listStyle"
      @change="onChange"
      @selectChange="selectChange"
      @search="search"
      @scroll="scroll"
    >
      <template
        slot="children"
        slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }"
      >
        <a-tree
          v-if="direction === 'left'"
          blockNode
          checkable
          checkStrictly
          defaultExpandAll
          :checkedKeys="[...selectedKeys, ...targetKeys]"
          :treeData="treeData"
          @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
          @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], itemSelect);
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script>
import { MField } from "../../widgets/m-field";
import Transfer from "ant-design-vue/es/transfer";
import Tree from "ant-design-vue/es/tree";

export default {
  name: "cw-tree-transfer",
  mixins: [MField],
  components: {
    ATransfer: Transfer,
    ATree: Tree,
  },
  props: {
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    targetKeys: {
      type: Array,
      default() {
        return;
      },
    },
    textField: {
      type: String,
      default: "text",
    },
    valueField: {
      type: String,
      default: "value",
    },
    childrenField: {
      type: String,
      default: "children",
    },
    operations: {
      type: Array,
      default() {
        return [];
      },
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    locale: {
      type: Object,
      default() {
        return {
          itemUnit: "项",
          itemsUnit: "项",
          notFoundContent: "当前列表为空",
          searchPlaceholder: "请输入搜索内容",
        };
      },
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    showSelectAll: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    listStyle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    treeData() {
      return this.handleTreeData(this.source || [], this.targetKeys);
    },
    transferDataSource() {
      const vm = this;
      const transferDataSource = [];
      function flatten(list = []) {
        list.forEach((item) => {
          transferDataSource.push(item);
          flatten(item[vm.childrenField]);
        });
      }
      flatten(JSON.parse(JSON.stringify(this.source)));
      return transferDataSource;
    },
  },
  methods: {
    isChecked(selectedKeys, eventKey) {
      return selectedKeys.indexOf(eventKey) !== -1;
    },
    handleTreeData(data, targetKeys = []) {
      data.forEach((item) => {
        item["disabled"] = targetKeys.includes(item[this.textField]);
        item.value = item[this.valueField];
        if (item.children) {
          this.handleTreeData(item.children, targetKeys);
        }
      });
      return data;
    },
    onChange(targetKeys, direction, moveKeys) {
      console.log("targetKeys", targetKeys);
      this.$emit("onChange", { targetKeys, direction, moveKeys });
      this.$emit("update:targetKeys", targetKeys);
    },
    scroll(direction, event) {
      this.$emit("scroll", { direction, event });
    },
    search(direction, value) {
      this.$emit("search", { direction, value });
    },
    selectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.$emit("selectChange", { sourceSelectedKeys, targetSelectedKeys });
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node;
      itemSelect(eventKey, !this.isChecked(checkedKeys, eventKey));
    },
  },
};
</script>
<style scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
</style>
