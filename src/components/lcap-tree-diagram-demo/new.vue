<template>
  <div class="area_wrapper">
    <div class="tree_wrapper">
      <vue-chart-tree
        v-for="(item, index) in rootData"
        is-root
        :key="index"
        :tree-node-data="item"
      >
        <!-- <template v-slot:default="slotProps">
          <div class="parent_wrapper">
            <div
              class="parent_content"
              @click="handlerNodeClick(slotProps.data)"
            >
              <p class="content_name">{{ slotProps.data.treeNodeData.name }}</p>
            </div>
          </div>
        </template> -->
        <template v-slot:dialog="slotProps">
          <div
            class="dialog-slot"
            vusion-slot-name="dialog"
          >
            <slot></slot>
            <!-- v-if="(!slotProps.dialog) && $env.VUE_APP_DESIGNER" -->
            <!-- <s-empty></s-empty> -->
          </div>
        </template>
      </vue-chart-tree>
    </div>
  </div>
</template>
<script>
// 没有路径提示
import VueChartTree, { updatePartTree } from './src';
import SEmpty from './src/s-empty/index';

export default {
  name: 'new-item',
  components: {
    VueChartTree,
    SEmpty,
  },
  data() {
    return {
      rootData: [],
      newName: '',
      activeNode: null,
      nameModalVisible: false,
    };
  },
  created() {
    const list = [
      {
        id: 181,
        name: '主题1',
        isOpen: true,
        children: [
          {
            id: 109,
            name: '主题1',
            isOpen: true,
            children: [
              {
                id: 170,
                name: '主题111',
                isOpen: true,
              },
              {
                id: 181,
                name: '主题2',
                isOpen: true,
              },
            ],
          },
          {
            id: 183,
            name: '主题2',
            isOpen: true,
            children: [
              {
                id: 189,
                name: '主题2-11',
                isOpen: true,
              },
              {
                id: 185,
                name: '主题2-22',
                isOpen: true,
              },
            ],
          },
        ],
      },
    ];
    this.rootData = list;
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
