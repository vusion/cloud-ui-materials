<template>
  <div v-if="selectedTab === 'style'">
    <u-group-attr-panel v-if="labelNode" title="标题样式" :is-expanded="isExpanded">
      <s-style-item :key="labelNode.name" :selected-node="labelNode"></s-style-item>
    </u-group-attr-panel>
    <u-group-attr-panel v-if="controlNode" title="输入字段样式" :is-expanded="isExpanded">
      <s-style-item :key="controlNode.name" :selected-node="controlNode"></s-style-item>
    </u-group-attr-panel>
    <u-group-attr-panel v-if="!isFormNode" title="字段区域样式" :is-expanded="isExpanded">
      <s-style-item :key="selectedNode.name" :selected-node="selectedNode"></s-style-item>
    </u-group-attr-panel>
    <s-style-item v-if="isFormNode" :key="selectedNode.name" :selected-node="selectedNode"></s-style-item>
  </div>
</template>

<script>
import { pcSchema } from './schema';
import groupHandlers, { getFormItemLabelNode, getFormItemControlNode } from './fields';
import SItem from './render/s-item.vue';
import { eventBus } from '@/components/cw-form-designer/utils';
import { batchOperate } from '@/mini-nasl/utils';
import SStyleItem from './render/s-style-item.vue';

export default {
  name: 'style-panel',
  components: {
    SItem,
    SStyleItem,
  },
  props: {
    selectedTab: {
      type: String,
    },
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isExpanded: true,
    };
  },
  computed: {
    labelNode() {
      return getFormItemLabelNode(this.selectedNode);
    },
    controlNode() {
      return getFormItemControlNode(this.selectedNode);
    },
    isFormNode() {
      return this.selectedNode.tag === 'u-form';
    },
  },
};
</script>
<style lang="scss" module>
.propertyPanel {
  [class^='el-form-item'] {
    height: 32px;
    line-height: 32px;
  }
  [class^='el-form-item__label'] {
    font-size: 12px;
    line-height: 1;
    margin-left: unset !important;
  }
  [class^='el-form-item__content'] {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
