<template>
    <j-process-node-group
        ref="root"
        :source="node"
        :configs="configs"
        v-on="$listeners">
        <j-icon :configs="imageConfig"></j-icon>
    </j-process-node-group>
</template>

<script>
import { LinearLayout } from '@joskii/jflow-core';
import { LogicIconMap } from '../../icons.js';
export default {
    props: {
        node: Object,
    },
    data() {
        return {
            imageConfig: {
                image: LogicIconMap.EndNewIcon,
                width: 24,
                height: 24,
            }
        };
    },
    computed: {
        configs() {
            let shadow = {
                shadowColor: 'transparent',
            };
            let borderColor = '#E0E0E0';
            return {
                borderColor,
                backgroundColor: '#FFFFFF',
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                ...shadow
            }
        }
    }
};
</script>

<style>

</style>
