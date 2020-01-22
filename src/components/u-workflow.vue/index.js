export const UWorkflow = {
    name: 'u-workflow',
    childName: 'u-workflow-item',
    data() {
        return {
            itemVMs: [],
        };
    },
};

export { UWorkflowItem } from './item.vue';
export { UWorkflowBranch } from './branch.vue';

export default UWorkflow;
