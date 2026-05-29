<template>
  <div ref="rootEl" :class="$style.root" @scroll="onInternalScroll">
    <template v-if="!!dataSource">
      <template v-for="(item, index) in list" :key="index">
        <slot
          v-if="lodashGet(item, roleField) === leftRoleName"
          name="leftBubble"
          :item="item"
          :index="index"
        />
        <slot
          v-else-if="lodashGet(item, roleField) === rightRoleName"
          name="rightBubble"
          :item="item"
          :index="index"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, type PropType } from 'vue';
import { useDataSource, type DataSourceProp } from './composables/useDataSource';

const TOLERANCE = 1;

const props = defineProps({
  dataSource: {
    type: [Array, Object, Function] as PropType<DataSourceProp>,
    default: undefined,
  },
  textField: { type: String, default: 'text' },
  valueField: { type: String, default: 'value' },
  roleField: { type: String, default: 'role' },
  autoScroll: { type: Boolean, default: true },
  leftRoleName: String,
  rightRoleName: String,
});

const emit = defineEmits<{ typingComplete: [data: unknown] }>();

const rootEl = ref<HTMLElement | null>(null);
const { list, reload, lodashGet } = useDataSource(props);

const scrollReachEnd = ref(false);
const updateCount = ref(0);

function onInternalScroll(e: Event) {
  const target = e.target as HTMLElement;
  scrollReachEnd.value = target.scrollHeight - Math.abs(target.scrollTop) - target.clientHeight <= TOLERANCE;
}

function onTypingComplete(data: unknown) {
  emit('typingComplete', data);
}

function scrollTo(index: number) {
  const el = rootEl.value?.children[index];
  if (el) {
    elementScrollIntoView(el);
  }
}

function elementScrollIntoView(_element: Element) {
  if (!rootEl.value) return;
  rootEl.value.scrollTo({
    top: rootEl.value.scrollHeight,
    behavior: 'smooth',
  });
}

watch(
  () => list.value.length,
  () => {
    if (!props.autoScroll || !rootEl.value) return;
    const lastItemIndex = list.value.length - 2;
    const bubbleEl = rootEl.value.children[lastItemIndex];
    if (bubbleEl) {
      const { top = 0, bottom = 0 } = bubbleEl.getBoundingClientRect() || {};
      const { top: listTop, bottom: listBottom } = rootEl.value.getBoundingClientRect();
      const isVisible = top < listBottom && bottom > listTop;
      if (isVisible) {
        updateCount.value++;
        scrollReachEnd.value = true;
      }
    }
  }
);

watch(updateCount, () => {
  if (!props.autoScroll || !scrollReachEnd.value || !rootEl.value) return;
  nextTick(() => {
    const bubbleEl = rootEl.value!.children[list.value.length - 1];
    if (bubbleEl) {
      elementScrollIntoView(bubbleEl);
    }
  });
});

defineExpose({
  reload,
  scrollTo,
  onTypingComplete,
});
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}
</style>
