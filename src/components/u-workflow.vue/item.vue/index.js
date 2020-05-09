import { MEmitter } from 'cloud-ui.vusion';
export const UWorkflowItem = {
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
        !this.parentVM && this.$contact((vm) => vm.$options.name === 'u-workflow' || vm.$options.name === 'u-workflow-branch', (parentVM) => {
            this.parentVM = parentVM;
            const index = parentVM.$slots.default ? parentVM.$slots.default.indexOf(this.$vnode) : -1;
            if (~index)
                parentVM.itemVMs.splice(index, 0, this);
            else
                parentVM.itemVMs.push(this);
        });
    },
    destroyed() {
        this.$contact((vm) => vm.$options.name === 'u-workflow' || vm.$options.name === 'u-workflow-branch', (parentVM) => {
            parentVM.itemVMs.splice(parentVM.itemVMs.indexOf(this), 1);
            this.parentVM = undefined;
        });
    },
};
export default UWorkflowItem;
