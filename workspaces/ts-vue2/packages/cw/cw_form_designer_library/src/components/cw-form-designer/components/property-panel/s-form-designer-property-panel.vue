<template>
  <div :class="$style.root">
    <div style="height: 100%" v-if="selectedNode?.nodePath">
      <div :class="$style.header">
        <div :class="$style.headerLeft">
          <img :class="$style.icon" src="@/components/cw-form-designer/assets/element.svg" alt="element" />
          <div :class="$style.title">{{ selectedNode.name }}</div>
        </div>
        <el-tooltip content="复制" placement="left">
          <s-others-icon hover name="copy" @click="handleCopyName"></s-others-icon>
        </el-tooltip>
      </div>
      <s-group-btn :class="$style.tabBtn" :dataSource="dataSource" :value="activeName" @change="activeName = $event"></s-group-btn>
      <div :class="$style.content">
        <attr-panel :selectedTab="activeName" :selectedNode="selectedNode"></attr-panel>
        <style-panel :selectedTab="activeName" :selectedNode="selectedNode"></style-panel>
      </div>
    </div>
    <div v-else :class="$style.empty">请选择一个节点查看属性</div>
  </div>
</template>

<script>
import SItem from './render/s-item.vue';
import SGroupBtn from './components/s-group-btn.vue';
import AttrPanel from './attr-panel.vue';
import StylePanel from './style-panel.vue';

export default {
  name: 's-form-designer-property-panel',
  components: {
    SItem,
    SGroupBtn,
    AttrPanel,
    StylePanel,
  },
  props: {
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeName: 'attr',
      dataSource: [
        { label: '属性', value: 'attr' },
        { label: '样式', value: 'style' },
      ],
    };
  },
  methods: {
    async handleCopyName() {
      const text = this.selectedNode?.name || '';
      if (!text) {
        this.$message.warning('没有可复制的内容');
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        this.$message.success('复制成功');
      } catch (error) {
        this.$message.error('复制失败');
      }
    },
  },
};
</script>
<style lang="scss" module>
.root {
  height: 100%;
  padding-top: 10px;

  .header {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .headerLeft {
      display: flex;
      align-items: center;
      gap: 8px;

      .icon {
        width: 16px;
        height: 16px;
      }

      .title {
        max-width: 150px;
        font-size: 14px;
        color: #111;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .tabBtn {
    border-bottom: 1px solid #e7eaee;

    padding: 8px 16px 16px;
  }
  .content {
    height: calc(100% - 85px);
    overflow-y: auto;
  }
  .empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777;
    user-select: none;
  }
}
</style>
