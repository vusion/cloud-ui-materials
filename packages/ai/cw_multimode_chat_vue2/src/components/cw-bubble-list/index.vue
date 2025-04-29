<template>
  <div :class="$style.root" @scroll="onInternalScroll">
    <template v-if="!!dataSource">
      <template v-for="(item, index) in list">
        <slot name="leftBubble" :item="item" :index="index" v-if="lodashGet(item, roleField) === leftRoleName"></slot>
        <slot name="rightBubble" :item="item" :index="index" v-if="lodashGet(item, roleField) === rightRoleName"></slot>
      </template>
    </template>
  </div>
</template>
<script>
import CwBubble from './bubble';
import dataSourceMixin from './mixins/dataSource';
import AISvg from './assets/ai.svg';
import UserSvg from './assets/user.svg';

const TOLERANCE = 1;

export default {
  name: 'cw-bubble-list',
  components: {
    'cw-bubble': CwBubble,
  },
  mixins: [dataSourceMixin],
  props: {
    roleField: { type: String, default: 'role', },
    autoScroll: { type: Boolean, default: true },
    leftRoleName: String,
    rightRoleName: String,
  },
  data() {
    return {
      AISvg,
      UserSvg,
      scrollReachEnd: false,
      updateCount: 0,
    }
  },
  watch: {
    updateCount(val) {
      if(this.autoScroll && this.scrollReachEnd) {
        this.$nextTick(() => {
          const bubbleEl = this.$el.children[this.list.length - 1];
          this.elementScrollIntoView(bubbleEl);
        })
      }
    },
    'list.length'() {
      if (this.autoScroll) {
        const lastItemIndex = this.list.length - 2;
        const bubbleEl = this.$el.children[lastItemIndex];
        if(bubbleEl) {
          const { top = 0, bottom = 0 } = bubbleEl.getBoundingClientRect() || {};
          const { top: listTop, bottom: listBottom } = this.$el.getBoundingClientRect();

          const isVisible = top < listBottom && bottom > listTop;
          if (isVisible) {
            this.updateCount++;
            this.scrollReachEnd = true;
          }
        }
      }
    }
  },
  methods: {
    onInternalScroll(e) {
      const target = e.target;
      this.scrollReachEnd = target.scrollHeight - Math.abs(target.scrollTop) - target.clientHeight <= TOLERANCE;
    },
    onTypingComplete(data) {
      this.$emit('typingComplete', data);
    },
    scrollTo(index) {
      const bubbleEl = this.$el.children[index];
      if(bubbleEl) {
        this.elementScrollIntoView(bubbleEl);
      }
    },
    elementScrollIntoView(element) {
      if(!element)
        return;
      this.$el.scrollTo({
        top: this.$el.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
};
</script>
<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
</style>
