<template>
  <div :class="$style.root">
    <s-drag-image-ghost ref="dragGhost" />
    <el-tabs :class="$style.tabs" :stretch="false" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="组件" name="component">
        <div style="padding: 16px 16px 0 16px">
          <el-input v-model="search" placeholder="搜索组件" clearable size="small" prefix-icon="el-icon-search" />
        </div>
        <div v-if="!currentList || currentList.length === 0" :class="$style.noData">暂无可用组件</div>
        <u-group-attr-panel v-else v-for="(item, index) in currentList" :key="index" :title="item.title" indent>
          <div :class="$style.componentList">
            <div
              :class="$style.componentItem"
              v-for="component in item.components"
              @dragstart="onDragStart($event, component)"
              @dragend="onDragEnd"
              :draggable="true"
              :key="component.name"
              @click.stop="handleMaterialClick(component)"
              :selected="selectedMaterial === component.name"
            >
              <s-toolbox-icon :class="$style.icon" :name="formatName(component.icon)"></s-toolbox-icon>
              <div :class="$style.componentTitle">{{ component.title }}</div>
            </div>
          </div>
        </u-group-attr-panel>
      </el-tab-pane>
      <!-- <el-tab-pane label="结构树" name="structureTree">结构树</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import { componentMaterials } from '../config';
import UGroupAttrPanel from './basic/u-group-attr-panel.vue';
import SDragImageGhost from './basic/s-drag-image-ghost.vue';
import { eventBus, dragImage } from '../utils';

export default {
  name: 's-component-toolbox',
  components: {
    UGroupAttrPanel,
    SDragImageGhost,
  },
  data() {
    return {
      activeName: 'component',
      search: '',
      currentList: componentMaterials,
      selectedMaterial: null,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.updateList, 300, {
      leading: true,
      trailing: true,
    });
  },
  beforeDestroy() {
    this.debouncedSearch.cancel();
  },
  watch: {
    search(value) {
      this.debouncedSearch();
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    formatName(value) {
      return value ? `page-${value}` : 'page-default';
    },
    updateList() {
      this.currentList = !this.search
        ? componentMaterials
        : componentMaterials
            .map((item) => ({
              ...item,
              components: item.components.filter((component) => component.name?.includes(this.search) || component.title?.includes(this.search)),
            }))
            .filter((item) => item.components.length > 0);
    },
    handleMaterialClick(component) {
      this.selectedMaterial = this.selectedMaterial ? null : component.name;
    },
    // 拖拽
    onDragStart(event, item) {
      const ghost = this.$refs.dragGhost.$el;
      if (ghost) {
        ghost.innerText = item.title || item.name || '组件';
        event.dataTransfer.setDragImage(dragImage(ghost), 0, 0); // 设置拖拽图片
      }
      const data = {
        title: item.title,
        tagName: item.tagName,
        command: 'addBlock',
        actionMsg: `添加组件“${item.title}”到页面`,
      };
      event.dataTransfer.setData('application/json', JSON.stringify(data));
      eventBus.emit('setDragTagName', { tagName: item.tagName });
      event.dataTransfer.effectAllowed = 'copyMove';
    },
    onDragEnd() {
      eventBus.emit('clearDragHover');
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;

  .noData {
    padding: 24px 16px 0 16px;
    color: #999;
    text-align: center;
  }
  .componentList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    .componentItem {
      background: transparent;
      border: 1px solid var(--border-color-base);
      border-radius: var(--border-radius-base);
      box-sizing: border-box;
      color: #111;
      cursor: grab;
      height: 28px;
      padding: 0 4px 0 7px;
      vertical-align: top;
      font-size: 12px;
      display: flex;
      align-items: center;
      &:hover {
        background: #f4f4f4;
        border-color: transparent;
      }
      &[selected] {
        border-color: #4c88ff;
        outline: 1px solid #4c88ff;
      }

      .icon {
        display: inline-block;
        font-size: 20px;
        padding-right: 2px;
      }

      .componentTitle {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 8px;
      }
    }
  }
}
</style>
