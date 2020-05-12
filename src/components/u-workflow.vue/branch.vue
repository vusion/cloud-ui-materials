<template>
<div :class="$style.root">
    <slot></slot>
</div>
</template>

<script>
import { MEmitter } from 'cloud-ui.vusion';

export default {
    name: 'u-workflow-branch',
    mixins: [MEmitter],
    data() {
        return {
            parentVM: undefined,
            itemVMs: [],
        };
    },
    created() {
        !this.parentVM && this.$contact('u-workflow-item', (parentVM) => {
            this.parentVM = parentVM;
            const index = parentVM.$slots.default ? parentVM.$slots.default.indexOf(this.$vnode) : -1;
            if (~index)
                parentVM.branchVMs.splice(index, 0, this);
            else
                parentVM.branchVMs.push(this);
        });
    },
    destroyed() {
        this.$contact('u-workflow-item', (parentVM) => {
            parentVM.branchVMs.splice(parentVM.branchVMs.indexOf(this), 1);
            this.parentVM = undefined;
        });
    },
};
</script>

<style module>
.root {
    flex: 1 0 0;
    position: relative;
    text-align: center;
    padding: calc(var(--workflow-space, 50px) * (1/3)) 0;
}

.root::before {
    position: absolute;
    content: '';
    display: block;
    border-right: 1px solid var(--border-color-base, #cbd5e5);
    top: 0;
    bottom: 0;
    left: 50%;
}

.root::after {
    position: absolute;
    content: '';
    display: block;
    border-top: 1px solid var(--workflow-space-border-color, #cbd5e5);
    border-bottom: 1px solid var(--workflow-space-border-color, #cbd5e5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.root:first-child::after {
    left: 50%;
}

.root:last-child::after {
    right: 50%;
}
</style>
