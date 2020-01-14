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
    },
    data() {
        return {
            logs: [],
            currentDisplay: this.display,
            currentColor: this.color,
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
            handler() {
                this.logs = this.content.split('\n');
            },
            immediate: true,
        },
        display: {
            handler() {
                this.currentDisplay = this.display;
            },
            immediate: true,
        },
    },
    methods: {
        append(content) {
            this.logs = this.logs.concat(content.split('\n'));
            this.$nextTick(this.scrollToBottom);
        },
        prepend(content) {
            this.logs = content.split('\n').concat(this.logs);
            this.$nextTick(this.scrollToTop);
        },
        clear() {
            this.logs = [];
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
            this.$refs.body.scrollTop = 0;
        },
        scrollToBottom() {
            this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
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
