<template>
  <div @click="emit('click', link)">
    <div class="highlight-container">
      <div class="highlight-content">{{ content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, onMounted, onUpdated, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    content?: string;
    text?: string;
    link?: string;
  }>(),
  {
    content: '',
    text: '',
    link: '',
  },
);

const emit = defineEmits<{
  click: [link: string];
}>();

const instance = getCurrentInstance();
const highlightId = `search-results-${instance?.uid ?? 0}`;
let styleEl: HTMLStyleElement | null = null;

function setHighlight() {
  const article = instance?.proxy?.$el as HTMLElement | undefined;
  if (!article) return;

  const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
  const allTextNodes: Text[] = [];
  let currentNode = treeWalker.nextNode();
  while (currentNode) {
    allTextNodes.push(currentNode as Text);
    currentNode = treeWalker.nextNode();
  }
  // console.log('allTextNodes', allTextNodes);

  const str = props.text;
  if (!str) {
    return;
  }

  const ranges = allTextNodes
    .map((el) => ({ el, text: el.textContent?.toLowerCase() ?? '' }))
    .map(({ text, el }) => {
      const indices: number[] = [];
      let startPos = 0;
      while (startPos < text.length) {
        const index = text.indexOf(str, startPos);
        if (index === -1) break;
        indices.push(index);
        startPos = index + str.length;
      }

      return indices.map((index) => {
        const range = new Range();
        range.setStart(el, index);
        range.setEnd(el, index + str.length);
        return range;
      });
    });

  const searchResultsHighlight = new Highlight(...ranges.flat());
  CSS.highlights.set(highlightId, searchResultsHighlight);
}

function mountStyle() {
  styleEl = document.createElement('style');
  styleEl.innerHTML = `
    ::highlight(${highlightId}) {
      color: #337eff;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(styleEl);
}

onMounted(() => {
  mountStyle();
  setHighlight();
});

onUpdated(() => {
  setHighlight();
});

watch(
  () => [props.content, props.text],
  () => {
    setHighlight();
  },
);

onBeforeUnmount(() => {
  if (styleEl && document.head.contains(styleEl)) {
    document.head.removeChild(styleEl);
  }
  CSS.highlights.delete(highlightId);
});
</script>

<style>
.highlight-container {
  padding: 8px;
}
.highlight-container:hover {
  cursor: pointer;
}
.highlight-content {
  color: rgb(83, 87, 106);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
