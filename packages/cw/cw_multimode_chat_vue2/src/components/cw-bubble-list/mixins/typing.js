function isString(str) {
  return typeof str === 'string';
}

export default {
  props: {
    typingConfig: { typeof: Object, default: () => ({ step: 4, interval: 10, suffix: null }) },
    typing: { typeof: Boolean, default: true },
  },
  data() {
    return {
      prevContent: '',
      typingIndex: 1,
    };
  },
  computed: {
    mergedTypingEnabled() {
      console.log(this.content, this.typing);
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
    typing: {
      handler() {
        this.handleTypeLength();
      },
      immediate: true,
    },
    typingIndex: {
      handler() {
        this.handleTypeLength();
      },
      immediate: true,
    },
    content: {
      handler(val) {
        const prevContentValue = this.prevContent;
        this.prevContent = val;
        if (!this.mergedTypingEnabled && isString(this.content)) {
          this.setTypingIndex(this.content.length);
        } else if (isString(this.content) && isString(prevContentValue) && this.content.indexOf(prevContentValue) !== 0) {
          this.setTypingIndex(1);
        }
        this.handleTypeLength();
      },
      immediate: true,
    },
    isTyping(val) {
      if (!val) {
        this.$emit('typing-complete', val);
      }
    },
  },
  methods: {
    handleTypeLength() {
      if (this.mergedTypingEnabled && isString(this.content) && this.typingIndex < this.content.length) {
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
          this.setTypingIndex(this.typingIndex + this.typingStep);
        }, this.typingInterval);
      }
    },
    setTypingIndex(val) {
      this.typingIndex = val;
    },
  },
};
