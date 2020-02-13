import AnsiUp from 'ansi_up';

export default {
    name: 'u-log-viewer',
    props: {
        content: { type: String, default: '' },
        color: { type: String, default: 'dark' },
        visible: { type: Boolean, default: true },
        display: { type: String, default: 'static', validator: (value) => [
            'block', // '块级显示'
            'static', // 文件流中显示，'同 block'
            'full',
            'fixed',
            // 'modal',
            'fullWindow',
            'fullScreen',
        ].includes(value) },
        normalDisplay: { type: String, default: 'static', validator: (value) => [
            'block', // '块级显示'
            'static', // 文件流中显示，'同 block'
            'full',
            'fixed',
        ].includes(value) },
        maximizedDisplay: { type: String, default: 'fullWindow', validator: (value) => [
            'fullWindow',
            'fullScreen',
        ].includes(value) },
        position: { type: String, default: 'bottom-right', validator: (value) => [
            'top',
            'top-center',
            'top-left',
            'top-right',
            'bottom',
            'bottom-center',
            'bottom-left',
            'bottom-right',
        ].includes(value) },
        fetchLogs: { type: Function },
        openInNewTab: { type: [String, Function] },
        bufferWait: { type: Number, default: 200 },
        viewCount: { type: Number, default: 100 },
    },
    data() {
        return {
            logs: [],
            buffer: [],
            currentDisplay: this.display,
            currentColor: this.color,
            // timer
            viewIndex: 0,
            paddingTop: 0,
            paddingBottom: 0,
            // parentEl
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
        viewLogs() {
            return this.logs.slice(this.viewIndex, this.viewIndex + this.viewCount);
        },
    },
    watch: {
        content: {
            handler(content) {
                // this.logs = this.content.split('\n');
                this.logs = [{ content: this.toHtml(content), id: +new Date() + '-' + 0 }];
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
                    this.$el && this.$el.requestFullscreen && this.$el.requestFullscreen();
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
                this.$emit('display-change', {
                    display: currentDisplay,
                    oldDisplay,
                }, this);
            },
            immediate: true,
        },
    },
    beforeCreate() {
        // 有 buffering，不同组件实例最好不要混用
        this.ansiUp = new AnsiUp();
        // eslint-disable-next-line camelcase
        this.ansiUp.use_classes = true;
    },
    methods: {
        toHtml(content) {
            // eslint-disable-next-line no-div-regex
            return this.ansiUp.ansi_to_html(content.replace(/ /g, '=WHITESPACE=')).replace(/=WHITESPACE=/g, '&nbsp;').replace(/\n/g, '<br>');
        },
        push(content) {
            this.buffer.push({ content: this.toHtml(content), id: +new Date() + '-' + (this.logs.length + this.buffer.length) });
            this.$emit('push', {
                logs: this.logs,
                incremental: content,
            }, this);

            if (!this.timer) {
                this.timer = setTimeout(() => {
                    this.logs = this.logs.concat(this.buffer);

                    this.buffer = [];

                    // 日志如果在最底下，便持续滚
                    if (this.$refs.body && this.$refs.body.scrollTop + this.$refs.body.clientHeight >= this.$refs.body.scrollHeight) {
                        this.onScroll({ target: this.$refs.body });
                        this.$nextTick(this.scrollToBottom);
                    }

                    this.$emit('update', {
                        logs: this.logs,
                        incremental: content,
                    }, this);

                    this.timer = window.clearTimeout(this.timer);
                }, this.bufferWait);
            }
        },
        clear() {
            this.logs = [];

            this.$emit('clear', {
                logs: [],
            }, this);
        },
        toggleColor() {
            this.currentColor = (this.currentColor === 'dark' ? 'light' : 'dark');
        },
        toggleMaximize() {
            // this.currentDisplay = (this.currentDisplay === 'fullScreen' ? 'block' : 'fullScreen');
            if (this.isMaximized)
                this.currentDisplay = this.normalDisplay;
            else
                this.currentDisplay = this.maximizedDisplay;
        },
        scrollToTop() {
            if (this.$refs.body)
                this.$refs.body.scrollTop = 0;
        },
        scrollToBottom() {
            if (this.$refs.body)
                this.$refs.body.scrollTop = this.$refs.body.scrollHeight - this.$refs.body.clientHeight;
        },
        onScroll(e) {
            const bodyVM = e.target;

            // 记录当前 DOM 节点的高度
            const children = Array.from(bodyVM.children[0].children);
            children.forEach((childVM, index) => {
                if (this.logs[this.viewIndex + index])
                    this.logs[this.viewIndex + index].height = childVM.offsetHeight;
            });

            const scrollHeight = bodyVM.scrollHeight;
            const scrollTop = bodyVM.scrollTop;
            let accHeight = 0;
            let viewIndex = 0;
            for (let i = 0; i < this.logs.length; i++) {
                const log = this.logs[i];
                accHeight += log.height || 12;
                viewIndex = i;
                if (accHeight > scrollTop)
                    break;
            }

            viewIndex -= Math.ceil(this.viewCount / 10);
            viewIndex = Math.max(0, Math.min(viewIndex, this.logs.length - this.viewCount));
            // }

            let paddingTop = 0;
            let paddingBottom = 0;
            for (let i = 0; i < this.logs.length; i++) {
                const log = this.logs[i];
                if (i < viewIndex)
                    paddingTop += log.height || 12;
                else if (i >= viewIndex + this.viewCount)
                    paddingBottom += log.height || 12;
            }

            this.viewIndex = viewIndex;
            this.paddingTop = paddingTop;
            this.paddingBottom = paddingBottom;
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
