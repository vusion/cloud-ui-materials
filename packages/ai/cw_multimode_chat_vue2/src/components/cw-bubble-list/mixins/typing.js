function isString(str) {
  return typeof str === 'string';
}

export default {
  props: {
    typingConfig: { typeof: Object, default: () => ({ step: 2, interval: 50, suffix: null }) },
    typing: { typeof: Boolean, default: true },
  },
  data() {
    return {
      prevContent: '',
      typingIndex: 1,
      typingTimerRunning: false, // 新增：标记定时器是否在跑
    };
  },
  computed: {
    mergedTypingEnabled() {
      return this.typing && isString(this.content);
    },
    typingStep() {
      return this.typingConfig?.step || 2;
    },
    typingInterval() {
      return this.typingConfig?.interval || 50;
    },
    mergedTypingContent() {
      return this.mergedTypingEnabled && isString(this.content) ? this.content.slice(0, this.typingIndex) : this.content;
    },
    isTyping() {
      return this.mergedTypingEnabled && isString(this.content) && this.typingIndex < this.content.length;
    },
  },
  watch: {
    content: {
      handler(val) {
        const prevContentValue = this.prevContent;
        this.prevContent = val;
        if (!this.mergedTypingEnabled && isString(this.content)) {
          this.setTypingIndex(this.content.length);
        } else if (isString(this.content) && isString(prevContentValue) && this.content.length < prevContentValue.length) {
          this.setTypingIndex(1);
        }
         // 只在动画未完成时启动定时器
         this.startTypingTimer();
      },
      immediate: true,
    },
    typing(val) {
      this.startTypingTimer();
    },
    typingIndex(val) {
      this.startTypingTimer();
    },
    isTyping(val) {
      if (!val) {
        this.$emit('typing-complete', val);
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeId);
  },
  methods: {
    startTypingTimer() {
      // 如果已经有定时器在跑，或者动画已完成，不再重复启动
      if (this.typingTimerRunning || !this.isTyping) return;
      this.typingTimerRunning = true;
      this.runTypingStep();
    },
    runTypingStep() {
      if (!this.isTyping) {
        this.typingTimerRunning = false;
        return;
      }
      this.timeId = setTimeout(() => {
        this.setTypingIndex(this.typingIndex + this.typingStep);
        this.runTypingStep();
      }, this.typingInterval);
    },
    setTypingIndex(val) {
      this.typingIndex = Math.min(val, this.content.length);
    },
    setTypingIndex(val) {
      // 防止 index 超过 content 长度
      this.typingIndex = Math.min(val, this.content.length);
    },
  },
};
