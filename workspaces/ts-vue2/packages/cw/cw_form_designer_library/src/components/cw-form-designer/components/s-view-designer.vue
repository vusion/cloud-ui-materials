<template>
  <div :class="$style.root" ref="root" viewDesignerRoot>
    <!-- 显示悬浮框 -->
    <s-highlighter mode="hover" :info="hoverHighlighter" />
    <!-- 显示选中框 -->
    <s-highlighter mode="selected" :selectedNode="selectedNode" :info="selectedHighlighter" />
    <!-- 显示拖拽悬浮框 -->
    <s-highlighter mode="draghover" :info="draghoverHighlighter" />
    <!-- 显示拖拽放置提示 -->
    <d-drop ref="drop" :info="draghover" :targetPosition="targetPosition" @moveNode="moveNode" />
    <!-- 从画布中拖拽节点时的遮罩层 -->
    <div :class="$style.maskLayer" :draggable="true" v-if="maskLayerStyle" :style="maskLayerStyle"></div>
    <s-drag-ghost ref="dragghost" :position="ghostposition"></s-drag-ghost>

    <!-- iframe沙箱 -->
    <cw-form-template-render
      :class="$style.formRender"
      ref="formRender"
      type="designer"
      :initLayout="initLayout"
      :initData="initData"
      @renderSuccess="onRenderSuccess"
      @renderFailed="onRenderFailed"
    />
    <!-- 加载loading -->
    <div v-if="!initRenderSuccess" :class="$style.loading">页面编辑器启动中，请稍候...</div>
  </div>
</template>

<script>
import HighlighterTransferMixin from '../mixins/highlighter-transfer';
import HighlighterUpdaterMixin from '../mixins/highlighter-updater';
import SDragGhost from './basic/s-drag-ghost.vue';
import SHighlighter from './basic/s-highlighter.vue';
import DDrop from './basic/d-drop.vue';
import * as utils from '../utils';
import { eventBus } from '../utils';
import { defaultAssetsConfig } from '../config';
import { batchOperate } from '@/mini-nasl/utils';
import { getAttrValue } from '@/components/cw-form-designer/components/property-panel/fields';

export default {
  name: 's-view-designer',
  components: {
    SHighlighter,
    DDrop,
    SDragGhost,
  },
  mixins: [HighlighterTransferMixin, HighlighterUpdaterMixin],
  props: {
    view: {
      type: Object,
      default: () => null,
    },
    initLayout: {
      type: String,
      default: '',
    },
    initData: {
      type: String,
      default: '{}',
    },
    selectedNode: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      hoverHighlighter: undefined,
      selectedHighlighter: undefined,
      draghoverHighlighter: undefined,
      formNode: null, // form表单节点
      initRenderSuccess: false,
      ghostposition: {},
    };
  },

  mounted() {
    // 收集超时
    eventBus.on('collect:timeout', this.onCollectTimeout);
    // 处理报错
    eventBus.on('logError', this.logError);
    // 添加组件
    eventBus.on('addBlock', this.addBlock);

    this.$once('hook:beforeDestroy', () => {
      eventBus.off('collect:timeout', this.onCollectTimeout);
      eventBus.off('logError', this.logError);
      eventBus.off('addBlock', this.addBlock);
    });
  },
  methods: {
    onRenderSuccess(event) {
      if (!this.initRenderSuccess) {
        this.initRenderSuccess = true;
        this.formNode = utils.getFormNode(this.view);
        if (this.formNode) {
          // 选中表单节点
          this.focusSelectedNode(this.formNode.nodePath);
          this.$emit('setSelectedNode', this.formNode.nodePath);
        }
      } else {
        // 重新渲染后，如果存在选中节点，则聚焦选中节点
        if (this.selectedNode) {
          this.focusSelectedNode(this.selectedNode.nodePath);
        }
      }
    },
    onRenderFailed(event) {},
    onCollectTimeout(event) {
      this.$message.error(event.message);
    },
    // 插入组件
    async addBlock(info) {
      let newNode = null;
      let { position, nodePath, tagName, title, block, actionMsg, resetSelectedNode = false } = info;
      // 批量操作
      const hasError = await batchOperate(this.view, actionMsg, async () => {
        // 参考节点
        const targetNode = this.view.findNodeByPath(nodePath);
        const isTableColumn = utils.isTableColumnTag(targetNode.tag);
        let newBlock;

        // step1: 区分组件插入到 不同位置，进行不同的模版处理
        if (isTableColumn) {
          // 插入到子表单列中
          newBlock = utils.addSubFormColumnTemplate(block, title);
          if (getAttrValue({ node: targetNode, key: 'subFormDropColumn' })) {
            position = 'insertAfter'; // 如果目标咧是drop列，则插入到后面
          }
        } else if (tagName === 'u-sub-form') {
          // 插入子表单中
          newBlock = utils.addSubFormTemplate(block, title);
        } else {
          // 插入到表单项中，需要在block外层包裹form-item标签
          newBlock = utils.addFormItemTemplate(block, title);
        }

        // step2: 插入组件
        if (newBlock) {
          newNode = utils.insertViewElement(targetNode, newBlock, position);

          // step3: afterAddBlock,生成实体属性并绑定
          if (title === '子表单') {
            await utils.onAddSubForm(newNode);
          } else if (isTableColumn) {
            await utils.onAddSubFormColumn(newNode, tagName, title);
          } else {
            await utils.handleAddEntityAndBind(newNode, tagName, title);
          }
        }
      });
      if (hasError) {
        this.$message.error(actionMsg + '失败');
        return;
      } else {
        const targetNodePath = resetSelectedNode ? this.selectedNode?.nodePath : newNode.nodePath;
        this.$emit('setSelectedNode', targetNodePath);
      }
    },
    // 移动节点
    async moveNode({ referNodePath, actionMsg }) {
      let newNode = null;

      const hasError = await batchOperate(this.view, actionMsg, async () => {
        const referNode = this.view.findNodeByPath(referNodePath);
        newNode = this.dragNode.node.moveNode({
          sourceNode: referNode,
          position: this.$refs.drop.position,
        });
      });
      if (hasError) {
        this.$message.error(actionMsg + '失败');
        return;
      } else {
        this.$emit('setSelectedNode', newNode.nodePath);
      }
    },
    focusSelectedNode(nodePath) {
      const target = this.queryNodeByPath(nodePath);
      this.selected = this.getNodeInfo(target);
      if (target) this.scrollIntoView(target); // 主动滚动到可视区域
    },
    queryNodeByPath(nodePath) {
      return this.rootEl?.querySelector(`[vusion-node-path="${nodePath}"]`) || null;
    },
    logError(error) {
      this.$message.error(error.message);
    },
  },
};
</script>

<style lang="scss" module>
.root {
  position: relative;
  box-sizing: border-box;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  transform: scale(1);
  margin: 30px;
  // background: #fff;

  .maskLayer {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    background: #fff;
    z-index: 1000;
    pointer-events: none;
    opacity: 0.7;
  }

  .formRender {
    width: 100%;

    [class^='u-form___'] {
      min-height: 600px !important;
    }

    // 设计模式的画布中，禁用所有可交互元素
    input,
    textarea,
    select,
    button,
    label,
    a,
    [class*='u-textarea_'],
    [class^='u-input__'],
    [class*='u-number-input'],
    [class*='u-select'],
    [class*='u-cascader'],
    [class*='u-date-picker'],
    [class*='u-time-picker'],
    [class*='u-date-time-picker'],
    [class*='u-uploader'] {
      pointer-events: none;
      user-select: none;
      cursor: default;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
  }
}
</style>
