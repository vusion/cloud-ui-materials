import { ref, computed, watch, onBeforeUnmount, type Ref, type ComputedRef } from 'vue';

function isString(str: unknown): str is string {
  return typeof str === 'string';
}

export type TypingConfig = { step?: number; interval?: number; suffix?: string | null };

type Token = { type: 'md' | 'html' | 'text'; value: string };

export function useBubbleTyping(
  content: Ref<string | undefined>,
  typing: Ref<boolean>,
  typingConfig: Ref<TypingConfig>,
  onTypingComplete: (val: unknown) => void
): {
  mergedTypingContent: ComputedRef<string | undefined>;
  isTyping: ComputedRef<boolean>;
} {
  const typingTimerRunning = ref(false);
  const mdTokens = ref<Token[]>([]);
  const blockIndex = ref(0);
  const innerTypingIndex = ref(0);
  const prevMdTokens = ref<Token[]>([]);
  const prevInnerTypingIndex = ref(0);
  let timeId: ReturnType<typeof setTimeout> | undefined;

  const mergedTypingEnabled = computed(
    () => typing.value && isString(content.value)
  );
  const typingStep = computed(() => typingConfig.value?.step ?? 2);
  const typingInterval = computed(() => typingConfig.value?.interval ?? 50);

  const mergedTypingContent = computed(() => {
    if (mergedTypingEnabled.value && isString(content.value)) {
      let result = '';
      for (let i = 0; i < blockIndex.value; i++) {
        const block = mdTokens.value[i];
        if (block) {
          if (block.type === 'md' || block.type === 'html') {
            result += block.value;
          } else if (block.type === 'text') {
            result += block.value;
          }
        }
      }
      if (blockIndex.value < mdTokens.value.length) {
        const block = mdTokens.value[blockIndex.value];
        if (block) {
          if (block.type === 'text') {
            result += block.value.slice(0, innerTypingIndex.value);
          } else if (block.type === 'md' || block.type === 'html') {
            result += block.value;
          }
        }
      }
      return result;
    }
    return content.value;
  });

  const isTyping = computed(() => {
    if (!mergedTypingEnabled.value || !isString(content.value)) return false;
    if (blockIndex.value < mdTokens.value.length) return true;
    if (blockIndex.value === mdTokens.value.length && innerTypingIndex.value > 0) return true;
    return false;
  });

  function splitMarkdownBlocks(md: string): Token[] {
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    const result: Token[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const parseHtml = (value: string): Token[] => {
      const htmlRegex = /<a\b[^>]*>[\s\S]*?<\/a>|<\/?[a-zA-Z][^>]*?>/g;
      const htmlResult: Token[] = [];
      let htmlMatch: RegExpExecArray | null;
      let htmlLastIndex = 0;
      while ((htmlMatch = htmlRegex.exec(value)) !== null) {
        const textValue = value.slice(htmlLastIndex, htmlMatch.index);
        if (textValue.length > 0) {
          htmlResult.push({ type: 'text', value: textValue });
        }
        htmlResult.push({ type: 'html', value: htmlMatch[0] });
        htmlLastIndex = htmlRegex.lastIndex;
      }
      htmlResult.push({ type: 'text', value: value.slice(htmlLastIndex) });
      return htmlResult;
    };
    while ((match = regex.exec(md)) !== null) {
      if (match.index > lastIndex) {
        const value = md.slice(lastIndex, match.index);
        result.push(...parseHtml(value));
      }
      result.push({ type: 'md', value: match[0] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < md.length) {
      const value = md.slice(lastIndex);
      result.push(...parseHtml(value));
    }
    return result;
  }

  function runTypingStep() {
    if (blockIndex.value >= mdTokens.value.length) {
      typingTimerRunning.value = false;
      clearTimeout(timeId);
      return;
    }
    const block = mdTokens.value[blockIndex.value];
    if (!block) {
      typingTimerRunning.value = false;
      clearTimeout(timeId);
      return;
    }
    if (block.type === 'md' || block.type === 'html') {
      blockIndex.value++;
      innerTypingIndex.value = 0;
    } else if (block.type === 'text') {
      if (innerTypingIndex.value < block.value.length) {
        innerTypingIndex.value += typingStep.value;
        if (innerTypingIndex.value > block.value.length) {
          innerTypingIndex.value = block.value.length;
        }
      }
      prevInnerTypingIndex.value = innerTypingIndex.value;
      if (innerTypingIndex.value >= block.value.length) {
        blockIndex.value++;
      }
    }
    if (blockIndex.value < mdTokens.value.length && mergedTypingEnabled.value) {
      timeId = setTimeout(() => runTypingStep(), typingInterval.value);
    } else {
      typingTimerRunning.value = false;
    }
    if (innerTypingIndex.value > 0) {
      prevMdTokens.value = mdTokens.value.slice(0, blockIndex.value);
    } else {
      prevMdTokens.value = mdTokens.value.slice(0, blockIndex.value + 1);
    }
  }

  function startTypingTimer() {
    if (
      typingTimerRunning.value ||
      (blockIndex.value >= mdTokens.value.length && innerTypingIndex.value === 0)
    ) {
      return;
    }
    typingTimerRunning.value = true;
    runTypingStep();
  }

  watch(
    content,
    (val) => {
      if (!mergedTypingEnabled.value || !isString(val)) return;
      const newTokens = splitMarkdownBlocks(val);
      let sameCount = 0;
      while (
        sameCount < prevMdTokens.value.length &&
        sameCount < newTokens.length &&
        prevMdTokens.value[sameCount].value === newTokens[sameCount].value &&
        prevMdTokens.value[sameCount].type === newTokens[sameCount].type
      ) {
        sameCount++;
      }
      if (
        mdTokens.value &&
        mdTokens.value[sameCount] &&
        newTokens[sameCount] &&
        mdTokens.value[sameCount].type === 'text' &&
        newTokens[sameCount].type === 'text' &&
        (newTokens[sameCount].value.startsWith(mdTokens.value[sameCount].value) ||
          mdTokens.value[sameCount].value.startsWith(newTokens[sameCount].value))
      ) {
        if (prevInnerTypingIndex.value > newTokens[sameCount].value.length) {
          innerTypingIndex.value = newTokens[sameCount].value.length;
        } else {
          innerTypingIndex.value = prevInnerTypingIndex.value;
        }
      } else {
        innerTypingIndex.value = 0;
      }
      mdTokens.value = newTokens;
      blockIndex.value = sameCount;
      startTypingTimer();
    },
    { immediate: true }
  );

  watch(typing, (val) => {
    if (val && isString(content.value)) {
      const tokens = splitMarkdownBlocks(content.value);
      blockIndex.value = tokens.length > 0 ? tokens.length - 1 : 0;
      startTypingTimer();
    } else {
      typingTimerRunning.value = false;
      clearTimeout(timeId);
    }
  });

  watch(isTyping, (val) => {
    if (!val) {
      onTypingComplete(val);
    }
  });

  onBeforeUnmount(() => {
    clearTimeout(timeId);
    typingTimerRunning.value = false;
  });

  return { mergedTypingContent, isTyping };
}
