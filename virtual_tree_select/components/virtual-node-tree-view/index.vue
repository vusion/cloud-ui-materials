<template>
  <div>
    <CTree
      ref="tree"
      value="D001006"
      :data="data"
      titleField="name"
      keyField="id"
      selectable
      @select="handleSelect"
      :expandedKeys="['D001006']"
    />
  </div>
</template>

<script>
// 大家可以根据需要是否引入VTreeNode, VTreeSearch, VTreeDrop
import  CTree  from "@wsfe/ctree";
import data from "./data.js";
import data2 from "./data2.js";
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
          // @inherit: nodeVMs: [],
          currentDataSource: undefined,
          loading: false,
      };
  },
  created() {

  },
  mounted(){
    this.handleData(); 
  },
  watch:{
    'currentDataSource.data'(value) {
      if(value){
        this.$refs.tree.setData(value); 
      }
    }
  },
  methods: {
    handleData() {
        this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data || (() => data2));
        console.log('%c [ data2 ]-65', 'font-size:13px; background:pink; color:#bf2c9f;', data2)
        console.log('%c [ this.currentDataSource  ]-65', 'font-size:13px; background:pink; color:#bf2c9f;', this.currentDataSource )
        if (this.currentDataSource && this.currentDataSource.load && this.initialLoad)
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
    handleSelect(...args){
      console.log('%c [ args ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', args)

    }
  },
};
</script>

<style>
@import "@wsfe/ctree/dist/ctree.css";
</style>
