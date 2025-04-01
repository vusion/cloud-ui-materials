import start from './start.vue';
import end from './end.vue';
// import exclusiveGateway from './exclusive-gateway.vue';
// import userTask from './user-task.vue';
// import parallelGateway from './parallel-gateway.vue';
// import autoTask from './auto-task.vue';
import taskNode from './task-node.vue';
import gatewayNode from './gateway-node.vue';

import { makeProcessNode } from './makeProcessNode';

const StartNode = makeProcessNode(start);
const EndNode = makeProcessNode(end);
// const exclusiveGatewayNode = makeProcessNode(exclusiveGateway);
// const userTaskNode = makeProcessNode(userTask);
// const autoTaskNode = makeProcessNode(autoTask);
const taskNodeWrapped = makeProcessNode(taskNode);
const gatewayNodeWrapped = makeProcessNode(gatewayNode);
// const parallelGatewayNode = makeProcessNode(parallelGateway);

function getComponent(type, node) {
    switch (type) {
        case 'InitiateTask':
            return StartNode;
        case 'EndEvent':
            return EndNode;
        case 'UserTask':
        case 'AutoTask':
        case 'ApprovalTask':
        case 'ServiceTask':
        case 'SubmitTask':
        case 'CCTask':
            return taskNodeWrapped;
        case 'ExclusiveGateway':
        case 'ParallelGateway':
        case 'InclusiveGateway':
            return gatewayNodeWrapped;
        default:
            throw `type: ${type} 的节点没有定义渲染方法`
            // return null;
    }
}

export default {
    functional: true,
    props: {
        node: Object,
    },
    render(c, context) {
        const {
            node,
        } = context.props;
        const key = context.data.key;
        const targetComponent = getComponent(node.type, node);
        if (!targetComponent) {
            return null;
        }
        return c(targetComponent, {
            key,
            props: context.props,
            on: context.listeners,
        });
    },
};
