import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      resizeObserver: null,
      styleRafId: null, // 统一的样式更新 RAF ID
    };
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleStyleUpdate();
    });
    if (this.$refs.root) {
      this.resizeObserver.observe(this.$refs.root);
    }
    // 监听 scroll 事件，更新 hover 和 selected 的样式
    window.addEventListener('scroll', this.scheduleStyleUpdate, true);
  },
  beforeDestroy() {
    if (this.styleRafId !== null) {
      cancelAnimationFrame(this.styleRafId);
      this.styleRafId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    window.removeEventListener('scroll', this.scheduleStyleUpdate, true);
  },
  methods: {
    /**
     * 使用 requestAnimationFrame 调度样式更新，避免频繁执行
     */
    scheduleStyleUpdate() {
      if (this.styleRafId !== null) {
        cancelAnimationFrame(this.styleRafId);
      }
      this.styleRafId = requestAnimationFrame(() => {
        this.updateHighlighterStyle();
        this.styleRafId = null;
      });
    },
    /**
     * 更新样式
     */
    updateHighlighterStyle() {
      if (this.hover && this.setHighlighter) {
        this.setHighlighter(this.hover, 'hover');
      }
      if (this.selected && this.setHighlighter) {
        this.setHighlighter(this.selected, 'selected');
      }
    },
  },
});

