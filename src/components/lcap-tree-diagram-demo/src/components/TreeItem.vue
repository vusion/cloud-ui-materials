<template>
  <div>
    <div
      :class="treeNodeClassName"
      ref="treeNodeRef"
      :data-opened="dataOpened.noOpened"
    >
      <div :class="treeParentClassName">
        <div
          class="stretch_node_r"
          v-if="!isRoot"
        >
          <p class="line_r"></p>
        </div>
        <!-- 弹窗插槽 -->
        <div class="node_content">
          <slot v-bind:data="{ treeNodeData, $treeNodeRefs: $refs }"></slot>
        </div>
      </div>
      <!-- 控制展开/收缩的节点 -->
      <div
        :class="stretchNodeClassName"
        v-if="childrenLen"
      >
        <p class="line_l"></p>
        <p
          :class="['line_dot', treeNodeData.isOpen ? 'cut_dot' : 'add_dot']"
          @click="changeOpen"
        ></p>
      </div>
      <div
        :class="treeChildrenClassName"
        v-if="childrenLen && openedChildren"
        v-show="treeNodeData.isOpen"
      >
        <p
          :class="connectLineClassName"
          v-if="childrenLen > 1"
        ></p>
        <vue-chart-tree
          v-for="item in treeNodeData.children"
          :key="item.id"
          :treeNodeData="item"
          :isRoot="false"
        >
          <template v-slot:default="slotProps">
            <slot v-bind:data="slotProps.data"></slot>
          </template>
        </vue-chart-tree>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dataOpened,
  treeParentClassName,
  treeChildrenClassName,
  treeNodeClassName,
  stretchNodeClassName,
  connectLineClassName,
} from '../constants/index';
import { resetTree, updatePartTree, isOpened } from '../utils/index';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
// import { addTreeLevel, normalizeDataSource } from '../../utils';

export default {
  name: 'vue-chart-tree',
  props: {
    // 当前节点是否是根节点
    isRoot: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 当前节点的数据信息
    treeNodeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // treeNode 节点是否已经被展开的 data- 标识
      dataOpened,
      // className 类名
      treeParentClassName,
      treeChildrenClassName,
      treeNodeClassName,
      stretchNodeClassName,
      connectLineClassName,
    };
  },
  computed: {
    childrenLen() {
      return (this.treeNodeData.children || []).length;
    },
    // 会被打开或被打开过
    openedChildren() {
      return (
        this.treeNodeData.isOpen ||
        (this.$refs.treeNodeRef && isOpened(this.$refs.treeNodeRef))
      );
    },
  },
  mounted() {
    if (this.isRoot) {
      console.log(this.$refs.treeNodeRef);
      resetTree(this.$refs.treeNodeRef);
    }
  },
  methods: {
    changeOpen() {
      this.treeNodeData.isOpen = !this.treeNodeData.isOpen;
      updatePartTree(this.$refs.treeNodeRef);
    },
  },
};
</script>

<style lang="less" scoped>
@transionDuration: 0.15s;
.tree_node {
  position: relative;
  margin-bottom: 16px;
  font-size: 0;
  white-space: nowrap;
  &:last-child {
    margin-bottom: 0;
  }
  .tree_parent {
    position: relative;
    vertical-align: top;
    display: inline-block;
  }
  @stretchLineW: 26px;
  @stretchNodeH: 20px;
  .stretch_node_r {
    display: inline-block;
    width: @stretchLineW;
    .line_r {
      position: absolute;
      left: -@stretchNodeH / 2;
      top: 50%;
      width: @stretchLineW + @stretchNodeH / 2;
    }
  }
  .node_content {
    display: inline-block;
  }

  .stretch_node {
    position: relative;
    display: inline-block;
    z-index: 10;
    p {
      display: inline-block;
      vertical-align: middle;
    }
    .line_dot {
      width: @stretchNodeH;
      height: @stretchNodeH;
      cursor: pointer;
      user-select: none;
      border-radius: 50%;
      background-size: contain;
      background-position: 50%;
      background-repeat: no-repeat;
      transition: all @transionDuration;
      &.add_dot {
        background-image: ~"url('./assets/add-round.png')";
      }
      &.cut_dot {
        background-image: ~"url('./assets/cut-round.png')";
      }
    }
  }
  .line_l,
  .line_r {
    display: inline-block;
    vertical-align: middle;
    width: @stretchLineW;
    height: 1px;
    background-color: #e0e0e0;
  }
  .tree_children {
    position: relative;
    display: inline-block;
    vertical-align: top;
    .connect_line {
      position: absolute;
      left: -@stretchNodeH / 2;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: #e0e0e0;
      z-index: 6;
    }
  }
}
</style>