<template>
  <div :class="$style.root">
    <!-- 左侧：组件物料栏 -->
    <div :class="$style.leftPanel">
      <s-component-toolbox />
    </div>

    <!-- 中间：画布区域 -->
    <div :class="$style.centerSandbox">
      <div :class="$style.centerHeader"></div>
      <div :class="$style.centerContent">
        <s-view-designer
          v-if="!inIDE"
          style="user-select: none"
          :view="view"
          :initLayout="designerVue"
          :initData="initData"
          :selectedNode="selectedNode"
          @setSelectedNode="setSelectedNode"
        ></s-view-designer>
        <div v-else :class="$style.designer" />
      </div>
    </div>

    <!-- 右侧：属性面板 -->
    <div :class="$style.rightPanel">
      <s-property-panel :selectedNode="selectedNode" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { initLayout as initLayoutStr, initLayoutEmpty as initLayoutEmptyStr } from './config';
import { View, initView } from '@/mini-nasl';
import { objectToString } from './utils';

import SComponentToolbox from './components/s-component-toolbox.vue';
import CwFormTemplateRender from '../cw-form-template-render/index.vue';
import SViewDesigner from './components/s-view-designer.vue';
import SPropertyPanel from './components/s-property-panel.vue';
import UGroupAttrPanel from './components/basic/u-group-attr-panel.vue';

// 引入图标资源
import './icons/toolbox';
import './icons/others';
import SOthersIcon from './icons/s-others-icon.vue';
import SToolboxIcon from './icons/s-toolbox-icon.vue';
Vue.component('s-others-icon', SOthersIcon);
Vue.component('s-toolbox-icon', SToolboxIcon);

Vue.component('u-group-attr-panel', UGroupAttrPanel);

export default {
  name: 'cw-form-designer',
  components: {
    SComponentToolbox,
    CwFormTemplateRender,
    SViewDesigner,
    SPropertyPanel,
  },
  props: {
    initData: {
      type: String,
      default: '{}',
    },
    initLayout: {
      type: String,
      // default: initLayoutStr,
      default: initLayoutEmptyStr,
    },
  },
  data() {
    return {
      view: null,
      selectedNode: null,
      designerVue: '',
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
    };
  },
  beforeMount() {
    try {
      const initLayoutObj = JSON.parse(this.initLayout);
      this.view = new View(initLayoutObj);
      if (!window.$data) {
        window.$data = {};
      }
      if (this.view) {
        window.$data.view = this.view;
        initView(this.view);
      }

      // 初始化动态组件渲染模版
      this.updateDesignerVue();
      // 监听变更事件
      this.view.on('change', this.handleChange);
      this.$once('hook:beforeDestroy', () => {
        this.view.off('change', this.handleChange);
      });
    } catch (error) {
      console.error('cw-form-designer组件, 初始化失败:', error);
    }
  },
  methods: {
    // ===========================================================================
    // ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑   ↑
    // ================================ 组件 Method ===============================
    // 获取表单JSON
    getFormJSON() {
      return objectToString(this.view?.toJSON?.() || {});
    },
    // 获取表单模版
    getFormTemplate() {
      return this.view?.toVue() || '';
    },
    // 获取表单绑定的数据结构
    getFormEntity() {
      return objectToString(this.view?.entities || []);
    },
    // ===========================================================================
    // ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑   ↑
    // ================================ 组件 Method ===============================
    handleChange(event) {
      // console.log('触发变更事件', event);
      // 外部监听到任意变更事件都刷新视图，聚合由收集器保障
      this.updateDesignerVue();
    },
    // 更新动态组件渲染模版
    updateDesignerVue() {
      this.designerVue = this.view?.toDesignerVue() || '';
      // console.log('更新动态组件渲染模版', this.designerVue);
    },
    setSelectedNode(nodePath) {
      this.selectedNode = this.view.findNodeByPath(nodePath);
      window.$data.$n0 = this.selectedNode || null;
    },
  },
};
</script>
<style lang="scss">
// 接收IDE中设置的自定义主题变量，用于覆盖elementui中的主题色
:root {
  --form-designer-color-primary: var(--brand-primary);
  --form-designer-color-text-primary: var(--color-base);
}

// 全局样式：选中项样式
.el-select-dropdown__item.selected {
  color: #111;
  font-weight: 500;
}
</style>
<style lang="scss" module>
.root {
  display: flex;
  min-width: 1280px;
  width: 100%;
  height: 800px;
  box-sizing: border-box;
  background-color: var(--background-color-default);
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  flex-direction: row;
  align-items: stretch;

  .leftPanel {
    width: 280px;
    border-right: 1px solid var(--border-color-base);
  }

  .centerSandbox {
    width: calc(100% - 560px);
    height: 100%;
    display: flex;
    flex-direction: column;

    .centerHeader {
      height: 40px;
      border-bottom: 1px solid var(--border-color-base);
    }
    .centerContent {
      height: calc(100% - 40px);
      background: rgb(229, 230, 235);
      overflow: auto;
    }
  }

  .rightPanel {
    width: 280px;
    border-left: 1px solid var(--border-color-base);
  }

  .designer {
    box-sizing: border-box;
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;
  }

  /* 覆盖 element-ui 全局样式 */
  [class*='el-tabs__header'] {
    margin: unset;
  }

  [class*='el-tabs__item'] {
    padding: 0 16px !important;
    color: var(--form-designer-color-text-primary) !important;
  }

  [class*='el-tabs__item'][class*='is-active'] {
    color: var(--form-designer-color-primary) !important;
  }

  [class*='el-tabs__active-bar'] {
    width: 100% !important;
    transform: unset !important;
    background: var(--form-designer-color-primary) !important;
  }
}
</style>
