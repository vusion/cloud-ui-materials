<template>
<pre :class="$style.root" v-html="result"></pre>
</template>

<script>
import hljs from 'highlight.js/lib/highlight';

const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
};

function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
}

export default {
    name: 'x-highlight',
    props: {
        content: { type: String, default: '' },
        lang: { type: String, default: '' },
        auto: { type: Boolean, default: false },
        preRender: Function,
        postRender: Function,
    },
    data() {
        return { result: '' };
    },
    watch: {
        content() {
            this.render();
        },
    },
    created() {
        this.render();
    },
    methods: {
        defaultPreRender(content, lang) {
            return { content: content.trim(), lang: lang.trim() };
        },
        defaultPostRender(result) {
            return `<code>${result}\n</code>`;
        },
        render() {
            const { content, lang } = (this.preRender || this.defaultPreRender)(
                this.content,
                this.lang,
            ); // this.$emitPrevent(())
            let result = '';
            if (this.auto) {
                result = hljs.highlightAuto(
                    content,
                    this.lang ? [this.lang] : undefined,
                ).value;
            } else if (lang && hljs.getLanguage(lang)) {
                try {
                    result = hljs.highlight(lang, content).value;
                } catch (e) {}
            } else {
                result = escapeHtml(content);
            }
            this.result = result = (this.postRender || this.defaultPostRender)(
                result,
            );
            this.$emit('render', { content, lang, result }, this);
        },
    },
};
</script>

<style module>
.root {}
</style>
