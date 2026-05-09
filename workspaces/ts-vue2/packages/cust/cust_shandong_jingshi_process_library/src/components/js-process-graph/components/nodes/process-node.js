import taskNode from './task-node.vue';
import gatewayNode from './gateway-node.vue';
import frameNode from './frame-node.vue';

import { makeProcessNode } from './makeProcessNode';

const taskNodeWrapped = makeProcessNode(taskNode);
const gatewayNodeWrapped = makeProcessNode(gatewayNode);
// FrameNode 不用 makeProcessNode 包装：FrameGroup.disableHit=true，JFlow 永不派发鼠标事件

function getComponent(type) {
    switch (type) {
        case 'FrameNode':
            return frameNode;
        case 'InitiateTask':
        case 'EndEvent':
        case 'UserTask':
        case 'AutoTask':
        case 'ApprovalTask':
        case 'ServiceTask':
        case 'SubmitTask':
        case 'CCTask':
        case 'CallSubProcess':
            return taskNodeWrapped;
        case 'ExclusiveGateway':
        case 'ParallelGateway':
        case 'InclusiveGateway':
            return gatewayNodeWrapped;
        default:
            throw `type: ${type} 的节点没有定义渲染方法`;
    }
}

export default {
    functional: true,
    props: {
        node: Object,
    },
    render(c, context) {
        const { node } = context.props;
        const key = context.data.key;
        const targetComponent = getComponent(node.type);
        if (!targetComponent) return null;
        return c(targetComponent, {
            key,
            props: context.props,
            on: context.listeners,
        });
    },
};
