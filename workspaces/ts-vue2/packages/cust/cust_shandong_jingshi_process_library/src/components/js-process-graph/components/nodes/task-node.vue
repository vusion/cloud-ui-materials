<template>
    <j-task-node-group
        :source="node"
        v-on="$listeners"
        :configs="configs">
        <j-icon :configs="imageConfig" />
    </j-task-node-group>
</template>

<script>
import { LogicIconMap } from '../../icons.js';

const getProcessNodeColor = (node) => {
    if (node.current) return 'rgba(51, 126, 255, 0.2)';
    if (node.completed) return 'rgba(38, 189, 113, 0.2)';
    return 'rgba(204, 204, 204, 0.2)';
};
const getProcessNodeBorderColor = (node) => {
    if (node.current) return '#337EFF';
    if (node.completed) return '#26BD71';
    return '#CCCCCC';
};
const getProcessIcon = (node) => {
    if (node.type === 'InitiateTask') return LogicIconMap.StartNewIcon;
    if (node.type === 'EndEvent')     return LogicIconMap.EndNewIcon;
    if (node.current)   return LogicIconMap.SolvingIcon;
    if (node.completed) return LogicIconMap.ResolvedIcon;
    return LogicIconMap.TodoIcon;
};

export default {
    inject: ['renderJFlow'],
    props: {
        node: Object,
        isHover: Boolean,
    },
    computed: {
        imageConfig() {
            return {
                image: getProcessIcon(this.node),
                width: 16,
                height: 16,
            };
        },
        configs() {
            let shadow = { shadowColor: 'transparent' };
            if (this.isHover) {
                shadow = {
                    shadowColor: 'rgba(61, 75, 102, 0.2)',
                    shadowBlur: 12,
                    shadowOffsetY: 8,
                };
            }
            let borderColor = getProcessNodeBorderColor(this.node);
            if (this.isHover) borderColor = '#4E75EC';

            return {
                width: 34,
                height: 34,
                backgroundColor: getProcessNodeColor(this.node),
                borderRadius: 8,
                borderColor,
                borderWidth: 2,
                labelContent: this.node.title || this.node.name,
                ...shadow,
            };
        },
    },
    updated() {
        this.renderJFlow();
    },
};
</script>
