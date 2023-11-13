<template>
  <div :class="isAppDesigner&&'indesigner'">
    <CTree
      ref="tree"
      :value="value"
      :titleField="textField"
      :keyField="valueField"
      selectable
      @select="handleSelect"
      :expandedKeys="currentExpandedKeys"
    />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import  CTree  from "@wsfe/ctree";

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
  name: "virtual-node-tree-view",
  components: { CTree },
  props: {
      value: null,
      field: String,
      data: [Array, Object, Function],
      dataSource: [Array, Object, Function],
      dataSchema: { type: String, default: 'entity' },
      textField: { type: String, default: 'text' },
      valueField: { type: String, default: 'value' },
      hiddenField: { type: String, default: 'hidden' },
      expandedField: { type: String, default: 'expanded' },
      isLeafField: { type: String, default: 'isLeaf' },
      childrenField: { type: String, default: 'children' },
      disabledField: { type: String, default: 'disabled' },
      parentField: { type: String, default: '' },
      cancelable: { type: Boolean, default: false },
      initialLoad: { type: Boolean, default: true },
      checkControlled: { type: Boolean, default: false },
  },
  data() {
      return {
          currentDataSource: undefined,
          loading: false,
          currentExpandedKeys: [],
      };
  },
  mounted(){
    this.handleData(); 
  },
  watch:{
    'currentDataSource.data'(value) {
      if(value){
        this.$refs.tree.setData(value); 
        if(this.value){
          let idx = 0;
          while(idx < value.length){
            const ancestorIds = dfs(value[idx],this.value,this.valueField,this.childrenField);
            if(ancestorIds){
              this.currentExpandedKeys = ancestorIds;
              return;
            }
            ++idx;
          }
        }
      }
    }
  },
  computed:{
    isAppDesigner() {
        return !!this.$env.VUE_APP_DESIGNER;
    },
  },
  methods: {
    handleData() {
        this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data);
        if (this.currentDataSource && this.currentDataSource.load && this.initialLoad)
            this.load();
    },
    getExapndedKeys(){

      const id = this.$at()
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
                this.$at(list[map[this.$at(node, pField)]], this.childrenField).push(node);
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
                        final.data = self.list2tree(temp, self.valueField, self.parentField);
                    } else if (params.node) {
                        // 判断 load 数据，当数据 value 包含父节点时，不重复填充
                        const containParentNode = result.find((item) =>
                            self.$at(item, self.valueField) === params.nodeVM.value);
                        if (!containParentNode) {
                            self.$setAt(params.node, params.nodeVM.currentChildrenField, result);
                        }
                    } else
                        final.data = result;
                }
                if (params.node && !self.$at(params.node, params.nodeVM.currentChildrenField))
                    self.$setAt(params.node, self.isLeafField, true);
            };
        }

        if (Array.isArray(dataSource))
            if (this.parentField) {
                const temp = JSON.parse(JSON.stringify(dataSource));
                final.data = this.list2tree(temp, this.valueField, this.parentField);
            } else {
                final.data = JSON.parse(JSON.stringify(dataSource)); // 数据深拷贝
            }
        else if (typeof dataSource === 'function') {
            final.load = createLoad(dataSource);
        } else if (typeof dataSource === 'object') {
            const data = dataSource.data || dataSource.list;

            if (this.parentField) {
                const temp = JSON.parse(JSON.stringify(data));
                final.data = this.list2tree(temp, this.valueField, this.parentField);
            } else {
                final.data = data;
            }
            final.load = dataSource.load && createLoad(dataSource.load);
        }

        return final;
    },
    load(params) {
        if (!this.currentDataSource.load)
            return;
        this.loading = true;
        this.currentDataSource.load(params).then(() => {
            this.loading = false;
            this.$emit('load', undefined, this);
        }).catch(() => this.loading = false);
    },
    reload() {
        this.load();
    },
    handleSelect(node){
      this.$emit('input', node.id, this);
      this.$emit('update:value',node.id, this);
      this.$emit(
          'select',
          {
              value: node.id,
              oldValue: this.value,
              node,
          },
          this,
      );
    }
  },
};
</script>

<style>
@import "@wsfe/ctree/dist/ctree.css";

.indesigner .ctree-tree-node__title:empty{
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
.indesigner .ctree-tree-node__title:empty:before{
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

</style>
