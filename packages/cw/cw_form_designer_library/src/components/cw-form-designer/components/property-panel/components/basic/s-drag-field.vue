<template>
  <div ref="dragRoot" :class="$style.root">
    <div v-if="dragTipStyle" :class="$style.dragTip" :style="dragTipStyle"></div>
    <div :class="$style.dragAnimation" :animation="animation" :style="transform"></div>
    <s-drag-image-ghost ref="dragGhost"></s-drag-image-ghost>
    <div
      v-for="(item, index) in fieldList"
      :key="index"
      @dragstart="onDragStart($event, item, index)"
      @dragover="onDragOver($event, item, index)"
      @dragend="onDragEnd($event, item, index)"
      @drop="onDrop($event, item, index)"
    >
      <slot name="section" :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import SDragImageGhost from '@/components/cw-form-designer/components/basic/s-drag-image-ghost.vue';
import { dragImage } from '@/components/cw-form-designer/utils';

const originDragNodeInitConfig = {
  index: -1,
  item: undefined,
};

export default {
  name: 's-drag-field',
  components: {
    SDragImageGhost,
  },
  props: {
    fieldList: {
      type: Array,
      default: () => [],
    },
    split: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      dragTipStyle: undefined,
      originDragNode: { ...originDragNodeInitConfig },
      animation: false,
      transform: {},
      animationTimer: null,
      position: undefined,
      throttleHandleDrag: null,
    };
  },
  created() {
    this.throttleHandleDrag = throttle(this.handleDragInternal, 300, { leading: true, trailing: false });
  },
  beforeDestroy() {
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
    this.throttleHandleDrag && this.throttleHandleDrag.cancel && this.throttleHandleDrag.cancel();
  },
  methods: {
    computeStyle(value) {
      this.dragTipStyle = undefined;
      const { el, position } = value;
      if (!el || !this.$refs.dragRoot) return;

      const { top: elTop, height: elHeight } = el.getBoundingClientRect();
      const { top: rootTop } = this.$refs.dragRoot.getBoundingClientRect();
      const top = position === 'insertAfter' ? elTop - rootTop + elHeight : elTop - rootTop;

      this.dragTipStyle = {
        top: `${top}px`,
      };
    },
    onDragStart(event, item, index) {
      if (event.target.classList.contains('s-others-icon')) {
        // 清除 hover 状态
        event.target.style.backgroundColor = 'unset';
      }
      if (item.label) {
        const ghost = this.$refs.dragGhost.$el;
        if (ghost) {
          ghost.innerText = item.label;
          event.dataTransfer.setDragImage(dragImage(ghost), 0, 0);
        }
      }
      event.dataTransfer.effectAllowed = 'copyMove';
      event.currentTarget.style.opacity = 0.4;
      const height = event.currentTarget.clientHeight;
      this.animation = true;
      this.transform = {
        top: `${index * height}px`,
        height: `${height}px`,
        transformOrigin: `${event.offsetX}px ${event.offsetY}px`,
      };
      clearTimeout(this.animationTimer);
      this.animationTimer = setTimeout(() => {
        this.animation = false;
        this.transform = {};
      }, 200);

      this.originDragNode = {
        index,
        item,
      };
      this.$emit('dragStart', event, this.originDragNode);
    },
    handleDragInternal(event, item, index) {
      const target = event.currentTarget;
      if (!target) return;
      const { top, height } = target.getBoundingClientRect();
      const upArea = top + height / this.split;
      const next = true;
      const nested = false;
      this.position = event.y <= upArea ? 'insertBefore' : 'insertAfter';

      this.computeStyle({
        el: target,
        position: this.position,
        next,
        nested,
      });
      this.$emit('dragOver', event, { item, index });
    },
    onDragOver(event, item, index) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      if (this.originDragNode.index === -1) return;
      this.throttleHandleDrag && this.throttleHandleDrag(event, item, index);
    },
    onDrop(event, item, index) {
      if (this.originDragNode.index === -1) return;
      // 判断是否需要更新位置
      const fromIndex = this.originDragNode.index;
      const toIndex = index;
      const position = this.position;

      // 如果位置没有实际变化，不触发 drop 事件
      if (
        fromIndex === toIndex ||
        (fromIndex === toIndex - 1 && position === 'insertBefore') ||
        (fromIndex === toIndex + 1 && position === 'insertAfter')
      ) {
        return;
      }

      this.$emit(
        'drop',
        event,
        {
          item,
          index,
        },
        this.originDragNode,
        this.position
      );
    },
    onDragEnd(event, item, index) {
      event.currentTarget.style.opacity = 1;
      this.dragTipStyle = undefined;
      this.originDragNode = { ...originDragNodeInitConfig };
      this.position = undefined;
      this.$emit('dragEnd', event, { item, index });
    },
  },
};
</script>

<style module>
.root {
  width: 100%;
  position: relative;
}

.root .dragAnimation {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.06);
  width: 0;
  height: 0;
  pointer-events: none;
}

.root .dragAnimation[animation='true'] {
  width: 100%;
  top: 0;
  z-index: 99;
  animation: scale 0.2s linear;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.4);
  }

  100% {
    transform: scale(0);
  }
}

.dragTip {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #3377ff;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
