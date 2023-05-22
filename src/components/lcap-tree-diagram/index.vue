<template>
  <div class="text-center">
    <LcapTreeDiagram
      :data="sourceData"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      selected-class-name="bg-tomato"
      selected-key="selectedKey"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    ></LcapTreeDiagram>
  </div>
</template>

<script>
import LcapTreeDiagram from './src/main.js';
import SupportDataSource from './src/mixins/support.datasource.js';

export default {
  name: 'lcap-tree-diagram',
  mixins: [SupportDataSource],
  components: {
    LcapTreeDiagram,
  },
  // props: {
  //   dataSource: [Function, Array, Object],
  // },
  data() {
    return {
      sourceData: {},
      fakeData: {
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
              {
                id: 9,
                label: 'UI设计',
              },
              {
                id: 10,
                label: '产品经理',
              },
            ],
          },
          {
            id: 3,
            label: '销售部',
            children: [
              {
                id: 7,
                label: '销售一部',
              },
              {
                id: 8,
                label: '销售二部',
              },
            ],
          },
          {
            id: 4,
            label: '财务部',
          },
          {
            id: 9,
            label: 'HR人事',
          },
        ],
      },
      expandAll: false,
      horizontal: true,
      collapsable: true,
    };
  },
  created() {
    this.sourceData = this.fakeData;
  },
  methods: {
    async init() {
      // 本地启动和开发环境使用假数据，生产环境替换为真数据
      const fnDataSource = (this.$env.VUE_APP_DESIGNER || !window.appInfo) ? this.fakeData : this.dataSource;
      // this.sourceData = await this.handleDataSource(fnDataSource);
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
      var _this = this;
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

<style scoped>
.root {
}

.clickable-node {
  background: red;
  border: 1px solid green;
  color: pink;
}
</style>