<template>
  <!-- data-opened， 0(opened) 表示没被展开过，1(noOpened) 代表已经被展开过了（或者没有子元素所以没有展开不展开的概念，直接认为是1） -->
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

      <div class="node_content">
        <div class="parent_wrapper">
          <div class="parent_content">
            <p class="content_name">{{ treeNodeData.name}}</p>
          </div>
        </div>
        <!-- <slot v-bind:data="{ treeNodeData, $treeNodeRefs: $refs }"></slot> -->
      </div>

      <!-- 弹窗插槽 -->
      <div class="node_slot">
        <slot
          name="dialog"
          :data="treeNodeData.data"
        ></slot>
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
        <!-- <div class="node_slot">
          <slot name="dialog">具名插槽</slot>
        </div> -->
        <!-- <template v-slot:default="slotProps">
          <slot v-bind:data="slotProps.data"></slot>
        </template> -->
        <template v-slot:dialog="slotProps">
          <div
            class="dialog-slot"
            vusion-slot-name="dialog"
          >
            <slot :data="slotProps.data"></slot>
            <!-- v-if="(!slotProps.dialog) && $env.VUE_APP_DESIGNER" -->
            <s-empty></s-empty>
          </div>
        </template>
      </vue-chart-tree>
    </div>
  </div>
</template>
<script>
import SEmpty from './s-empty/index';
import {
  dataOpened,
  treeParentClassName,
  treeChildrenClassName,
  treeNodeClassName,
  stretchNodeClassName,
  connectLineClassName,
} from './const';
import { resetTree, updatePartTree, isOpened } from './util';

export default {
  name: 'vue-chart-tree',
  components: {
    SEmpty,
  },
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
    vertical-align: middle;
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
    vertical-align: middle;
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

.parent_wrapper {
  display: inline-block;
  width: 100px;
  padding: 16px;
  box-sizing: border-box;
  border-left-width: 3px;
  border-left-style: solid;
  border-color: #f65656;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  background-color: #fff;
  transition: all 0.15s ease;
  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
}
.parent_content {
  display: flex;
  align-items: flex-start;
}
.content_name {
  flex: 1;
  line-height: 16px;
  margin: 0;
  margin-left: 10px;
  overflow: hidden;
  white-space: initial;
  word-break: break-all;
  font-size: 14px;
  color: #333;
}
</style>
