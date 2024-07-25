<template>
  <div>
    123
    <CTreeDrop
      ref="tree"
      title-field="__title"
      key-field="__id"
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
      :load="load"
      :value="value"
      :render="renderNode"
      @checked-change="handleCheckedChange"
      @dropdown-visible-change="dropdownVisibleChange"
      @clear="clear"
      :beforeDropMethod="handleBeforeDrop"
      @input="$emit('update:value', $event)"
      @node-dragstart="handleNodeDragStart"
      @node-drop="handleNodeDrop"
    />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import { CTreeDrop } from "@wsfe/ctree";
const TITLEFIELD = "__title";
const KEYFIELD = "__id";
export default {
  name: "virtual-node-tree-select",
  components: { CTreeDrop },
  props: {
    expandField: { type: String, default: "expand" },
    sortedField: { type: String, default: "id" },
    value: undefined,
    data: {
      type: Array,
      default: () => [],
    },
    dataSource: [Array, Object, Function],
    dataSchema: { type: String, default: "entity" },
    isLeafField: { type: String, default: "isLeaf" },
    parentField: { type: String, default: "" },
    titleField: {
      type: String,
      default: "title",
    },
    keyField: {
      type: String,
      default: "id",
    },
    childrenField: { type: String, default: "children" },
    checkable: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: true,
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
      expandNode: null,
    };
  },
  watch: {
    load() {
      this.$nextTick(() => {
        this.$refs.tree.loadRootNodes();
      });
    },
  },
  computed: {
    isAppDesigner() {
      return !!this.$env.VUE_APP_DESIGNER;
    },
    load() {
      const isStaticData = typeof this.dataSource !== "function";
      return (node, resolve, reject) => {
        if (isStaticData) {
          return resolve(this.processData(this.dataSource));
        }

        Promise.resolve()
          .then(() => {
            this.$root.wybieNode = node && node.__id;
            return this.dataSource(node);
          })
          .then(
            (res) => {
              let data;
              if (Array.isArray(res)) {
                data = res;
              } else if (typeof res === "function") {
                if (Array.isArray(res.data)) {
                  data = res.data;
                } else if (Array.isArray(res.list)) {
                  data = res.list;
                } else {
                  data = [];
                }
              } else {
                data = [];
              }
              const d = this.processData(data);
              if (node && d.length === 0) {
                node.isLeaf = true;
              }
              resolve(d);
            },
            (e) => reject(e)
          );
      };
    },
  },
  methods: {
    search(node) {
      console.log('renderNode')
      this.$emit(
        "search",
        {
          value: node.id,
          oldValue: this.value,
          node,
        },
        this
      );
    },
    handleBeforeDrop(dragKey, dropKey, hoverPart) {
      console.log("handleBeforeDrop");
      const treeInstance = this.$refs.tree;
      const dropNode = treeInstance.getNode(dropKey);
      const dragNode = treeInstance.getNode(dragKey);
      if (dropNode.isLeaf && hoverPart === "body") {
        dropNode.isLeaf = false;
        dropNode.children = [];
        dropNode._loaded = false;
        this.removeNode(dragKey);
        this.$emit("drop", {
          dropNode,
          dragNode,
          parentKey: dropNode[KEYFIELD],
          part: hoverPart,
        });
        return false;
      }
      if (hoverPart === "body" && !dropNode.isLeaf && !dropNode._loaded) {
        this.removeNode(dragKey);
        this.$emit("drop", {
          dropNode,
          parentKey: dropNode[KEYFIELD],
          dragNode,
          part: hoverPart,
        });
        return false;
      }
      return true;
    },
    handleNodeDrop(_dropNode, event, _part, dragNode) {
      console.log("handleNodeDrop");
      let dropNode = _dropNode;
      let part = _part;

      if (
        !dropNode.isLeaf &&
        dropNode.expand &&
        dropNode.children.length > 0 &&
        part !== "before"
      ) {
        dropNode = dropNode.children[0];
        part = "before";
      }
      let parentKey;
      if (part === "body") {
        parentKey = dropNode[KEYFIELD];
      } else {
        parentKey = dropNode._parent[KEYFIELD];
      }
      this.$emit("drop", {
        dropNode,
        dragNode,
        parentKey,
        part,
        event,
      });
    },
    handleNodeDragStart(node, event) {
      console.log("handleNodeDragStart");
      if (!node.isLeaf) {
        event.preventDefault();
      }
    },
    processData(data) {
      let treeData = data;
      if (this.parentField) {
        treeData = this.list2tree(data, this.keyField, this.parentField);
      }
      const temp = this.fieldRemap(treeData);
      return temp;
    },
    list2tree(list, idField, pField) {
      const [map, treeData] = [{}, []];
      for (let i = 0; i < list.length; i += 1) {
        map[this.$at(list[i], idField)] = i;
        list[i].children = [];
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
    fieldRemap(treeNodes) {
      return treeNodes.map((treeNode) => {
        treeNode[TITLEFIELD] = this.$at(treeNode, this.titleField);
        treeNode[KEYFIELD] = this.$at(treeNode, this.keyField);
        treeNode.isLeaf = this.$at(treeNode, this.isLeafField);
        // treeNode.expand = this.$at(treeNode, this.expandField);
        if (this.isAppDesigner) {
          treeNode.isLeaf = true;
        }

        const children = this.$at(treeNode, this.childrenField);
        if (Array.isArray(children) && children.length > 0) {
          treeNode.children = this.fieldRemap(children);
        }
        return treeNode;
      });
    },
    renderNode(h, node) {
      const hasNodeui = !!this.$scopedSlots.item;
      console.log('renderNode', hasNodeui)
      return h(
        "div",
        {
          attrs: {
            "vusion-slot-name": "item",
          },
        },
        [
          hasNodeui
            ? this.$scopedSlots.item({ item: node })
            : this.isAppDesigner
              ? h("div", {
                  attrs: {
                    "s-empty": true,
                  },
                })
              : node[TITLEFIELD],
        ]
      );
    },

    // methods

    updateNode(node) {
      const treeInstance = this.$refs.tree;
      const id = this.$at(node, this.keyField);
      const treeNode = treeInstance.getNode(id);
      if (!treeNode) {
        return;
      }
      const notAllowOverrideList = [
        "_level",
        "_filterVisible",
        "_parent",
        "_loading",
        "_loaded",
        "_remote",
        "_keyField",
        "children",
        "setChildren",
      ];
      for (let option in node) {
        if (notAllowOverrideList.indexOf(option) === -1) {
          treeNode[option] = node[option];
        }
      }
      treeNode[TITLEFIELD] = this.$at(treeNode, this.titleField);

      const newParentKey = this.$at(node, this.parentField);
      const oldParentKey = this.$at(node._parent, this.parentField);
      if (oldParentKey === newParentKey) {
        treeInstance.nonReactive.store.emit("visible-data-change");
      } else {
        this.insertNode(treeNode, newParentKey, true);
      }
    },

    insertNode(node, parentNodeKey, needRemoveWhenParentNodeNotLoaded = false) {
      const treeInstance = this.$refs.tree;
      node[TITLEFIELD] = this.$at(node, this.titleField);
      node[KEYFIELD] = this.$at(node, this.keyField);
      node.isLeaf = this.$at(node, this.isLeafField);
      if (parentNodeKey === undefined) {
        return this.insertAtRoot(node);
      }
      const parentNode = treeInstance.getNode(parentNodeKey);
      if (!parentNode || (!parentNode.isLeaf && !parentNode._loaded)) {
        if (
          needRemoveWhenParentNodeNotLoaded &&
          !parentNode.isLeaf &&
          !parentNode._loaded
        ) {
          treeInstance.remove(node[KEYFIELD]);
        }
        return;
      }
      if (!parentNode.isLeaf && parentNode.children.length > 0) {
        const sortedValue = this.$at(node, this.sortedField);
        const index = parentNode.children.findeIndex(
          (n) => this.$at(n, this.sortedField) > sortedValue
        );
        if (~index) {
          treeInstance.insertBefore(node, parentNode.children[index][KEYFIELD]);
        } else {
          treeInstance.append(node, parentNodeKey);
        }
      } else {
        treeInstance.append(node, parentNodeKey);
      }
    },

    removeNode(key) {
      const treeInstance = this.$refs.tree;
      treeInstance.remove(key);
    },

    getNode(key) {
      const treeInstance = this.$refs.tree;
      return treeInstance.getNode(key);
    },
    insertAtRoot(node) {
      console.log('insertAtRoot')
      const treeInstance = this.$refs.tree;
      const treeData = treeInstance.getTreeData();
      if (treeData.length === 0) {
        treeInstance.setData([node]);
        return;
      }
      const sortedValue = this.$at(node, this.sortedField);
      const index = treeData.findIndex(
        (n) => this.$at(n, this.sortedField) > sortedValue
      );
      if (~index) {
        treeInstance.insertBefore(node, treeData[index][KEYFIELD]);
      } else {
        treeInstance.insertAfter(node, treeData[treeData.length - 1][KEYFIELD]);
      }
    },
    handleCheckedChange(value) {
      console.log('handleCheckedChange', value)
      this.$emit("change", value);
      this.$emit("update:value", value);
    },
    dropdownVisibleChange(value) {
      console.log('dropdownVisibleChange')
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
