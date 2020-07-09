<template>
<div :class="$style.root" v-show="visible" :color="currentColor" :display="currentDisplay" :maximized="isMaximized" :position="position">
    <div :class="$style.head">
        <div :class="$style.buttons">
            <slot name="buttons"></slot>
            <!-- <div :class="$style.button" role="search" :title="'搜索'"></div> -->
            <div :class="$style.button" role="clear" title="清空日志" @click="clear()"></div>
            <div :class="$style.button" v-if="fetchLogs" role="fetchLogs" title="拉取日志" @click="fetchLogs()"></div>
            <div :class="$style.button" role="brightness"
                :title="'切换为' + (currentColor === 'dark' ? '浅色' : '深色')"
                @click="toggleColor()"></div>
            <div :class="$style.button" role="maximize" :title="isMaximized ? '退出全屏' : '全屏'" @click="toggleMaximize()"></div>
            <div :class="$style.button" v-if="openInNewTab" role="openInNewTab" title="在新标签页中打开" @click="_openInNewTab()"></div>
            <div v-if="$options.propsData.hasOwnProperty('visible')" :class="$style.button" role="close" title="关闭" @click="close()"></div>
        </div>
    </div>
    <f-virtual-list ref="body" :class="$style.body" :list="logs" :virtual-count="virtualCount">
        <div :class="$style.log" v-for="log in logs" :key="log.id" v-html="log.content"></div>
    </f-virtual-list>
    <div :class="$style.foot">
        <div :class="$style.button" role="scrollToTop" title="滚动到顶部" @click="scrollToTop()"></div>
        <div :class="$style.button" role="scrollToBottom" title="滚动到底部" @click="scrollToBottom()"></div>
    </div>
    <slot></slot>
</div>
</template>

<script>
import AnsiUp from 'ansi_up';
import throttle from 'lodash/throttle';

