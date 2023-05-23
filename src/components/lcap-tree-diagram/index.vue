<template>
  <div>
    <div v-if="$env.VUE_APP_DESIGNER || env">
      <LcapTreeDiagram :data="{
        id: 0,
        label: 'XXXPOC测试',
        children: [
          {
            id: 2,
            label: '产品研发部',
            children: [
              {
                id: 5,
                label: '研发-前端',
              },
              {
                id: 6,
                label: '研发-后端',
              },
            ],
          }
        ],
      }"></LcapTreeDiagram>
    </div>
    <LcapTreeDiagram v-else
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
      @on-click="click"
      @on-dbclick="dbclick"
      @on-mouseover="mouseover"
      @on-mouseout="mouseout"
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
    valueField: { type: String, default: 'id' },
    parentField: { type: String, default: 'parentId' },
    textField: { type: String, default: 'label' },
  },
  data() {
    return {
      env: !window.appInfo,
      expandAll: false,
      horizontal: true,
      collapsable: true,
      sourceData: []
    };
  },
  watch: {
    'currentDataSource.data': {
      handler(val) {
        this.sourceData = this.normalize(deepClone(val), this.parentField, this.valueField) || [];
      },
    }
  },
  methods: {
    dbclick($events) {
      this.$emit('dbclick', $events)
    },
    mouseover($events) {
      this.$emit('mouseover', $events)
    },
    mouseout($events) {
      this.$emit('mouseout', $events)
    },
    click($events) {
      this.$emit('click', $events)
    },
    normalize(list, pField, vField) {
      let result = [];
      const map = list?.reduce((res, v) => {
        res[v[vField]] = v;
        return res;
      }, {})
      for (let item of list) {
        this.$set(item, 'expand', true);
        const parentId = item[pField];
        if (parentId === 0) {
          result.push(item)
          continue
        }
        if (map[item[pField]]) {
          const parent = map[item[pField]]
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