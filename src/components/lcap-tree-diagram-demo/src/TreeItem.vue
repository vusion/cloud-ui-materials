<template>
  <!-- data-opened， 0(opened) 表示没被展开过，1(noOpened) 代表已经被展开过了（或者没有子元素所以没有展开不展开的概念，直接认为是1） -->
  <div :class="$style['tree_node']" ref="treeNodeRef" :data-opened="dataOpened.noOpened">
    <div :class="$style['tree_parent']">
      <div :class="$style['stretch_node_r']" v-if="!isRoot">
        <p :class="$style['line_right']"></p>
      </div>
      <div :class="$style['node_content']" @click="onLabelClick">
        <div :class="[$style['lcap-tree-node-label-inner'], treeNodeData.curIndex >= 3 ? $style['lcap-tree-node-label-inner-more'] : treeNodeData.curIndex == 2 ? $style['lcap-tree-node-label-inner-second'] : '']">
          <p :class="[$style['lcap-tree-node-label'], showTextEllipsis && labelLen > 12 ? $style['lcap-tree-node-ellipisis'] : '']">{{ label }}</p>
        </div>
        <div :class="$style['node_slot']" vusion-slot-name="dialog">
          <slot name="dialog" :item="treeNodeData.data"></slot>
        </div>
      </div>
    </div>

    <!-- 控制展开/收缩的节点 -->
    <div :class="$style['stretch_node']" v-if="childrenLen">
      <p :class="$style['line_left']"></p>
      <p :class="$style['line_dot']" @click="changeOpen">
        <span :class="[$style['lcap-tree-node-btn'], treeNodeData.expand ? $style.expanded : '']" :dot-num="showChildDotNum ? `+${treeNodeData.children.length}` : '+'"></span>
      </p>
    </div>

    <div :class="$style['tree_children']" v-if="childrenLen && openedChildren" v-show="treeNodeData.expand">
      <p :class="$style['connect_line']" v-if="childrenLen > 1"></p>
      <TreeItem
        v-for="(item, treeNodeIndex) in treeNodeData.children"
        :key="item.id"
        :treeNodeData="item"
        :isRoot="false"
        :textField="textField"
        :showChildDotNum="showChildDotNum"
        :showTextEllipsis="showTextEllipsis"
        @on-click="click">
        <template #dialog="dialog">
          <s-empty v-if="!$slots.dialog && $env.VUE_APP_DESIGNER"></s-empty>
          <slot v-else name="dialog" :item="dialog"></slot>
        </template>
      </TreeItem>
    </div>
  </div>
</template>
<script>
import SEmpty from './s-empty/index';
import { dataOpened } from './const';
import { resetTree, updatePartTree, isOpened } from './util';
import { get } from 'lodash';

export default {
  name: 'TreeItem',
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
    textField: {
      type: String,
    },
    showChildDotNum: {
      type: Boolean
    },
    showTextEllipsis: { type: Boolean },
  },
  data() {
    return {
      // treeNode 节点是否已经被展开的 data- 标识
      dataOpened,
      labelLen: 0
    };
  },
  computed: {
    label() {
      return get(this.treeNodeData, this.textField);
    },
    childrenLen() {
      return (this.treeNodeData.children || []).length;
    },
    // 会被打开或被打开过
    openedChildren() {
      return (
        this.treeNodeData.expand ||
        (this.$refs.treeNodeRef && isOpened(this.$refs.treeNodeRef))
      );
    },
  },
  watch: {
    label: {
      handler(val) {
        const  getLength = (str) => {
          if (!str) {
            return 0;
          }
          // 将中文字符替换成两个英文字符
          str = str.replace(/[\u4e00-\u9fa5]/g, "aa");
          // 计算字符串的长度
          return str.length;
        }
        this.labelLen = getLength(val);
      },
      immediate: true
    }
  },
  mounted() {
    if (this.isRoot) {
      resetTree(this.$refs.treeNodeRef, this.$style);
    }
  },
  methods: {
    onLabelClick($events) {
      this.$emit('on-click', $events, this.treeNodeData)
    },
    changeOpen() {
      this.treeNodeData.expand = !this.treeNodeData.expand;
      updatePartTree(this.$refs.treeNodeRef);
    },
    click(e, data) {
      this.$emit('on-click', e, data);
    }
  },
};
</script>

<style module>
@import "./index.module.css";
</style>