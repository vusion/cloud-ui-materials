<template>
  <div ref="optionsRef" :class="$style.root">
    <el-form-item :class="$style.header" label="选项">
      <el-select v-model="currentOptions.type" placeholder="请选择">
        <el-option v-for="option in typeOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>
    </el-form-item>
    <div v-if="currentOptions.type === 'static'">
      <s-drag-field :fieldList="currentOptions.options" @dragStart="onDragStart" @drop="onDrop" @dragEnd="onDragEnd">
        <template #section="{ item, index }">
          <div :class="$style.optionItem">
            <div :class="$style.operateButton">
              <s-others-icon :class="$style.dragBtn" name="drag" hover size="small" :draggable="true"></s-others-icon>
            </div>
            <el-input
              :value="activeOptionIndex === index ? activeOption.label : item.label"
              @focus="handleFocusLabel(item, index)"
              @blur="handleBlurLabel"
              @input="(value) => handleInputLabel(value, index)"
            ></el-input>
            <div :class="$style.operateButton">
              <s-others-icon :optionItemName="index" hover name="more" size="small" @click.stop="handleEditOption(item, index)"></s-others-icon>
            </div>
            <div :class="$style.operateButton">
              <s-others-icon hover name="remove2" size="small" @click.stop="handleDeleteOption(item.value, index)"></s-others-icon>
            </div>
          </div>
        </template>
      </s-drag-field>
      <u-virtual-popover
        ref="virtualPopover"
        placement="top"
        width="340px"
        :virtual-ref="triggerElement"
        :close-delay="0"
        popper-class="cw-form-designer-library-virtual-popover"
      >
        <div class="popoverHeader" style="width: 340px">
          <div>编辑选项</div>
          <s-others-icon name="close" hover size="small" @click="handleClosePopover" />
        </div>
        <div class="popoverContent" style="padding: 10px 14px 10px 24px">
          <el-form :inline="false" :model="activeOption" label-position="left" label-width="70px">
            <el-form-item label="显示名">
              <el-input v-model="activeOption.label" placeholder="请输入显示名" />
            </el-form-item>
            <el-form-item label="选项值">
              <el-input v-model="activeOption.value" placeholder="请输入选项值" />
            </el-form-item>
          </el-form>
        </div>
      </u-virtual-popover>
      <div :class="$style.addBtn" @click="handleAddOption">
        <s-others-icon name="add2" size="small"></s-others-icon>
        添加选项
      </div>
    </div>
  </div>
</template>

<script>
import UVirtualPopover from './basic/u-virtual-popover.vue';
import { batchOperate } from '@/mini-nasl/utils';
import { setAttrValue, getAttrValue, getFormItemControlNode } from '../fields';
import { isEqual } from 'lodash';
import SDragField from './basic/s-drag-field.vue';
import { ViewElement, BindAttribute, createUUID } from '@/mini-nasl';
import * as sharedUtils from '../shared';

// 子组件标签映射
const childTagMap = {
  'u-radios': 'u-radio',
  'u-checkboxes': 'u-checkbox',
  'u-select': 'u-select-item',
};

// 值字段映射
const valueFieldMap = {
  'u-radios': 'label',
  'u-checkboxes': 'label',
  'u-select': 'value',
};

// 静态选项的选择类组件中，子项的标题需要使用template包裹的组件
const needTemplateTags = ['u-radios', 'u-checkboxes'];

