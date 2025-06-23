<template>
  <div class="root">
    <div v-if="inIDE" class="designer">
      <span>3D模型预览</span>
    </div>
    <iframe v-else :src="url" frameborder="0" allowfullscreen :style="iframeStyle"></iframe>
  </div>
</template>

<script>
export default {
  name: 'pump-house', // todo：更改组件名称
  data() {
    return {
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
      url: 'https://threejs.org/examples/#webgl_animation_keyframes', // TODO: 改成3D模型url
    };
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
</style>
