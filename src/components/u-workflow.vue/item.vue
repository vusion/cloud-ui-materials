<template>
<div :class="$style.root" :label-size="parentVM.hasLabel && parentVM.labelSize">
    <span :class="$style.label" v-if="parentVM.hasLabel">{{ label }}</span>
    <div :class="$style.body" :has-child="!!branchVMs.length">
        <u-button v-if="title" :class="$style.button" :status="status" v-ellipsis-title
                  :href="href" :target="target" :to="to" :replace="replace" :append="append" :disabled="disabled"
        >{{ title }}
            <u-tooltip v-if="tooltip || $slots.tooltip" placement="right"><slot name="tooltip">{{ tooltip }}</slot></u-tooltip>
        </u-button>
        <div :class="$style.sub"><slot></slot></div>
    </div>
</div>
</template>

<script>
import { MEmitter } from 'cloud-ui.vusion';

export default {
    name: 'u-workflow-item',
    mixins: [MEmitter],
    props: {
        status: { type: String, default: 'undo' },
        label: String,
        title: String,
        tooltip: String,
        href: String,
        target: { type: String, default: '_self' },
        to: [String, Object],
        replace: { type: Boolean, default: false },
        append: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },

    data() {
        return {
            parentVM: undefined,
            branchVMs: [],
        };
    },
    created() {
        !this.parentVM
            && this.$contact(
                (vm) =>
                    vm.$options.name === 'u-workflow'
                    || vm.$options.name === 'u-workflow-branch',
                (parentVM) => {
                    this.parentVM = parentVM;
                    const index = parentVM.$slots.default ? parentVM.$slots.default.indexOf(this.$vnode) : -1;
                    if (~index)
                        parentVM.itemVMs.splice(index, 0, this);
                    else
                        parentVM.itemVMs.push(this);
                },
            );
    },
    destroyed() {
        this.$contact(
            (vm) =>
                vm.$options.name === 'u-workflow'
                || vm.$options.name === 'u-workflow-branch',
            (parentVM) => {
                parentVM.itemVMs.splice(parentVM.itemVMs.indexOf(this), 1);
                this.parentVM = undefined;
            },
        );
    },
};
</script>

<style module>
.root {
    display: flex;
    align-items: center;
}

.root[label-size$="normal"] { margin-left: calc(-1 * var(--workflow-label-size, 120px)); }
.root[label-size$="small"] { margin-left: calc(-1 * var(--workflow-label-size-small, 80px)); }
.root[label-size$="large"] { margin-left: calc(-1 * var(--workflow-label-size-large, 160px)); }

.label {
    color: var(--color-light);
}
.root[label-size$="normal"] .label { width: var(--workflow-label-size, 120px); }
.root[label-size$="small"] .label { width: var(--workflow-label-size-small, 80px); }
.root[label-size$="large"] .label { width: var(--workflow-label-size-large, 160px); }

.body {
    flex: auto;
    position: relative;
    z-index: 1;
    text-align: center;
}

.button {
    display: inline-block;
    user-select: none;
    line-height: inherit;
    padding: var(--workflow-button-padding-y, 4px) var(--workflow-button-padding-x, 20px);
    background: var(--workflow-button-background, white);
    border: var(--workflow-button-border-width, 2px) solid var(--workflow-button-border-color, #acb6c4);
    color: var(--workflow-button-color, inherit);
    max-width: var(--workflow-button-max-width, 200px);
    margin: 0 var(--workflow-button-space-x, 10px);
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
}

.button:hover {
    background: var(--workflow-button-background, white);
    border: var(--workflow-button-border-width, 2px) solid var(--workflow-button-border-color, #acb6c4);
    color: var(--workflow-button-color, inherit);
}

.button:active {
    box-shadow: none;
}

.button:empty {
    display: none;
}

.root + .root {
    margin-top: var(--workflow-space, 50px);
}

.button[status="doing"] {
    background: var(--workflow-button-background-doing, #ffa136);
    border-color: var(--workflow-button-background-doing, #ffa136);
    color: var(--workflow-button-color-doing, white);
}

.button[status="done"] {
    background: var(--workflow-button-background-done, #3ad0af);
    border-color: var(--workflow-button-background-done, #3ad0af);
    color: var(--workflow-button-color-doing, white);
}

.body[has-child] > .sub {
    background: white;
    display: flex;
    margin: calc(var(--workflow-space, 50px) * (-1/3)) 0;
}
</style>
