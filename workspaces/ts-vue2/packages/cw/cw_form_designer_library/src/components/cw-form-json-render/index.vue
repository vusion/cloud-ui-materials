<template>
  <div :class="$style.root">
    <div v-if="inIDE" :class="$style.designer">表单JSON渲染器</div>
    <cw-form-template-render
      ref="formTemplateRender"
      v-if="!inIDE"
      type="render"
      :initLayout="template"
      :initData="initData"
      :dataPermission="dataPermission"
      @renderSuccess="onRenderSuccess"
      @renderFailed="onRenderFailed"
    />
  </div>
</template>

<script>
import { View, initView } from '@/mini-nasl';
export default {
  name: 'cw-form-json-render',
  props: {
    initJSON: {
      type: String,
    },
    initData: {
      type: String,
    },
    dataPermission: {
      type: String,
    },
  },
  watch: {
    initJSON: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return;
        this.template = null;
        if (newVal) {
          this.renderJSONByJSON(newVal);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
      template: null,
    };
  },
  methods: {
    // ================================ 组件 Method ===============================
    // ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓    ↓    ↓
    // ===========================================================================
    async validate(trigger = 'submit', muted = false) {
      if (this.$refs.formTemplateRender) {
        return await this.$refs.formTemplateRender.validate(trigger, muted);
      }
    },
    async getFormData() {
      if (this.$refs.formTemplateRender) {
        return await this.$refs.formTemplateRender.getFormData();
      }
    },
    // ===========================================================================
    // ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑   ↑
    // ================================ 组件 Method ===============================
    renderJSONByJSON(json) {
      try {
        const jsonObj = JSON.parse(json);
        const view = View.from(jsonObj);
        initView(view);
        this.template = view.toVue();
      } catch (error) {
        console.error('cw-form-json-render组件, initJSON解析失败:', error);
        this.template = null;
      }
    },
    onRenderSuccess(event) {
      this.$emit('renderSuccess', Object.assign(event, { initJSON: this.initJSON }));
    },
    onRenderFailed(event) {
      this.$emit('renderFailed', Object.assign(event, { initJSON: this.initJSON }));
    },
  },
};
</script>
<style module>
.root {
  width: 100%;
  height: 100%;
}

.designer {
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #111;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>
