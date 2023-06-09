
<template>
  <div 
    class="markdown-doc-search-box"
    @keyup.enter="go(focusIndex)"
    @keyup.up="onUp"
    @keyup.down="onDown"
  >
    <u-input
        ref="input"

        :value.sync="query"
        :clearable="clearable"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :readonly="readonly"
        :disabled="disabled"
        :width="width"
        :height="height"      
        :suffix="suffix" 
        :prefix="prefix"

        @before-input="onBeforeInput"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @before-clear="onBeforeClear"
        @clear="onClear"
        @click-prefix="onClickPrefix"
        @click-suffix="onClickSuffix"
    />

    <ul
      v-if="showSuggestions"
      class="suggestions"
      :class="{ [`align-${align}`]: true }"
      @mouseleave="onMouseLeave"
    >
        <li class="total-suggestions">共搜索到{{ suggestions.length || 0 }}条内容</li>
        <li
            v-for="(s, i) in suggestions"
            :key="i"
            class="suggestion"
            :class="{ focused: i === focusIndex }"
            @mousedown="go(i)"
            @mouseenter="onMouseEnter(i)"
        >
            <a @click.prevent>
            <div class="parent-page-title">{{ s[textField] }}</div>

            <div class="suggestion-row">
                <div class="suggestion-content">
                    <div v-html="getContent(s[descriptionField])"></div>
                </div>
            </div>
            </a>
        </li>
    </ul>
  </div>
</template>
<script>
import debounce from 'lodash.debounce'
// import UInput from 'cloud-ui.vusion/src/components/u-input.vue'

export default {
    name: 'lcap-markdown-doc-search',
    props: {
        value: String,
        dataSource: {
            type: Array,
            default: []
        },
        textField: String,
        descriptionField: String,
        
        align: {
           type: String,
           default: 'left' 
        },
        clearable: Boolean,
        placeholder: String,
        maxlength: Number,
        autofocus: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        width: { type: String, default: 'normal' },
        height: { type: String, default: 'normal' },
        prefix: String,
        suffix: String,
    },
    components: {
        // UInput,
    },
    data () {
        return {
            composing: false,
            query: this.value,
            show: false,
            focusIndex: 0,
        }
    },

    computed: {
        suggestions() {
            return this.dataSource
        },
        showSuggestions () {
            return (
                this.show
                && this.query
            )
        },
    },
    watch: {
        value(value) {
            this.query = value;
        },
        query(value) {
            this.$emit('update:value', value)
        },
    },

    mounted () {
        document.addEventListener('keydown', this.onHotkey)
    },

    beforeDestroy () {
        document.removeEventListener('keydown', this.onHotkey)
    },

    methods: {
        onHotkey (event) {
            if (event.srcElement === document.body && ['s', '/'].includes(event.key)) {
                this.$refs.input.focus()
                event.preventDefault()
            }
        },
        onBeforeInput($event) {
            this.$emit('before-input', $event)
        },
        onInput($event) {
            this.$emit('input', $event)
        },

        onChange: debounce(function ($event) {
            this.$emit('change', $event)
        }, 500),

        onCompositionStart($event) {
            this.composing = true;
        },

        onCompositionEnd($event) {
            if (!this.composing) { return }

            this.query = $event.target.value;
            this.$emit('input', $event.target.value)
            this.$emit('update:value', $event.target.value);
        },

        onFocus() {
            this.show = true
            this.$emit('focus')
        },

        onBlur() {
            this.show = false
            this.$emit('blur')
        },

        onBeforeClear($event) {
            this.$emit('before-clear', $event)
        },

        onClear($event) {
            this.$emit('clear', $event)
        },

        onClickPrefix($event) {
            this.$emit('click-prefix', $event)
        },
        onClickSuffix($event) {
            this.$emit('click-suffix', $event)  
        },

        onUp () {
            if (this.showSuggestions) {
                if (this.focusIndex > 0) {
                this.focusIndex--
                } else {
                this.focusIndex = this.suggestions.length - 1
                }
            }
        },

        onDown () {
            if (this.showSuggestions) {
                if (this.focusIndex < this.suggestions.length - 1) {
                this.focusIndex++
                } else {
                this.focusIndex = 0
                }
            }
        },

        go (i) {
            const selected = this.suggestions[i];
            if (!this.showSuggestions) {
                return
            }

            if (!selected) {
                return
            }

            this.$emit('select', {
                item: selected
            })
            this.show = false
        },

        onMouseEnter (i) {
            this.focusIndex = i
        },

        onMouseLeave () {
            this.focusIndex = -1
        },

        getContent(str) {
            return str.replace(/<mark>/g, `<span class="highlight">`).replace(/<\/mark>/g, '</span>')
        },
        // @exposed-api
        focus() {
            this.$refs.input.focus();
        },
        // @exposed-api
        blur() {
            this.$refs.input.blur();
        },
        // @exposed-api
        clear() {
            this.$refs.input.clear();
        }
    }
}
</script>

