<template>
  <div>
    <LcapTreeDiagram
      v-for="item in sourceData"
      :key="item.id"
      :data="item"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      :showChildDotNum="showChildDotNum"
      selected-key="selectedKey"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    ></LcapTreeDiagram>
  </div>
</template>

<script>
import LcapTreeDiagram from './src/main.js';
import SupportDataSource from './src/mixins/support.datasource.js';
import deepClone from 'lodash/cloneDeep'

export default {
  name: 'lcap-tree-diagram',
  mixins: [SupportDataSource],
  components: {
    LcapTreeDiagram,
  },
  props: {
    showChildDotNum: { type: Boolean, default: true },
    // valueField: { type: String, default: 'value' },
    // parentField: { type: String, default: '' },
    // textField: { type: String, default: '' },
  },
  data() {
    return {
      expandAll: false,
      horizontal: true,
      collapsable: true,
      sourceData: []
    };
  },
  watch: {
    'currentDataSource.data': {
      handler(val) {
        this.sourceData = this.normalize(deepClone(val)) || [];
      }
    }
  },

  methods: {
    normalize(list) {
        let result = [];
        const map = list.reduce((res, v) => {
          res[v.id] = v;
          return res;
        }, {})
        for (let item of list) {
          this.$set(item, 'expand', false);
          const parentId = item.parentId;
          if (parentId === 0) {
            result.push(item)
            continue
          }
          if (map[item.parentId]) {
            const parent = map[item.parentId]
            parent.children = parent.children || [];
            parent.children.push(item)
          }
        }
        return result
    },
    labelClassName() {
      return 'clickable-node';
    },
    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, 'expand', true);
      }
    },
    onNodeClick(e, data) {
      console.log('onNodeClick: %o', data);
      this.$set(data, 'selectedKey', !data.selectedKey);
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    collapse(list) {
      let _this = this;
      list.forEach(function (child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    toggleExpand(data, val) {
      let _this = this;
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, 'expand', val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>

<style module>

.clickable-node {
  background: red;
  border: 1px solid green;
  color: pink;
}

.title-bg {
  background: blueviolet;
}
</style>