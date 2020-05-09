export const UWorkflow = {
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

export { UWorkflowItem } from './item.vue';
export { UWorkflowBranch } from './branch.vue';

export default UWorkflow;
