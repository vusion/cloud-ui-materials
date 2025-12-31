<template>
  <div :class="[$style.root, { [$style.hidden]: !currentRectStyle }]" :mode="mode" :style="currentRectStyle" :tabindex="mode === 'selected' ? 0 : ''">
    <div :class="$style.bar" ref="barRef">
      <div v-if="['hover', 'draghover'].includes(mode)" :class="$style.barItem" role="hover">
        {{ barItemTitle }}
      </div>
      <div v-else-if="mode === 'selected'" :class="$style.selectedBar">
        <div :class="$style.barItem" role="selected">
          {{ barItemTitle }}
        </div>
        <div v-if="showOperateList" :class="$style.operateList">
          <el-tooltip content="创建副本" placement="top" :open-delay="500" :enterable="false">
            <s-others-icon :class="$style.operateItem" style="border-top-left-radius: 2px" name="duplicate" @click="handleDuplicate"></s-others-icon>
          </el-tooltip>
          <el-popconfirm :title="`删除页面元素将同时删除对应数据，请确认是否删除？`" @confirm="handleDelConfirm">
            <template #reference>
              <el-tooltip content="删除" placement="top" :open-delay="500" :enterable="false">
                <s-others-icon :class="$style.operateItem" style="border-top-right-radius: 2px; font-size: 12px" name="remove"></s-others-icon>
              </el-tooltip>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { batchOperate } from '@/mini-nasl/utils';
import * as utils from '@/components/cw-form-designer/utils';
import {
  getFormItemControlNode,
  getFormItemLabelNode,
  getAttrValue,
  getControlNodeEntityProperty,
} from '@/components/cw-form-designer/components/property-panel/fields';
export default {
  name: 's-highlighter',
  props: {
    mode: {
      type: String,
      default: 'hover',
    },
    info: {
      type: Object,
      default: undefined,
    },
    selectedNode: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      currentRectStyle: undefined,
      barItemTitle: '',
    };
  },
  computed: {
    showOperateList() {
      return this.mode === 'selected' && ['u-form-item', 'u-table-view-column'].includes(this.info?.info?.tag);
    },
  },
  watch: {
    info: {
      handler(value) {
        this.setRectStyle();
      },
    },
  },
  methods: {
    setRectStyle() {
      if (this.info) {
        const { rectStyle, info } = this.info;
        this.currentRectStyle = rectStyle;
        this.barItemTitle = info.title || info.tag;
      } else {
        this.currentRectStyle = undefined;
        this.barItemTitle = '';
      }
    },
    async handleDuplicate() {
      const { nodePath, info } = this.info;
      if (nodePath) {
        const view = this.selectedNode.view;
        let newNodePath = null;
        const hasError = await batchOperate(view, '创建副本', async () => {
          if (info.tag === 'u-table-view-column') {
            newNodePath = utils.onDuplicateSubFormColumn(this.selectedNode); // case1:复制子表单列
          } else {
            const tagName = utils.getFormItemControlNodeTag(this.selectedNode);
            if (tagName === 'u-sub-form') {
              newNodePath = utils.onDuplicateSubForm(this.selectedNode); // case2: 复制子表单
            } else {
              newNodePath = this.duplicateField(); // case3: 复制表单项
            }
          }
        });
        if (hasError) {
          this.$message.error('创建副本失败');
        } else {
          if (newNodePath) {
            // 选中表单节点
            this.$parent.focusSelectedNode(newNodePath);
            this.$parent.$emit('setSelectedNode', newNodePath);
          }
        }
      }
    },
    // case1: 复制表单项
    duplicateField() {
      const parentNode = this.selectedNode.parentNode;
      // step1: copy节点
      const tempNode = this.selectedNode._duplicate();
      const currentIndex = parentNode.children.indexOf(this.selectedNode);
      const newNode = parentNode.insertViewElementAt(tempNode, currentIndex + 1);
      // step2: 添加实体和绑定
      const controlNode = getFormItemControlNode(newNode);
      const labelNode = getFormItemLabelNode(newNode);
      utils.handleAddEntityAndBind(newNode, controlNode.tag, getAttrValue({ node: labelNode, key: 'text' }));
      return newNode?.nodePath;
    },
    async handleDelConfirm() {
      const { nodePath, info } = this.info;
      if (nodePath) {
        const view = this.selectedNode.view;
        const hasError = await batchOperate(view, '删除', async () => {
          if (info.tag === 'u-table-view-column') {
            utils.onDelSubFormColumn(this.selectedNode); // case1:删除子表单列
          } else {
            const tagName = utils.getFormItemControlNodeTag(this.selectedNode);
            if (tagName === 'u-sub-form') {
              utils.onDelSubForm(this.selectedNode); // case2: 删除子表单
            } else {
              this.deleteField(); // case3: 删除表单项
            }
          }
        });
        if (hasError) {
          this.$message.error('删除失败');
        } else {
          this.$parent.focusSelectedNode(null);
          this.$parent.$emit('setSelectedNode', null);
        }
      }
    },
    // case1: 删除表单项
    deleteField() {
      const controlNode = getFormItemControlNode(this.selectedNode);
      // step1: 删除实体属性
      const property = getControlNodeEntityProperty(controlNode);
      property && property?.delete?.();
      // step2: 删除控件
      this.selectedNode?.delete?.();
    },
  },
};
</script>

<style lang="scss" module>
.root {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  z-index: 99999999;
  outline-offset: -1px;
  pointer-events: none;
  cursor: pointer;
  // transition: all 0.2s ease-out;
  &[mode='hover'],
  &[mode='draghover'] {
    background: #4e75ec0f;
    outline: 1px dashed #4e75ec;
  }
  &[mode='selected'] {
    background: #4e75ec0f;
    outline: 1px solid #4e75ec;
  }
}

.hidden {
  width: 0;
  opacity: 0;
  z-index: -1;
}

.bar {
  color: white;
  white-space: nowrap;
  pointer-events: auto;
  left: -1px;
  top: -24px;
  position: absolute;

  .selectedBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .operateList {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;

    .operateItem {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 4px;
      cursor: pointer;
      font-size: 16px;
      width: 26px;
      height: 24px;
      background-color: #4e75ecb3;
      &:hover {
        background-color: #4e75ec;
      }
    }
  }

  .barItem {
    cursor: pointer;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border-radius: 2px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .barItem[role='hover'] {
    background: #4e75ecb3;
  }

  .barItem[role='selected'] {
    background: #4e75ec;
  }
}
</style>