export default {
  name: 's-options',
  components: {
    UVirtualPopover,
    SDragField,
  },
  props: {
    selectedNode: {
      type: Object,
    },
  },
  data() {
    return {
      triggerElement: null,
      controlNode: null,
      typeOptions: [{ label: '自定义选项', value: 'static' }],
      dataSourceAttr: null,
      currentOptions: {
        type: 'static', // 目前只有静态数据源
        options: [], // 静态选项
        dataSourceConfig: undefined, // todo: 数据源配置
      },
      activeOptionIndex: undefined,
      activeOption: {
        label: undefined,
        value: undefined,
      },
    };
  },
  created() {
    this.controlNode = this.getControlNode();
    this.dataSourceAttr = this.controlNode?.bindAttrs?.find((it) => it?.name === 'dataSource')?.dataSource;
    this.currentOptions = this.getCurrentOptions();

    const unwatch = this.$watch('currentOptions', {
      handler(newVal, oldVal) {
        this.updateOption(); // 深度监听currentOptions变化，更新选项属性
      },
      deep: true,
    });
    this.$once('hook:beforeDestroy', () => {
      unwatch();
    });
  },
  methods: {
    createUUID,
    // 获取控制节点
    getControlNode() {
      if (this.selectedNode.tag === 'u-table-view-column') {
        return sharedUtils.getSubFormColumnControlNode(this.selectedNode);
      } else if (this.selectedNode.tag === 'u-form-item') {
        return getFormItemControlNode(this.selectedNode);
      }
      return this.selectedNode;
    },
    getCurrentOptions() {
      const options = this.handleOptions(this.controlNode, 'get');
      return {
        type: 'static',
        options,
        dataSourceConfig: undefined,
      };
    },
    handleOptions(node, type = 'get', newValue = []) {
      const tag = node.tag,
        valueField = valueFieldMap[tag],
        isLabelNeedTemplate = needTemplateTags.includes(tag);
      return type === 'get'
        ? this.getOptions({ node, valueField, isLabelNeedTemplate })
        : this.setOptions({ node, valueField, isLabelNeedTemplate, newValue });
    },
    // 获取静态选项配置
    getOptions({ node, valueField, isLabelNeedTemplate }) {
      if (!node || !valueField) return [];
      return node.children
        .map((child) => {
          const labelNode = isLabelNeedTemplate ? child.children?.[0]?.children?.[0] : child.children?.[0];
          if (labelNode) {
            return {
              label: getAttrValue({ node: labelNode, key: 'text' }),
              value: getAttrValue({ node: child, key: valueField }),
            };
          }
        })
        .filter(Boolean);
    },
    // 设置静态选项配置
    setOptions({ node, valueField, isLabelNeedTemplate, newValue }) {
      if (!node || !valueField) return;
      const childTag = childTagMap[node.tag];
      const children = newValue.map((item) => {
        const textNode = ViewElement.from({
          name: node.getViewElementUniqueName('u-text_1'),
          tag: 'u-text',
          bindAttrs: [
            BindAttribute.from({
              name: 'text',
              type: 'string',
              value: item.label,
            }),
          ],
        });
        return ViewElement.from({
          name: node.getViewElementUniqueName(`${childTag}_1`),
          tag: childTag,
          bindAttrs: [
            BindAttribute.from({
              name: valueField,
              type: 'string',
              value: item.value,
            }),
          ],
          children: [
            isLabelNeedTemplate
              ? ViewElement.from({
                  name: node.getViewElementUniqueName(`template_1`),
                  tag: 'template',
                  slotTarget: 'item',
                  children: [textNode],
                })
              : textNode,
          ],
        });
      });
      return node.update({
        children,
      });
    },
    onDragStart(event, originNode) {},
    onDrop(event, targetNode, originNode, position) {
      const fromIndex = originNode.index;
      const toIndex = targetNode.index;
      this.currentOptions.options.splice(toIndex, 0, this.currentOptions.options.splice(fromIndex, 1)[0]);
    },
    onDragEnd(event, originNode) {},
    // 更新当前激活的选项，并清空激活状态
    updateActiveOption() {
      const oldOption = this.currentOptions.options[this.activeOptionIndex];
      if (oldOption && !isEqual(oldOption, this.activeOption)) {
        this.$set(this.currentOptions.options, this.activeOptionIndex, this.activeOption);
      }
      this.activeOptionIndex = undefined;
      this.activeOption = {
        label: undefined,
        value: undefined,
      };
    },
    handleFocusLabel(item, index) {
      this.activeOptionIndex = index;
      this.activeOption = { ...item };
    },
    handleBlurLabel() {
      this.updateActiveOption();
    },
    handleInputLabel(value, index) {
      if (this.activeOptionIndex !== index) return;
      this.activeOption.label = value;
    },
    handleEditOption(item, index) {
      if (this.activeOptionIndex !== undefined) {
        this.updateActiveOption();
      }
      this.activeOptionIndex = index;
      this.activeOption = { ...item };
      this.triggerElement = this.$refs.optionsRef.querySelector(`[optionItemName="${index}"]`);
      this.$refs.virtualPopover.show();
    },
    handleClosePopover() {
      this.$refs.virtualPopover.hide();
      this.triggerElement = null;
      this.updateActiveOption();
    },
    handleDeleteOption(value, index) {
      this.currentOptions.options.splice(index, 1);
    },
    handleAddOption() {
      const index = this.currentOptions.options.length + 1;
      this.currentOptions.options.push({
        label: `选项${index}`,
        value: `${index}`,
      });
    },
    // 更新选项配置
    updateOption() {
      // step1: 更新静态选项配置
      this.handleOptions(this.controlNode, 'set', this.currentOptions.options);
      // step2: todo: 更新其他类型选项配置
    },
  },
};
</script>

<style lang="scss" module>
.root {
  margin-bottom: 10px;
  .header {
    margin-bottom: 5px;

    [class^='el-form-item__content'] {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .optionItem {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 36px;
    gap: 4px;
    padding: 2px 0;
    user-select: none;

    .operateButton {
      width: 24px;
      height: 24px;
      line-height: 28px;

      .dragBtn svg {
        font-size: 20px !important;
      }
    }
  }

  .addBtn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #4d88ff;
    cursor: pointer;
    height: 20px;
    width: 68px;
    font-size: 12px;
    padding: 0 4px;
    border-radius: 4px;
    &:hover {
      background: #edf3ff;
    }
  }
}
</style>