export default {
    name: 'u-log-viewer',
    props: {
        content: { type: String, default: '' },
        color: { type: String, default: 'dark' },
        visible: { type: Boolean, default: true },
        display: {
            type: String,
            default: 'static',
            validator: (value) =>
                [
                    'block', // '块级显示'
                    'static', // 文件流中显示，'同 block'
                    'full',
                    'fixed', // 'modal',
                    'fullWindow',
                    'fullScreen',
                ].includes(value),
        },
        normalDisplay: {
            type: String,
            default: 'static',
            validator: (value) =>
                [
                    'block', // '块级显示'
                    'static', // 文件流中显示，'同 block'
                    'full',
                    'fixed',
                ].includes(value),
        },
        maximizedDisplay: {
            type: String,
            default: 'fullWindow',
            validator: (value) => ['fullWindow', 'fullScreen'].includes(value),
        },
        position: {
            type: String,
            default: 'bottom-right',
            validator: (value) =>
                [
                    'top',
                    'top-center',
                    'top-left',
                    'top-right',
                    'bottom',
                    'bottom-center',
                    'bottom-left',
                    'bottom-right',
                ].includes(value),
        },
        fetchLogs: { type: Function },
        openInNewTab: { type: [String, Function] },
        bufferWait: { type: Number, default: 200 },
        virtualCount: { type: Number, default: 60 },
    },
    data() {
        return {
            logs: [],
            buffer: [],
            currentDisplay: this.display,
            currentColor: this.color, // parentEl
            // nextSibling
        };
    },
    computed: {
        isMaximized() {
            return ['fullWindow', 'fullScreen'].includes(this.currentDisplay);
        },
        isNormal() {
            return ['block', 'static', 'fixed'].includes(this.currentDisplay);
        },
    },
    watch: {
        content: {
            handler(content) {
                // this.logs = this.content.split('\n');
                this.logs = [
                    {
                        content: this.toHtml(content),
                        id: +new Date() + '-' + 0,
                    },
                ];
            },
            immediate: true,
        },
        display: {
            handler() {
                this.currentDisplay = this.display;
            },
            immediate: true,
        },
        currentDisplay: {
            handler(currentDisplay, oldDisplay) {
                if (currentDisplay === 'fullScreen')
                    this.$el &&
                        this.$el.requestFullscreen &&
                        this.$el.requestFullscreen();
                if (oldDisplay === 'fullScreen')
                    document.exitFullscreen && document.exitFullscreen();
                if (currentDisplay === 'fullWindow') {
                    // 处理 z-index 的问题，修改层层父级的 z-index 比较复杂
                    // 除了迁移 $el 到 document.body 下，没有更通用的方法
                    this.parentEl = this.$el.parentElement;
                    this.nextSibling = this.$el.nextSibling;
                    document.body.appendChild(this.$el);
                }
                if (oldDisplay === 'fullWindow' && this.parentEl) {
                    this.parentEl.insertBefore(this.$el, this.nextSibling);
                    this.parentEl = undefined;
                    this.nextSibling = undefined;
                }
                this.$emit('update:display', currentDisplay);
                this.$emit(
                    'display-change',
                    { display: currentDisplay, oldDisplay },
                    this,
                );
            },
            immediate: true,
        },
    },
    beforeCreate() {
        // 有 buffering，不同组件实例最好不要混用
        this.ansiUp = new AnsiUp(); // eslint-disable-next-line camelcase
        this.ansiUp.use_classes = true;
    },
    created() {
        this.throttledFlush = throttle(this.flush, this.bufferWait);
    },
    methods: {
        toHtml(content) {
            // eslint-disable-next-line no-div-regex
            return this.ansiUp
                .ansi_to_html(content.replace(/ /g, '=WHITESPACE='))
                .replace(/=WHITESPACE=/g, '&nbsp;')
                .replace(/\n/g, '<br>');
        },
        push(content) {
            this.buffer.push({
                content: this.toHtml(content),
                id: +new Date() + '-' + (this.logs.length + this.buffer.length),
            });
            this.$emit('push', { logs: this.logs, incremental: content }, this);
            this.throttledFlush();
        },
        flush() {
            const oldBuffer = this.buffer;
            this.logs = this.logs.concat(oldBuffer);
            this.buffer = []; // 日志如果在最底下，便持续滚
            const bodyEl = this.$refs.body && this.$refs.body.$el;
            if (
                bodyEl &&
                bodyEl.scrollTop + bodyEl.clientHeight >= bodyEl.scrollHeight
            ) {
                // this.onScroll({ target: bodyEl });
                this.$nextTick(this.scrollToBottom);
            }
            this.$emit(
                'flush',
                { logs: this.logs, incremental: oldBuffer },
                this,
            );
        },
        clear() {
            this.logs = [];
            this.$emit('clear', { logs: [] }, this);
        },
        toggleColor() {
            this.currentColor = this.currentColor === 'dark' ? 'light' : 'dark';
        },
        toggleMaximize() {
            // this.currentDisplay = (this.currentDisplay === 'fullScreen' ? 'block' : 'fullScreen');
            if (this.isMaximized) this.currentDisplay = this.normalDisplay;
            else this.currentDisplay = this.maximizedDisplay;
        },
        scrollToTop() {
            const bodyEl = this.$refs.body && this.$refs.body.$el;
            if (bodyEl) bodyEl.scrollTop = 0;
        },
        scrollToBottom() {
            const bodyEl = this.$refs.body && this.$refs.body.$el;
            if (bodyEl)
                bodyEl.scrollTop = bodyEl.scrollHeight - bodyEl.clientHeight;
        },
        _openInNewTab(e) {
            if (typeof this.openInNewTab === 'string')
                window.open(this.openInNewTab);
            else if (typeof this.openInNewTab === 'function')
                this.openInNewTab(e, this);
        },
        close() {
            this.$emit('update:visible', false);
        },
    },
};
</script>

