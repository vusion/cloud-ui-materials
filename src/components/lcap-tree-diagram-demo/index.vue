<template>
  <div class="area_wrapper">
    <div class="tree_wrapper">

      <vue-chart-tree v-if="$env.VUE_APP_DESIGNER" v-for="(item, index) in fakeData" is-root :key="index" :tree-node-data="item" @on-click="click">
        <template #dialog="scope">
          <slot name="dialog" :item="scope.item"></slot>
          <s-empty v-if="!$slots.dialog && $env.VUE_APP_DESIGNER"></s-empty>
        </template>
      </vue-chart-tree>

      <vue-chart-tree v-else v-for="(item, index) in dataFromDataSource" is-root :key="index" :tree-node-data="item" @on-click="click">
        <template #dialog="scope">
          <slot name="dialog" :item="scope.item"></slot>
          <s-empty v-if="!$slots.dialog && $env.VUE_APP_DESIGNER"></s-empty>
        </template>
      </vue-chart-tree>
    </div>

    <!-- $env.VUE_APP_DESIGNER || env -->
  </div>
</template>
<script>
// 没有路径提示
import VueChartTree, { updatePartTree } from './src';
import SEmpty from './src/s-empty/index';
import deepClone from 'lodash/cloneDeep';
import { addTreeLevel, normalizeDataSource } from '../../utils';

export default {
  name: 'new-item',
  components: {
    VueChartTree,
    SEmpty,
  },
  props: {
    dataSource: {
      type: [Array, Object, Function],
    },
    showChildDotNum: { type: Boolean, default: true },
    valueField: { type: String, default: 'id' },
    parentField: { type: String, default: 'parentId' },
    textField: { type: String, default: 'label' },
    dataEntity: { type: String, default: 'category' },
  },
  data() {
    return {
      rootData: [],
      newName: '',
      activeNode: null,
      nameModalVisible: false,
      dataFromDataSource: [],
      fakeData: [
        {
          id: 181,
          label: '主题1',
          expand: true,
          children: [
            {
              id: 109,
              label: '主题1',
              expand: true,
              children: [
                {
                  id: 170,
                  label: '主题111',
                  expand: true,
                },
                {
                  id: 181,
                  label: '主题2',
                  expand: true,
                },
              ],
            },
            {
              id: 183,
              label: '主题2',
              expand: true,
              children: [
                {
                  id: 189,
                  label: '主题2-11',
                  expand: true,
                },
                {
                  id: 185,
                  label: '主题2-22',
                  expand: true,
                },
              ],
            },
          ],
        },
      ]
    };
  },
  watch: {
    dataSource: {
      async handler(val) {
        let dataFromDataSource = await this.handleDataSource(
          normalizeDataSource(val).data,
        );
        this.dataFromDataSource = dataFromDataSource;
        console.log(this.dataFromDataSource, '---dataFromDataSource')
      },
      immediate: true,
    },
  },
  created() {

  },
  methods: {
    handlerNodeClick(activeData) {
      this.activeData = activeData;
      this.newName = activeData.treeNodeData.name;
    },
    updateName() {
      this.activeData.treeNodeData.name = this.newName;
      // 节点高度改变，需要调用 updatePartTree 方法进行位置的重新计算
      updatePartTree(this.activeData.$treeNodeRefs.treeNodeRef);
      this.changeNameModal();
    },
    async handleDataSource(val) {
      const temp = await this.normalize(deepClone(val), {
        parentField: this.parentField,
        valueField: this.valueField,
        childrenField: 'children',
        dEntity: this.dataEntity,
      });
      return addTreeLevel(temp);
    },
    async reload() {
      this.dataFromDataSource = await this.handleDataSource(this.dataSource);
    },
    onEdit(e, data) {
      this.showPopper = false;
      this.$emit('onEdit', this.curEventsData);
    },
    onDelete(e, data) {
      this.showPopper = false;
      this.$emit('onDelete', this.curEventsData);
    },
    onTogglePop(value) {
      this.$emit('onTogglePop', value);
      this.$refs.popper && this.$refs.popper.toggle(true);
    },
    onToggle($event) {
      this.$emit('toggle', $event);
      if ($event && $event.opened) {
        this.preventBlur = true;
      }
    },
    onPopperClose(e) {
      this.$emit('blur', e, this);
      this.showPopper = false;
      this.dialogEditHover = false;
      setTimeout(() => {
        // 为了不触发input的blur，否则会有两次blur
        this.preventBlur = false;
      }, 0);
    },

    click(e, data) {
      console.log(e, data)
      this.referenceEl = e.target;
      this.showPopper = !this.showPopper;
      e.item = data;
      e.value = data[this.valueField];
      this.curEventsData = e;
      this.updateTime = e.item?.updatedTime?.split('T')?.[0];
      this.updateBy = e.item?.updateBy;
      this.$emit('click', e);
    },
    normalize(list, options) {
      const { parentField: pField, valueField: vField, dEntity } = options;

      let tempArr = [];
      tempArr = list?.map((item) => {
        if (dEntity) {
          return item[dEntity];
        } else {
          return item;
        }
      });

      let result = [];
      const map = tempArr?.reduce((res, v) => {
        res[v[vField]] = v;
        return res;
      }, {});
      for (let item of tempArr) {
        this.$set(item, 'expand', true);
        const parentId = item[pField];
        if (parentId === 0) {
          item.curIndex = 1;
          result.push(item);
          continue;
        }
        if (map[item[pField]]) {
          const parent = map[item[pField]];
          parent.children = parent.children || [];
          parent.children.push(item);
        }
      }
      return result;
    },
    labelClassName() {
      return 'clickable-node';
    },
    renderContent(h, data) {
      return data[this.textField];
    },
    onExpand(e, data) {
      this.expandEvent = e.target.dataset.btn === 'true';
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
<style scoped lang="less">
.area_wrapper {
  min-height: 372px;
  box-sizing: border-box;
  padding: 60px;
  overflow-x: scroll;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.dialog-slot {
  width: 100px;
  min-height: 10px;
  background: #f65656;
}
</style>
