<template>
    <j-flow-branch-link
        ref="root"
        :configs="linkConfigs"
        :from="configs.from.source"
        :to="configs.to.source">
    </j-flow-branch-link>
</template>

<script>
export default {
    props: {
        node: Object,
        configs: Object,
    },
    inject: [
        'renderJFlow',
    ],

    computed: {
        linkConfigs() {
            const config = {
                content: this.value,
                backgroundColor: this.configs.completed ? '#26BD71' : '#999999',
                approximate: 400,
                fromDir: this.configs.fromDir,
                toDir: this.configs.toDir,
                showLineSeg: false,
                waypoints: this.configs.waypoints,
                showContent: this.configs.conditionFlow,
                showAdd: false
            };
            if (this.configs.conditionFlow) {
                Object.assign(config, {
                    branchInfo: {
                        branchName: this.node.title,
                    },
                })
            }
            return config;
        },
        value() {
            return this.node.flowValue;
        },
    },
    updated() {
        this.renderJFlow();
    },

};
</script>

<style>

</style>
