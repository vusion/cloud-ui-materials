<template>
  <div>
    dataSource - {{ data }}
    <a-transfer
      class="tree-transfer"
      :locale="locale"
      :data-source="data"
      :target-keys="targetKeys"
      :render="(item) => item.title"
      :show-select-all="true"
      :show-search="true"
      :operations="operations"
      :titles="titles"
      :disabled="disabled"
      :filterOption="filterOption"
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
import supportDatasource from "@/mixins/support.datasource";
import Transfer from "ant-design-vue/es/transfer";
import Tree from "ant-design-vue/es/tree";
const treeData = [
  { key: "0-0", title: "0-0" },
  {
    key: "0-1",
    title: "0-1",
    children: [
      { key: "0-1-0", title: "0-1-0" },
      { key: "0-1-1", title: "0-1-1" },
    ],
  },
  { key: "0-2", title: "0-3" },
];

const transferDataSource = [];
function flatten(list = []) {
  list.forEach((item) => {
    transferDataSource.push(item);
    flatten(item.children);
  });
}
flatten(JSON.parse(JSON.stringify(treeData)));

function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1;
}

function handleTreeData(data, targetKeys = []) {
  data.forEach((item) => {
    item["disabled"] = targetKeys.includes(item.key);
    if (item.children) {
      handleTreeData(item.children, targetKeys);
    }
  });
  return data;
}

export default {
  name: "cw-tree-transfer",
  mixins: [supportDatasource, MField],
  components: {
    ATransfer: Transfer,
    ATree: Tree,
  },
  props: {
    data: {
      type: Array,
      default() {
        return transferDataSource;
      },
    },
    targetKeys: {
      type: Array,
      default() {
        return [];
      },
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
      return handleTreeData(treeData, this.targetKeys);
    },
  },
  methods: {
    onChange(targetKeys, direction, moveKeys) {
      console.log(
        "search => targetKeys, direction, moveKey",
        targetKeys,
        direction,
        moveKeys
      );
      this.$emit("onChange", { targetKeys, direction, moveKeys });
      this.targetKeys = targetKeys;
    },
    scroll(direction, event) {
      this.$emit("scroll", { direction, event });
      console.log("search => direction, event", direction, event);
    },
    search(direction, value) {
      this.$emit("search", { direction, value });
      console.log("search => direction, event", direction, value);
    },
    selectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.$emit("selectChange", { sourceSelectedKeys, targetSelectedKeys });
      console.log(
        "selectChange => sourceSelectedKeys, targetSelectedKeys",
        sourceSelectedKeys,
        targetSelectedKeys
      );
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node;
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey));
    },
    filterOption(inputValue, option) {
      console.log("filterOption => inputValue, option", inputValue, option);
      return true;
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