<style module>
@import './ansi-colors.css';

.root {
    position: relative;
    height: 400px;
}

.body {
    padding: 18px;
    font-size: 12px;
    font-family: var(--font-family-code);
    background: #23272e;
    color: #a0a9b7;
    height: 100%;
    overflow: auto;
}

.root[color="light"] .body {
    background: #f9f9f9;
    color: #3c3e44;
}

.head {
    position: absolute;
    right: 0;
    top: 0;
    right: 12px;
}

.foot {
    position: absolute;
    right: 12px;
    bottom: 10px;
    padding: 0;
    width: 20px;
    line-height: 1;
}

.root[display="fixed"] {
    position: fixed;
    z-index: var(--log-viewer-z-index-maximized, 1000);
}

.root[display="fixed"][position="top"] {
    top: 0;
    left: 0;
    right: 0;
}

.root[display="fixed"][position="top-center"] {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
}

.root[display="fixed"][position="top-left"] {
    top: 0;
    left: 0;
    width: 60%;
}

.root[display="fixed"][position="top-right"] {
    top: 0;
    right: 0;
    width: 60%;
}

.root[display="fixed"][position="bottom"] {
    bottom: 0;
    left: 0;
    right: 0;
}

.root[display="fixed"][position="bottom-center"] {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
}

.root[display="fixed"][position="bottom-left"] {
    bottom: 0;
    left: 0;
    width: 60%;
}

.root[display="fixed"][position="bottom-right"] {
    bottom: 0;
    right: 0;
    width: 60%;
}

.root[display="fullWindow"] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--log-viewer-z-index-maximized, 1000);
}

.button {
    display: inline-block;
    vertical-align: middle;
    color: rgba(255,255,255,0.25);
    transition: color var(--transition-duration);
    cursor: var(--cursor-pointer);
}

.button:hover {
    color: rgba(255,255,255,0.75);
}

.root[color="light"] .button {
    color: rgba(74, 82, 110, 0.35);
}

.root[color="light"] .button:hover {
    color: rgba(74, 82, 110, 0.75);
}

.button + .button {
    margin-left: 4px;
}

.button[role="close"]::before {
    icon-font: url('./assets/close-24px.svg');
    font-size: 24px;
}

.button[role="search"]::before {
    icon-font: url('./assets/search-24px.svg');
    font-size: 24px;
    vertical-align: -2px;
}

.button[role="clear"]::before {
    icon-font: url('./assets/delete_sweep-24px.svg');
    font-size: 22px;
    margin-right: 2px;
}

.button[role="brightness"]::before {
    icon-font: url('./assets/brightness_low-24px.svg');
    font-size: 20px;
}

.root[color="light"] .button[role="brightness"]::before {
    icon-font: url('./assets/brightness_high-24px.svg');
}

.button[role="maximize"]::before {
    icon-font: url('./assets/fullscreen-24px.svg');
    font-size: 24px;
    margin-right: -4px;
}

.root[maximized] .button[role="maximize"]::before {
    icon-font: url('./assets/fullscreen_exit-24px.svg');
}

.button[role="openInNewTab"]::before {
    icon-font: url('./assets/open_in_new-24px.svg');
    font-size: 20px;
    margin-right: -2px;
    margin-left: 2px;
}

.button[role="fetchLogs"]::before {
    icon-font: url('./assets/sync-24px.svg');
    font-size: 22px;
    margin-left: -2px;
}

.button[role="scrollToTop"] {
    transform: rotate(90deg);
}

.button[role="scrollToTop"]::before {
    icon-font: url('./assets/first_page-24px.svg');
    font-size: 26px;
}

.button[role="scrollToBottom"] {
    transform: rotate(90deg);
}

.button[role="scrollToBottom"]::before {
    icon-font: url('./assets/last_page-24px.svg');
    font-size: 26px;
}

.foot .button {
    margin: 0;
}
</style>
