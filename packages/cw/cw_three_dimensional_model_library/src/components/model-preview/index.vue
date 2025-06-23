<template>
  <div class="root">
    <div v-if="inIDE" class="designer">
      <span>3D模型预览</span>
    </div>

    <template v-else>
      <iframe v-if="link && !loadError" :src="link" frameborder="0" allowfullscreen :style="iframeStyle" @error="handleLoadError" />

      <div v-else class="fallback-content">
        <span>{{ link ? '模型加载失败' : '未配置模型link' }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'model-preview  ',
  props: {
    link: String,
  },
  data() {
    return {
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
      loadError: false,
    };
  },
  methods: {
    handleLoadError() {
      this.loadError = true;
    },
  },
  computed: {
    iframeStyle() {
      return {
        width: '100%',
        height: '100%',
        borderRadius: '12px',
      };
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  width: 100%;
  height: 500px;
}
.designer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #020202;
}
.fallback-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #999;
  font-size: 16px;
  border-radius: 12px;
}
</style>
