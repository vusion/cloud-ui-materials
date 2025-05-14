function isString(str) {
  return typeof str === 'string';
}

export default {
  props: {
    typingConfig: { type: Object, default: () => ({ step: 2, interval: 50, suffix: null }) },
    typing: { type: Boolean, default: true },
  },
  data() {
    return {
      prevContent: '',
      typingTimerRunning: false, // 新增：标记定时器是否在跑
      mdTokens: [],
      blockIndex: 0,
      innerTypingIndex: 0, // 新增：当前text块内的打字下标
      prevMdTokens: [],
      prevBlockIndex: 0,
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
      if (this.mergedTypingEnabled && isString(this.content)) {
        // 拼接已完成的md块和当前text块的部分内容
        let result = '';
        let idx = 0;
        for (let i = 0; i < this.blockIndex; i++) {
          const block = this.mdTokens[i];
          if (block.type === 'md' || block.type === 'html') {
            result += block.value;
          } else if (block.type === 'text') {
            result += block.value;
          }
          idx += block.value.length;
        }
        // 当前未完成的text块
        if (this.blockIndex < this.mdTokens.length) {
          const block = this.mdTokens[this.blockIndex];
          if (block.type === 'text') {
            result += block.value.slice(0, this.innerTypingIndex);
          } else if (block.type === 'md' || block.type === 'html') {
            // md块直接整块输出
            result += block.value;
          }
        }
        return result;
      }
      return this.content;
      
    },
    isTyping() {
      // 只要还有未完成的text或md块就继续
      if (!this.mergedTypingEnabled || !isString(this.content)) return false;
      if (this.blockIndex < this.mdTokens.length) return true;
      if (this.blockIndex === this.mdTokens.length && this.innerTypingIndex > 0) return true;
      return false;
    },
  },
  watch: {
    content: {
      handler(val) {
        if (!this.mergedTypingEnabled || !isString(val)) return;
        const newTokens = this.splitMarkdownBlocks(val);
        // 找到新旧 tokens 的最长公共前缀
        let sameCount = 0;
        while (
          sameCount < this.prevMdTokens.length &&
          sameCount < newTokens.length &&
          this.prevMdTokens[sameCount].value === newTokens[sameCount].value &&
          this.prevMdTokens[sameCount].type === newTokens[sameCount].type
        ) {
          sameCount++;
        }
        this.mdTokens = newTokens;
        if (sameCount === this.prevBlockIndex && this.innerTypingIndex !== 0) {
          this.blockIndex = sameCount;
        } else if (sameCount > 0) {
          this.blockIndex = sameCount + 1;
        } else {
          this.blockIndex = 0;
        }
        this.startTypingTimer();
      },
      immediate: true,
    },
    typing(val) {
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
    this.typingTimerRunning = false; // 防止内存泄漏
  },
  methods: {
    splitMarkdownBlocks(md) {
      // 简单支持：加粗、斜体、链接、代码、普通文本
      const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
      let result = [];
      let lastIndex = 0;
      let match;
      const parseHtml = (value) => {
        const htmlRegex =  /<a\b[^>]*>[\s\S]*?<\/a>|<\/?[a-zA-Z][^>]*?>/g;
        let result = [];
        let htmlMatch;
          let htmlLastIndex = 0;
          while ((htmlMatch = htmlRegex.exec(value)) !== null) {
            const textValue = value.slice(htmlLastIndex, htmlMatch.index);
            if (textValue.length > 0) {
              result.push({ type: 'text', value: textValue });
            }
            result.push({ type: 'html', value: htmlMatch[0] });
            htmlLastIndex = htmlRegex.lastIndex;  
        }
        result.push({ type: 'text', value: value.slice(htmlLastIndex) });
        return result;
      };
      while ((match = regex.exec(md)) !== null) {
        if (match.index > lastIndex) {
          const value = md.slice(lastIndex, match.index);
          const htmlResult = parseHtml(value);
          result.push(...htmlResult);
        }
        result.push({ type: 'md', value: match[0] });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < md.length) {
        const value = md.slice(lastIndex);
        const htmlResult = parseHtml(value);
        result.push(...htmlResult);
      }
      return result;
    },
    startTypingTimer() {
      if (this.typingTimerRunning || (this.blockIndex >= this.mdTokens.length && this.innerTypingIndex === 0)) return;
      this.typingTimerRunning = true;
      this.runTypingStep();
    },
    runTypingStep() {
      if (this.blockIndex >= this.mdTokens.length) return;
      const block = this.mdTokens[this.blockIndex];
      if (block.type === 'md' || block.type === 'html') {
        // md块直接整块输出，跳到下一个块
        this.blockIndex++;
        this.innerTypingIndex = 0;
      } else if (block.type === 'text') {
        // text块按步推进
        if (this.innerTypingIndex < block.value.length) {
          this.innerTypingIndex += this.typingStep;
          if (this.innerTypingIndex > block.value.length) {
            this.innerTypingIndex = block.value.length;
          }
        }
        if (this.innerTypingIndex >= block.value.length) {
          this.blockIndex++;
          this.innerTypingIndex = 0;
        }
      }
      if (this.blockIndex < this.mdTokens.length || this.innerTypingIndex > 0) {
        this.timeId = setTimeout(() => this.runTypingStep(), this.typingInterval);
      } else {
        this.typingTimerRunning = false;
      }
      this.prevMdTokens = this.mdTokens.slice(0, this.blockIndex);
      this.prevBlockIndex = this.blockIndex;
    },
  },
};
