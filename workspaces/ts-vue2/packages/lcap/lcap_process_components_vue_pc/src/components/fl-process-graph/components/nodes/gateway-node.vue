<template>
  <j-gateway-group
        :source="node"
        v-on="$listeners" 
        :configs="configs">
        <j-icon :configs="imageConfig"></j-icon>
    </j-gateway-group>
</template>

<script>
import { LinearLayout } from '@joskii/jflow-core';
import { LogicIconMap } from '../../icons.js';

const getProcessNodeBorderColor = (node) => {
    switch(node.type) {
        case 'ExclusiveGateway':
            return {
                borderColor: '#94BF69',
                fillColor: '#EAF2E1',
            };
        case 'ParallelGateway':
            return {
                borderColor: '#4981F2',
                fillColor: '#DBE6FC',
            };
        case 'InclusiveGateway':
            return {
                borderColor: '#21B892',
                fillColor: '#E9F8F4',
            };
    }
}

export default {
    inject: ['renderJFlow'],
    props: {
        node: Object,
        isHover: Boolean,
    },
    computed: {
        imageConfig() {
            return {
                image: LogicIconMap[this.node.type],
                width: 12,
                height: 12,
            };
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
            const colors = getProcessNodeBorderColor(this.node);
            let borderColor = colors.borderColor;
            if (this.isHover) {
                borderColor = '#4E75EC';
            }
            return {
                height: 34,
                width: 34,
                backgroundColor: colors.fillColor,
                borderRadius: 2,
                borderColor,
                borderWidth: 2,
                ...shadow
            };
        }
    },
    updated() {
        this.renderJFlow();
    },
}
</script>

<style>

</style>