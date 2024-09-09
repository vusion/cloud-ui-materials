<template>
  <div class="column">
    <div class="column-left" :style="{ width: leftWidth + 'px' }">
      <div class="resize-bar" @mousedown="startDrag"></div>
      <div class="resize-save"  vusion-slot-name="left">
        <slot name="left"></slot>
        <s-empty v-if="!$scopedSlots.left && $env && $env.VUE_APP_DESIGNER" />
      </div>
    </div>
    <div class="column-right"  vusion-slot-name="right">
      <slot name="right"></slot>
      <s-empty v-if="!$scopedSlots.right && $env && $env.VUE_APP_DESIGNER" />
    </div>
  </div>
</template>


<script>
export default {
  name: 'ResizableColumns',
  props: {
    leftWidth: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isDragging: false
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      const startX = event.clientX;
      const startWidth = this.leftWidth;

      const doDrag = (e) => {
        const width = startWidth + e.clientX - startX;
        this.leftWidth = Math.max(50, Math.min(width, window.innerWidth - 100)); // 设定最小和最大宽度限制
      };

      const stopDrag = () => {
        document.removeEventListener('mousemove', doDrag);
        document.removeEventListener('mouseup', stopDrag);
        this.isDragging = false;
      };

      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    }
  }
}
</script>


<style scoped>
.column {
  display: flex;
  overflow: hidden;
}

.column-left {
  position: relative;
  height: 100%;
  float: none;
}

.column-right {
  flex-grow: 1;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
  overflow: hidden;
}

.resize-save {
  height: 100%;
  /* padding: 16px; */
  overflow-x: hidden;
}

.resize-bar {
  width: 5px; /* 修改宽度为更细的拖拽手柄 */
  height: inherit;
  cursor: ew-resize;
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  z-index: 10;
}

.resize-bar:hover,
.resize-bar:active {
  opacity: 0.5;
}
</style>
