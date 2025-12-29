<template>
  <div :class="$style.root">
    <el-tabs :class="$style.propertyTabs" :stretch="false" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="属性" name="property">
        <s-form-designer-property-panel :selectedNode="selectedNode" />
      </el-tab-pane>
      <!-- <el-tab-pane label="样式" name="style">样式</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import SFormDesignerPropertyPanel from './property-panel/s-form-designer-property-panel.vue';
export default {
  name: 's-property-panel',
  components: {
    SFormDesignerPropertyPanel,
  },
  props: {
    selectedNode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeName: 'property',
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;

  .propertyTabs {
    height: 100%;
    [class^='el-tabs__content'] {
      height: calc(100% - 40px);
    }
    [class^='el-tab-pane'] {
      height: 100%;
    }
  }
}
</style>
