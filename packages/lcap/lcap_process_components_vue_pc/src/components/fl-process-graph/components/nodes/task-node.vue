<template>
    <j-process-node-group
        :source="node"
        v-on="$listeners"
        :configs="configs">
        <j-group :configs="iconGroup">
            <j-icon :configs="imageConfig" />
        </j-group>

        <j-group :configs="textGroup">
            <j-text :configs="{
                fontSize: '14px',
                textColor: '#333',
                content: node.title || node.name,
                width: 128,
                ellipsis: true,
                textAlign: 'left'
            }">
            </j-text>
        </j-group> 
    </j-process-node-group>
</template>

<script>
import { LinearLayout } from  '@joskii/jflow-core';
import { LogicIconMap } from  '../../icons.js';
const getProcessNodeColor = (node) => {
    if(node.current) {
        return 'rgba(51, 126, 255, 0.2)'
    }
    if(node.completed) {
        return 'rgba(38, 189, 113, 0.2)';
    }
    return 'rgba(204, 204, 204, 0.2)'
}
const getProcessNodeBorderColor = (node) => {
    if(node.current) {
        return '#337EFF';
    }
    if(node.completed) {
        return '#26BD71';
    }
    return '#CCCCCC'
}
const getProcessIcon = (node) => {
    if(node.current) {
        return LogicIconMap.SolvingIcon;
    }
    if(node.completed) {
        return LogicIconMap.ResolvedIcon;
    }
    return LogicIconMap.TodoIcon;
}

const layout2 = new LinearLayout({
    direction: 'horizontal',
    gap: 0,
});

export default {
    inject: ['renderJFlow'],
    props: {
        node: Object,
        isHover: Boolean,
    },
    data() {
        return {
            textGroup: {
                width: 146,
                height: 32,
                // backgroundColor: '#fff'
            },
            
        }
    },
    computed: {
        iconGroup() {
            return {
                backgroundColor: getProcessNodeColor(this.node),
                width: 32,
                height: 32,
            }
        },
        imageConfig() {
            return {
                image: getProcessIcon(this.node),
                width: 16,
                height: 16,
            }
        },
        configs() {
            let shadow = {
                shadowColor: 'transparent',
            };
            if (this.isHover) {
                shadow = {
                    shadowColor: 'rgba(61, 75, 102, 0.2)',
                    shadowBlur: 12,
                    shadowOffsetY: 8,
                };
            }
            let borderColor = getProcessNodeBorderColor(this.node);
            if (this.isHover) {
                borderColor = '#4E75EC';
            }

            return {
                layout: layout2,
                height: 34,
                width: 180,
                backgroundColor: '#fff',
                borderRadius: 4,
                borderColor,
                borderWidth: 2,
                ...shadow
            };
        },
    },
    updated() {
        this.renderJFlow();
    }
}
</script>

<style>

</style>