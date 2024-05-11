<template>
  <div>
    <CTreeDrop
      ref="tree"
      :value="value"
      :titleField="titleField"
      :keyField="keyField"
      :checkable="checkable"
      :selectable="selectable"
      :drop-height="dropHeight"
      :drop-placeholder="dropPlaceholder"
      :drop-disabled="dropDisabled"
      :placement="placement"
      :clearable="clearable"
      :dropdown-min-width="dropdownMinWidth"
      :dropdown-width-fixed="dropdownWidthFixed"
      :dropdown-class-name="dropdownClassName"
      :expandedKeys="currentExpandedKeys"
      @checked-change="handleCheckedChange"
      @dropdown-visible-change="dropdownVisibleChange"
      @clear="clear"
    />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import { CTreeDrop } from "@wsfe/ctree";

function dfs(node, targetId, idField, childrenField, ancestorIds = []) {
  const id = node[idField];
  if (id === targetId) {
    return ancestorIds;
  }
  const children = node[childrenField];
  if (Array.isArray(children) && children.length > 0) {
    let idx = 0;
    const ids = ancestorIds.concat(id);
    while (idx < children.length) {
      const result = dfs(children[idx], targetId, idField, childrenField, ids);
      if (result) {
        return result;
      }
      ++idx;
    }
  }
}
export default {
  name: "virtual-node-tree-select",
  components: { CTreeDrop },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    field: String,
    dataSource: [Array, Object, Function],
    dataSchema: { type: String, default: "entity" },
    value: {
      type: Array,
      default: () => null,
    },
    initialLoad: { type: Boolean, default: true },
    isLeafField: { type: String, default: "isLeaf" },
    parentField: { type: String, default: "" },
    titleField: {
      type: String,
      default: "name",
    },
    keyField: {
      type: String,
      default: "id",
    },
    childrenField: { type: String, default: "children" },
    checkable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    // CtreeDrop Props
    dropHeight: {
      type: Number,
      default: 300,
    },
    dropPlaceholder: {
      type: String,
      default: "请选择",
    },
    dropDisabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    dropdownClassName: {
      type: String,
      default: "virtual-tree-select-dropdown-container",
    },
    dropdownMinWidth: {
      type: Number,
      default: 300,
    },
    dropdownWidthFixed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentDataSource: undefined,
      loading: false,
      currentExpandedKeys: [],
    };
  },
  mounted() {
    this.handleData();
  },
  watch: {
    "currentDataSource.data"(value) {
      if (value) {
        console.log("value", value);
        this.setData(value);
        if (this.value) {
          let idx = 0;
          while (idx < value.length) {
            const ancestorIds = dfs(
              value[idx],
              this.value,
              this.keyField,
              this.childrenField
            );
            if (ancestorIds) {
              this.currentExpandedKeys = ancestorIds;
              return;
            }
            ++idx;
          }
        }
      }
    },
    dataSource() {
      this.handleData();
    },
  },
  methods: {
    handleData() {
      this.currentDataSource = this.normalizeDataSource(
        this.dataSource || this.data
      );
      console.log("this.currentDataSource", this.currentDataSource);
      if (
        this.currentDataSource &&
        this.currentDataSource.load &&
        this.initialLoad
      )
        this.load();
    },

    list2tree(list, idField, pField) {
      const [map, treeData] = [{}, []];
      for (let i = 0; i < list.length; i += 1) {
        map[this.$at(list[i], idField)] = i;
        this.$setAt(list[i], this.childrenField, []);
      }

      for (let i = 0; i < list.length; i += 1) {
        const node = list[i];
        if (this.$at(node, pField) && list[map[this.$at(node, pField)]]) {
          this.$at(list[map[this.$at(node, pField)]], this.childrenField).push(
            node
          );
        } else {
          treeData.push(node);
        }
      }
      return treeData;
    },
    normalizeDataSource(dataSource) {
      const final = {
        data: [],
        load: undefined,
      };

      const self = this;
      function createLoad(rawLoad) {
        return async function (params = {}) {
          const result = await rawLoad(params);
          console.log("result", result);
          if (result) {
            if (self.parentField) {
              // 兼容 { list, total }类型
              let list = [];
              if (Array.isArray(result)) {
                list = result;
              } else {
                list = result.list;
              }

              const temp = JSON.parse(JSON.stringify(list));
              final.data = self.list2tree(
                temp,
                self.keyField,
                self.parentField
              );
            } else if (params.node) {
              // 判断 load 数据，当数据 value 包含父节点时，不重复填充
              const containParentNode = result.find(
                (item) => self.$at(item, self.keyField) === params.nodeVM.value
              );
              if (!containParentNode) {
                self.$setAt(
                  params.node,
                  params.nodeVM.currentChildrenField,
                  result
                );
              }
            } else final.data = result;
          }
          if (
            params.node &&
            !self.$at(params.node, params.nodeVM.currentChildrenField)
          )
            self.$setAt(params.node, self.isLeafField, true);
        };
      }

      if (Array.isArray(dataSource))
        if (this.parentField) {
          const temp = JSON.parse(JSON.stringify(dataSource));
          final.data = this.list2tree(temp, this.keyField, this.parentField);
        } else {
          final.data = JSON.parse(JSON.stringify(dataSource)); // 数据深拷贝
        }
      else if (typeof dataSource === "function") {
        final.load = createLoad(dataSource);
      } else if (typeof dataSource === "object") {
        const data = dataSource.data || dataSource.list;

        if (this.parentField) {
          const temp = JSON.parse(JSON.stringify(data));
          final.data = this.list2tree(temp, this.keyField, this.parentField);
        } else {
          final.data = data;
        }
        final.load = dataSource.load && createLoad(dataSource.load);
      }

      return final;
    },
    load(params) {
      if (!this.currentDataSource.load) return;
      this.loading = true;
      this.currentDataSource
        .load(params)
        .then((res) => {
          console.log("res", res);
          this.loading = false;
          this.$emit("load", undefined, this);
        })
        .catch(() => (this.loading = false));
    },
    reload() {
      this.load();
    },
    handleCheckedChange(value) {
      this.$emit("change", value);
      this.$emit("update:value", value);
    },
    dropdownVisibleChange(value) {
      this.$emit("dropdownVisibleChange", value);
    },
    clear(value) {
      this.$emit("clear", value);
    },
    clearKeyword() {
      this.$refs.tree.clearKeyword();
    },
    getKeyword() {
      return this.$refs.tree.getKeyword();
    },
    search(keyword) {
      return this.$refs.tree.search(keyword);
    },
    setData(data) {
      this.$refs.tree.setData(data);
    },
    setChecked(key, value) {
      this.$refs.tree.setChecked(key, value);
    },
    setCheckedKeys(keys, value) {
      this.$refs.tree.setCheckedKeys(keys, value);
    },
    checkAll() {
      this.$refs.tree.checkAll();
    },
    clearChecked() {
      this.$refs.tree.clearChecked();
    },
    setSelected(key, value) {
      this.$refs.tree.setSelected(key, value);
    },
    setExpand(key, value, expandParent = true) {
      this.$refs.tree.setExpand(key, value, expandParent);
    },
    setExpandKeys(keys, value) {
      this.$refs.tree.setExpandKeys(keys, value);
    },
    setExpandAll(value) {
      this.$refs.tree.setExpandAll(value);
    },
    getCheckedNodes(ignoreMode) {
      return this.$refs.tree.getCheckedNodes(ignoreMode);
    },
    getCheckedKeys(ignoreMode) {
      return this.$refs.tree.getCheckedKeys(ignoreMode);
    },
    getIndeterminateNodes() {
      return this.$refs.tree.getIndeterminateNodes();
    },
    getSelectedNode() {
      return this.$refs.tree.getSelectedNode();
    },
    getSelectedKey() {
      return this.$refs.tree.getSelectedKey();
    },
    getExpandNodes() {
      return this.$refs.tree.getExpandNodes();
    },
    getExpandKeys() {
      return this.$refs.tree.getExpandKeys();
    },
    getCurrentVisibleNodes() {
      return this.$refs.tree.getCurrentVisibleNodes();
    },
    getNode(key) {
      return this.$refs.tree.getNode(key);
    },
    getTreeData() {
      return this.$refs.tree.getTreeData();
    },
    getFlatData() {
      return this.$refs.tree.getFlatData();
    },
    getNodesCount() {
      return this.$refs.tree.getNodesCount();
    },
    insertBefore(insertedNode, referenceKey) {
      return this.$refs.tree.insertBefore(insertedNode, referenceKey);
    },
    insertAfter(insertedNode, referenceKey) {
      return this.$refs.tree.insertAfter(insertedNode, referenceKey);
    },
    append(insertedNode, parentKey) {
      return this.$refs.tree.append(insertedNode, parentKey);
    },
    prepend(insertedNode, parentKey) {
      return this.$refs.tree.prepend(insertedNode, parentKey);
    },
    remove(removedKey) {
      return this.$refs.tree.remove(removedKey);
    },
    filter(keyword, filterMethod) {
      this.$refs.tree.filter(keyword, filterMethod);
    },
    showCheckedNodes(showUnloadCheckedNodes) {
      this.$refs.tree.showCheckedNodes(showUnloadCheckedNodes);
    },
    loadRootNodes() {
      return this.$refs.tree.loadRootNodes();
    },
    scrollTo(key, verticalPosition) {
      this.$refs.tree.scrollTo(key, verticalPosition);
    },
  },
};
</script>

<style>
@import "@wsfe/ctree/dist/ctree.css";
</style>
