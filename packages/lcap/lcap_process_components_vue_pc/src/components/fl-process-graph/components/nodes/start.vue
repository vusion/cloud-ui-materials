<template>
    <j-process-node-group
        ref="root"
        :source="node"
        v-on="$listeners"
        :configs="configs">
        <j-icon :configs="imageConfig"></j-icon>
        <!-- <j-text :configs="{
            fontSize: '12px',
            textColor: '#000',
            content: node.name,
        }">
        </j-text> -->
        <!-- <j-group   
            :configs="configs"
            @afterResolveMovingTarget="prepareLink"
            @instancemousemove="setCrossHairCursor">
            <j-icon :configs="imageConfig"></j-icon>
        </j-group> -->
    </j-process-node-group>
</template>

<script>
import { LinearLayout } from  '@joskii/jflow-core';
import { LogicIconMap } from '../../icons.js';
// import cursorMixin from '../../mixins/cursor-mixin';
// import linkMixin from './link-mixin';
const layout = new LinearLayout({
    direction: 'vertical',
    gap: 4,
});
export default {
    // mixins: [linkMixin, cursorMixin],
    props: {
        node: Object,
    },
    data() {
        return {
            imageConfig: {
                image: LogicIconMap.StartNewIcon,
                width: 24,
                height: 24,
            }
        };
    },
    computed: {
        isError() {
            return this.node.tsErrorDetail;
        },
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
