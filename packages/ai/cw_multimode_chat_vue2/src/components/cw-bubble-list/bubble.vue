<template>
  <div :class="[$style.root, $style[placement]]">
    <div :class="$style.avatar" v-if="showAvatar">
      <a-avatar>
        <template #icon><img :src="avatar || defaultAvatar" /></template>
      </a-avatar>
    </div>
    <div :class="$style.cntwrap">
      <div :class="$style.header" v-if="showUserName || showTime">
        <span :class="$style.name" v-if="showUserName"> {{ name }} </span>
        <span :class="$style.time" v-if="showTime"> {{ formatTime(time) }} </span>
      </div>
      <div :class="contentClass" v-if="!!content">
        <div :class="$style.text" :typing="isTyping">
          <slot>
            <span v-if="isMarkdown" v-html="renderMarkdown(mergedTypingContent)"></span>
            <span v-else>{{ mergedTypingContent }}</span>
          </slot>
        </div>
        <div :class="$style.loading" v-if="loading"><cw-loading /></div>
      </div>
      <div :class="$style.footer" v-if="showFooter">
        <slot name="footer" v-bind="$props"></slot>
      </div>
      <div :class="$style.files" v-if="fileList && fileList.length">
        <cw-file-card v-for="(item, index) in fileList" :class="$style.fitem" :key="index" :item="item" :readonly="true" :imgPreview="false">
        </cw-file-card>
      </div>
    </div>
  </div>
</template>
<script>
import { Avatar } from 'ant-design-vue';
import Loading from './loading';
import CWFileCard from '../cw-attachment/fileList/card';
import markdownit from 'markdown-it';
const md = markdownit({ html: true, breaks: true });
import typingMixin from './mixins/typing';
import AISvg from './assets/ai.svg';
import UserSvg from './assets/user.svg';

export default {
  name: 'cw-bubble',
  components: {
    'a-avatar': Avatar,
    'cw-loading': Loading,
    'cw-file-card': CWFileCard,
  },
  mixins: [typingMixin],
  props: {
    placement: { type: String, default: 'start' },
    shape: { type: String, default: 'normal' }, // 气泡形状
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
    fileList: { type: Array, default: () => [] },
    isMarkdown: { type: Boolean, default: true },
    item: Object,
    index: Number,
  },
  computed: {
    contentClass() {
      const $style = this.$style;
      const styles = [
        `${$style.content}`,
        `${$style[`shape-${this.shape?this.shape:'normal'}`]}`,
        `${this.filled?$style[`content-filled`]:''}`,
        `${this.border?$style[`content-border`]:''}`,
        `${this.shadow?$style[`content-shadow`]:''}`,
        `${this.loading?$style[`loading`]:''}`,
      ];
      return styles.filter((item)=>item !== '').join(' ');
    },
    defaultAvatar() {
      return this.placement === 'start'? AISvg : UserSvg;
    }
  },
  methods: {
    renderMarkdown(text) {
      if  (this.isTyping) {
        text =  text.replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g,'📄') // 避免渲染的时候一直加载图片
      }
      return md.render(text);
    },
    formatTime(time) {
      if (this.$utils && this.$utils['FormatDateTime'] && !!time) {
        return this.$utils['FormatDateTime'](time, `yyyy-MM-dd HH:mm:ss`)
      }
      return time;
    }
  },
};
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
.root .avatar [class^='ant-avatar'] {
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
.cntwrap .content[shape="none"],
.cntwrap .shape-none {
  padding: 0;
  min-height: auto;
}
.cntwrap .content[shape],
.cntwrap .content[shape='normal'],
.cntwrap .shape-normal {
  padding: 12px 16px;
  border-radius: 8px;
}
.cntwrap .content[shape='round'],
.cntwrap .shape-round {
  padding: 12px 16px;
  border-radius: 24px;
}
.cntwrap .content[shape='corner'],
.cntwrap .shape-corner {
  padding: 12px 16px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.cntwrap .content[filled='true'],
.cntwrap .content-filled {
  background-color: var(--cw-bubble-content-background-color);
}
.cntwrap .content[border='true'],
.cntwrap .content-border {
  border: 1px solid var(--cw-bubble-content-border-color);
}
.cntwrap .content[shadow='true'],
.cntwrap .content-shadow {
  box-shadow: 0px 2px 8px 0px var(--cw-bubble-content-box-shadow);
}
.cntwrap .content p {
  margin: 0;
}
.cntwrap .content .loading {
  height: 24px;
}
/* .cntwrap .content .text[typing='true']::after {
  content: '|';
  font-weight: 900;
  user-select: none;
  opacity: 1;
  margin-inline-start: 0.1em;
  animation-name: cw-bubble-cursorBlink;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
} */
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
.root.end .cntwrap .content[shape='corner'],
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
.files {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.files .fitem {
  width: 236px;
}
@keyframes cw-bubble-cursorBlink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>