<style>
.markdown-doc-search-box {
    display: inline-block;
    position: relative;
    margin-right: 1rem;
    z-index: 99;
}

.markdown-doc-search-box .total-suggestions {
    margin: 1px 0 2x 2px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #666
}

/* .markdown-doc-search-box input:focus {
    cursor: auto;
    border-color: #337eff
} */

/* .markdown-doc-search-box input[prefix] {
    padding-left: 30px;
} */

/* .markdown-doc-search-box input[suffix] {
    padding-right: 30px;
}

.markdown-doc-search-box .prefix, .markdown-doc-search-box .suffix {
    display: block;
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

.markdown-doc-search-box .prefix {
    left: 8px;
}

.markdown-doc-search-box .suffix {
    right: 8px;
}

.markdown-doc-search-box .suffix .singleicon{
    color: var(--input-icon-color);
} */

.markdown-doc-search-box .suggestions {
    background: #fff;
    min-width: 500px;
    max-width: 700px;
    max-height: 500px;
    overflow: auto;
    position: absolute;
    top: 2rem;
    border: 1px solid #cfd4db;
    border-radius: 6px;
    padding: .4rem;
    list-style-type: none
} 

.markdown-doc-search-box .suggestions.align-left {
    left: 0
}

.markdown-doc-search-box .suggestions.align-right {
    right: 0
}

.markdown-doc-search-box .suggestions .highlight {
    color: #337eff;
    font-weight: 600
}

.markdown-doc-search-box .total-suggestions {
  margin-bottom: 5px;
}

.markdown-doc-search-box .suggestion {
    line-height: 1.4;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;

    margin-bottom: 5px;
    border-radius: 5px;
    border: 1px solid #eaecef;
    overflow: hidden;
}

.markdown-doc-search-box .suggestion.focused {
    background-color: #eee
}

.markdown-doc-search-box .suggestion a {
    display: block;
    white-space: normal;
    color: #415b75;
    width: 100%
}

.markdown-doc-search-box .suggestion a .parent-page-title {
    color: #222;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    background-color: #f6f7fd;
    padding: 8px 13px;
}

.markdown-doc-search-box .suggestion a .suggestion-row {
    border-collapse: collapse;
    width: 100%;
    display: table
}

.markdown-doc-search-box .suggestion a .suggestion-row .page-title {
    width: 35%;
    display: table-cell;
    text-align: right;
    padding: 5px;
    font-weight: 600
}

.markdown-doc-search-box .suggestion a .suggestion-row .suggestion-content {
    font-weight: 400;
    border: 1px solid #eaecef;
    border-right: none;
    width: 65%;
    display: table-cell;
    padding: 5px
}

.markdown-doc-search-box .suggestion a .suggestion-row .suggestion-content .highlight {
    text-decoration: underline
}

.markdown-doc-search-box .suggestion a .suggestion-row .suggestion-content .header {
    font-weight: 600
}


</style>
