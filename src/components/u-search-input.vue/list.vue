<template>
<div :style="{left: offset + 'px'}" :class="$style.root">
    <template v-if="haveGroups">
        <div :class="$style.group" v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`">
            <div>
                <slot name="header" :group="group" :index="groupIndex" :groups="groups">
                    <p :class="$style.groupHeader">
                        {{ group.title }}
                    </p>
                </slot>
            </div>
            <ul :class="$style.list">
                <li :class="$style.item" :title="item.text" v-for="(item, index) in group.children" :key="`search-item-${item.$$index}`" @click="select(item.$$index)" :select="item.$$index===selected">
                    <slot :list="selectList" :selected="item.$$index===selected"  :index="item.$$index" :item="item">
                        {{ item.text }}
                    </slot>
                </li>
            </ul>
        </div>
    </template>
    <template v-else>
        <ul :class="$style.list">
            <li :class="$style.item" :title="item.text" v-for="(item, index) in selectList" :key="`search-item-${index}`" @click="select(index)" :select="index===selected">
                <slot :list="selectList" :selected="index===selected"  :index="index" :item="item">
                    {{ item.text }}
                </slot>
            </li>
        </ul>
    </template>
</div></template>

<script>
// import i18n from '@/utils/i18n';
import { MField } from 'cloud-ui.vusion';

export default {
    name: 'u-search-input-list',
    mixins: [MField],
    props: {
        offset: { type: Number, default: 0 },
        list: { type: Array, default: () => [] },
    },
    data() {
        return { selected: -1 };
    },
    computed: {
        haveGroups() {
            return this.list.some((item) => item.children instanceof Array);
        },
        selectList() {
            if (this.haveGroups) {
                let result = [];
                this.list.forEach((item, index) => {
                    result = [
                        ...result,
                        ...item.children.map((child) =>
                            Object.assign({}, child),
                        ),
                    ];
                });
                return result;
            } else {
                return this.list;
            }
        },
        groups() {
            if (!this.haveGroups) return [];
            let index = 0;
            return this.list.map((item) =>
                Object.assign({}, item, {
                    children: item.children.map((child) => {
                        const result = Object.assign({}, child, {
                            $$index: index,
                        });
                        index++;
                        return result;
                    }),
                }),
            );
        },
    },
    methods: {
        select(index) {
            const max = this.selectList.length;
            if (index !== undefined) this.selected = index;
            const selected = this.selected;
            if (selected > max - 1 || selected < 0) return;
            this.$emit('select', this.selectList[selected]);
        },
        next() {
            const { selectList, selected } = this;
            const max = selectList.length;
            if (selected >= max - 1) this.selected = -1;
            else this.selected = selected + 1;
        },
        pre() {
            const { selectList, selected } = this;
            const max = selectList.length;
            if (selected <= -1) this.selected = max - 1;
            else this.selected = selected - 1;
        },
    },
};
</script>

<style module>

.root {
    position: absolute;
    width: 100%;
    top: 0;
    background: white;
    z-index: 10;
    border-left: 1px solid var(--border-color-base);
    border-right: 1px solid var(--border-color-base);
    border-bottom: 1px solid var(--border-color-base);
}
.root .list {
    max-height: 197px;
    overflow-y: auto;
    line-height: 25px;
    padding-left: 0;
    margin: 0;
}
.root .item {
    text-align: left;
    cursor: pointer;
    padding: 5px 10px;
    border-bottom: 1px solid var(--border-color-base);
    background: white;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #666;
}
.root .item:last-child {
    border-bottom: none;
}
.root .item:hover {
    background: var(--hover-color);
}
.root .item[select] {
    background: var(--hover-color);
}
.groupHeader {
    color: var(--brand-primary);
    margin: 0;
    padding: 5px 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border-color-base);
    /* border-bottom: 1px solid var(--border-color-base); */
}
.group .item {
    padding-left: 15px;
}
</style>
