<template>
  <div :class="[$style.root, $style[placement]]">
    <div v-if="showAvatar" :class="$style.avatar">
      <Avatar>
        <template #icon>
          <img :src="avatar || defaultAvatar" alt="" />
        </template>
      </Avatar>
    </div>
    <div :class="$style.cntwrap">
      <div v-if="showUserName || showTime" :class="$style.header">
        <span v-if="showUserName" :class="$style.name">{{ name }}</span>
        <span v-if="showTime" :class="$style.time">{{ formatTime(time) }}</span>
      </div>
      <div v-if="!!content" :class="contentClass">
        <div :class="$style.text" :typing="isTyping ? 'true' : undefined">
          <slot>
            <span v-if="isMarkdown" v-html="renderMarkdown(mergedTypingContent ?? '')"></span>
            <span v-else>{{ mergedTypingContent }}</span>
          </slot>
        </div>
        <div v-if="loading" :class="$style.loading">
          <Loading />
        </div>
      </div>
      <div v-if="showFooter" :class="$style.footer">
        <slot name="footer" v-bind="$props" />
      </div>
      <div v-if="fileList && fileList.length" :class="$style.files">
        <CWFileCard
          v-for="(fitem, index) in fileList"
          :key="index"
          :class="$style.fitem"
          :item="fitem"
          :readonly="true"
          :img-preview="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, toRef, useCssModule, type PropType } from 'vue';
import { Avatar } from 'ant-design-vue';
import markdownit from 'markdown-it';
import { markdownItEcharts } from './echarts-plugin';
import Loading from './loading.vue';
import CWFileCard from '../cw-attachment/fileList/card.vue';
import AISvg from './assets/ai.svg';
import UserSvg from './assets/user.svg';
import { useBubbleTyping } from './composables/useBubbleTyping';

defineOptions({ name: 'cw-bubble' });

const md = markdownit({ html: true, breaks: true });
md.use(markdownItEcharts);

const $style = useCssModule();

const props = defineProps({
  placement: { type: String, default: 'start' },
  shape: { type: String, default: 'normal' },
  filled: { type: Boolean, default: true },
  border: { type: Boolean, default: false },
  shadow: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  showAvatar: { type: Boolean, default: true },
  showUserName: { type: Boolean, default: true },
  showTime: { type: Boolean, default: true },
  content: { type: String, default: '' },
  avatar: { type: String, default: null },
  name: { type: String, default: '' },
  time: { type: String, default: '' },
  showFooter: { type: Boolean, default: false },
  fileList: { type: Array as PropType<unknown[]>, default: () => [] },
  isMarkdown: { type: Boolean, default: true },
  item: Object,
  index: Number,
  typingConfig: {
    type: Object as PropType<{ step?: number; interval?: number; suffix?: string | null }>,
    default: () => ({ step: 2, interval: 50, suffix: null }),
  },
  typing: { type: Boolean, default: true },
});

const emit = defineEmits<{ 'typing-complete': [val: unknown] }>();

const { mergedTypingContent, isTyping } = useBubbleTyping(
  toRef(props, 'content'),
  toRef(props, 'typing'),
  toRef(props, 'typingConfig'),
  (val) => emit('typing-complete', val)
);

const contentClass = computed(() =>
  [
    $style.content,
    $style[`shape-${props.shape ? props.shape : 'normal'}`],
    props.filled ? $style['content-filled'] : '',
    props.border ? $style['content-border'] : '',
    props.shadow ? $style['content-shadow'] : '',
    props.loading ? $style['loading'] : '',
  ]
    .filter(Boolean)
    .join(' ')
);

const defaultAvatar = computed(() => (props.placement === 'start' ? AISvg : UserSvg));

function renderMarkdown(text: string) {
  let t = text;
  if (isTyping.value) {
    t = t.replace(/!\[[\s\S]*?\]\([\s\S]*?\)/g, '📄');
  }
  return md.render(t);
}

function formatTime(timeVal: string) {
  const inst = getCurrentInstance();
  const utils = (inst?.proxy as unknown as { $utils?: Record<string, (v: string, f: string) => string> })?.$utils;
  if (utils?.FormatDateTime && !!timeVal) {
    return utils.FormatDateTime(timeVal, 'yyyy-MM-dd HH:mm:ss');
  }
  return timeVal;
}
</script>

<style module>
:root {
  --cw-bubble-avatar-background-color: #337eff99;
  --cw-bubble-content-color: #111;
  --cw-bubble-content-border-color: #e5e5e5;
  --cw-bubble-content-box-shadow: #00000014;
  --cw-bubble-content-background-color: #f2f3f5;
  --cw-bubble-name-color: #333;
  --cw-bubble-time-color: #999;
}
.root {
  display: flex;
  column-gap: 8px;
}
.root .avatar {
  display: inline-flex;
  justify-content: center;
  align-self: flex-start;
}
.root .avatar :global([class^='ant-avatar']) {
  background-color: var(--cw-bubble-avatar-background-color);
}
.root .avatar + .cntwrap {
  max-width: calc(100% - 80px);
}
.cntwrap {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.cntwrap .content {
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  font-size: 14px;
  line-height: 1.5714285714285714;
  min-height: 46px;
  word-break: break-word;
  color: var(--cw-bubble-content-color);
}
.cntwrap .shape-none {
  padding: 0;
  min-height: auto;
}
.cntwrap .shape-normal {
  padding: 12px 16px;
  border-radius: 8px;
}
.cntwrap .shape-round {
  padding: 12px 16px;
  border-radius: 24px;
}
.cntwrap .shape-corner {
  padding: 12px 16px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.cntwrap .content-filled {
  background-color: var(--cw-bubble-content-background-color);
}
.cntwrap .content-border {
  border: 1px solid var(--cw-bubble-content-border-color);
}
.cntwrap .content-shadow {
  box-shadow: 0px 2px 8px 0px var(--cw-bubble-content-box-shadow);
}
.cntwrap .content p {
  margin: 0;
}
.cntwrap .content .loading {
  height: 24px;
}
.cntwrap .content .text[typing='true'] img {
  width: 16px;
}
.root.end {
  justify-content: end;
  flex-direction: row-reverse;
}
.root.end .cntwrap {
  align-items: flex-end;
}
.root.end .cntwrap .shape-corner {
  border-top-left-radius: 8px;
  border-top-right-radius: 0px;
}

.cntwrap .header {
  display: flex;
  gap: 8px;
  align-items: center;
}
.cntwrap .name {
  color: var(--cw-bubble-name-color);
}
.cntwrap .time {
  color: var(--cw-bubble-time-color);
}
.footer {
  width: 100%;
}
.files {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.files .fitem {
  width: 236px;
}
</style>
