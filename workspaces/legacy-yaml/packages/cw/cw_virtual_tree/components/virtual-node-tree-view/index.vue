<template>
  <div :class="isAppDesigner && 'indesigner'" style="height: 300px">
      <CTree
          ref="tree"
          :load="load"
          title-field="__title"
          key-field="__id"
          draggable
          droppable
          :render="renderNode"
          :value="value"
          selectable
          :beforeDropMethod="handleBeforeDrop"
          @input="$emit('update:value',$event)"
          @node-dragstart="handleNodeDragStart" 
          @node-drop="handleNodeDrop"
          />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import CTree from '@wsfe/ctree';

const TITLEFIELD = '__title';
const KEYFIELD = '__id';

export default {
  name: 'virtual-node-tree-view',
  components: { CTree },
  props: {
      value: undefined,
      dataSource: [Array, Object, Function],
      dataSchema: { type: String, default: 'entity' },
      titleField: { type: String, default: 'title' },
      valueField: { type: String, default: 'id' },
      isLeafField: { type: String, default: 'isLeaf' },
      childrenField: { type: String, default: 'children' },
      disabledField: { type: String, default: 'disabled' },
      parentField: { type: String, default: '' },
      sortedField: { type: String, default: 'id' },
      expandField: { type: String, default: 'expand' },

      defaultExpandedSelectedNode: { type: Boolean, default: true }, // 用作电蜜蜂项目
  },
  data() {
      return {
          currentDataSource: undefined,
          loading: false,
          draggable: true,
          currentExpandedKeys: [],
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
          const isStaticData = typeof this.dataSource !== 'function';
          return (node, resolve, reject) => {
              if (isStaticData) {
                  return resolve(this.processData(this.dataSource));
              }
              Promise.resolve()
                  .then(() => this.dataSource(node))
                  .then(
                      (res) => {
                          let data;
                          if (Array.isArray(res)) {
                              data = res;
                          } else if (typeof res === 'function') {
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
                          if(node && d.length === 0) {
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
      processData(data) {
          let treeData = data;
          if (this.parentField) {
              treeData = this.list2tree(data, this.valueField, this.parentField);
          }
          const temp =  this.fieldRemap(treeData);
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
                  this.$at(list[map[this.$at(node, pField)]], this.childrenField).push(node);
              } else {
                  treeData.push(node);
              }
          }
          return treeData;
      },
      fieldRemap(treeNodes) {
          return treeNodes.map((treeNode) => {
              treeNode[TITLEFIELD] = this.$at(treeNode, this.titleField);
              treeNode[KEYFIELD] = this.$at(treeNode, this.valueField);
              treeNode.isLeaf = this.$at(treeNode, this.isLeafField);
              treeNode.expand = this.$at(treeNode, this.expandField);
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
      // event
      handleSelect(node) {
          this.$emit('input', node.id, this);
          this.$emit('update:value', node.id, this);
          this.$emit(
              'select',
              {
                  value: node.id,
                  oldValue: this.value,
                  node,
              },
              this
          );
      },

      handleBeforeDrop(dragKey, dropKey, hoverPart){
        const treeInstance = this.$refs.tree;
        const dropNode = treeInstance.getNode(dropKey);
        const dragNode = treeInstance.getNode(dragKey);
        if(dropNode.isLeaf && hoverPart === 'body') {
          dropNode.isLeaf = false;
          dropNode.children = [];
          dropNode._loaded = false;
          this.removeNode(dragKey);
          this.$emit('drop', {
            dropNode,
            dragNode,
            parentKey: dropNode[KEYFIELD],
            part: hoverPart,
          });
          return false;
        } 
        if(hoverPart === 'body' && !dropNode.isLeaf && !dropNode._loaded) {
          this.removeNode(dragKey);
          this.$emit('drop', {
            dropNode,
            parentKey: dropNode[KEYFIELD],
            dragNode,
            part: hoverPart,
          });
          return false;
        }
        return true; 
      },

      handleNodeDrop(_dropNode,event,_part,dragNode) {
        let dropNode = _dropNode;
        let part = _part;
        
        if (!dropNode.isLeaf && dropNode.expand && dropNode.children.length > 0 && part !== 'before') {
          dropNode = dropNode.children[0];
          part = 'before';
        }
        let parentKey;
        if (part === 'body'){
          parentKey = dropNode[KEYFIELD];
        } else {
          parentKey = dropNode._parent[KEYFIELD];
        }
        this.$emit('drop', {
          dropNode,
          dragNode,
          parentKey,
          part,
          event
        });
      },

      handleNodeDragStart(node, event) {
          if (!node.isLeaf) {
              event.preventDefault();
          }
      },

      renderNode(h, node) {
          const hasNodeui = !!this.$scopedSlots.item;
          return h(
              'div',
              {
                  attrs: {
                      'vusion-slot-name': 'item',
                  },
              },
              [hasNodeui ? this.$scopedSlots.item({ item: node }) : this.isAppDesigner ? h('div',{attrs: {
                's-empty':true,
              }}):node[TITLEFIELD]]
          );
      },

      // methods

      updateNode(node) {
          const treeInstance = this.$refs.tree;
          const id = this.$at(node, this.valueField);
          const treeNode = treeInstance.getNode(id);
          if (!treeNode) {
              return;
          }
          const notAllowOverrideList = ['_level', '_filterVisible', '_parent', '_loading', '_loaded', '_remote', '_keyField', 'children', 'setChildren'];
          for (let option in node) {
              if (notAllowOverrideList.indexOf(option) === -1) {
                  treeNode[option] = node[option];
              }
          }
          treeNode[TITLEFIELD] = this.$at(treeNode, this.titleField);

          const newParentKey = this.$at(node, this.parentField);
          const oldParentKey = this.$at(node._parent, this.parentField);
          if (oldParentKey === newParentKey) {
              treeInstance.nonReactive.store.emit('visible-data-change');
          } else {
              this.insertNode(treeNode, newParentKey, true);
          }
      },

      insertNode(node, parentNodeKey, needRemoveWhenParentNodeNotLoaded = false) {
          const treeInstance = this.$refs.tree;
          node[TITLEFIELD] = this.$at(node, this.titleField);
          node[KEYFIELD] = this.$at(node, this.valueField);
          node.isLeaf = this.$at(node, this.isLeafField);
          if(parentNodeKey === undefined) {
            return this.insertAtRoot(node);
          }
          const parentNode = treeInstance.getNode(parentNodeKey);
          if (!parentNode ||(!parentNode.isLeaf&& !parentNode._loaded)) {
            if(needRemoveWhenParentNodeNotLoaded && (!parentNode.isLeaf&& !parentNode._loaded)) {
              treeInstance.remove(node[KEYFIELD]);
            }
            return;
          }
          if(!parentNode.isLeaf && parentNode.children.length > 0) {
            const sortedValue = this.$at(node, this.sortedField);
            const index = parentNode.children.findeIndex(n=> this.$at(n, this.sortedField) > sortedValue);
            if(~index) {
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

      getNode(key){
        const treeInstance = this.$refs.tree;
        return treeInstance.getNode(key);
      },
    
      insertAtRoot(node){
        const treeInstance = this.$refs.tree; 
        const treeData = treeInstance.getTreeData();
        if (treeData.length === 0) {
          treeInstance.setData([node]);
          return;
        } 
        const sortedValue = this.$at(node, this.sortedField);
        const index = treeData.findIndex(n=> this.$at(n, this.sortedField) > sortedValue);
        if(~index) {
          treeInstance.insertBefore(node, treeData[index][KEYFIELD]);
        } else {
          treeInstance.insertAfter(node, treeData[treeData.length - 1][KEYFIELD]);
        } 
      }
  },
};
</script>

<style>
@import '@wsfe/ctree/dist/ctree.css';

.indesigner .ctree-tree-node__title  div[s-empty] {
  background: #f7f8fa;
  border: 1px dashed #c3c3c3;
  text-align: center;
  color: #999;
  min-height: 30px;
  min-width: 90px;
  width: 100%;
  align-items: center;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  justify-content: center;
  opacity: 0.3;
}
.indesigner .ctree-tree-node__title  div[s-empty]:before {
  content: '+';
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

.ctree-tree-node__title_disabled {
  color: var(--color-base);
  cursor: unset;
}
</style>
