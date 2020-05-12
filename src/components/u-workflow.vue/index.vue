<template>
<div :class="$style.root">
    <div :class="$style.body" :label-size="hasLabel && labelSize">
        <slot></slot>
    </div>
    <div v-if="legend && legend.length" :class="$style.legend">
        图例：
        <div :class="$style.item_button" v-for="item in legend" :key="item.label" :status="item.color">{{ item.label }}</div>
    </div>
</div>
</template>

<script>
export default {
    name: 'u-workflow',
    childName: 'u-workflow-item',
    props: {
        legend: { type: Array, default: () => [
            { label: '已完成', color: 'done' },
            { label: '进行中', color: 'doing' },
            { label: '未开始', color: 'todo' },
        ] },
        labelSize: { type: String, default: 'normal' },
    },
    data() {
        return {
            itemVMs: [],
        };
    },
    computed: {
        hasLabel() {
            return this.itemVMs.some((itemVM) => !!itemVM.label);
        },
    },
};
</script>

<style module>
.root {}

.body {
    position: relative;
    margin: calc(var(--workflow-space, 50px) / 2) 0;
}

.body[label-size$="normal"] { margin-left: var(--workflow-label-size, 120px); }
.body[label-size$="small"] { margin-left: var(--workflow-label-size-small, 80px); }
.body[label-size$="large"] { margin-left: var(--workflow-label-size-large, 160px); }

.body::before {
    content: '';
    display: block;
    position: absolute;
    border-right: 1px solid var(--workflow-space-border-color, #cbd5e5);
    left: 50%;
    top: 0;
    bottom: 0;
}

.legend {
    margin-top: 50px;
}

.legend .item_button {
    font-size: 12px;
    padding: 0px 10px;
    line-height: 18px;
}

.legend .item_button + .item_button {
    margin-left: 5px;
}
</style>
