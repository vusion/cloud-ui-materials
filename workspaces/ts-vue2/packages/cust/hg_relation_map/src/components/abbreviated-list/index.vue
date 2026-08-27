<template>
  <div :class="$style.root" :style="{ width: width }" ref="containerRef">
    <template v-if="inIDE">
      <div v-for="(item, index) in [{}, {}, {}]" :key="index">
        <slot name="item" :item="item" :index="index" ></slot>
      </div>
    </template>
    <template v-else>
    <div
      v-for="(item, index) in visibleItems"
      :key="index"
      :class="$style.tag"
      data-tag-item
    >
      <slot name="item" :item="item" :index="index"></slot>
    </div>
      <div
        v-if="remainingCount > 0"
        :class="$style.moreButton"
        @click="handleMoreClick"
        data-more-button
      >
        +{{ remainingCount }}
      </div>
    </template>
  </div>
</template>
<script>

import dataSourceMixin from './mixin';
export default {
  name: 'abbreviated-list',
  mixins: [dataSourceMixin],
  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
  },
  data() {
    return {
      items:[],
      list:[],
      loading:false,
      visibleCount: 0
    };
  },
  computed: {
    visibleItems() {
      if (this.visibleCount === 0 && this.items.length > 0) {
        // 初始状态，先显示所有项以便计算
        return this.items;
      }
      return this.items.slice(0, this.visibleCount);
    },
    remainingCount() {
      return Math.max(0, this.items.length - this.visibleCount);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateVisibleCount();
      window.addEventListener('resize', this.calculateVisibleCount);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateVisibleCount);
  },
  watch: {
    items: {
      handler() {
        this.visibleCount = 0; // 重置以便重新计算
        this.$nextTick(() => {
          this.calculateVisibleCount();
        });
      },
      deep: true
    },
    list:{
      handler(newV) {
        this.items= newV
      },
      deep:true,
      immediate:true
    },
    width() {
      this.$nextTick(() => {
        this.calculateVisibleCount();
      });
    }
  },
  methods: {
    calculateVisibleCount() {
      if (!this.$refs.containerRef || this.items.length === 0) {
        this.visibleCount = this.items.length;
        return;
      }

      const container = this.$refs.containerRef;
      const containerWidth = container.offsetWidth;
      
      if (containerWidth === 0) {
        // 容器宽度为0，可能是还没渲染完成，延迟重试
        setTimeout(() => this.calculateVisibleCount(), 100);
        return;
      }

      // 先临时显示所有项以便测量
      if (this.visibleCount === 0) {
        this.visibleCount = this.items.length;
      }

      this.$nextTick(() => {
        const children = container.children;
        if (children.length === 0) {
          return;
        }

        let totalWidth = 0;
        let count = 0;
        const gap = 8; // 对应 CSS gap
        const moreButtonWidth = 60; // 估算 "+N" 按钮的宽度

        // 只处理标签元素，跳过 "+N" 按钮
        const tagElements = Array.from(children).filter(child => 
          child.hasAttribute('data-tag-item')
        );
        
        for (let i = 0; i < tagElements.length; i++) {
          const child = tagElements[i];
          const childWidth = child.offsetWidth;
          const nextTotalWidth = totalWidth + childWidth + (i > 0 ? gap : 0);
          
          // 检查是否还有剩余项需要显示 "+N" 按钮
          const hasMore = i < tagElements.length - 1 || this.items.length > tagElements.length;
          const neededWidth = hasMore ? nextTotalWidth + gap + moreButtonWidth : nextTotalWidth;
          
          if (neededWidth <= containerWidth) {
            totalWidth = nextTotalWidth;
            count = i + 1;
          } else {
            break;
          }
        }
        
        this.visibleCount = count || this.items.length;
      });
    },
    handleMoreClick() {
      this.$emit('more-click', this.remainingCount);
    }
  }
};
</script>
<style module>
.root {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  overflow: hidden;
}

.tag {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
}

.moreButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.moreButton:hover {
  background-color: #e0e0e0;
}
</style>
