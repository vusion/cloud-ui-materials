<template>
  <div>
    <a-transfer
      class="tree-transfer"
      :data-source="dataSource"
      :target-keys="targetKeys"
      :render="(item) => item.title"
      :show-select-all="false"
      @change="onChange"
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
  },
  data() {
    return {
      targetKeys: [],
      dataSource: transferDataSource,
    };
  },
  computed: {
    treeData() {
      return handleTreeData(treeData, this.targetKeys);
    },
  },
  methods: {
    onChange(targetKeys) {
      console.log("Target Keys:", targetKeys);
      this.targetKeys = targetKeys;
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node;
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey));
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
