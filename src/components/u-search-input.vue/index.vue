<template>
<div :class="$style.root">
    <u-input :class="$style.input" ref="input" @keydown.enter="select" @keydown.up="up" @keydown.down="down" @focus="focus(keyWord)" @blur="inputBlur" v-model="keyWord" v-bind="$attrs">
    </u-input>
    <div :class="$style.poper">
        <u-search-input-list v-if="showSearch" @select="onSelect" :offset="offset" ref="list" :list="resultList">
            <template slot="header" slot-scope="scope">
                <slot name="header" v-bind="scope"></slot>
            </template>
            <template slot-scope="scope">
                <slot v-bind="scope"></slot>
            </template>
        </u-search-input-list>
    </div>
</div></template>

<script>
// import i18n from '@/utils/i18n';
import { MField } from 'cloud-ui.vusion';
import SearchList from './list.vue';

export default {
    components: { [SearchList.name]: SearchList },
    name: 'u-search-input',
    mixins: [MField],
    props: {
        offset: { type: Number, default: 0 },
        value: { type: Object, default: () => ({ name: '', value: '' }) },
        searchWord: { type: String, default: '' },
        loadList: { type: Function, default: () => Promise.resolve([]) },
        valueCheck: { type: Boolean, default: false },
    },
    watch: {
        value(value) {
            this.keyWord = value.text;
        },
        searchWord(value) {
            this.keyWord = value;
        },
        keyWord(value, oldValue) {
            this.$emit('keychange', { value, oldValue });
            this.$emit('update:searchWord', value);
            if (this.searchTimeOut) clearTimeout(this.searchTimeOut);
            this.searchTimeOut = setTimeout(() => {
                this.search(value);
                this.searchTimeOut = undefined;
            }, 200);
        },
    },
    data() {
        return {
            keyWord: this.searchWord || this.value.text || '',
            searchTimeOut: undefined,
            resultList: [],
            isFocus: false,
        };
    },
    computed: {
        showSearch() {
            return this.isFocus && this.resultList.length > 0;
        },
    },
    methods: {
        up($event) {
            this.$emit('keyup', $event);
            this.$refs.list && this.$refs.list.pre();
        },
        down($event) {
            this.$emit('keydown', $event);
            this.$refs.list && this.$refs.list.next();
        },
        select($event) {
            this.$emit('keyenter', $event);
            this.$refs.list && this.$refs.list.select();
        },
        focus(value) {
            this.isFocus = true;
            this.$emit('focus');
            this.search(value);
        },
        search(value = '') {
            const loadResult = this.loadList(value);
            if (loadResult instanceof Promise) {
                this.loadList(value).then((list) => {
                    this.resultList = list;
                });
            } else if (loadResult instanceof Array) {
                this.resultList = loadResult;
            } else {
                throw Error(
                    '[cloud-ui] <u-search-input></u-search-input> loadList返回值仅接受数组类型或者是Promise对象',
                );
            }
        },
        onSelect(node) {
            const input = this.$refs.input;
            input.blur();
            this.isFocus = false;
            this.keyWord = node.text;
            this.$emit('select', { value: node, oldValue: this.value });
            this.$emit('update:value', node);
            this.$emit('input', node);
        },
        inputBlur($event) {
            if (
                this.valueCheck &&
                this.value &&
                this.value.text !== this.keyWord
            )
                this.keyWord = this.value.text;
            this.$emit('blur', $event);
            setTimeout(() => {
                this.isFocus = false;
            }, 400);
        },
    },
};
</script>

<style module>
.root {
    position: relative;
    display: inline-block;
    max-width: 100%;
}
.poper {
    position: absolute;
    width: 100%;
}
</style>
